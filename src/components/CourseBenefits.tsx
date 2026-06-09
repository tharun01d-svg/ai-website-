/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { COURSE_BENEFITS } from "../data";
import { 
  Sparkles, 
  Zap, 
  Briefcase, 
  Target, 
  Layers, 
  Cpu, 
  Repeat, 
  Key, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

interface CourseBenefitsProps {
  onOpenEnroll: () => void;
}

export default function CourseBenefits({ onOpenEnroll }: CourseBenefitsProps) {
  // Map benefit index to a beautiful Lucide icon for variety and precision
  const getBenefitIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Sparkles className="text-blue-400" size={18} />;
      case 1:
        return <Zap className="text-blue-400" size={18} />;
      case 2:
        return <Briefcase className="text-blue-400" size={18} />;
      case 3:
        return <Target className="text-blue-400" size={18} />;
      case 4:
        return <Layers className="text-blue-400" size={18} />;
      case 5:
        return <Cpu className="text-blue-400" size={18} />;
      case 6:
        return <Repeat className="text-blue-400" size={18} />;
      case 7:
        return <Key className="text-blue-400" size={18} />;
      default:
        return <Sparkles className="text-blue-400" size={18} />;
    }
  };

  return (
    <div className="relative py-20 bg-brand-dark/25 border-t border-b border-white/5 overflow-hidden" id="benefits">
      
      {/* Background Radial Ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* COURSE BENEFITS GRID (8 items) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono tracking-wider font-extrabold uppercase border border-blue-500/15">
            🎁 WHAT YOU RECEIVE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight leading-tight" id="benefits-title">
            What You'll Gain From This Program
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
            The core strategic outcomes designed to level up your technology and outreach capabilities.
          </p>
        </div>

        {/* 8-column visual bento grid / list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="benefits-grid">
          {COURSE_BENEFITS.map((benefit, idx) => (
            <div
              key={benefit.id}
              className="group p-6 rounded-2xl bg-[#0e0e12] border border-white/5 hover:border-blue-500/20 hover:bg-[#111116] transition-all duration-200 flex flex-col justify-between space-y-4"
              id={`benefit-item-${benefit.id}`}
            >
              <div className="space-y-3">
                {/* Clean Top Row: Icon inside subtle frame */}
                <div className="w-10 h-10 rounded-xl bg-blue-950/40 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-600/10 group-hover:border-blue-500/35 transition-all">
                  {getBenefitIcon(idx)}
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white font-display group-hover:text-blue-400 transition-colors">
                  {benefit.title}
                </h3>
                
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  {benefit.description}
                </p>
              </div>

              {/* Decorative Subtle indicator counter block */}
              <div className="pt-2 text-[10px] font-mono text-gray-600 uppercase font-semibold">
                Outcome #0{idx + 1}
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* FINAL BENEFIT OUTCOME HERO SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 relative z-10" id="final-benefit-hero">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-tr from-[#0b0b0e] via-[#101015] to-[#14141c] border border-white/10 relative overflow-hidden box-glow">
          
          {/* Subtle line background details */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.06),transparent_50%)] pointer-events-none" />

          <div className="relative z-10 text-center space-y-8 max-w-2xl mx-auto">
            
            {/* Soft Label Emblem */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full text-white text-[11px] font-semibold border border-white/10">
                <ShieldCheck size={13} className="text-blue-400 animate-pulse" /> Direct Video Syllabus & Payload Sheets Included
              </div>
            </div>

            {/* Content Header Title and description matching request */}
            <div className="space-y-4">
              <h3 className="text-3xl sm:text-4xl font-extrabold font-display leading-[1.12] text-white tracking-tight">
                More Than A Course. <br className="hidden sm:inline" />
                <span className="text-white">A Complete </span>
                <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent drop-shadow-sm font-black">
                  Business Blueprint.
                </span>
              </h3>
              
              <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
                This program combines website creation, AI workflows, portfolio development, client acquisition systems, outreach frameworks, and business processes into one structured learning experience designed for practical implementation.
              </p>
            </div>

            {/* Direct large trigger CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenEnroll}
                className="group relative w-full sm:w-auto px-8 py-4.5 rounded-xl font-display font-black text-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0"
                id="final-benefit-cta"
              >
                Start Building Your Skills Today
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p className="text-[10px] text-gray-500 font-mono tracking-wider">
              No subscription fee • ₹999 for complete layout packs & lifetime modules code updates
            </p>

          </div>
        </div>
      </section>

    </div>
  );
}
