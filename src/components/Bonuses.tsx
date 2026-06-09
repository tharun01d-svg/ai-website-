/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BONUSES } from "../data";
import { Zap, MessageSquare, TrendingUp, ClipboardCheck, Lock } from "lucide-react";

interface BonusesProps {
  onOpenEnroll: () => void;
}

export default function Bonuses({ onOpenEnroll }: BonusesProps) {
  // Map our icon kinds to actual Lucide TSX elements
  const renderIcon = (type: string) => {
    switch (type) {
      case "lightning":
        return <Zap className="text-blue-400" size={20} />;
      case "chat":
        return <MessageSquare className="text-blue-400" size={20} />;
      case "chart":
        return <TrendingUp className="text-blue-400" size={20} />;
      case "checklist":
        return <ClipboardCheck className="text-blue-400" size={20} />;
      default:
        return <Zap className="text-blue-400" size={20} />;
    }
  };

  return (
    <section className="py-20 relative bg-black/40" id="bonuses">
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(37,99,235,0.03),transparent)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono tracking-wider font-extrabold uppercase border border-blue-500/15">
            🔑 FREE VALUE INCLUDED
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight text-center" id="bonuses-main-heading">
            Exclusive Fast-Action Bonuses
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto text-center font-sans leading-relaxed">
            Enroll right now during our introductory window to claim four complimentary agency acceleration toolkits worth ₹2,496.
          </p>
        </div>

        {/* 2x2 Grid exactly matching visual hierarchy in screenshot 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12" id="bonuses-grid">
          {BONUSES.map((bonus) => (
            <div 
              key={bonus.id}
              className="group p-5 rounded-2xl bg-[#0f0f13] border border-white/5 hover:border-blue-500/15 hover:bg-[#121217] transition-all flex items-start gap-4 duration-200"
              id={`bonus-card-${bonus.id}`}
            >
              {/* Left Column: Styled Icon Circle Container */}
              <div className="w-12 h-12 rounded-xl bg-blue-950/40 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-md group-hover:bg-blue-600/10 group-hover:border-blue-400/40 transition-colors">
                {renderIcon(bonus.iconType)}
              </div>

              {/* Right Column: Text content hierarchy matches screenshot details */}
              <div className="space-y-1.5 flex-1 select-none">
                <div className="flex items-center justify-between text-[10px] md:text-xs font-semibold font-mono tracking-wider text-blue-500 uppercase">
                  <span>{bonus.bonusNumber}</span>
                  <span className="text-gray-400 font-mono font-medium lowercase">
                    value <span className="font-bold text-white uppercase">₹{bonus.value}</span>
                  </span>
                </div>
                <h4 className="text-sm md:text-base font-bold text-white group-hover:text-blue-400 transition-colors font-display">
                  {bonus.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  {bonus.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Action Prompt */}
        <div className="text-center pt-2">
          <p className="text-xs text-gray-500 font-sans mb-4 flex items-center justify-center gap-1.5">
            <Lock size={12} className="text-blue-500 animate-pulse" /> All four bonuses are loaded instantly into your workspace upon successful signup.
          </p>
          <button 
            onClick={onOpenEnroll}
            className="px-8 py-4 rounded-xl text-xs font-extrabold tracking-wide uppercase bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all cursor-pointer hover:border-white/20 active:transform active:scale-95"
            id="bonuses-cta-btn"
          >
            Access All Bonuses for ₹999
          </button>
        </div>

      </div>
    </section>
  );
}
