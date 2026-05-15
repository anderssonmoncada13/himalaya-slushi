'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}

// Deterministic positions — no Math.random() to avoid hydration mismatches.
// Uses the sunflower / golden-angle spiral to spread particles evenly.
const GOLDEN_ANGLE = 2.399; // radians

function buildParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id:       i,
    x:        Math.round(50 + Math.sin(i * GOLDEN_ANGLE) * 38),
    y:        Math.round(50 + Math.cos(i * GOLDEN_ANGLE) * 38),
    size:     (i % 3) + 1,          // 1 | 2 | 3 px
    duration: 2.8 + (i % 4) * 0.6, // 2.8 – 4.6 s
    delay:    i * 0.32,
  }));
}

export default function ProductImageStage({ src, alt, priority = false, sizes }: Props) {
  const particles = useMemo(() => buildParticles(12), []);

  return (
    <div className="relative w-full h-full overflow-hidden">

      {/* ── Dark scenic base ──────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#06090f] to-[#07101f]" />

      {/* ── Primary icy radial glow ───────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="w-[88%] h-[88%] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(56,189,248,0.24) 0%, rgba(14,165,233,0.11) 38%, transparent 68%)',
            filter: 'blur(28px)',
          }}
        />
      </div>

      {/* ── Secondary offset halo (depth illusion) ────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="w-[52%] h-[52%] rounded-full"
          style={{
            transform: 'translate(9%, -7%)',
            background:
              'radial-gradient(ellipse at center, rgba(125,211,252,0.16) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      </div>

      {/* ── Outer decorative ice ring — slow CW spin ──────────────────────────── */}
      <motion.div
        aria-hidden
        className="absolute inset-[9%] rounded-full pointer-events-none"
        style={{
          border:     '1px solid rgba(125,211,252,0.14)',
          boxShadow:  '0 0 18px rgba(56,189,248,0.07)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── Inner ring — CCW, dashed ──────────────────────────────────────────── */}
      <motion.div
        aria-hidden
        className="absolute inset-[21%] rounded-full pointer-events-none"
        style={{ border: '1px dashed rgba(56,189,248,0.09)' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── Glass circle — frosted pane behind the product ────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-[12%] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 37% 32%, rgba(255,255,255,0.06), rgba(56,189,248,0.045) 52%, transparent 72%)',
          backdropFilter:       'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border:    '1px solid rgba(255,255,255,0.07)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 0 40px rgba(56,189,248,0.06)',
        }}
      />

      {/* ── Floating product image ────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ y: [-10, 8, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.07, y: -15, transition: { duration: 0.4, ease: [0.16,1,0.3,1] } }}
      >
        {/* 10% padding so the product breathes inside the ring */}
        <div className="relative w-full h-full" style={{ padding: '10%' }}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            style={{
              filter:
                'drop-shadow(0px 28px 52px rgba(56,189,248,0.30)) drop-shadow(0px 8px 18px rgba(0,0,0,0.55))',
            }}
            priority={priority}
            sizes={sizes ?? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw'}
          />
        </div>
      </motion.div>

      {/* ── Mirror reflection under the product ──────────────────────────────── */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-[18%] h-[18%] pointer-events-none"
        style={{
          background:    'linear-gradient(to bottom, rgba(56,189,248,0.09) 0%, transparent 100%)',
          filter:        'blur(8px)',
          transform:     'scaleY(-1)',
          transformOrigin: 'bottom',
          opacity:       0.7,
        }}
      />

      {/* ── Bottom gradient — blend image stage into card content ─────────────── */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-2/5 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(6,9,15,0.92) 0%, rgba(6,9,15,0.4) 55%, transparent 100%)',
        }}
      />

      {/* ── Floating ice particles ────────────────────────────────────────────── */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            left:       `${p.x}%`,
            top:        `${p.y}%`,
            width:      p.size + 1,
            height:     p.size + 1,
            background: p.size === 3
              ? 'rgba(186,230,253,0.60)'
              : 'rgba(125,211,252,0.48)',
          }}
          animate={{
            y:       [-7, 7, -7],
            opacity: [0.12, 0.70, 0.12],
            scale:   [1, 1.7, 1],
          }}
          transition={{
            duration: p.duration,
            delay:    p.delay,
            repeat:   Infinity,
            ease:     'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
