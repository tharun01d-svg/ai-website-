/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Lock, ArrowUpCircle } from "lucide-react";

interface FooterProps {
  onOpenEnroll: () => void;
}

export default function Footer({ onOpenEnroll }: FooterProps) {
  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black pt-20 pb-12 overflow-hidden border-t border-white/5" id="app-footer">
      {/* Background glow for the bottom CTAs */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-12">
        
        {/* Section CTA Area exact from screenshot 7 */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Start Building Your AI Website Agency Today
          </h2>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-sans">
            Get complete access to the course, prompts, templates, and client-finding system for only ₹999.
          </p>

          <div className="pt-4 flex flex-col items-center justify-center space-y-3" id="footer-enroll-section">
            <button
              onClick={onOpenEnroll}
              className="px-10 py-5 rounded-xl font-display font-black text-sm md:text-base bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 duration-200"
              id="footer-enroll-btn"
            >
              Enroll Now for ₹999 <ArrowRight size={16} />
            </button>
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500 font-mono tracking-wider">
              <Lock size={10} /> Instant secure checkout • Start studying in 2 mins
            </div>
          </div>
        </div>

        {/* Security badges & terms trust row */}
        <div className="pt-12 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-gray-500 text-xs text-sans font-medium">
          <div className="space-y-1">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider font-mono">100% Risk Free</h5>
            <p className="text-[10px] text-gray-500 text-center">Satisfaction guaranteed</p>
          </div>
          <div className="space-y-1">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider font-mono">Secure Access</h5>
            <p className="text-[10px] text-gray-500 text-center">256-Bit SSL protection</p>
          </div>
          <div className="space-y-1">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider font-mono">Lifetime Updates</h5>
            <p className="text-[10px] text-gray-500 text-center">Never pay twice</p>
          </div>
          <div className="space-y-1">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider font-mono">WhatsApp Support</h5>
            <p className="text-[10px] text-gray-500 text-center">Direct mentor line</p>
          </div>
        </div>

        {/* Bottom copyright details bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 font-sans" id="footer-bottom-bar">
          <div className="flex items-center gap-2">
            <span>© 2026 AI Website Agency. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Refund Policy: Due to the instant delivery nature of prompts and video courses, non-tangible goods are subject to standard digital refund terms. Contact support on help@aiwebsiteagency.com for queries."); }} className="hover:text-white transition-colors">Refund Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Privacy Policy: Your email and contact details are used strictly for authentication and dashboard updates. We never share or sell student databases."); }} className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Contact: Send us an email at query@aiwebsiteagency.com for instant operational support."); }} className="hover:text-white transition-colors">Client Support</a>
            <a 
              href="#" 
              onClick={handleScrollToTop} 
              className="flex items-center gap-1.5 hover:text-white transition-colors font-mono uppercase text-[10px] tracking-wider shrink-0"
              aria-label="Scroll to top"
            >
              Top <ArrowUpCircle size={14} className="text-blue-500" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
