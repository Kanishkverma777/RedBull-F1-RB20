'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import type { Car } from '@/data/cars';

interface CarCanvasScrollProps {
  car: Car;
  frameCount?: number;
}

export default function CarCanvasScroll({ car, frameCount = 200 }: CarCanvasScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const rafRef = useRef<number>(0);

  // Preload images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `${car.folderPath}/ezgif-frame-${paddedIndex}.jpg`;

      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === frameCount) {
          setIsReady(true);
        }
      };

      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === frameCount) {
          setIsReady(true);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;
  }, [car.folderPath, frameCount]);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || !img.naturalWidth) return;

    // Set canvas size to match container
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width || canvas.height !== rect.height) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cover fit
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = drawHeight * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = drawWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Scroll handler
  useEffect(() => {
    if (!isReady) return;

    // Draw first frame immediately
    drawFrame(0);

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollableHeight = container.offsetHeight - window.innerHeight;

        // Calculate progress: 0 when container top is at viewport top, 1 when container bottom is at viewport bottom
        const scrollProgress = Math.min(
          Math.max(-rect.top / scrollableHeight, 0),
          1
        );

        const frameIndex = Math.min(
          Math.floor(scrollProgress * (frameCount - 1)),
          frameCount - 1
        );

        drawFrame(frameIndex);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isReady, frameCount, drawFrame]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      if (!container || !isReady) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      const scrollProgress = Math.min(
        Math.max(-rect.top / scrollableHeight, 0),
        1
      );
      const frameIndex = Math.min(
        Math.floor(scrollProgress * (frameCount - 1)),
        frameCount - 1
      );
      drawFrame(frameIndex);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isReady, frameCount, drawFrame]);

  const loadPercent = Math.round((loadedCount / frameCount) * 100);

  return (
    <div ref={containerRef} className="canvas-section relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Loading overlay */}
        {!isReady && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[var(--background)]">
            <div className="relative w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-200"
                style={{
                  width: `${loadPercent}%`,
                  background: `linear-gradient(90deg, ${car.themeColor}, ${car.accentColor})`,
                }}
              />
            </div>
            <p className="text-sm tracking-[0.3em] uppercase text-white/40 font-[var(--font-body)]">
              Loading {car.name} — {loadPercent}%
            </p>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
          style={{ opacity: isReady ? 1 : 0, transition: 'opacity 0.5s ease' }}
        />

        {/* Corner gradient overlays for text readability */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[var(--background)] to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-[var(--background)]/60 to-transparent" />
        </div>
      </div>
    </div>
  );
}
