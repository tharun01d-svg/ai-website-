import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import crypto from "crypto";
import dotenv from "dotenv";

// Load environment variables from .env with override true to apply user live settings
dotenv.config({ override: true });

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for JSON request bodies
  app.use(express.json());

  // API router
  const apiRouter = express.Router();

  // Create Razorpay Order
  apiRouter.post("/razorpay/create-order", async (req, res) => {
    try {
      const { amount } = req.body;
      if (!amount) {
        return res.status(400).json({ error: "Amount is required" });
      }

      const keyId = process.env.RAZORPAY_KEY_ID;
      const keySecret = process.env.RAZORPAY_KEY_SECRET;

      // If configuration is missing, we gracefully return sandbox demo status to client
      // to guarantee that the application stream never breaks or crashes without keys.
      if (!keyId || !keySecret) {
        return res.json({
          isSandboxDemo: true,
          amount: amount,
          currency: "INR",
          message: "Razorpay Key ID or Secret is missing in Server Environment Secrets. Running in Sandbox Demo simulation mode."
        });
      }

      const amountInPaise = Math.round(amount * 100);

      // Call Razorpay API directly using native node fetch (avoiding unneeded SDK package bulk)
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const response = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${auth}`
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          receipt: `receipt_blueprint_${Date.now()}`
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Razorpay Core API Error Response:", errorText);
        return res.status(response.status).json({ error: `Razorpay Order generation failed: ${errorText}` });
      }

      const orderData = await response.json();
      return res.json({
        id: orderData.id,
        amount: orderData.amount,
        currency: orderData.currency,
        keyId: keyId,
        isSandboxDemo: false
      });
    } catch (error: any) {
      console.error("Internal error creating Razorpay order:", error);
      return res.status(500).json({ error: error.message || "Failed to create order" });
    }
  });

  // Verify Razorpay Payment Signature
  apiRouter.post("/razorpay/verify-payment", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, isSandboxDemo } = req.body;

      if (isSandboxDemo) {
        // Mock successful validation for sandbox demo pipelines
        return res.json({ verified: true, isDemo: true });
      }

      const keySecret = process.env.RAZORPAY_KEY_SECRET;
      if (!keySecret) {
        return res.status(400).json({ error: "Razorpay Key Secret is required for formal verification" });
      }

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ error: "Missing required Razorpay parameters for verification" });
      }

      // SHA256 HMAC verification
      const body = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(body)
        .digest("hex");

      const isVerified = expectedSignature === razorpay_signature;

      if (isVerified) {
        return res.json({ verified: true });
      } else {
        return res.status(400).json({ verified: false, error: "Invalid cryptographic payment signature" });
      }
    } catch (error: any) {
      console.error("Signature verification error:", error);
      return res.status(500).json({ error: error.message || "Verification failed" });
    }
  });

  // Use API routes first
  app.use("/api", apiRouter);

  // Vite static/middleware serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FULL-STACK] Server running and serving Express API on port ${PORT}`);
  });
}

startServer();
