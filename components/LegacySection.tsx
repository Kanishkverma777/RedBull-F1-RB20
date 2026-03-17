'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function LegacySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    { stat: '21/24', label: 'Race Wins', color: '#E4002B' },
    { stat: '4th', label: 'Constructors\' Title', color: '#0091FF' },
    { stat: 'Max #4', label: 'Drivers\' Championship', color: '#FFD700' },
    { stat: '18', label: 'Fastest Laps', color: '#E4002B' },
  ];

  return (
    <section id="legacy" ref={ref} className="relative py-32 lg:py-48 overflow-hidden noise-overlay">
      {/* Background orbs */}
      <div className="absolute inset-0">
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[150px] opacity-10"
          style={{
            background: 'radial-gradient(circle, #E4002B, transparent)',
            top: '10%',
            left: '-10%',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-8"
          style={{
            background: 'radial-gradient(circle, #0091FF, transparent)',
            bottom: '10%',
            right: '-5%',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <p className="text-xs tracking-[0.5em] uppercase text-white/30 mb-6 font-[var(--font-body)]">
            Season 2024 — Championship Record
          </p>
          <h2 className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-8xl font-bold mb-6">
            <span style={{ color: '#E4002B' }}>The Legacy</span>
          </h2>
          <p className="text-base sm:text-lg text-white/40 max-w-2xl mx-auto leading-relaxed font-[var(--font-body)]">
            The RB20 didn&apos;t just compete — it rewrote history. A season of relentless engineering excellence that will echo through the annals of motorsport.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-20">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-lg p-6 lg:p-8 text-center relative overflow-hidden group hover:border-white/10 transition-all duration-500"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-full" style={{ background: item.color }} />
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-[var(--font-display)] mb-2" style={{ color: item.color }}>
                {item.stat}
              </div>
              <div className="text-xs text-white/40 uppercase tracking-[0.2em] font-[var(--font-body)]">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-[var(--font-display)] font-bold text-white/80 italic leading-relaxed max-w-3xl mx-auto">
            &ldquo;This is not just a race car. It is a 798 kg theorem in carbon fibre.&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="w-8 h-[2px] bg-accent" />
            <span className="text-xs tracking-[0.3em] uppercase text-white/30 font-[var(--font-body)]">
              RB20 — Engineered to Dominate
            </span>
            <div className="w-8 h-[2px] bg-accent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
