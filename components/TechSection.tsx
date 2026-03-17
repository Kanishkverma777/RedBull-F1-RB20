'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TechSectionData {
  title: string;
  body: string;
  specHighlights: string[];
}

export default function TechSection({ techSection, themeColor, accentColor }: { techSection: TechSectionData; themeColor: string; accentColor: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-10"
        style={{
          background: `radial-gradient(circle, ${themeColor}, transparent)`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Text */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-12 h-[3px] mb-8" style={{ background: `linear-gradient(90deg, ${themeColor}, ${accentColor})` }} />
              <h3 className="font-[var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {techSection.title}
              </h3>
              <p className="text-base sm:text-lg text-white/45 leading-[1.8] font-[var(--font-body)]">
                {techSection.body}
              </p>
            </motion.div>
          </div>

          {/* Spec Highlights */}
          <div className="lg:col-span-2">
            <div className="space-y-3">
              {techSection.specHighlights.map((spec, i) => (
                <motion.div
                  key={spec}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-card rounded-lg px-5 py-4 flex items-center gap-4 group hover:border-white/10 transition-all duration-300"
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-300"
                    style={{ background: themeColor, boxShadow: `0 0 10px ${themeColor}60` }}
                  />
                  <span className="text-sm text-white/70 tracking-wide font-[var(--font-body)] group-hover:text-white/90 transition-colors">
                    {spec}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Chassis & Engine info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 pt-6 border-t border-white/5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-[1px]" style={{ background: themeColor }} />
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-[var(--font-body)]">
                  Technical DNA
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
