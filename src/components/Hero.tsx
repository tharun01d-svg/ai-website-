/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, ArrowRight, ShieldCheck, Zap, Layers, Gift, FileText, CheckCircle2 } from "lucide-react";
import { TRUST_POINTS } from "../data";

interface HeroProps {
  onOpenEnroll: () => void;
}

export default function Hero({ onOpenEnroll }: HeroProps) {
  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden ambient-glow" id="hero-section">
      {/* Visual Radial Glow Background Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f13_1px,transparent_1px),linear-gradient(to_bottom,#0f0f13_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Launch Offer Badge */}
        <div className="inline-flex items-center justify-center" id="badge-launch-container">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-950/40 border border-blue-500/30 text-[11px] md:text-xs text-blue-300 font-semibold tracking-wide shadow-lg shadow-blue-900/10 hover:border-blue-500/50 transition-colors">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Limited Launch Offer — Total Value ₹12,999+, Today Only ₹999
          </div>
        </div>

        {/* Hero Title Content */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-display tracking-tight text-white leading-[1.1] md:leading-[1.08] max-w-4xl mx-auto" id="hero-main-title">
          Build Websites With <br className="hidden sm:inline" />
          <span className="text-white">AI & </span>
          <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-400 bg-clip-text text-transparent drop-shadow-sm font-black">
            Start Your Own <br className="hidden sm:inline" />
            Agency
          </span>
        </h1>

        {/* Hero Subheadline */}
        <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed" id="hero-subheadline">
          Learn how to create premium websites, write powerful AI prompts, find clients, and sell website services — even if you are a beginner.
        </p>

        {/* CTA Area */}
        <div className="pt-2 flex flex-col items-center justify-center space-y-4" id="hero-cta-group">
          <button
            onClick={onOpenEnroll}
            className="group relative w-full sm:w-auto px-10 py-5 rounded-xl font-display font-black text-sm md:text-base bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 duration-200 border border-blue-400/30"
            id="hero-cta-button"
          >
            Get Instant Access for ₹999
            <ArrowRight size={18} className="text-white transform group-hover:translate-x-1.5 transition-transform duration-200" />
            <div className="absolute inset-0 -z-10 rounded-xl bg-blue-600 blur opacity-30 group-hover:opacity-60 transition-opacity" />
          </button>
          
          <p className="text-xs text-gray-500 font-mono tracking-wide">
            🔥 Limited launch offer — course original value ₹12,999, today only ₹999
          </p>
        </div>

        {/* Trust Points Badges Row */}
        <div 
          className="relative mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-b from-blue-950/35 via-blue-950/10 to-transparent border border-blue-500/25 shadow-2xl shadow-blue-500/10 overflow-hidden group/trust" 
          id="hero-trust-row"
        >
          {/* Subtle neon top indicator line and background glow */}
          <div className="absolute top-0 left-1/6 right-1/6 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-90" />
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-24 bg-blue-500/15 blur-3xl rounded-full pointer-events-none" />

          <p className="text-[10px] md:text-[11px] font-mono font-black text-blue-400 uppercase tracking-widest mb-5 flex items-center justify-center gap-2">
            <Zap size={13} className="text-blue-400 animate-pulse" />
            Everything Required Built For Success
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 max-w-4xl mx-auto relative z-10">
            {TRUST_POINTS.map((point) => (
              <div 
                key={point.id}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-blue-950/40 hover:bg-blue-900/40 border border-blue-500/15 hover:border-blue-400/40 transition-all duration-300 text-xs md:text-sm font-semibold text-white shadow-lg shadow-black/35 hover:scale-[1.03] select-none hover:shadow-blue-500/5"
              >
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/30 shrink-0">
                  <CheckCircle2 size={12} className="text-blue-300" />
                </div>
                <span className="tracking-wide">{point.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fast Value overview snippet cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 text-center max-w-4xl mx-auto">
          <div className="p-3.5 rounded-xl bg-[#0e0e12] border border-white/5">
            <div className="text-xl md:text-2xl font-black text-white">7</div>
            <div className="text-[10px] text-gray-500 uppercase font-mono mt-0.5">Core Modules</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0e0e12] border border-white/5">
            <div className="text-xl md:text-2xl font-black text-white">25+</div>
            <div className="text-[10px] text-gray-500 uppercase font-mono mt-0.5">AI Website Prompts</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0e0e12] border border-white/5">
            <div className="text-xl md:text-2xl font-black text-white">10k+</div>
            <div className="text-[10px] text-gray-500 uppercase font-mono mt-0.5">Active Value Value</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0e0e12] border border-white/5">
            <div className="text-xl md:text-2xl font-black text-white">₹999</div>
            <div className="text-[10px] text-blue-400 font-mono font-bold uppercase mt-0.5">Launch Deal</div>
          </div>
        </div>

      </div>
    </section>
  );
}
