import crypto from "crypto";

export default async (req: Request) => {
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  // Handle CORS preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  // Only allow POST requests for cryptographic verification
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed. Use POST." }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, isSandboxDemo } = await req.json();

    // Check Sandbox Emulator validation parameter
    if (isSandboxDemo) {
      return new Response(JSON.stringify({ verified: true, isDemo: true }), {
        status: 200,
        headers: corsHeaders
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return new Response(JSON.stringify({ error: "Razorpay Key Secret is required for formal cryptographic verification" }), {
        status: 400,
        headers: corsHeaders
      });
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response(JSON.stringify({ error: "Missing required Razorpay parameters for verification" }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // SHA256 HMAC calculation to review payment validation signature safely
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body)
      .digest("hex");

    const isVerified = expectedSignature === razorpay_signature;

    if (isVerified) {
      return new Response(JSON.stringify({ verified: true }), {
        status: 200,
        headers: corsHeaders
      });
    } else {
      return new Response(JSON.stringify({ verified: false, error: "Invalid payment validation signature matching" }), {
        status: 400,
        headers: corsHeaders
      });
    }

  } catch (error: any) {
    console.error("Netlify Serverless: Signature Verification Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Cryptographic verification failed" }), {
      status: 500,
      headers: corsHeaders
    });
  }
};
