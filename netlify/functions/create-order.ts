import crypto from "crypto";

export default async (req: Request) => {
  // Only allow POST requests for order creation
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed. Use POST." }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  try {
    const { amount } = await req.json();
    if (!amount) {
      return new Response(JSON.stringify({ error: "Amount is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Sandbox check
    if (!keyId || !keySecret) {
      return new Response(JSON.stringify({
        isSandboxDemo: true,
        amount: amount,
        currency: "INR",
        message: "Razorpay Key ID or Secret is missing in Netlify environment variables. Running in Sandbox Demo simulation mode."
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    const amountInPaise = Math.round(amount * 100);
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    // Contact Razorpay API directly
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
      return new Response(JSON.stringify({ error: `Razorpay Order generation failed: ${errorText}` }), {
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    const orderData = await response.json();
    return new Response(JSON.stringify({
      id: orderData.id,
      amount: orderData.amount,
      currency: orderData.currency,
      keyId: keyId,
      isSandboxDemo: false
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    console.error("Netlify Serverless: Create Order Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to create order" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

// Set precise custom path route matching for Netlify runtime
export const config = {
  path: "/api/razorpay/create-order"
};
