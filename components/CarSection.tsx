'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Car } from '@/data/cars';
import CarCanvasScroll from './CarCanvasScroll';
import StatsGrid from './StatsGrid';
import DriverCard from './DriverCard';
import TechSection from './TechSection';
import AchievementsGrid from './AchievementsGrid';
import CtaSection from './CtaSection';

interface CarSectionProps {
  car: Car;
  index: number;
}

function SectionHeading({ headline, sub, themeColor, delay = 0 }: { headline: string; sub: string; themeColor: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="max-w-4xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        className="font-[var(--font-display)] text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-[1.1]"
      >
        <span style={{ color: themeColor }}>{headline}</span>
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-xl text-white/50 max-w-2xl leading-relaxed font-[var(--font-body)]"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

function StoryBlock({ title, body, themeColor }: { title: string; body: string; themeColor: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="w-12 h-[3px] mb-8"
              style={{ background: themeColor }}
            />
            <h3 className="font-[var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-2">
              {title}
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-base sm:text-lg text-white/50 leading-[1.8] font-[var(--font-body)]">
              {body}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function CarSection({ car, index }: CarSectionProps) {
  const sectionRef = useRef(null);

  return (
    <section
      id={car.id}
      ref={sectionRef}
      className="relative"
    >
      {/* Divider */}
      {index > 0 && (
        <div className="relative py-20">
          <div className="rb-divider max-w-xs mx-auto" />
        </div>
      )}

      {/* Section Hero Title */}
      <SectionHeading
        headline={car.section1.headline}
        sub={car.section1.sub}
        themeColor={car.themeColor}
      />

      {/* Canvas scroll section */}
      <CarCanvasScroll car={car} />

      {/* Aero Section */}
      <SectionHeading
        headline={car.section2.headline}
        sub={car.section2.sub}
        themeColor={car.themeColor}
      />

      {/* Stats */}
      <StatsGrid stats={car.stats} themeColor={car.themeColor} />

      {/* Story */}
      <StoryBlock
        title={car.storySection.title}
        body={car.storySection.body}
        themeColor={car.themeColor}
      />

      {/* Power Section */}
      <SectionHeading
        headline={car.section3.headline}
        sub={car.section3.sub}
        themeColor={car.themeColor}
      />

      {/* Tech Specs */}
      <TechSection techSection={car.techSection} themeColor={car.themeColor} accentColor={car.accentColor} />

      {/* Drivers */}
      <div className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {car.driverPair.map((driver, i) => (
              <DriverCard key={driver.number} driver={driver} themeColor={car.themeColor} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <AchievementsGrid achievements={car.achievements} themeColor={car.themeColor} season={car.season} />

      {/* Final headline */}
      <SectionHeading
        headline={car.section4.headline}
        sub={car.section4.sub}
        themeColor={car.themeColor}
      />

      {/* CTA */}
      <CtaSection ctaSection={car.ctaSection} themeColor={car.themeColor} carName={car.name} />
    </section>
  );
}
