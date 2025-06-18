import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { Points as ThreePoints } from "three";

export const TechParticles = () => {
  const isMobile = useIsMobile();

  return (
    <Canvas className="" camera={{ position: [0, 0, 2] }}>
      <Stars isMobile={isMobile} />
    </Canvas>
  );
};

function Stars(props: { isMobile: boolean }) {
  const { isMobile } = props;
  const ref = useRef<ThreePoints>(null);

  const [sphere] = useMemo(() => {
    const count = isMobile ? 2000 : 5000;
    const radiusFactor = isMobile ? 1.2 : 1.5;

    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radiusFactor + Math.random() * 1.5;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return [positions];
  }, [isMobile]);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 25;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#20a985"
          size={isMobile ? 0.009 : 0.007}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
