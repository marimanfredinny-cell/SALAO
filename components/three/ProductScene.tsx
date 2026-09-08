"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function Bottle() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // gentle auto-rotation + mouse reaction
    group.current.rotation.y = t * 0.32 + state.pointer.x * 0.55;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.22,
      0.06
    );
  });

  return (
    <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.5}>
      <group ref={group} position={[0, -0.1, 0]}>
        {/* body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.62, 0.62, 2.1, 64]} />
          <meshStandardMaterial color="#f0e4d0" roughness={0.28} metalness={0.08} />
        </mesh>
        {/* shoulder */}
        <mesh position={[0, 1.16, 0]} castShadow>
          <cylinderGeometry args={[0.62, 0.3, 0.32, 64]} />
          <meshStandardMaterial color="#f0e4d0" roughness={0.28} metalness={0.08} />
        </mesh>
        {/* cap */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <cylinderGeometry args={[0.24, 0.24, 0.42, 40]} />
          <meshStandardMaterial color="#bc9c63" roughness={0.2} metalness={0.65} />
        </mesh>
        {/* label */}
        <RoundedBox
          args={[0.96, 0.9, 0.02]}
          radius={0.02}
          smoothness={4}
          position={[0, -0.05, 0.62]}
        >
          <meshStandardMaterial color="#3b2c22" roughness={0.5} />
        </RoundedBox>
      </group>
    </Float>
  );
}

export function ProductScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.2, 5.4], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight
        position={[3.5, 4.5, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 1.5, -2]} intensity={0.5} color="#d8c199" />
      <pointLight position={[0, -2, 3]} intensity={0.4} color="#f6f1e8" />
      <Suspense fallback={null}>
        <Bottle />
        <ContactShadows
          position={[0, -1.55, 0]}
          opacity={0.42}
          scale={7}
          blur={2.8}
          far={4}
          color="#2a2018"
        />
      </Suspense>
    </Canvas>
  );
}

export default ProductScene;
