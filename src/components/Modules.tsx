/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MODULES } from "../data";
import { Sparkles } from "lucide-react";

interface ModulesProps {
  onOpenEnroll: () => void;
}

export default function Modules({ onOpenEnroll }: ModulesProps) {
  // Let's sum up total monetary valuation for high anchor value calculation
  const totalValue = MODULES.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="py-20 bg-brand-dark/50 border-t border-b border-white/5 relative" id="curriculum">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-950/5 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading matching screenshot */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight leading-tight max-w-3xl mx-auto" id="modules-main-heading">
            Everything Included Inside The AI Website Agency Blueprint
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed" id="modules-subheadline">
            Get lifetime access to the complete blueprint, templates, systems, frameworks, and future updates.
          </p>
        </div>

        {/* Modules List Grid matching visual screenshot design */}
        <div className="space-y-4" id="modules-list">
          {MODULES.map((mod) => (
            <div 
              key={mod.id}
              className="relative p-6 md:p-8 rounded-2xl bg-[#0f0f13] border border-white/5 hover:border-blue-500/15 hover:bg-[#121217] transition-all group duration-200"
              id={`module-card-${mod.id}`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                {/* Module Left Content block */}
                <div className="space-y-2 md:max-w-2xl">
                  <span className="text-[10px] md:text-xs font-black font-mono text-blue-500 tracking-widest block uppercase">
                    {mod.moduleNumber}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white font-display group-hover:text-blue-400 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans">
                    {mod.description}
                  </p>
                </div>

                {/* Module Right Value panel */}
                <div className="flex md:flex-col items-baseline md:items-end justify-between border-t border-white/5 md:border-0 pt-4 md:pt-0 shrink-0 font-mono">
                  <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-semibold">
                    Value
                  </span>
                  <span className="text-lg md:text-xl font-black text-white group-hover:text-amber-400 transition-colors mt-0.5">
                    ₹{mod.value.toLocaleString()}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Pricing Callout card with high value anchor */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-b from-blue-950/20 to-black/40 border border-blue-500/15 relative overflow-hidden text-center space-y-6" id="pricing-curriculum-anchor">
          <div className="absolute inset-0 bg-blue-500/[0.02] pointer-events-none" />
          
          <div className="space-y-1.5 relative z-10">
            <span className="text-xs uppercase font-mono tracking-widest font-black text-blue-400">Launch Enrollment Package</span>
            <h4 className="text-2xl md:text-3xl font-extrabold text-white font-display">Get Full Course Access</h4>
            <p className="text-xs text-gray-400">Includes all 7 modular systems, scripts, client files, and 24/7 student guidance.</p>
          </div>

          <div className="flex items-center justify-center gap-4 py-2 relative z-10">
            <div className="text-center scale-90">
              <span className="block text-[10px] uppercase font-mono text-gray-500 tracking-wide font-medium">Standard Value</span>
              <span className="text-lg text-gray-500 line-through font-mono font-medium">₹{totalValue.toLocaleString()}</span>
            </div>
            <div className="w-1 px-0.5 h-10 bg-white/10 rounded" />
            <div className="text-center font-display">
              <span className="block text-[10px] uppercase font-mono text-blue-400 tracking-widest font-black">Today's Launch Deal</span>
              <span className="text-3xl md:text-4xl font-black text-white font-mono">₹999</span>
            </div>
          </div>

          <div className="relative z-10 max-w-sm mx-auto">
            <button 
              onClick={onOpenEnroll}
              className="w-full py-4 px-8 rounded-xl font-display font-black text-xs md:text-sm bg-blue-600 hover:bg-blue-700 active:transform active:scale-[0.99] text-white flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg shadow-blue-500/20"
              id="curriculum-cta-btn"
            >
              Enroll Now for Only ₹999 <Sparkles size={14} className="animate-pulse" />
            </button>
            <p className="text-[10px] text-gray-500 font-mono tracking-wider mt-3">⚡ Original price returns soon. Risk-free lifetime access.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
