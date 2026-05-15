'use client';

import { useRef, Suspense, useMemo } from 'react';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Stars, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useLanguage } from '@/context/LanguageContext';

// ── 3D Primitives ────────────────────────────────────────────────────────────

function IceCrystal({
  position,
  scale = 1,
  speed = 1.5,
  color = '#7dd3fc',
  opacity = 0.55,
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  color?: string;
  opacity?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    mesh.current.rotation.x = Math.sin(t * speed * 0.4) * 0.5;
    mesh.current.rotation.y += 0.006 * speed;
    mesh.current.rotation.z = Math.cos(t * speed * 0.3) * 0.3;
  });
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color={color}
          transparent opacity={opacity}
          roughness={0.05} metalness={0.1}
          transmission={0.7} thickness={0.5}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

function GlassSphere({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    mesh.current.rotation.y = clock.elapsedTime * 0.12;
    mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.1;
  });
  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={mesh} position={position} scale={scale}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#38bdf8" transparent opacity={0.15}
            roughness={0} metalness={0.05}
            distort={0.25} speed={1.5}
            envMapIntensity={3}
          />
        </Sphere>
      </mesh>
    </Float>
  );
}

function FloatingRing({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    mesh.current.rotation.x = clock.elapsedTime * 0.3;
    mesh.current.rotation.z = clock.elapsedTime * 0.15;
  });
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={mesh} position={position} scale={scale}>
        <torusGeometry args={[1, 0.25, 16, 60]} />
        <meshPhysicalMaterial
          color="#7dd3fc" transparent opacity={0.4}
          roughness={0} metalness={0.3}
          transmission={0.5} thickness={0.3}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

function IceParticles({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz  = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sz[i]          = Math.random() * 0.04 + 0.01;
    }
    return { positions: pos, sizes: sz };
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size"     args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#bae6fd" size={0.06} transparent opacity={0.7}
        sizeAttenuation depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]}  intensity={1.2} color="#bae6fd" />
      <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#38bdf8" />
      <pointLight position={[0, 3, 0]} intensity={2} color="#7dd3fc" distance={12} />

      <Environment preset="night" />
      <Stars radius={60} depth={50} count={800} factor={3} saturation={0} fade speed={0.5} />

      <GlassSphere position={[0, 0.5, -2]} scale={3.5} />

      <IceCrystal position={[-4, 1.5, -1]}  scale={0.7}  speed={1.2} color="#7dd3fc" />
      <IceCrystal position={[4.5, -0.5, -3]} scale={0.9} speed={0.9} color="#38bdf8" opacity={0.45} />
      <IceCrystal position={[-3, -2, -4]}   scale={0.5}  speed={1.8} color="#bae6fd" />
      <IceCrystal position={[3, 2.5, -5]}   scale={1.1}  speed={0.7} color="#0ea5e9" opacity={0.35} />
      <IceCrystal position={[-6, 0, -6]}    scale={0.4}  speed={2.1} color="#7dd3fc" />
      <IceCrystal position={[6, -1.5, -4]}  scale={0.6}  speed={1.4} color="#38bdf8" />

      <FloatingRing position={[-2.5, 0.5, -3]} scale={1.2} />
      <FloatingRing position={[3, 1, -6]}      scale={0.7} />

      <IceParticles count={250} />
    </>
  );
}

// ── Hero UI ───────────────────────────────────────────────────────────────────

export default function Hero3D() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-ice-gradient" />
      <div className="absolute inset-0 bg-hero-radial" />

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 8], fov: 55 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <Scene />
          </Canvas>
        </Suspense>
      </div>

      {/* Overlay gradient at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-40
        bg-gradient-to-t from-luxury-dark to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Tagline pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16,1,0.3,1] }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-ice-500/10 border border-ice-500/25 backdrop-blur-sm
            text-ice-300 text-xs font-semibold tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-ice-400 animate-pulse" />
            Premium Frozen Experience
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16,1,0.3,1] }}
          className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight
            text-white leading-none mb-4"
        >
          <span className="block">HIMALAYA</span>
          <span className="block text-transparent bg-clip-text
            bg-gradient-to-r from-ice-300 via-ice-400 to-ice-200
            animate-glow">
            SLUSHI
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="text-white/50 text-base sm:text-xl max-w-md mx-auto mb-10 font-light tracking-wide"
        >
          {t('hero.subtitle', 'Premium frozen drinks & fresh treats')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/products"
            className="px-8 py-3.5 rounded-2xl font-semibold text-sm tracking-wide
              bg-ice-500 hover:bg-ice-400 text-white
              shadow-glow-blue hover:shadow-[0_0_30px_rgba(56,189,248,0.6)]
              transition-all duration-300 hover:-translate-y-0.5"
          >
            {t('hero.shopNow', 'Shop Now')}
          </Link>
          <Link
            href="/#menu"
            className="px-8 py-3.5 rounded-2xl font-semibold text-sm tracking-wide
              bg-white/8 border border-white/15 backdrop-blur-sm text-white/90
              hover:bg-white/14 hover:border-white/25
              transition-all duration-300 hover:-translate-y-0.5"
          >
            {t('hero.exploreMenu', 'Explore Menu')}
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
