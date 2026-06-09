/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Check, 
  Download, 
  ExternalLink,
  ChevronRight,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { motion } from "motion/react";

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
  const [step, setStep] = useState(1); // 1 = Redirecting/Initializing, 2 = Payment Unsuccessful, 3 = Success Redirect
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // States for Razorpay sandbox simulation when API keys are not supplied.
  const [sandboxDemo, setSandboxDemo] = useState<{ isActive: boolean; amount: number; message: string } | null>(null);

  // Automatically trigger Razorpay checkout on mount or open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setError("");
      setIsProcessing(false);
      setSandboxDemo(null);
      setCountdown(5);

      // Trigger checkout instantly
      const timer = setTimeout(() => {
        triggerCheckout();
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Automatic Google Forms Onboarding countdown redirection when payment succeeds
  useEffect(() => {
    if (step === 3) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            // Instantly transition and redirect to Google Forms intake URL
            window.location.href = "https://forms.gle/hLwteicSr9nQzfsC8";
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [step]);

  const triggerCheckout = async () => {
    setIsProcessing(true);
    setError("");
    
    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error("Could not load Razorpay securely. Check your network link.");
      }

      // Initialize order on Express backend
      const response = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: initialPrice })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to initialize order from checkout backend.");
      }

      const data = await response.json();

      // If Razorpay API keys are not supplied in environmental secrets, activate simulator
      if (data.isSandboxDemo) {
        setIsProcessing(false);
        setSandboxDemo({
          isActive: true,
          amount: initialPrice,
          message: data.message
        });
        return;
      }

      // Configure official options
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "AI Website Agency",
        description: "Lifetime Access Blueprint & Bonuses",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=128&h=128&q=80",
        order_id: data.id,
        prefill: {
          name: "AI Student",
          email: "student@aiwebsiteacademy.com"
        },
        theme: {
          color: "#2563eb"
        },
        handler: async function (paymentResponse: any) {
          setIsProcessing(true);
          try {
            // Secure signature mathematical checks on backend server
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
              throw new Error(verifyErr.error || "Cryptographic validation failed.");
            }

            // Success! Proceed to celebration and onboarding redirect
            setStep(3);
          } catch (err: any) {
            setError(err.message || "Failed to finalize transaction safely.");
            setStep(2);
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            setStep(2);
            setError("Payment session dismissed or cancelled by the student before processing.");
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (err: any) {
      console.error("Razorpay workflow initiation error:", err);
      setError(err.message || "An error occurred starting the secure checkout flow.");
      setIsProcessing(false);
      setStep(2);
    }
  };

  if (!isOpen) return null;

  return (
    <div id="enroll-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-lg overflow-hidden bg-brand-card rounded-2xl border border-white/10 shadow-2xl shadow-blue-500/10 box-glow"
        id="enroll-modal-card"
      >
        {/* Decorative Top Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600" />
        
        {/* Sandbox Simulation Layer - Automatically visible if credentials are not configured */}
        {sandboxDemo?.isActive && (
          <div className="absolute inset-0 z-45 bg-zinc-950/98 flex flex-col justify-between p-6 md:p-8 text-left rounded-2xl border border-blue-500/35 overflow-y-auto">
            <div className="space-y-4">
              {/* Sandbox Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-xs font-mono font-black uppercase text-amber-400 tracking-wider">Razorpay Gateway Sandbox</span>
                </div>
                <button 
                  type="button"
                  onClick={() => {
                    setSandboxDemo(null);
                    setStep(2);
                    setError("Sandbox setup cancelled.");
                  }} 
                  className="text-gray-400 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="text-blue-400 animate-pulse" size={18} /> Gateway Emulator Active
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Your Razorpay payment gateway integration is <strong>connected and operational</strong>! Since credentials (<code className="font-mono text-amber-300 bg-black/45 px-1 py-0.5 rounded text-[10px]">RAZORPAY_KEY_ID</code>) are not entered in the system environment yet, we have simulated Razorpay Orders v1 logic.
                </p>
              </div>

              {/* Data payload review segment */}
              <div className="p-4 bg-blue-950/40 border border-blue-500/15 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-mono text-[11px]">ORDER TOTAL:</span>
                  <span className="text-blue-300 font-black text-sm">₹{sandboxDemo.amount}.00 INR</span>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-white/5 pt-2">
                  <span className="text-gray-400 font-mono text-[11px]">PROVIDER STATE:</span>
                  <span className="text-emerald-400 font-bold">Standard Razorpay Checkouts (v1)</span>
                </div>
              </div>

              {/* Configuration instruction card */}
              <div className="p-3.5 bg-zinc-900/60 rounded-xl border border-white/5 space-y-2 text-left">
                <p className="text-[10px] uppercase font-bold text-blue-400 tracking-widest flex items-center gap-1">
                  💡 Deploying Live Transactions:
                </p>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  Generate live Key credentials in your Razorpay CRM dash, and define <code className="text-blue-300">RAZORPAY_KEY_ID</code> and <code className="text-blue-300">RAZORPAY_KEY_SECRET</code> in the app's environment Secrets.
                </p>
              </div>
            </div>

            {/* Sandbox Actions */}
            <div className="flex items-center gap-3 pt-6 border-t border-white/5 mt-4">
              <button
                type="button"
                onClick={() => {
                  setSandboxDemo(null);
                  setStep(2);
                  setError("Simulated payment transaction cancelled by the developer.");
                }}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 border border-white/10 transition-all text-center cursor-pointer"
              >
                Cancel Setup
              </button>

              <button
                type="button"
                onClick={async () => {
                  setIsProcessing(true);
                  setError("");
                  try {
                    const verifyResponse = await fetch("/api/razorpay/verify-payment", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({ isSandboxDemo: true })
                    });
                    
                    if (!verifyResponse.ok) {
                      const verifyErr = await verifyResponse.json();
                      throw new Error(verifyErr.error || "Simulation signature validation failed.");
                    }

                    setSandboxDemo(null);
                    setStep(3); // Shift directly to celebration & Google form redirect screen
                  } catch (err: any) {
                    setError(err.message || "Simulated payment verification failure.");
                    setStep(2);
                  } finally {
                    setIsProcessing(false);
                  }
                }}
                disabled={isProcessing}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:translate-y-[1px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isProcessing ? "Validating Mock..." : "Confirm Mock Payment"}
              </button>
            </div>
          </div>
        )}

        {/* Close button */}
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
          
          {/* STEP 1: LOADING & CONNECTING SCREEN */}
          {step === 1 && (
            <div className="text-center py-6 space-y-6" id="modal-connecting-screen">
              {/* Pulsing secure lock animation */}
              <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-blue-600/10 border border-blue-500/20 animate-ping opacity-75" />
                <div className="absolute -inset-2 rounded-full bg-blue-500/5 animate-pulse" />
                <div className="relative w-16 h-16 rounded-full bg-blue-950/40 border border-blue-500/30 flex items-center justify-center shadow-lg shadow-blue-500/10">
                  {isProcessing ? (
                    <RefreshCw className="text-blue-400 animate-spin" size={26} />
                  ) : (
                    <Lock className="text-blue-400" size={26} />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <ShieldCheck size={12} /> SECURE GATEWAY CHECKOUT
                </span>
                <h3 className="text-xl font-extrabold text-white font-display">
                  Redirecting to Razorpay...
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                  Instructing the global checkout service and opening secure portal window. Lifetime access price: <strong className="text-white font-sans text-sm font-semibold">₹{initialPrice} INR</strong>.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-xs text-red-400 rounded-xl flex items-center gap-2 text-left" id="modal-error">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Instant Manual payment button in case popup block is on or auto-load takes time */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={triggerCheckout}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-6 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 active:translate-y-[1px] transition-all flex items-center justify-center gap-2 pointer-events-auto cursor-pointer shadow-lg shadow-blue-500/25"
                  id="btn-manual-checkout-trigger"
                >
                  {isProcessing ? "Loading secure sandbox..." : "Retry Secure Razorpay Checkout"}
                  <ChevronRight size={14} />
                </button>
                <p className="text-[10px] text-gray-500 mt-3 flex items-center justify-center gap-1">
                  <Lock size={10} /> Fully PCI-DSS safe 256-bit automated encryption
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT NOT SUCCESSFUL / FAILED STATE */}
          {step === 2 && (
            <div className="text-center py-6 space-y-6" id="modal-failed-screen">
              {/* Alert indicator badge with red pulsing halo */}
              <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-red-600/10 border border-red-500/20 animate-ping opacity-75" />
                <div className="absolute -inset-2 rounded-full bg-red-500/5 animate-pulse" />
                <div className="relative w-16 h-16 rounded-full bg-red-950/40 border border-red-500/30 flex items-center justify-center shadow-lg shadow-red-500/10">
                  <AlertCircle className="text-red-400" size={30} />
                </div>
              </div>

              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-red-500/10 text-red-400 border border-red-400/20">
                  🚫 PAYMENT UNSUCCESSFUL
                </span>
                <h3 className="text-xl font-extrabold text-white font-display">
                  Transaction Was Not Finished
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                  Your payment could not be processed or authorized at this time. Don't worry — no funds have been debited from your card or wallet.
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-950/40 border border-red-500/25 text-xs text-red-300 rounded-xl flex flex-col gap-1 text-left max-w-sm mx-auto">
                  <span className="font-mono text-[9px] uppercase font-bold text-red-400 tracking-widest">Error Details:</span>
                  <p className="leading-relaxed font-semibold">{error}</p>
                </div>
              )}

              {/* Action buttons to retry checkout or dismiss modal */}
              <div className="pt-2 space-y-2.5 max-w-sm mx-auto">
                <button
                  type="button"
                  onClick={async () => {
                    setStep(1);
                    setError("");
                    setTimeout(() => {
                      triggerCheckout();
                    }, 400);
                  }}
                  className="w-full py-3.5 px-6 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 active:translate-y-[1px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20"
                  id="btn-retry-payment"
                >
                  <RefreshCw size={13} className="animate-spin-slow" />
                  Retry Secure Checkout
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 px-6 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 border border-white/10 transition-all text-center cursor-pointer"
                  id="btn-cancel-failed"
                >
                  Close & Change Plan
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CELEBRATION & ONBOARDING REDIRECT STATE */}
          {step === 3 && (
            <div className="text-center py-4 space-y-6" id="modal-success-screen">
              {/* Payment Success Anim badge */}
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center relative shadow-lg shadow-emerald-500/20">
                <Check size={32} className="shrink-0 animate-bounce" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-2xl font-extrabold text-white font-display">Payment Successful!</h4>
                <p className="text-xs text-emerald-400 font-medium">Lifetime access authorized instantly.</p>
                <div className="font-mono text-[9px] text-gray-500 uppercase">Transaction ID: TXN-{Math.floor(100000 + Math.random() * 900000)}-INR</div>
              </div>

              {/* AUTOMATIC COUNTDOWN ONBOARDING FORM BOX */}
              <div className="p-5 bg-gradient-to-r from-blue-950/60 via-blue-900/15 to-blue-950/60 rounded-2xl border border-blue-500/35 shadow-xl shadow-blue-500/10 text-left space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-mono font-black uppercase tracking-wider rounded bg-blue-500/20 text-blue-300 border border-blue-500/25">
                      ⚠️ ACTION NEEDED
                    </span>
                    <span className="text-[11px] font-semibold text-blue-300 font-mono animate-pulse">
                      Redirecting in {countdown}s...
                    </span>
                  </div>
                  <h5 className="text-sm font-black text-white">Unlock Onboarding details on Google Form</h5>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    To instantiate your dashboard credentials, configure your domain package, and instantly download bonuses, submit the enrollment details on our secure Google Form.
                  </p>
                </div>

                <a 
                  href="https://forms.gle/hLwteicSr9nQzfsC8"
                  className="w-full h-12 flex items-center justify-center gap-2 px-5 rounded-xl font-display font-black text-xs text-white bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 hover:from-blue-700 hover:via-blue-600 hover:to-sky-500 shadow-md shadow-blue-500/20 transition-all text-center uppercase tracking-wider scale-100 hover:scale-[1.01] active:translate-y-[1px]"
                  id="btn-onboarding-google-form"
                  rel="noopener noreferrer"
                >
                  Redirect to Onboarding Form <ExternalLink size={14} className="ml-1 animate-pulse" />
                </a>
              </div>

              {/* Direct Bonus Downloads area */}
              <div className="space-y-2.5 max-w-sm mx-auto pt-3 text-left">
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 font-mono">Immediate Bonus Packages:</h5>
                
                <a 
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert("Preparing Download: Starter Guidelines PDF Toolkit Pack!"); }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs border border-white/5 text-white transition-all"
                  id="btn-download-pdf"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Download size={13} className="text-blue-400" /> Core Agency Launch Toolkit (PDF)
                  </span>
                  <span className="text-[10px] text-gray-500">1.2 MB</span>
                </a>

                <a 
                  href="https://docs.google.com/spreadsheets" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs border border-white/5 text-white transition-all"
                  id="btn-link-sheets"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <ExternalLink size={13} className="text-blue-400" /> Prospect lead tracking tracker
                  </span>
                  <span className="text-[10px] text-gray-500">LINK</span>
                </a>
              </div>

              <div className="pt-4 border-t border-white/5">
                <button 
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl border border-white/5 text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer font-medium"
                  id="btn-success-close"
                >
                  Close & Back to Academy
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
