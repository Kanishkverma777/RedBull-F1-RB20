'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface Driver {
  name: string;
  number: string;
  nationality: string;
  imageUrl?: string;
  description?: string;
}

export default function DriverCard({ driver, themeColor, delay = 0 }: { driver: Driver; themeColor: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card rounded-lg p-6 lg:p-8 group relative overflow-hidden hover:border-white/10 transition-all duration-500"
    >
      {/* Large number background */}
      <div
        className="absolute -right-4 -top-4 text-[120px] font-[var(--font-display)] font-black leading-none opacity-[0.04] select-none group-hover:opacity-[0.08] transition-opacity duration-500"
        style={{ color: themeColor }}
      >
        {driver.number}
      </div>

      <div className="relative z-10 w-[85%] sm:w-[60%]">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-[var(--font-display)] text-white"
            style={{ background: `${themeColor}30`, border: `1px solid ${themeColor}50` }}
          >
            #{driver.number}
          </div>
          <div
            className="px-2 py-0.5 rounded text-[10px] tracking-[0.2em] uppercase font-semibold"
            style={{ background: `${themeColor}15`, color: themeColor }}
          >
            {driver.nationality}
          </div>
        </div>

        <h4 className="font-[var(--font-display)] text-xl sm:text-2xl font-bold text-white mb-3">
          {driver.name}
        </h4>
        
        {driver.description && (
          <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-[var(--font-body)] mb-6">
            {driver.description}
          </p>
        )}

        <div className="flex items-center gap-2">
          <div className="w-8 h-[2px]" style={{ background: themeColor }} />
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-[var(--font-body)]">
            Race Driver
          </span>
        </div>
      </div>

      {/* Driver Image */}
      {driver.imageUrl && (
        <div className="absolute top-0 right-0 h-full w-[90%] sm:w-2/3 opacity-80 mix-blend-screen pointer-events-none group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent z-10" />
          <Image
            src={driver.imageUrl}
            alt={driver.name}
            width={600}
            height={800}
            className="w-full h-full object-cover object-top filter grayscale contrast-125 brightness-110 group-hover:grayscale-0 transition-all duration-700 max-h-[140%] -mt-10"
          />
        </div>
      )}
    </motion.div>
  );
}
