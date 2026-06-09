/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { 
  X, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  CheckCircle, 
  Gift, 
  Percent, 
  ShieldCheck 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ExitIntentModalProps {
  onClaimDiscount: (discountedPrice: number) => void;
}

export default function ExitIntentModal({ onClaimDiscount }: ExitIntentModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [hasShownThisSession, setHasShownThisSession] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or accepted this exit intent in their current tab session
    const shown = sessionStorage.getItem("exit_intent_popup_shown") === "true";
    if (shown) {
      setHasShownThisSession(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // clientY <= 20 means cursor left towards the browser tab header / top window area.
      if (e.clientY <= 20) {
        setIsVisible(true);
        sessionStorage.setItem("exit_intent_popup_shown", "true");
        setHasShownThisSession(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShownThisSession]);

  // Countdown timer clock ticks down active seconds
  useEffect(() => {
    if (!isVisible) return;
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible, timeLeft]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleClaim = () => {
    setIsVisible(false);
    // Open standard checkout preloaded with ₹799 exit offer price!
    onClaimDiscount(799);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div 
          id="exit-intent-overlay" 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg overflow-hidden bg-brand-card rounded-2xl border border-blue-500/20 shadow-2xl shadow-blue-500/10 box-glow"
            id="exit-intent-card"
          >
            {/* Top glowing high-contrast bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600" />
            
            {/* Soft Ambient blue pattern behind content */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-56 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button 
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Dismiss offer"
              id="btn-dismiss-exit"
            >
              <X size={18} />
            </button>

            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Header Badge */}
              <div className="text-center space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] sm:text-xs font-mono font-black uppercase tracking-widest rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Sparkles size={11} className="animate-pulse" /> WAIT! EXCLUSIVE OFFER DETECTED
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight leading-tight mt-1" id="exit-modal-heading">
                  Get ₹200 Extra Off!
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
                  We noticed you were heading out. Unlock this unique exit deal to download premium prompts, templates, and full lessons for ₹799 instead of ₹999.
                </p>
              </div>

              {/* Countdown urgency box */}
              <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500/5 rounded-xl border border-blue-500/10 text-xs text-blue-300 font-mono scale-95" id="exit-coupon-timer">
                <Clock size={14} className="animate-pulse text-blue-400" />
                <span>OFFER EXPIRES IN:</span>
                <span className="font-extrabold text-white text-sm bg-blue-600/25 px-2 py-0.5 rounded tracking-wide font-mono text-glow">
                  {formatTime(timeLeft)}
                </span>
              </div>

              {/* High anchoring visual pricing card */}
              <div className="p-5 rounded-xl bg-black/40 border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Special Access</span>
                    <h5 className="text-xs font-semibold text-white">Blueprint + Bonuses + Launch Toolkit</h5>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-gray-500 font-mono line-through font-medium">₹12,999 Standard</div>
                    <div className="text-xs text-gray-400 font-mono line-through font-medium mt-0.5">₹999 Launch Price</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/15 shrink-0 spin-none">
                      <Percent size={14} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wide">EXIT DISCOUNT SECURED</span>
                      <span className="text-[11px] text-gray-500">20% Additional drop applied</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-[9px] uppercase font-mono text-blue-400 font-black tracking-widest animate-pulse">Your Exit Price</span>
                    <span className="text-3xl font-black font-display text-glow text-white font-mono">₹799</span>
                  </div>
                </div>
              </div>

              {/* Bullet proof list */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2.5 text-gray-300">
                  <CheckCircle size={14} className="text-blue-400 shrink-0" />
                  <span>Immediate lifetime course access & updates</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-300">
                  <CheckCircle size={14} className="text-blue-400 shrink-0" />
                  <span>All 25+ prompt vaults & checklist toolkits</span>
                </div>
              </div>

              {/* Action row */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleClaim}
                  className="w-full py-4 px-6 rounded-xl font-display font-black text-sm bg-blue-600 hover:bg-blue-700/90 active:transform active:scale-[0.99] text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/20"
                  id="btn-claim-exit-deal"
                >
                  Claim My ₹200 Discount Now <ArrowRight size={15} />
                </button>
                
                <button
                  onClick={handleDismiss}
                  className="w-full text-center text-xs text-gray-500 hover:text-gray-400 transition-colors hover:underline cursor-pointer py-1"
                  id="btn-no-thanks-exit"
                >
                  No thanks, I'll pay standard ₹999 instead
                </button>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] text-gray-500">
                <ShieldCheck size={12} className="text-blue-500 animate-pulse" />
                <span>Secured through PCI-DSS encrypted payment gateway</span>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
