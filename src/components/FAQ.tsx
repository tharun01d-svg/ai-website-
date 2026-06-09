/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { FAQS } from "../data";
import { motion, AnimatePresence } from "motion/react";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 relative" id="faq">
      <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_10%_80%,rgba(37,99,235,0.02),transparent)] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Title */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono tracking-wider font-extrabold uppercase border border-blue-500/15">
            💭 HAVE QUESTIONS?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight text-center" id="faq-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto text-center leading-relaxed">
            Quick, straightforward answers to help you evaluate if this course matches your agency ambitions.
          </p>
        </div>

        {/* Accordion List exactly matching the look from screenshot 6 */}
        <div className="border-t border-white/5 divide-y divide-white/5" id="faq-accordions">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                className="py-4 md:py-5"
                id={`faq-item-${faq.id}`}
              >
                {/* Accordion Trigger Button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between gap-4 text-left py-2 font-display text-base md:text-lg font-bold text-gray-200 hover:text-white transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                  id={`faq-trigger-${faq.id}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-blue-500 font-mono text-sm tracking-widest block opacity-70">
                      ?
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <span className="text-gray-400 shrink-0">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>

                {/* Animated Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                      id={`faq-content-${faq.id}`}
                    >
                      <div className="pt-2.5 pb-4 pl-8 pr-4 text-xs md:text-sm text-gray-400 font-sans leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
