/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FloatingEnrollBarProps {
  onOpenEnroll: () => void;
  currentPrice: number;
}

export default function FloatingEnrollBar({ onOpenEnroll, currentPrice }: FloatingEnrollBarProps) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls down more than 400 pixels
      if (window.scrollY > 400) {
        setShouldShow(true);
      } else {
        setShouldShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-1/2 md:right-auto md:w-[640px] md:-translate-x-1/2 z-40"
          id="floating-enroll-bar"
        >
          {/* Main glass-morphism container with high design contrast */}
          <div className="relative overflow-hidden bg-brand-card/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-2xl shadow-blue-500/10 box-glow">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600" />
            
            {/* Core Labeling / Price left-side */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="text-left select-none truncate">
                <h4 className="text-xs font-bold text-white truncate font-display flex items-center gap-1.5 leading-none">
                  AI Website Agency Blueprint
                </h4>
                <div className="flex items-baseline gap-1.5 mt-1 font-mono">
                  <span className="text-[10px] text-gray-500 line-through">₹12,999</span>
                  <span className="text-sm font-black text-white">₹{currentPrice}</span>
                  {currentPrice === 799 ? (
                    <span className="text-[9px] text-emerald-400 font-extrabold uppercase px-1 rounded bg-emerald-500/10 border border-emerald-500/20 tracking-wider">
                      Exit-Deal Secured
                    </span>
                  ) : (
                    <span className="text-[9px] text-blue-400 font-extrabold uppercase px-1 rounded bg-blue-500/10 border border-blue-500/15 tracking-wider">
                      Launch price
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* CTA action button right-side */}
            <button
              onClick={onOpenEnroll}
              className="px-5 py-2.5 rounded-xl font-display font-black text-xs bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-blue-500/20 shrink-0"
              id="btn-floating-enroll-cta"
            >
              Enroll Now <ArrowRight size={13} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
