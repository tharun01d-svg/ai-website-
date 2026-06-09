/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleItem, BonusItem, FAQItem, TrustPoint, AudienceItem, KeyLearningItem, CaseStudyItem, TestimonialItem, BenefitItem } from "./types";

export const TRUST_POINTS: TrustPoint[] = [
  { id: "tp1", text: "Beginner friendly" },
  { id: "tp2", text: "No coding required" },
  { id: "tp3", text: "Step-by-step video training" },
  { id: "tp4", text: "Prompt templates included" },
  { id: "tp5", text: "Client finding system included" }
];

export const MODULES: ModuleItem[] = [
  {
    id: "m1",
    moduleNumber: "MODULE 01",
    title: "Agency Foundation Framework",
    description: "Learn how the AI website business model works, what services to sell, how to position yourself, and how to start professionally.",
    value: 999
  },
  {
    id: "m2",
    moduleNumber: "MODULE 02",
    title: "Website Creation System",
    description: "Learn how to build premium, complete websites using AI tools from start to finish without coding in under 2 hours.",
    value: 1499
  },
  {
    id: "m3",
    moduleNumber: "MODULE 03",
    title: "Premium Prompt Vault",
    description: "Access battle-tested prompts for tattoo studios, gyms, salons, clinics, coaches, hotels, and multiple local business niches.",
    value: 1999
  },
  {
    id: "m4",
    moduleNumber: "MODULE 04",
    title: "Portfolio Building Blueprint",
    description: "Learn how to create high-converting demo projects, case studies, and a professional portfolio that automatically attracts premium clients.",
    value: 999
  },
  {
    id: "m5",
    moduleNumber: "MODULE 05",
    title: "Client Acquisition System",
    description: "Learn how to find businesses without websites using Google Maps, Instagram, AI tools, and smart online research methods.",
    value: 2499
  },
  {
    id: "m6",
    moduleNumber: "MODULE 06",
    title: "Outreach & Closing Framework",
    description: "Get professional, battle-tested templates for WhatsApp, Instagram DM scripts, cold emails, and powerful objection handling scripts.",
    value: 999
  },
  {
    id: "m7",
    moduleNumber: "MODULE 07",
    title: "Delivery & Scaling System",
    description: "Learn how to price websites, collect advance payments safely, deliver assets, and charge recurring monthly maintenance.",
    value: 1999
  }
];

export const BONUSES: BonusItem[] = [
  {
    id: "b1",
    bonusNumber: "BONUS #1",
    title: "Premium Website Prompt Collection",
    description: "25+ copy-paste prompts tailored for tattoo, gym, salon, clinic, and coach websites to generate instant stunning results.",
    value: 999,
    iconType: "lightning"
  },
  {
    id: "b2",
    bonusNumber: "BONUS #2",
    title: "Client Outreach Script Library",
    description: "Complete outreach message templates for WHatsApp, Instagram DM, and cold email scripts designed to secure responses.",
    value: 499,
    iconType: "chat"
  },
  {
    id: "b3",
    bonusNumber: "BONUS #3",
    title: "Website Pricing Framework",
    description: "Exact step-by-step breakdown on how to quote projects, structure package tiers, and upsell monthly support contracts.",
    value: 499,
    iconType: "chart"
  },
  {
    id: "b4",
    bonusNumber: "BONUS #4",
    title: "Agency Launch Checklist",
    description: "Interactive launch roadmap, Google Sheets Client Lead Tracker, case study templates, and monthly support agreement contracts.",
    value: 499,
    iconType: "checklist"
  }
];

export const AUDIENCE_LIST: AudienceItem[] = [
  { id: "a1", text: "Students looking to build an income stream side-by-side with college" },
  { id: "a2", text: "Beginners wanting to learn a real, high-demand technical skill without coding" },
  { id: "a3", text: "Freelancers looking to add highly profitable new services to their offerings" },
  { id: "a4", text: "Video editors and Designers who want to expand into web agency business models" },
  { id: "a5", text: "Anyone who wants to start a highly scalable digital service business from their laptop" },
  { id: "a6", text: "People who want to harness the power of AI to sell automated website solutions" }
];

export const KEY_LEARNINGS: KeyLearningItem[] = [
  { id: "kl1", text: "How to build high-converting websites using top-tier AI tools with zero coding skills" },
  { id: "kl2", text: "How to write premium AI prompts that build tailored sections, copywriting, and graphics" },
  { id: "kl3", text: "How to create attractive demo websites to showcase as highly professional work" },
  { id: "kl4", text: "How to source local and international businesses who are currently lacking modern websites" },
  { id: "kl5", text: "How to customize and send high-conversion messages that grab decision-makers' attention" },
  { id: "kl6", text: "How to handle client objections, close deals on Zoom calls, and lock in upfront fees" },
  { id: "kl7", text: "How to pitch and charge clients recurring monthly retainers for simple web maintenance" }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq1",
    question: "Do I need coding?",
    answer: "No. You don't need to know HTML, CSS, JavaScript, or any coding language. This entire business uses modern visual-builder AI systems to make website creation quick, robust, and beginner-friendly."
  },
  {
    id: "faq2",
    question: "Can I start with a low budget?",
    answer: "Yes, you can absolutely get started using entirely free or low-cost AI tools. We will teach you how to set up professional websites using accessible applications and tools that require minimal overhead."
  },
  {
    id: "faq3",
    question: "Will I get prompt templates?",
    answer: "Yes, you will receive our complete, copy-paste prompt vault designed to generate complete structures, copies, and configurations for tattoo studios, clinics, salons, gyms, personal coaches, and other local service providers."
  },
  {
    id: "faq4",
    question: "Can I sell websites after learning?",
    answer: "Yes, this course is designed specifically to translate theory into earnings. We walk you through building a high-value active portfolio, sourcing hot leads without cold calling, communicating with owners, and closing deals."
  },
  {
    id: "faq5",
    question: "Is this course built for students?",
    answer: "Yes! There are no prerequisites. It fits perfectly in the schedule of a student, beginner, or full-time employee who wants to dedicate an hour or two on weekends to build a profitable agency pipeline."
  }
];

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "cs1",
    headline: "From Zero Portfolio to Professional Website Projects",
    description: "Learn how students created professional websites using AI-powered workflows and modern design systems.",
    highlights: [
      "Built premium websites faster",
      "Created professional portfolios",
      "Learned client-ready workflows",
      "Developed valuable digital skills"
    ]
  },
  {
    id: "cs2",
    headline: "Website Creation in Hours, Not Weeks",
    description: "Using the blueprint, students learn how to streamline website creation using AI tools, proven prompts, and structured workflows.",
    highlights: [
      "Faster project completion",
      "Better design quality",
      "Improved workflow efficiency",
      "Professional project delivery"
    ]
  },
  {
    id: "cs3",
    headline: "Building a Client Acquisition System",
    description: "Students learn how to identify opportunities, research businesses, create outreach systems, and develop a repeatable process for finding potential clients.",
    highlights: [
      "Better prospect research",
      "Professional outreach",
      "Lead generation systems",
      "Business development skills"
    ]
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    name: "Aarav Sharma",
    profession: "Freelance Designer & Content Developer",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    testimonial: "The website creation modules alone are worth 5x the price of this course. Being able to build an elegant salon website in under 2 hours without typing a single line of code is surreal. Highly recommended!",
    rating: 5
  },
  {
    id: "t2",
    name: "Priya Patel",
    profession: "College Student (BTech)",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    testimonial: "As a college student, I wanted a clear, actionable way to earn money in my free time. The Google Maps lead capture framework taught here is incredibly practical. I've already set up my active demo portfolio!",
    rating: 5
  },
  {
    id: "t3",
    name: "Vikram Malhotra",
    profession: "Social Media Consultant",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    testimonial: "The copy-paste Whatsapp outreach scripts and objection handling structures are stellar. This blueprint doesn't just teach you how to make websites; it equips you with the exact strategies needed to find clients.",
    rating: 5
  }
];

export const COURSE_BENEFITS: BenefitItem[] = [
  {
    id: "b_f1",
    title: "Learn a High-Income Digital Skill",
    description: "Develop practical website creation skills using modern AI tools and workflows."
  },
  {
    id: "b_f2",
    title: "Build Websites Faster",
    description: "Use proven frameworks and prompts to reduce time spent on design and development."
  },
  {
    id: "b_f3",
    title: "Create a Professional Portfolio",
    description: "Build real projects that demonstrate your skills and help establish credibility."
  },
  {
    id: "b_f4",
    title: "Understand Client Acquisition",
    description: "Learn research, outreach, and positioning strategies for finding business opportunities."
  },
  {
    id: "b_f5",
    title: "Access Ready-To-Use Systems",
    description: "Get templates, prompts, scripts, frameworks, and business resources."
  },
  {
    id: "b_f6",
    title: "Learn Modern AI Workflows",
    description: "Understand how AI can be used to improve productivity and streamline website creation."
  },
  {
    id: "b_f7",
    title: "Build a Repeatable Process",
    description: "Follow a structured blueprint instead of guessing what to do next."
  },
  {
    id: "b_f8",
    title: "Lifetime Access",
    description: "Revisit lessons, templates, and resources whenever needed."
  }
];

