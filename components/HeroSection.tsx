'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden noise-overlay">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
        style={{ backgroundImage: 'url(/background.png)' }}
      />
      
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[120px] animate-float"
          style={{
            background: 'radial-gradient(circle, #E4002B 0%, transparent 70%)',
            top: '-20%',
            right: '-10%',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #0091FF 0%, transparent 70%)',
            bottom: '-15%',
            left: '-5%',
            animation: 'float 8s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[80px]"
          style={{
            background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'float 10s ease-in-out infinite',
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs sm:text-sm tracking-[0.5em] uppercase text-white/40 mb-6 font-[var(--font-body)]">
            Oracle Red Bull Racing · 2024 Season
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-[var(--font-display)] text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold leading-[0.85] mb-6"
        >
          <span className="block" style={{ color: '#E4002B' }}>RB20</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-xl text-white max-w-xl mx-auto mb-4 font-[var(--font-body)] leading-relaxed"
        >
          Unbeatable in every condition.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm text-white max-w-md mx-auto mb-12 font-[var(--font-body)]"
        >
          Honda RBPTH002 1.6L V6 Hybrid · 1000+ HP · 365 km/h · 798 kg
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#overview"
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-xs tracking-[0.3em] uppercase font-semibold text-white overflow-hidden rounded-sm font-[var(--font-body)]"
          >
            <span
              className="absolute inset-0 rounded-sm transition-all duration-500 group-hover:scale-105"
              style={{ background: '#141452ff' }}
            />
            <span className="relative z-10">Explore the RB20</span>
            <svg className="relative z-10 w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
