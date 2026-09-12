import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * High-performance CSS 3D car orbit carousel.
 * — Silky smooth 60+ FPS rotational physics with requestAnimationFrame
 * — 4 SVG car silhouettes orbit smoothly around a glowing Web3 RWA Node
 * — Hover decelerates smoothly; click model smoothly interpolates to center front
 */

const CAR_SVGS = [
  {
    label: 'Audi R8 / Camry',
    color: '#0D9488',
    glow: 'rgba(13, 148, 136, 0.4)',
    svg: (
      <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M15 52 C18 44 28 32 48 28 C62 24 80 22 100 22 C120 22 140 24 158 30 C172 34 180 42 185 52 L185 58 L15 58 Z"
          fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M48 28 C55 24 68 18 85 16 C100 14 115 14 130 16 C145 18 158 24 166 28"
          stroke="currentColor" strokeWidth="1.5" fill="none" />
        <ellipse cx="48" cy="63" rx="14" ry="14" fill="#1e293b" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="48" cy="63" rx="6" ry="6" fill="#64748b" />
        <ellipse cx="155" cy="63" rx="14" ry="14" fill="#1e293b" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="155" cy="63" rx="6" ry="6" fill="#64748b" />
        <line x1="14" y1="58" x2="186" y2="58" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 52 C12 54 10 57 10 58" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M185 52 C188 54 190 57 190 58" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    label: 'TT QUATTRO',
    color: '#2563EB',
    glow: 'rgba(37, 99, 235, 0.4)',
    svg: (
      <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M20 54 C24 44 38 30 62 26 C78 22 95 21 112 22 C132 23 150 28 165 38 C175 44 180 50 182 54 L182 60 L20 60 Z"
          fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M62 26 C68 20 82 14 100 13 C118 12 135 16 148 24"
          stroke="currentColor" strokeWidth="1.5" fill="none" />
        <ellipse cx="52" cy="64" rx="13" ry="13" fill="#1e293b" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="52" cy="64" rx="5.5" ry="5.5" fill="#64748b" />
        <ellipse cx="150" cy="64" rx="13" ry="13" fill="#1e293b" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="150" cy="64" rx="5.5" ry="5.5" fill="#64748b" />
        <line x1="19" y1="60" x2="183" y2="60" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: 'RS LINE',
    color: '#0F172A',
    glow: 'rgba(15, 23, 42, 0.4)',
    svg: (
      <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M12 50 C16 40 30 26 55 22 C72 18 92 17 112 18 C138 19 162 24 175 36 C182 42 185 48 185 52 L185 58 L12 58 Z"
          fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M55 22 C60 18 72 12 95 11 C116 10 138 14 155 22"
          stroke="currentColor" strokeWidth="1.5" fill="none" />
        <ellipse cx="48" cy="62" rx="14" ry="14" fill="#0f172a" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="48" cy="62" rx="5.5" ry="5.5" fill="#64748b" />
        <ellipse cx="158" cy="62" rx="14" ry="14" fill="#0f172a" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="158" cy="62" rx="5.5" ry="5.5" fill="#64748b" />
        <line x1="11" y1="58" x2="186" y2="58" stroke="currentColor" strokeWidth="1.5" />
        <rect x="165" y="40" width="15" height="6" rx="2" fill="currentColor" fillOpacity="0.3" />
      </svg>
    ),
  },
  {
    label: 'GT500',
    color: '#E11D48',
    glow: 'rgba(225, 29, 72, 0.4)',
    svg: (
      <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M10 54 C14 44 26 32 50 27 C68 23 88 22 108 22 C132 22 158 26 174 36 C183 42 188 50 188 54 L188 60 L10 60 Z"
          fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M50 27 C56 22 68 16 90 14 C112 12 138 16 158 26"
          stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M10 54 C8 55 7 58 7 60" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M188 54 C190 55 191 58 191 60" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <ellipse cx="50" cy="64" rx="14" ry="14" fill="#0f172a" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="50" cy="64" rx="5.5" ry="5.5" fill="#64748b" />
        <ellipse cx="160" cy="64" rx="14" ry="14" fill="#0f172a" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="160" cy="64" rx="5.5" ry="5.5" fill="#64748b" />
        <line x1="9" y1="60" x2="189" y2="60" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function CarouselOrbit({ onSelectVehicle, activeIndex }) {
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(activeIndex || 0);
  
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const rotRef = useRef(0);
  const targetRotRef = useRef(null);

  const CARS = CAR_SVGS.length;
  const RADIUS = 260;   // orbit radius (px)
  const SPEED = 0.018;  // degrees per ms (constant smooth velocity)

  useEffect(() => {
    const animate = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = Math.min(timestamp - lastTimeRef.current, 64); // Cap delta to prevent jump
      lastTimeRef.current = timestamp;

      if (targetRotRef.current !== null) {
        // Smooth lerp to clicked car position
        const diff = targetRotRef.current - rotRef.current;
        if (Math.abs(diff) < 0.1) {
          rotRef.current = targetRotRef.current;
          targetRotRef.current = null;
        } else {
          rotRef.current += diff * 0.12;
        }
        setRotation(rotRef.current);
      } else if (!isPaused) {
        rotRef.current = (rotRef.current + SPEED * delta) % 360;
        setRotation(rotRef.current);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused]);

  const handleCarClick = useCallback((idx) => {
    setSelectedIdx(idx);
    const targetAngle = (360 / CARS) * idx;
    targetRotRef.current = -targetAngle;
    if (onSelectVehicle) onSelectVehicle(idx);
  }, [CARS, onSelectVehicle]);

  return (
    <div
      className="relative w-full flex flex-col items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── 3D PERSPECTIVE STAGE ── */}
      <div
        className="w-full max-w-[700px] h-[360px] relative overflow-visible"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* ── CENTER: Web3 Real-World Asset (RWA) Holographic Node ── */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center justify-center"
        >
          <div className="relative w-16 h-16 rounded-full bg-slate-900 border-2 border-teal-500/40 shadow-xl flex items-center justify-center">
            {/* Pulsing Aura */}
            <div className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping duration-1000" />
            <span className="font-mono text-base font-extrabold text-teal-400 tracking-tighter relative z-10">cN</span>
          </div>
          <div className="mt-2 px-2.5 py-0.5 rounded-full bg-slate-900/90 backdrop-blur-xs text-[9px] font-mono font-extrabold text-teal-400 uppercase tracking-widest border border-teal-500/30 shadow-xs">
            RWA NODE
          </div>
        </div>

        {/* ── ROTATING 3D ORBIT RING ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
            transform: `rotateX(14deg) rotateY(${rotation}deg)`,
            willChange: 'transform',
            zIndex: 10,
          }}
        >
          {/* Glowing trajectory disc */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: RADIUS * 2 + 10,
              height: RADIUS * 2 + 10,
              marginLeft: -(RADIUS + 5),
              marginTop: -(RADIUS + 5),
              borderRadius: '50%',
              border: '1.5px dashed rgba(13, 148, 136, 0.35)',
              boxShadow: '0 0 25px rgba(13, 148, 136, 0.12), inset 0 0 20px rgba(13, 148, 136, 0.06)',
              transform: 'rotateX(90deg)',
              pointerEvents: 'none',
            }}
          />

          {/* Car Silhouettes on Orbit */}
          {CAR_SVGS.map((car, idx) => {
            const angleStep = 360 / CARS;
            const angle = angleStep * idx;

            const normalizedRot = ((rotation % 360) + 360) % 360;
            const carWorldAngle = ((angle - normalizedRot) % 360 + 360) % 360;
            const isFront = carWorldAngle < 55 || carWorldAngle > 305;

            return (
              <div
                key={idx}
                onClick={() => handleCarClick(idx)}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: 190,
                  height: 84,
                  marginLeft: -95,
                  marginTop: -42,
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                  cursor: 'pointer',
                  zIndex: isFront ? 30 : 5,
                }}
              >
                <div
                  className="transition-all duration-300 transform-gpu"
                  style={{
                    width: '100%',
                    height: '100%',
                    color: car.color,
                    opacity: isFront ? 1 : 0.35,
                    transform: isFront ? 'scale(1.18)' : 'scale(0.85)',
                    filter: isFront ? `drop-shadow(0 10px 18px ${car.glow})` : 'none',
                  }}
                >
                  {car.svg}
                </div>

                {/* Model Label */}
                <div
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap transition-opacity duration-300"
                  style={{
                    opacity: isFront ? 1 : 0.4,
                  }}
                >
                  <span
                    className="font-mono text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{
                      color: isFront ? car.color : '#64748b',
                      backgroundColor: isFront ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
                      border: isFront ? '1px solid rgba(13, 148, 136, 0.2)' : 'none',
                    }}
                  >
                    {car.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ambient Ground Shadow */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[60%] h-6 rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse, rgba(13, 148, 136, 0.15) 0%, rgba(0,0,0,0.08) 40%, transparent 75%)',
          }}
        />
      </div>

      {/* Interactive Status Hint */}
      <div className="mt-6 inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider text-slate-500 bg-white/80 backdrop-blur-xs px-3.5 py-1 rounded-full border border-slate-200">
        <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-amber-500' : 'bg-teal-500 animate-pulse'}`} />
        <span>{isPaused ? 'Orbit Paused · Click Model to Focus' : 'Hover to Pause · Click Silhouette to Select'}</span>
      </div>
    </div>
  );
}