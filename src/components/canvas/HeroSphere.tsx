"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Sphere() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.15;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh ref={mesh}>
        {/* wireframe icosahedron shell + distorted inner sphere (cyan→violet) */}
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.28} />
      </mesh>
      <mesh scale={1.15}>
        <sphereGeometry args={[1, 48, 48]} />
        <MeshDistortMaterial
          color="#7c5cff"
          emissive="#0b0e17"
          roughness={0.35}
          metalness={0.85}
          distort={0.32}
          speed={1.6}
          transparent
          opacity={0.55}
        />
      </mesh>
    </Float>
  );
}

/**
 * R3F hero orb. Mounted lazily with ssr:false and only on desktop /
 * motion-friendly clients (guarded by the parent).
 * PERF: render loop pauses when the orb scrolls out of view.
 */
export default function HeroSphere() {
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
        camera={{ position: [0, 0, 4.4], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} color="#00f0ff" />
        <pointLight position={[-4, -2, -3]} intensity={1.4} color="#ff2d95" />
        <Sphere />
        <EffectComposer>
          <Bloom intensity={0.9} luminanceThreshold={0.2} mipmapBlur />
          <Vignette eskil={false} offset={0.2} darkness={0.85} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
