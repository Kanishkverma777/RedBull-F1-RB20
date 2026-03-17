'use client';

import Image from 'next/image';
export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Red Bull Racing" width={32} height={32} className="w-8 h-8 object-contain" />
              <span className="text-sm font-semibold tracking-[0.15em] uppercase text-white/80 font-[var(--font-display)]">
                Red Bull Racing
              </span>
            </div>
            <p className="text-xs text-white/30 leading-relaxed font-[var(--font-body)] max-w-xs">
              This is a fan-made scrollytelling showcase, celebrating the engineering excellence of Red Bull Racing&apos;s Formula 1 cars.
            </p>
          </div>

          {/* Tech */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-white/50 mb-4 font-[var(--font-body)]">Built With</h4>
            <ul className="space-y-2">
              {['Next.js 14+', 'Framer Motion', 'Tailwind CSS', 'Canvas API'].map((tech) => (
                <li key={tech}>
                  <span className="text-sm text-white/30 font-[var(--font-body)]">
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-white/50 mb-4 font-[var(--font-body)]">Info</h4>
            <ul className="space-y-2">
              {['Fan Project', 'Not affiliated with Red Bull', 'Educational Purpose'].map((info) => (
                <li key={info}>
                  <span className="text-sm text-white/30 font-[var(--font-body)]">
                    {info}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 font-[var(--font-body)]">
            © {new Date().getFullYear()} Fan Showcase. Not an official Red Bull product.
          </p>
          <p className="text-xs text-white/20 tracking-[0.2em] uppercase font-[var(--font-body)]">
            Engineered to Dominate
          </p>
        </div>
      </div>
    </footer>
  );
}
