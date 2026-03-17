'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface CtaSectionData {
  price: string;
  unit: string;
  tagline: string;
  deliveryNote: string;
}

export default function CtaSection({ ctaSection, themeColor, carName }: { ctaSection: CtaSectionData; themeColor: string; carName: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden group"
        >
          {/* Decorative glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: `radial-gradient(ellipse at center, ${themeColor}10 0%, transparent 70%)`,
            }}
          />

          {/* Top accent */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${themeColor}, transparent)` }}
          />

          <div className="relative z-10">
            <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6 font-[var(--font-body)]">
              {carName} Collection
            </p>

            <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-white mb-2">
              {ctaSection.tagline}
            </h3>

            <div className="flex items-baseline justify-center gap-2 my-8">
              <span
                className="text-4xl sm:text-5xl md:text-6xl font-bold font-[var(--font-display)]"
                style={{ color: themeColor }}
              >
                {ctaSection.price}
              </span>
            </div>

            <p className="text-sm text-white/50 mb-2 font-[var(--font-body)]">
              {ctaSection.unit}
            </p>
            <p className="text-xs text-white/30 mb-8 font-[var(--font-body)]">
              {ctaSection.deliveryNote}
            </p>

            <button
              className="relative inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.3em] uppercase font-semibold text-white rounded-sm overflow-hidden group/btn transition-all duration-300 hover:scale-105 font-[var(--font-body)]"
              style={{ background: themeColor }}
            >
              <span className="relative z-10">Pre-Order Now</span>
              <svg className="relative z-10 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              {/* Button hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: `0 0 40px ${themeColor}40` }}
              />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
