'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

interface ScrollSection {
  id: string;
  position: 'left' | 'right' | 'center';
  startAt: number;
  endAt: number;
  peakAt: number;
  label?: string;
  headline: string;
  sub?: string;
  accent?: string;
}

const scrollSections: ScrollSection[] = [
  {
    id: 'intro',
    position: 'center',
    startAt: 0.0,
    peakAt: 0.04,
    endAt: 0.09,
    headline: 'RB20',
    sub: 'Born to dominate.',
    accent: '#E4002B',
  },
  {
    id: 'topspeed',
    position: 'left',
    startAt: 0.08,
    peakAt: 0.12,
    endAt: 0.18,
    label: 'Top Speed',
    headline: '365 km/h',
    sub: 'Blistering straight-line speed — faster than any car on the 2024 grid.',
    accent: '#E4002B',
  },
  {
    id: 'acceleration',
    position: 'right',
    startAt: 0.16,
    peakAt: 0.21,
    endAt: 0.27,
    label: '0–100 km/h',
    headline: '2.6 seconds',
    sub: 'From standstill to triple digits in the blink of an eye. Brutal launch performance.',
    accent: '#0091FF',
  },
  {
    id: 'power',
    position: 'left',
    startAt: 0.25,
    peakAt: 0.30,
    endAt: 0.36,
    label: 'Power Unit',
    headline: '1000+ HP',
    sub: 'Honda RBPTH002 1.6L V6 Hybrid — combustion temperatures exceeding 2,500°C.',
    accent: '#FFD700',
  },
  {
    id: 'hybrid',
    position: 'right',
    startAt: 0.34,
    peakAt: 0.39,
    endAt: 0.45,
    label: 'Energy Recovery',
    headline: 'MGU-K + MGU-H',
    sub: 'Reclaims over 160 kW from braking and exhaust heat. Zero turbo lag. Maximum attack.',
    accent: '#E4002B',
  },
  {
    id: 'aero',
    position: 'left',
    startAt: 0.43,
    peakAt: 0.48,
    endAt: 0.54,
    label: 'Aerodynamics',
    headline: 'Zero Drag.\nMaximum Grip.',
    sub: 'Radical underfloor aero delivering 3,500 N of downforce across all circuit types.',
    accent: '#0091FF',
  },
  {
    id: 'chassis',
    position: 'right',
    startAt: 0.52,
    peakAt: 0.57,
    endAt: 0.63,
    label: 'Chassis',
    headline: '798 kg',
    sub: 'RB20 Monocoque Carbon Fibre — every gram optimised, every surface sculpted in Milton Keynes.',
    accent: '#FFD700',
  },
  {
    id: 'throttle',
    position: 'left',
    startAt: 0.61,
    peakAt: 0.66,
    endAt: 0.72,
    label: 'Throttle Response',
    headline: 'Sub-2ms',
    sub: 'Instantaneous power delivery — from thought to thrust in less than 2 milliseconds.',
    accent: '#E4002B',
  },
  {
    id: 'driver1',
    position: 'left',
    startAt: 0.70,
    peakAt: 0.75,
    endAt: 0.81,
    label: 'Driver #1',
    headline: 'Max Verstappen',
    sub: '4× World Champion. NED. The most dominant driver of his generation.',
    accent: '#0091FF',
  },
  {
    id: 'driver2',
    position: 'right',
    startAt: 0.70,
    peakAt: 0.75,
    endAt: 0.81,
    label: 'Driver #11',
    headline: 'Sergio Pérez',
    sub: 'Race winner. MEX. Speed and consistency when it matters most.',
    accent: '#FFD700',
  },
  {
    id: 'wins',
    position: 'center',
    startAt: 0.80,
    peakAt: 0.86,
    endAt: 0.93,
    label: '2024 Season',
    headline: '21 / 24 Wins',
    sub: '4th Constructors\' Title — 18 Fastest Laps — Max Verstappen secures his 4th consecutive championship.',
    accent: '#E4002B',
  },
  {
    id: 'closing',
    position: 'center',
    startAt: 0.91,
    peakAt: 0.96,
    endAt: 1.0,
    headline: 'Engineered to Win.',
    sub: 'This is not just a race car. It is a 798 kg theorem in carbon fibre.',
    accent: '#FFD700',
  },
];

function getOpacity(progress: number, startAt: number, peakAt: number, endAt: number): number {
  if (progress < startAt || progress > endAt) return 0;
  if (progress < peakAt) return (progress - startAt) / (peakAt - startAt);
  if (progress > peakAt) return 1 - (progress - peakAt) / (endAt - peakAt);
  return 1;
}

function getTranslateY(progress: number, startAt: number, peakAt: number, endAt: number): number {
  if (progress < startAt) return 40;
  if (progress > endAt) return -40;
  if (progress < peakAt) return 40 * (1 - (progress - startAt) / (peakAt - startAt));
  if (progress > peakAt) return -40 * ((progress - peakAt) / (endAt - peakAt));
  return 0;
}

export default function AppleScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const frameCount = 200;

  // Smooth interpolation state (kept outside React)
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const animatingRef = useRef(false);

  // Preload images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `/images/f1/ezgif-frame-${paddedIndex}.jpg`;

      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === frameCount) setIsReady(true);
      };
      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === frameCount) setIsReady(true);
      };

      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const clamped = Math.max(0, Math.min(frameCount - 1, Math.round(frameIndex)));
    const img = imagesRef.current[clamped];
    if (!img || !img.complete || !img.naturalWidth) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = rect.width * dpr;
    const h = rect.height * dpr;

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, rect.width, rect.height);

    // Cover-fit
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = rect.width / rect.height;
    let dw: number, dh: number, dx: number, dy: number;

    if (imgRatio > canvasRatio) {
      dh = rect.height;
      dw = dh * imgRatio;
      dx = (rect.width - dw) / 2;
      dy = 0;
    } else {
      dw = rect.width;
      dh = dw / imgRatio;
      dx = 0;
      dy = (rect.height - dh) / 2;
    }

    ctx.drawImage(img, dx, dy, dw, dh);
  }, [frameCount]);

  // Update text overlays via direct DOM manipulation (no React re-render)
  const updateOverlays = useCallback((progress: number) => {
    overlayRefs.current.forEach((el, i) => {
      if (!el) return;
      const section = scrollSections[i];
      const opacity = getOpacity(progress, section.startAt, section.peakAt, section.endAt);
      const translateY = getTranslateY(progress, section.startAt, section.peakAt, section.endAt);

      if (opacity <= 0.01) {
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
      } else {
        el.style.visibility = 'visible';
        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${translateY}px)`;
      }
    });

    // Scroll hint
    if (scrollHintRef.current) {
      scrollHintRef.current.style.opacity = progress < 0.02 ? String(1 - progress * 50) : '0';
    }
  }, []);

  // Lerp animation loop — runs at 60fps, interpolates frame + overlays smoothly
  const startLerpLoop = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const LERP_SPEED = 0.12; // lower = smoother but slower catch-up

    const tick = () => {
      const targetFrame = targetFrameRef.current;
      const currentFrame = currentFrameRef.current;
      const targetProg = targetProgressRef.current;
      const currentProg = currentProgressRef.current;

      // Lerp frame
      const newFrame = currentFrame + (targetFrame - currentFrame) * LERP_SPEED;
      currentFrameRef.current = newFrame;

      // Lerp progress for overlays
      const newProg = currentProg + (targetProg - currentProg) * LERP_SPEED;
      currentProgressRef.current = newProg;

      drawFrame(Math.round(newFrame));
      updateOverlays(newProg);

      // Keep running if not converged
      if (Math.abs(targetFrame - newFrame) > 0.1 || Math.abs(targetProg - newProg) > 0.001) {
        requestAnimationFrame(tick);
      } else {
        // Snap to final values
        currentFrameRef.current = targetFrame;
        currentProgressRef.current = targetProg;
        drawFrame(Math.round(targetFrame));
        updateOverlays(targetProg);
        animatingRef.current = false;
      }
    };

    requestAnimationFrame(tick);
  }, [drawFrame, updateOverlays]);

  // Scroll handler — only sets targets, never draws directly
  useEffect(() => {
    if (!isReady) return;

    drawFrame(0);
    updateOverlays(0);

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);

      targetProgressRef.current = progress;
      targetFrameRef.current = progress * (frameCount - 1);

      startLerpLoop();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReady, frameCount, drawFrame, updateOverlays, startLerpLoop]);

  // Resize
  useEffect(() => {
    const handleResize = () => {
      if (!isReady) return;
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = 0;
        canvas.height = 0;
      }
      drawFrame(Math.round(currentFrameRef.current));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isReady, drawFrame]);

  const loadPercent = Math.round((loadedCount / frameCount) * 100);

  return (
    <div ref={containerRef} id="overview" className="relative" style={{ height: '1200vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Loading */}
        {!isReady && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[var(--background)]">
            <div className="relative w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-200"
                style={{ width: `${loadPercent}%`, background: 'linear-gradient(90deg, #E4002B, #0091FF)' }}
              />
            </div>
            <p className="text-sm tracking-[0.3em] uppercase text-white/40 font-[var(--font-body)]">
              Loading RB20 — {loadPercent}%
            </p>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: isReady ? 1 : 0,
            transition: 'opacity 0.5s ease',
            imageRendering: 'auto',
          }}
        />

        {/* Vignette overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/70 via-transparent to-[var(--background)]/70" />
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[var(--background)]/60 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-1/5 bg-gradient-to-b from-[var(--background)]/50 to-transparent" />
        </div>

        {/* Text overlays — rendered once, updated via refs */}
        {scrollSections.map((section, i) => {
          const positionClasses =
            section.position === 'left'
              ? 'left-0 items-start text-left pl-6 sm:pl-12 lg:pl-20 pr-4 max-w-[85%] sm:max-w-[50%] lg:max-w-[40%]'
              : section.position === 'right'
              ? 'right-0 items-end text-right pr-6 sm:pr-12 lg:pr-20 pl-4 max-w-[85%] sm:max-w-[50%] lg:max-w-[40%]'
              : 'left-0 right-0 items-center text-center px-6 sm:px-8';

          return (
            <div
              key={section.id}
              ref={(el) => { overlayRefs.current[i] = el; }}
              className={`absolute top-0 bottom-0 flex flex-col justify-center ${positionClasses}`}
              style={{
                opacity: 0,
                visibility: 'hidden',
                willChange: 'opacity, transform',
              }}
            >
              {section.label && (
                <div className="flex items-center gap-2 mb-3">
                  {section.position !== 'right' && (
                    <div className="w-6 h-[2px]" style={{ background: section.accent }} />
                  )}
                  <span
                    className="text-[10px] sm:text-xs tracking-[0.4em] uppercase font-[var(--font-body)] font-semibold"
                    style={{ color: section.accent }}
                  >
                    {section.label}
                  </span>
                  {section.position === 'right' && (
                    <div className="w-6 h-[2px]" style={{ background: section.accent }} />
                  )}
                </div>
              )}

              <h2
                className={`font-[var(--font-display)] font-bold leading-[1.0] mb-3 whitespace-pre-line ${
                  section.position === 'center'
                    ? 'text-4xl sm:text-6xl md:text-8xl'
                    : 'text-3xl sm:text-4xl md:text-6xl'
                }`}
              >
                {section.headline}
              </h2>

              {section.sub && (
                <p
                  className={`text-sm sm:text-base text-white/45 leading-relaxed font-[var(--font-body)] ${
                    section.position === 'center' ? 'max-w-xl mx-auto' : 'max-w-sm'
                  }`}
                >
                  {section.sub}
                </p>
              )}

              <div
                className="mt-4 h-[2px] rounded-full"
                style={{
                  background: `linear-gradient(${section.position === 'right' ? '270deg' : '90deg'}, ${section.accent}, transparent)`,
                  width: section.position === 'center' ? '80px' : '60px',
                  margin: section.position === 'center' ? '0 auto' : undefined,
                }}
              />
            </div>
          );
        })}

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/25 font-[var(--font-body)]">
            Scroll to explore
          </span>
          <div className="w-[1px] h-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#E4002B] to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
