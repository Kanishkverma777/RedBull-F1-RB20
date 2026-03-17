'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItem {
  label: string;
  value: string;
  unit: string;
}

function AnimatedNumber({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
  const isNumeric = !isNaN(numericValue);

  useEffect(() => {
    if (!isInView || !isNumeric) {
      if (!isNumeric) setDisplayValue(value);
      return;
    }

    const startTime = performance.now();
    const hasDecimal = value.includes('.');
    const decimalPlaces = hasDecimal ? value.split('.')[1]?.length || 0 : 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = numericValue * eased;

      setDisplayValue(
        hasDecimal ? current.toFixed(decimalPlaces) : Math.floor(current).toString()
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, numericValue, isNumeric, duration]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function StatsGrid({ stats, themeColor }: { stats: StatItem[]; themeColor: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-lg p-6 lg:p-8 text-center group hover:border-white/10 transition-all duration-500"
          >
            <div className="stat-value text-3xl sm:text-4xl md:text-5xl font-bold font-[var(--font-display)] mb-1" style={{ color: themeColor }}>
              <AnimatedNumber value={stat.value} />
            </div>
            <div className="text-xs sm:text-sm text-white/30 uppercase tracking-[0.2em] mb-3 font-[var(--font-body)]">
              {stat.unit}
            </div>
            <div className="text-xs text-white/50 uppercase tracking-[0.15em] font-[var(--font-body)]">
              {stat.label}
            </div>
            {/* Hover glow */}
            <div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: `inset 0 0 30px ${themeColor}15` }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
