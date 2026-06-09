/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { CASE_STUDIES, TESTIMONIALS } from "../data";
import { Check, Star, BookOpen, Clock, ArrowUpRight, TrendingUp } from "lucide-react";

export default function SuccessStories() {

  return (
    <div className="relative space-y-24 py-20 bg-brand-dark/40" id="results">
      {/* Soft overlay grids */}
      <div className="absolute inset-0 bg-[#070709] bg-[linear-gradient(to_right,#0f0f13_1px,transparent_1px),linear-gradient(to_bottom,#0f0f13_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-25" />

      {/* SUCCESS STORIES SECTION */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono tracking-wider font-extrabold uppercase border border-blue-500/15">
            📈 IMPACT WORKFLOWS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight leading-tight" id="case-study-title">
            Real Projects. Real Skills. Real Results.
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Students don't just watch videos. They learn practical systems for building websites, finding opportunities, and creating a professional digital service business.
          </p>
        </div>

        {/* 3 Case Study Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8" id="case-studies-grid">
          {CASE_STUDIES.map((study, idx) => (
            <div
              key={study.id}
              className="group relative p-6 sm:p-8 rounded-2xl bg-brand-card border border-white/5 hover:border-blue-500/30 hover:bg-[#131318] transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1"
              id={`case-card-${study.id}`}
            >
              <div className="space-y-6">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  {idx === 0 ? (
                    <div className="px-2.5 py-1 text-[9px] font-mono font-black uppercase tracking-wider rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Case Study 01 • Portfolio
                    </div>
                  ) : idx === 1 ? (
                    <div className="px-2.5 py-1 text-[9px] font-mono font-black uppercase tracking-wider rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      Case Study 02 • Streamlining
                    </div>
                  ) : (
                    <div className="px-2.5 py-1 text-[9px] font-mono font-black uppercase tracking-wider rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      Case Study 03 • Prospecting
                    </div>
                  )}
                  
                  <span className="text-gray-600 group-hover:text-blue-400 hover:scale-105 transition-all">
                    <ArrowUpRight size={16} />
                  </span>
                </div>

                {/* Card Title and Description */}
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-extrabold text-white font-display leading-tight group-hover:text-blue-400 transition-colors">
                    {study.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                    {study.description}
                  </p>
                </div>
              </div>

              {/* Card Divider & Highlights list matching visual checklist exactly */}
              <div className="mt-6 pt-6 border-t border-white/5 space-y-3.5">
                <span className="block text-[10px] font-mono uppercase tracking-widest font-black text-gray-500">
                  Key Deliverables
                </span>
                
                <ul className="space-y-2.5">
                  {study.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-center gap-2.5 text-xs text-gray-300">
                      <div className="w-4 h-4 rounded-full bg-blue-950/40 border border-blue-500/20 flex items-center justify-center shrink-0">
                        <Check size={10} className="text-blue-400" />
                      </div>
                      <span className="font-sans font-medium">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pt-12" id="testimonials">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono tracking-wider font-extrabold uppercase border border-blue-500/15">
            ⭐️ STUDENT PERSPECTIVES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight" id="testimonials-title">
            What Students Are Saying
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
            Read direct stories from individuals who have undergone the blueprint system and implemented its lessons.
          </p>
        </div>

        {/* Testimonials List Grid - Minimalist black and white cards with subtle hover animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8" id="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="group p-6 sm:p-8 rounded-2xl bg-black border border-white/10 hover:border-white/20 hover:bg-[#07070a] transition-all duration-300 flex flex-col justify-between space-y-6"
              id={`testi-card-${t.id}`}
            >
              {/* Star rating */}
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, rIdx) => (
                  <Star key={rIdx} size={14} className="text-white fill-white" />
                ))}
              </div>

              {/* Testimonial body text */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans italic text-left flex-1">
                {t.testimonial}
              </p>

              {/* Profile Card Header Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-white/5">
                <img
                  src={t.avatarUrl}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300 border border-white/10"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left min-w-0">
                  <h4 className="text-sm font-bold font-display text-white truncate">
                    {t.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-mono truncate">
                    {t.profession}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
