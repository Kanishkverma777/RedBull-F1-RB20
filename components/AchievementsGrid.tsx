'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Achievement {
  label: string;
  value: string;
}

export default function AchievementsGrid({ achievements, themeColor, season }: { achievements: Achievement[]; themeColor: string; season: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent, ${themeColor}08, transparent)` }} />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.5em] uppercase text-white/30 mb-4 font-[var(--font-body)]">
            Season {season} Results
          </p>
          <h3 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-white">
            Championship Record
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              <div className="glass-card rounded-lg p-6 lg:p-8 text-center hover:border-white/10 transition-all duration-500 h-full">
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-full"
                  style={{ background: themeColor }}
                />

                <div
                  className="text-2xl sm:text-3xl md:text-4xl font-bold font-[var(--font-display)] mb-2"
                  style={{ color: themeColor }}
                >
                  {achievement.value}
                </div>
                <div className="text-xs text-white/40 uppercase tracking-[0.2em] font-[var(--font-body)]">
                  {achievement.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
