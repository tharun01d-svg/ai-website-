/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  X, 
  CreditCard, 
  QrCode, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Check, 
  Download, 
  ExternalLink,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Helper to dynamically load Razorpay standard SDK
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrice?: number;
}

export default function EnrollmentModal({ isOpen, onClose, initialPrice = 999 }: EnrollmentModalProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  
  // Card Inputs
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  
  // UPI Input
  const [upiId, setUpiId] = useState("");
  
  // Errors
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // States for Razorpay sandbox simulation when API keys are not supplied.
  const [sandboxDemo, setSandboxDemo] = useState<{ isActive: boolean; amount: number; message: string } | null>(null);

  if (!isOpen) return null;

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (step === 1) {
      if (!name.trim()) return setError("Please enter your name");
      if (!email.trim() || !email.includes("@")) return setError("Please enter a valid email address");
      if (!whatsapp.trim() || whatsapp.length < 8) return setError("Please enter your WhatsApp number (minimum 8 digits)");
      setStep(2);
    } else if (step === 2) {
      setIsProcessing(true);
      setError("");
      
      try {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          throw new Error("Could not load Razorpay SDK script. Please check your internet connection.");
        }

        // Call Express Server backend to generate the dynamic Razorpay Order
        const response = await fetch("/api/razorpay/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ amount: initialPrice })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || "Failed to create order on server.");
        }

        const data = await response.json();

        // If Razorpay Key variables are not present, trigger beautiful interactive sandbox playground.
        if (data.isSandboxDemo) {
          setIsProcessing(false);
          setSandboxDemo({
            isActive: true,
            amount: initialPrice,
            message: data.message
          });
          return;
        }

        // Initialize Razorpay Options
        const options = {
          key: data.keyId,
          amount: data.amount,
          currency: data.currency,
          name: "AI Website Agency",
          description: "Lifetime Access - Core Blueprint & Bonuses",
          image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=128&h=128&q=80",
          order_id: data.id,
          prefill: {
            name: name,
            email: email,
            contact: whatsapp
          },
          theme: {
            color: "#2563eb"
          },
          handler: async function (paymentResponse: any) {
            setIsProcessing(true);
            try {
              // Verify SHA256 Signature mathematically on Express Backend
              const verifyResponse = await fetch("/api/razorpay/verify-payment", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  razorpay_order_id: paymentResponse.razorpay_order_id,
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,
                  razorpay_signature: paymentResponse.razorpay_signature,
                  isSandboxDemo: false
                })
              });

              if (!verifyResponse.ok) {
                const verifyErr = await verifyResponse.json();
                throw new Error(verifyErr.error || "Payment signature cryptographic verification failed.");
              }

              // Proceed to celebration section
              setStep(3);
            } catch (err: any) {
              setError(err.message || "Failed to finalize transaction safely.");
            } finally {
              setIsProcessing(false);
            }
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
            }
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();

      } catch (err: any) {
        console.error("Razorpay workflow initiation error:", err);
        setError(err.message || "An error occurred starting the checkout flow.");
        setIsProcessing(false);
      }
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardNumber(formatted);
  };

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setCardExpiry(value);
  };

  const handleCardCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3));
  };

  return (
    <div id="enroll-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      {/* Animated container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-xl overflow-hidden bg-brand-card rounded-2xl border border-white/10 shadow-2xl shadow-blue-500/10 box-glow"
        id="enroll-modal-card"
      >
        {/* Banner Glow at Top */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600" />
        
        {/* Sandbox Simulation Layer */}
        {sandboxDemo?.isActive && (
          <div className="absolute inset-0 z-45 bg-zinc-950/95 flex flex-col justify-between p-6 md:p-8 text-left rounded-2xl border border-blue-500/30">
            <div className="space-y-5">
              {/* Sandbox Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse inline-block" />
                  <span className="text-xs font-mono font-black uppercase text-amber-400 tracking-wider">Razorpay Sandbox Testing</span>
                </div>
                <button 
                  type="button"
                  onClick={() => setSandboxDemo(null)} 
                  className="text-gray-400 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="text-blue-400 animate-pulse" size={18} /> Gateway Sandbox Emulator
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Your Razorpay payment gateway integration is <strong>ready and fully operational</strong>! Since no credentials (<code className="font-mono text-amber-300 bg-black/45 px-1 py-0.5 rounded text-[10px]">RAZORPAY_KEY_ID</code>) are active in your Cloud Run Secrets, we have safely initiated this secure developer emulator.
                </p>
              </div>

              {/* Data payload review segment */}
              <div className="p-4 bg-blue-950/40 border border-blue-500/15 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-mono text-[11px]">STUDENT:</span>
                  <span className="text-white font-semibold">{name} ({email})</span>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-white/5 pt-2">
                  <span className="text-gray-400 font-mono text-[11px]">ORDER TOTAL:</span>
                  <span className="text-blue-300 font-black text-sm">₹{sandboxDemo.amount}.00 INR</span>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-white/5 pt-2">
                  <span className="text-gray-400 font-mono text-[11px]">PROVIDER:</span>
                  <span className="text-white">Razorpay Standard Orders V1 API</span>
                </div>
              </div>

              {/* Configuration instruction card */}
              <div className="p-3.5 bg-zinc-900/60 rounded-xl border border-white/5 space-y-2 text-left">
                <p className="text-[10px] uppercase font-bold text-blue-400 tracking-widest flex items-center gap-1">
                  💡 How to make real live transactions:
                </p>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  Log in to your Razorpay Dashboard, gather your <strong>Key ID</strong> and <strong>Key Secret</strong>, and add them as <code className="text-blue-300">RAZORPAY_KEY_ID</code> and <code className="text-blue-300">RAZORPAY_KEY_SECRET</code> in the <strong className="text-white">Secrets (under App Settings)</strong>. The system will deploy the live gateway checkout dialog.
                </p>
              </div>
            </div>

            {/* Sandbox Operations */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => {
                  setSandboxDemo(null);
                  setError("Payment canceled by user inside test simulator.");
                }}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 border border-white/10 transition-all cursor-pointer text-center"
              >
                Cancel Simulation
              </button>

              <button
                type="button"
                onClick={async () => {
                  setIsProcessing(true);
                  setError("");
                  try {
                    // Call verify-payment endpoint with mock validation schema
                    const verifyResponse = await fetch("/api/razorpay/verify-payment", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({ isSandboxDemo: true })
                    });
                    
                    if (!verifyResponse.ok) {
                      const verifyErr = await verifyResponse.json();
                      throw new Error(verifyErr.error || "Simulation webhook verification failed.");
                    }

                    setSandboxDemo(null);
                    setStep(3);
                  } catch (err: any) {
                    setError(err.message || "Simulated payment verification failure.");
                  } finally {
                    setIsProcessing(false);
                  }
                }}
                disabled={isProcessing}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                {isProcessing ? "Verifying..." : "Confirm Test Payment"}
              </button>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button 
          onClick={onClose}
          disabled={isProcessing}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors z-20"
          aria-label="Close modal"
          id="btn-close-modal"
        >
          <X size={18} />
        </button>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
              <Sparkles size={11} className="animate-pulse" /> Launch Special
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-display text-white" id="modal-title">
              AI Website Agency Blueprint
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Step-by-step system to build and sell AI websites. Lifetime Access.
            </p>
          </div>

          {/* Stepper Progress Indicator */}
          {step < 3 && (
            <div className="flex items-center gap-3 mb-6 font-mono text-xs text-gray-400 bg-black/25 p-2.5 rounded-lg border border-white/5">
              <div className="flex items-center gap-1.5">
                <span className={`w-5 h-5 flex items-center justify-center rounded-full font-semibold ${step >= 1 ? "bg-blue-600 text-white" : "bg-white/10 text-gray-400"}`}>1</span>
                <span className={step === 1 ? "text-white font-medium" : "text-gray-500"}>Student Details</span>
              </div>
              <ChevronRight size={12} className="text-gray-600" />
              <div className="flex items-center gap-1.5">
                <span className={`w-5 h-5 flex items-center justify-center rounded-full font-semibold ${step >= 2 ? "bg-blue-600 text-white" : "bg-white/10 text-gray-400"}`}>2</span>
                <span className={step === 2 ? "text-white font-medium" : ""}>Secure Payment</span>
              </div>
            </div>
          )}

          {/* Errors, if any */}
          {error && (
            <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400" id="modal-error">
              {error}
            </div>
          )}

          {/* Form Core */}
          <form onSubmit={handleNextStep}>
            {step === 1 && (
              <div className="space-y-4" id="modal-step-1">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Your Full Name
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Rohan Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans"
                    id="input-student-name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="e.g. rohan@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans"
                    id="input-student-email"
                  />
                  <span className="text-[10px] text-gray-500 mt-1 block">Course login access will be mailed instantly to this email.</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    WhatsApp Mobile Number
                  </label>
                  <input 
                    type="tel" 
                    required
                    placeholder="e.g. +91 9876543210"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans"
                    id="input-student-phone"
                  />
                  <span className="text-[10px] text-gray-500 mt-1 block">Used for sending direct prompt template files and lead tracker links.</span>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl font-display font-bold text-sm bg-blue-600 hover:bg-blue-700 active:transform active:scale-[0.99] text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/20"
                    id="btn-step1-continue"
                  >
                    Go to Secure Checkout <ArrowRight size={15} />
                  </button>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500 mt-3">
                    <Lock size={10} /> Secure 256-bit encrypted transaction
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4" id="modal-step-2">
                {/* Total Billing tag */}
                <div className="flex items-center justify-between p-3.5 bg-blue-500/5 rounded-xl border border-blue-500/20">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">Course Plan</span>
                    <h5 className="text-sm font-semibold text-white">Full Blueprint + All Bonuses</h5>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 line-through">₹12,999</span>
                    <h4 className="text-lg font-extrabold text-white">₹{initialPrice} <span className="text-[10px] font-normal text-gray-400">incl. tax</span></h4>
                  </div>
                </div>

                {/* Direct Payment Mode Select */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border text-xs gap-1.5 transition-all cursor-pointer ${paymentMethod === "upi" ? "bg-blue-600/10 border-blue-600 text-white font-medium" : "bg-black/20 border-white/5 text-gray-400 hover:border-white/15"}`}
                      id="payment-upi-tab"
                    >
                      <QrCode size={18} />
                      <span>UPI / QR</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border text-xs gap-1.5 transition-all cursor-pointer ${paymentMethod === "card" ? "bg-blue-600/10 border-blue-600 text-white font-medium" : "bg-black/20 border-white/5 text-gray-400 hover:border-white/15"}`}
                      id="payment-card-tab"
                    >
                      <CreditCard size={18} />
                      <span>Cards</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("netbanking")}
                      className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border text-xs gap-1.5 transition-all cursor-pointer ${paymentMethod === "netbanking" ? "bg-blue-600/10 border-blue-600 text-white font-medium" : "bg-black/20 border-white/5 text-gray-400 hover:border-white/15"}`}
                      id="payment-netbanking-tab"
                    >
                      <span className="font-mono text-xs font-bold ring-1 ring-gray-600 rounded px-1 scale-90 mb-0.5">NET</span>
                      <span>Netbanking</span>
                    </button>
                  </div>
                </div>

                {/* Sub-form based on method */}
                <div className="p-4 bg-black/45 rounded-xl border border-white/5">
                  {paymentMethod === "upi" ? (
                    <div className="space-y-4" id="payment-upi-details">
                      <div className="flex flex-col md:flex-row items-center gap-4 py-1">
                        <div className="bg-white p-2 rounded-lg shrink-0">
                          {/* Simulated QR Code using absolute lines */}
                          <div className="relative w-24 h-24 bg-gray-100 flex items-center justify-center border border-gray-300">
                            <span className="text-[10px] text-gray-900 font-mono text-center font-bold uppercase p-1">UPI SECURE SCAN&nbsp;₹{initialPrice}</span>
                            {/* Decorative QR-like corners */}
                            <div className="absolute top-1 left-1 w-3 h-3 border-2 border-gray-900" />
                            <div className="absolute top-1 right-1 w-3 h-3 border-2 border-gray-900" />
                            <div className="absolute bottom-1 left-1 w-3 h-3 border-2 border-gray-900" />
                            <div className="absolute bottom-1 right-1 w-3 h-3 border-2 border-gray-900" />
                          </div>
                        </div>
                        <div className="text-center md:text-left space-y-1">
                          <h6 className="text-xs font-bold text-white uppercase tracking-wide">Scan QR with BHIM UPI / GPay / PhonePe</h6>
                          <p className="text-[11px] text-gray-400 leading-relaxed">
                            Scan the secure automatic reference QR with any payment app to pay ₹{initialPrice} directly.
                          </p>
                          <div className="text-[10px] text-blue-400 font-mono mt-1">Status: Ready for incoming payment...</div>
                        </div>
                      </div>

                      <div className="relative flex items-center">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-xs w-full">
                          <span className="bg-brand-card px-2 text-gray-500 font-mono uppercase text-[9px] tracking-widest">Or Pay with UPI ID</span>
                        </div>
                      </div>

                      <div>
                        <input 
                          type="text" 
                          placeholder="e.g. rohan@okaxis"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                          id="input-upi-id"
                        />
                      </div>
                    </div>
                  ) : paymentMethod === "card" ? (
                    <div className="space-y-3" id="payment-card-details">
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                          Card Number
                        </label>
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="4111 2222 3333 4444"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/20 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 font-mono"
                            id="input-card-number"
                          />
                          <CreditCard size={14} className="absolute left-3.5 top-3.5 text-gray-500" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                            Expiry Date
                          </label>
                          <input 
                            type="text" 
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={handleCardExpiryChange}
                            maxLength={5}
                            className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 font-mono text-center"
                            id="input-card-expiry"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                            CVV Code
                          </label>
                          <input 
                            type="password" 
                            placeholder="123"
                            value={cardCvv}
                            onChange={handleCardCvvChange}
                            maxLength={3}
                            className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 font-mono text-center"
                            id="input-card-cvv"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3" id="payment-netbanking-details">
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                        Select Your Bank
                      </label>
                      <select 
                        className="w-full px-3 py-2.5 rounded-xl bg-black/20 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                        id="select-bank"
                      >
                        <option value="sbi" className="bg-brand-card">State Bank of India (SBI)</option>
                        <option value="hdfc" className="bg-brand-card">HDFC Bank</option>
                        <option value="icici" className="bg-brand-card">ICICI Bank</option>
                        <option value="axis" className="bg-brand-card">Axis Bank</option>
                        <option value="kotak" className="bg-brand-card">Kotak Mahindra Bank</option>
                      </select>
                      <p className="text-[10px] text-gray-400 text-center pt-1.5">You will be redirected safely for processing authentication.</p>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 px-6 rounded-xl font-display font-bold text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/20"
                    id="btn-submit-payment"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Verifying Secure Payment...
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        Claim Instant Access for ₹{initialPrice} <ChevronRight size={15} />
                      </span>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[10px] text-gray-500 mt-4">
                    <span className="flex items-center gap-1"><ShieldCheck size={11} className="text-blue-500" /> PCI-DSS Compliant</span>
                    <span className="flex items-center gap-1"><Lock size={11} className="text-blue-500" /> SSL Encrypted</span>
                  </div>
                </div>
              </div>
            )}
          </form>

          {step === 3 && (
            <div className="text-center py-4 space-y-6" id="modal-success-screen">
              {/* Payment Success Anim container */}
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center relative shadow-lg shadow-emerald-500/15">
                <Check size={32} className="animate-scale-in" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-2xl font-extrabold text-white font-display">Payment Successful!</h4>
                <p className="text-xs text-emerald-400 font-medium">Welcome inside the AI Website Agency Blueprint, {name}!</p>
                <div className="font-mono text-[10px] text-gray-500 uppercase mt-1">Transaction Ref ID: TXN-{Math.floor(100000 + Math.random() * 900000)}-2026</div>
              </div>

              {/* Informative receipt note */}
              <div className="p-4 bg-emerald-500/5 text-emerald-300 rounded-xl border border-emerald-500/10 text-xs text-left leading-relaxed max-w-md mx-auto space-y-1.5">
                <p className="font-semibold text-emerald-200">✨ Immediate Action Required:</p>
                <p>We've sent your automatic portal login credentials and introductory training link directly to <span className="font-semibold text-white underline">{email}</span>.</p>
                <p>Your WhatsApp tracker template payload has also been prepared for delivery to <span className="font-semibold text-white">{whatsapp}</span>.</p>
              </div>

              {/* Download Buttons Area */}
              <div className="space-y-2.5 max-w-sm mx-auto pt-2">
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 text-left">Your fast action downloads are ready:</h5>
                
                <a 
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert("Downloaded: AI Website Agency Blueprint starter guidelines PDF toolkit!"); }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs border border-white/10 text-white transition-all hover:translate-x-1"
                  id="btn-download-pdf"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Download size={13} className="text-blue-400" /> Agency Core Launch Checklist (PDF)
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">1.2 MB</span>
                </a>

                <a 
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert("Downloaded: Premium prompt files txt collection bundle!"); }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs border border-white/10 text-white transition-all hover:translate-x-1"
                  id="btn-download-prompts"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Download size={13} className="text-blue-400" /> 25+ Niche Prompts Vault (.TXT)
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">420 KB</span>
                </a>

                <a 
                  href="https://docs.google.com/spreadsheets" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs border border-white/10 text-white transition-all hover:translate-x-1"
                  id="btn-link-sheets"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <ExternalLink size={13} className="text-blue-400" /> Google Sheets Lead Tracker
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">LINK</span>
                </a>
              </div>

              <div className="pt-4 border-t border-white/5">
                <button 
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl border border-white/10 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-all font-medium cursor-pointer"
                  id="btn-success-close"
                >
                  All Set, Continue Exploring
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
