import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** Detects a rough device performance tier for adaptive particle counts. */
function useDeviceTier(): "low" | "high" {
  if (typeof navigator === "undefined") return "high";
  const cores = navigator.hardwareConcurrency ?? 4;
  const isSmallScreen = window.innerWidth < 768;
  return cores <= 4 || isSmallScreen ? "low" : "high";
}

function Shield() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.22;
      group.current.rotation.x =
        Math.sin(t * 0.3) * 0.08 + mouse.current.y * 0.15;
      group.current.rotation.z = mouse.current.x * 0.08;
      group.current.position.y = Math.sin(t * 0.6) * 0.12;
    }
    if (inner.current) {
      inner.current.rotation.y = -t * 0.35;
      inner.current.rotation.x = t * 0.15;
    }
    state.pointer && (mouse.current = { x: state.pointer.x, y: state.pointer.y });
  });

  const scale = Math.min(viewport.width / 6, 1.15);

  return (
    <group ref={group} scale={scale}>
      {/* Outer shield shape (icosahedron as faceted shield-like form) */}
      <mesh>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={0.35}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Inner rotating circuit core */}
      <mesh ref={inner}>
        <octahedronGeometry args={[0.95, 0]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Core glow sphere */}
      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#00e5ff"
          emissiveIntensity={1.1}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Holographic rings */}
      {[1.9, 2.3].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2 + i * 0.4, i * 0.3, 0]}>
          <torusGeometry args={[r, 0.006, 8, 90]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.28} />
        </mesh>
      ))}
    </group>
  );
}

function NetworkNodes({ count }: { count: number }) {
  const points = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const radius = 3.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      arr.push([
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta) * 0.6,
        radius * Math.cos(phi),
      ]);
    }
    return arr;
  }, [count]);

  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={group}>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshBasicMaterial color={i % 3 === 0 ? "#00ffa3" : "#00e5ff"} />
        </mesh>
      ))}
    </group>
  );
}

function Particles({ count }: { count: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 9;
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00e5ff" transparent opacity={0.5} />
    </points>
  );
}

export default function CyberScene() {
  const tier = useDeviceTier();
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const nodeCount = tier === "low" ? 14 : 28;
  const particleCount = tier === "low" ? 120 : 400;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, tier === "low" ? 1.3 : 2]}
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 3, 4]} intensity={1.2} color="#00e5ff" />
        <pointLight position={[-4, -2, -3]} intensity={0.8} color="#8b5cf6" />
        <Suspense fallback={null}>
          {!prefersReducedMotion && <Particles count={particleCount} />}
          <NetworkNodes count={nodeCount} />
          <Shield />
        </Suspense>
      </Canvas>
    </div>
  );
}
