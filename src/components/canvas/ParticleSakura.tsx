"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* PERF: reduced from 900 → 350 petals. Visually identical at a glance,
   but ~60% less per-frame CPU on the geometry update loop. */
const PETAL_COUNT = 350;
const STREAK_COUNT = 12;

function Petals({ burst }: { burst: boolean }) {
  const points = useRef<THREE.Points>(null);
  const velocities = useRef<Float32Array | null>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(PETAL_COUNT * 3);
    const col = new Float32Array(PETAL_COUNT * 3);
    const vel = new Float32Array(PETAL_COUNT);
    const sakura = new THREE.Color("#ffb7d5");
    const cyan = new THREE.Color("#00f0ff");
    const violet = new THREE.Color("#7c5cff");
    for (let i = 0; i < PETAL_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = Math.random() * 10 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
      vel[i] = 0.15 + Math.random() * 0.5;
      const mix = Math.random();
      const c = mix < 0.72 ? sakura : mix < 0.9 ? cyan : violet;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    velocities.current = vel;
    return { positions: pos, colors: col };
  }, []);

  useFrame((state, delta) => {
    const pts = points.current;
    if (!pts || !velocities.current) return;
    const attr = pts.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const t = state.clock.elapsedTime;
    const boost = burst ? 6 : 1;
    for (let i = 0; i < PETAL_COUNT; i++) {
      arr[i * 3 + 1] -= velocities.current[i] * delta * boost; // fall
      arr[i * 3] += Math.sin(t * 0.4 + i) * delta * 0.12; // drift
      if (arr[i * 3 + 1] < -5) {
        arr[i * 3 + 1] = 6 + Math.random() * 2;
        arr[i * 3] = (Math.random() - 0.5) * 14;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        map={undefined}
      />
    </points>
  );
}

function Streaks() {
  const group = useRef<THREE.Group>(null);
  const lines = useMemo(() => {
    const out: THREE.BufferGeometry[] = [];
    for (let i = 0; i < STREAK_COUNT; i++) {
      const g = new THREE.BufferGeometry();
      const x = (Math.random() - 0.5) * 14;
      const y = Math.random() * 8 - 2;
      const z = -3 - Math.random() * 3;
      const len = 0.6 + Math.random() * 1.6;
      g.setAttribute(
        "position",
        new THREE.Float32BufferAttribute([x, y, z, x + len * 0.35, y - len, z], 3),
      );
      out.push(g);
    }
    return out;
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.4;
    }
  });

  return (
    <group ref={group}>
      {lines.map((g, i) => (
        <line key={i}>
          <primitive object={g} attach="geometry" />
          <lineBasicMaterial
            color={i % 2 ? "#00f0ff" : "#7c5cff"}
            transparent
            opacity={0.18}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}
    </group>
  );
}

interface ParticleSakuraProps {
  /** trigger a downward burst (used by preloader finish + konami easter egg) */
  burst?: boolean;
}

/** Drifting sakura petals + light streaks. Desktop/motion-only (parent-guarded).
 *  PERF: the render loop PAUSES when the hero scrolls out of view (frameloop
 *  switches to "never"), so no GPU work happens while reading other sections. */
export default function ParticleSakura({ burst = false }: ParticleSakuraProps) {
  const [visible, setVisible] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      frameloop={visible ? "always" : "never"}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Petals burst={burst} />
      <Streaks />
    </Canvas>
    </div>
  );
}
