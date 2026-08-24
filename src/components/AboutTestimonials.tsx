"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export default function AboutTestimonials() {
  const [startIndex, setStartIndex] = useState(0);

  const mappedTestimonials = TESTIMONIALS.map(t => ({
    name: t.name,
    role: t.role,
    text: t.content,
    rating: t.rating || 5,
    initial: t.name ? t.name.charAt(0) : "A",
    image: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150"
  }));

  // Custom avatars
  const customImages = [
    "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150",
    "https://images.pexels.com/photos/842567/pexels-photo-842567.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150",
    "https://images.pexels.com/photos/1212901/pexels-photo-1212901.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150",
    "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150",
    "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150",
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150"
  ];

  const testWithImages = mappedTestimonials.map((t, i) => ({
    ...t,
    image: customImages[i % customImages.length]
  }));

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % testWithImages.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + testWithImages.length) % testWithImages.length);
  };

  // Limit to max 6 reviews (2 lines of 3 columns)
  const visibleTestimonials = Array.from({ length: Math.min(6, testWithImages.length) }).map((_, i) => {
    const idx = (startIndex + i) % testWithImages.length;
    return testWithImages[idx];
  });

  return (
    <section className="py-20 bg-[#F8F9FC] border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Success Stories</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D2073] mt-2">What Our Global Community Says</h2>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-gold hover:text-gold flex items-center justify-center transition-all shadow-sm text-navy hover:shadow-md cursor-pointer font-bold"
              aria-label="Previous Testimonials"
            >
              &larr;
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-gold hover:text-gold flex items-center justify-center transition-all shadow-sm text-navy hover:shadow-md cursor-pointer font-bold"
              aria-label="Next Testimonials"
            >
              &rarr;
            </button>
          </div>
        </div>

        {/* Testimonials Grid (Max 2 lines, 6 cards) */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch mb-12">
          {visibleTestimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex text-gold mb-4">
                  {[...Array(t.rating)].map((_, rIdx) => (
                    <Star key={rIdx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic mb-6">&ldquo;{t.text}&rdquo;</p>
              </div>

              <div className="flex items-center gap-3 border-t border-gray-100 pt-5 mt-auto">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-gold shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <h5 className="font-extrabold text-[#0D2073] text-sm truncate">{t.name}</h5>
                  <p className="text-xs text-gray-400 truncate">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
