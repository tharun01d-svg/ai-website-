/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Modules from "./components/Modules";
import Bonuses from "./components/Bonuses";
import Audience from "./components/Audience";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import EnrollmentModal from "./components/EnrollmentModal";
import ExitIntentModal from "./components/ExitIntentModal";
import SuccessStories from "./components/SuccessStories";
import CourseBenefits from "./components/CourseBenefits";
import FloatingEnrollBar from "./components/FloatingEnrollBar";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enrollmentPrice, setEnrollmentPrice] = useState(999);

  const openEnrollModal = () => {
    setEnrollmentPrice(999);
    setIsModalOpen(true);
  };

  const closeEnrollModal = () => {
    setIsModalOpen(false);
  };

  const handleClaimDiscount = (discountPrice: number) => {
    setEnrollmentPrice(discountPrice);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-dark overflow-x-hidden selection:bg-blue-600/30 text-gray-200 antialiased font-sans">
      
      {/* Premium Ambient Header */}
      <Header onOpenEnroll={openEnrollModal} />

      {/* Main Single-screen Long-scroll content sections sequentialized for highest conversion */}
      <main id="main-content-flow">
        
        {/* Hero Section */}
        <Hero onOpenEnroll={openEnrollModal} />

        {/* Course Core Modules Curriculum Section */}
        <Modules onOpenEnroll={openEnrollModal} />

        {/* Fast Action bonuses Package Grid Section */}
        <Bonuses onOpenEnroll={openEnrollModal} />

        {/* Success Stories & Testimonials Case Study Grid Section */}
        <SuccessStories />

        {/* Who is it for / Warning Section */}
        <Audience />

        {/* Course Core Benefits & Final Business Blueprint Call-to-action */}
        <CourseBenefits onOpenEnroll={openEnrollModal} />

        {/* Frequently Asked Questions accordion section */}
        <FAQ />

      </main>

      {/* Footer CTAs and security badges */}
      <Footer onOpenEnroll={openEnrollModal} />

      {/* Interactive multi-stage step checkout panel */}
      <EnrollmentModal isOpen={isModalOpen} onClose={closeEnrollModal} initialPrice={enrollmentPrice} />

      {/* Exit-Intent Popup System */}
      <ExitIntentModal onClaimDiscount={handleClaimDiscount} />

      {/* Dynamic Floating Scroll-to-Enroll Quick CTA Bar */}
      <FloatingEnrollBar onOpenEnroll={openEnrollModal} currentPrice={enrollmentPrice} />

    </div>
  );
}
