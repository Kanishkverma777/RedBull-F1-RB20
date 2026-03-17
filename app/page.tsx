import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AppleScrollSection from '@/components/AppleScrollSection';
import StatsGrid from '@/components/StatsGrid';
import TechSection from '@/components/TechSection';
import DriverCard from '@/components/DriverCard';
import LegacySection from '@/components/LegacySection';
import Footer from '@/components/Footer';
import { cars } from '@/data/cars';

export default function Home() {
  const rb20 = cars[0];

  // Inject images and descriptions into driver pair data to use the public folder files
  const driverData = [
    { 
      ...rb20.driverPair[0], 
      imageUrl: '/max.png',
      description: 'The reigning 4-time World Champion. Known for his aggressive, unrelenting driving style and unparalleled consistency. A generational talent who has rewritten the history books of Formula 1 with Red Bull Racing.'
    },
    { 
      ...rb20.driverPair[1], 
      imageUrl: '/isack.png',
      name: 'Isack Hadjar', // Overriding Sergio Perez with the new driver requested
      nationality: 'FRA',
      number: '37',
      description: 'The Red Bull Junior prodigy stepping up to the main seat. Bringing raw speed, exceptional tire management, and youthful hunger to the team. The next generation of Red Bull dominance begins here.'
    },
  ];

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <HeroSection />
      <AppleScrollSection />

      {/* Performance Section */}
      <section id="performance" className="relative z-10 pt-24 pb-24">
        {/* Soft gradient merging from canvas to performance */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-transparent to-[var(--background)] pointer-events-none -mt-40" />
        <div className="absolute inset-0 bg-[var(--background)] -z-10" />
        <StatsGrid stats={rb20.stats} themeColor={rb20.themeColor} />
      </section>

      {/* Technology Section */}
      <section id="technology" className="relative z-10 bg-[var(--background)] pt-12 pb-24">
        {/* Divider merging performance to tech */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <TechSection techSection={rb20.techSection} themeColor={rb20.themeColor} accentColor={rb20.accentColor} />
      </section>

      {/* Drivers Section */}
      <section id="drivers" className="relative z-10 bg-[var(--background)] pt-12 pb-32">
        {/* Divider merging tech to drivers */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-[var(--font-display)] text-5xl md:text-6xl font-bold mb-4">
              The Lineup
            </h2>
            <p className="text-white/40 font-[var(--font-body)] text-lg max-w-xl mx-auto">
              The men behind the wheel of the RB20 machine.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {driverData.map((driver, index) => (
              <DriverCard
                key={driver.name}
                driver={driver}
                themeColor={rb20.themeColor}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10 bg-[var(--background)]">
        {/* Divider merging drivers to legacy */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <LegacySection />
        <Footer />
      </div>
    </main>
  );
}
