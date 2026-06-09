/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Users, Target, Check, ShieldCheck } from "lucide-react";
import { AUDIENCE_LIST, KEY_LEARNINGS } from "../data";

export default function Audience() {
  return (
    <section className="py-20 relative bg-brand-dark/30 border-t border-b border-white/5" id="audience">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Two-Column Audience/Learnings list matches Screenshot 5 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12" id="audience-grid-holder">
          
          {/* Left Column: Who This Course Is For */}
          <div className="space-y-6" id="block-who-for">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/15">
                <Users className="text-blue-400" size={18} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-display text-white">
                Who This Course Is For
              </h3>
            </div>
            
            <ul className="space-y-3.5 pl-1">
              {AUDIENCE_LIST.map((item) => (
                <li key={item.id} className="flex items-start gap-3 text-sm text-gray-300">
                  <Check className="text-blue-400 shrink-0 mt-0.5" size={16} />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: What You Will Learn */}
          <div className="space-y-6" id="block-what-learn">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/15">
                <Target className="text-blue-400" size={18} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-display text-white">
                What You Will Learn
              </h3>
            </div>

            <ul className="space-y-3.5 pl-1">
              {KEY_LEARNINGS.map((item) => (
                <li key={item.id} className="flex items-start gap-3 text-sm text-gray-300">
                  <Check className="text-blue-400 shrink-0 mt-0.5" size={16} />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Warning Badge Card: "This is not a get-rich-quick course." */}
        <div 
          className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden text-center max-w-3xl mx-auto space-y-3" 
          id="not-get-rich-quick-card"
        >
          {/* Subtle Ambient blue background circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex justify-center relative z-10" id="block-shield-icon">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
              <ShieldCheck size={24} />
            </div>
          </div>

          <h4 className="text-base md:text-lg font-bold text-white font-display relative z-10">
            This is not a get-rich-quick course.
          </h4>
          
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-xl mx-auto relative z-10 font-sans">
            This course teaches a real digital skill. You will learn how to build websites, create offers, find clients, and start selling website services using AI tools. Success requires action and implementation.
          </p>
        </div>

      </div>
    </section>
  );
}
