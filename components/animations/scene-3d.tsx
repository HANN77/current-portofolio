"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({
  position,
  geometry,
  speed = 0.5,
  distort = 0.3,
  scale = 1,
}: {
  position: [number, number, number];
  geometry: "sphere" | "torus" | "icosahedron" | "octahedron";
  speed?: number;
  distort?: number;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
  });

  const geometryNode = useMemo(() => {
    switch (geometry) {
      case "sphere":
        return <sphereGeometry args={[1, 64, 64]} />;
      case "torus":
        return <torusGeometry args={[1, 0.4, 32, 64]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[1, 4]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
    }
  }, [geometry]);

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometryNode}
        <MeshDistortMaterial
          color="#e2e8f0"
          roughness={0.4}
          metalness={0.1}
          distort={distort}
          speed={2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 50 }: { count?: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={points}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#cbd5e1" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function Scene3D({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#94a3b8" />

        <FloatingShape position={[-3, 1.5, -2]} geometry="torus" speed={0.3} scale={0.8} distort={0.2} />
        <FloatingShape position={[3.5, -1, -1]} geometry="icosahedron" speed={0.4} scale={0.6} distort={0.4} />
        <FloatingShape position={[-1.5, -2, -3]} geometry="sphere" speed={0.2} scale={0.5} distort={0.3} />
        <FloatingShape position={[2, 2.5, -4]} geometry="octahedron" speed={0.35} scale={0.4} distort={0.2} />

        <Particles count={80} />
      </Canvas>
    </div>
  );
}
