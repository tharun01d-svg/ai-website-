/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ModuleItem {
  id: string;
  moduleNumber: string;
  title: string;
  description: string;
  value: number;
}

export interface BonusItem {
  id: string;
  bonusNumber: string;
  title: string;
  description: string;
  value: number;
  iconType: "lightning" | "chat" | "chart" | "checklist" | "sheet" | "doc";
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TrustPoint {
  id: string;
  text: string;
}

export interface AudienceItem {
  id: string;
  text: string;
}

export interface KeyLearningItem {
  id: string;
  text: string;
}

export interface CaseStudyItem {
  id: string;
  headline: string;
  description: string;
  highlights: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  profession: string;
  avatarUrl: string;
  testimonial: string;
  rating: number;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
}

