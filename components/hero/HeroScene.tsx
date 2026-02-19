"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import {
    deepSpaceVertexShader,
    deepSpaceFragmentShader,
    starVertexShader,
    starFragmentShader,
} from "@/lib/three/shaders";

function DeepSpaceBackground() {
    const mesh = useRef<THREE.Mesh>(null);
    const { viewport, size } = useThree();

    const uniforms = useMemo(
        () => ({
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector2(size.width, size.height) },
            u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        }),
        [size]
    );

    useFrame((state) => {
        if (mesh.current) {
            (mesh.current.material as THREE.ShaderMaterial).uniforms.u_time.value =
                state.clock.elapsedTime;
            (mesh.current.material as THREE.ShaderMaterial).uniforms.u_mouse.value.set(
                state.pointer.x * 0.5 + 0.5,
                state.pointer.y * 0.5 + 0.5
            );
        }
    });

    return (
        <mesh ref={mesh} position={[0, 0, -50]} scale={[viewport.width * 2, viewport.height * 2, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                vertexShader={deepSpaceVertexShader}
                fragmentShader={deepSpaceFragmentShader}
                uniforms={uniforms}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

function Starfield() {
    const mesh = useRef<THREE.Points>(null);
    const count = 5000;

    const [positions, sizes, depths, twinkleOffsets] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const depths = new Float32Array(count);
        const twinkleOffsets = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

            sizes[i] = Math.random() * 2;
            depths[i] = Math.random();
            twinkleOffsets[i] = Math.random() * 10;
        }

        return [positions, sizes, depths, twinkleOffsets];
    }, []);

    const uniforms = useMemo(
        () => ({
            u_time: { value: 0 },
            u_pixelRatio: { value: typeof window !== 'undefined' ? window.devicePixelRatio : 1 },
            u_scrollDepth: { value: 0 },
        }),
        []
    );

    useFrame((state) => {
        if (mesh.current) {
            (mesh.current.material as THREE.ShaderMaterial).uniforms.u_time.value =
                state.clock.elapsedTime;
        }
    });

    // Connect GSAP scroll to uniforms
    useEffect(() => {
        if (!mesh.current) return;

        ScrollTrigger.create({
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            onUpdate: (self) => {
                if (mesh.current) {
                    (mesh.current.material as THREE.ShaderMaterial).uniforms.u_scrollDepth.value = self.progress * 20;
                }
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        }
    }, []);

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={sizes}
                    itemSize={1}
                    args={[sizes, 1]}
                />
                <bufferAttribute
                    attach="attributes-depth"
                    count={count}
                    array={depths}
                    itemSize={1}
                    args={[depths, 1]}
                />
                <bufferAttribute
                    attach="attributes-twinkleOffset"
                    count={count}
                    array={twinkleOffsets}
                    itemSize={1}
                    args={[twinkleOffsets, 1]}
                />
            </bufferGeometry>
            <shaderMaterial
                vertexShader={starVertexShader}
                fragmentShader={starFragmentShader}
                uniforms={uniforms}
                transparent
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                vertexColors
            />
        </points>
    );
}

function FloatingFrame() {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (group.current) {
            group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
            group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
        }
    });

    return (
        <group ref={group} position={[3, 0, -5]}>
            {/* Frame Border */}
            <mesh position={[0, 0, -0.05]}>
                <boxGeometry args={[4.2, 5.2, 0.1]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Canvas Area (Placeholder for Art) */}
            <mesh>
                <planeGeometry args={[4, 5]} />
                <meshBasicMaterial color="#0F1B2E" />
            </mesh>

            {/* Inner glow/details could go here */}
        </group>
    );
}

export default function HeroScene() {
    const { camera } = useThree();

    useEffect(() => {
        // Camera Scroll Animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            },
        });

        tl.to(camera.position, {
            z: 20,
            ease: "none",
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [camera]);

    return (
        <>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />

            <DeepSpaceBackground />
            <Starfield />
            {/* Floating Frame */}
            <FloatingFrame />
        </>
    );
}
