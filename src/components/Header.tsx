/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, ArrowRight } from "lucide-react";

interface HeaderProps {
  onOpenEnroll: () => void;
}

export default function Header({ onOpenEnroll }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-brand-dark/80 backdrop-blur-md border-b border-white/5 transition-all" id="app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group" id="header-brand-logo">
          <div>
            <span className="text-sm font-black font-display tracking-tight text-white block">AI Website Agency</span>
          </div>
        </a>

        {/* Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wide uppercase text-gray-400" id="header-nav">
          <a href="#curriculum" className="hover:text-white transition-colors hover:underline underline-offset-4">Curriculum</a>
          <a href="#bonuses" className="hover:text-white transition-colors hover:underline underline-offset-4">Bonuses</a>
          <a href="#audience" className="hover:text-white transition-colors hover:underline underline-offset-4">Who is it for?</a>
          <a href="#faq" className="hover:text-white transition-colors hover:underline underline-offset-4">FAQ</a>
        </nav>

        {/* Mini CTA */}
        <div className="flex items-center gap-3">
          <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/15">
            <Sparkles size={10} className="animate-pulse" /> Launch Offer ₹999
          </span>
          <button 
            onClick={onOpenEnroll}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-display font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 active:transform active:scale-95"
            id="header-cta-enroll"
          >
            Enroll Now <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </header>
  );
}
