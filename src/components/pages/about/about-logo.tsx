'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';

export function About3DLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // ─── Scene Setup ──────────────────────────────────────────────────
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Perspective Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // ─── Studio Lighting ──────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x007fff, 3.0, 15);
    rimLight.position.set(-5, -3, -5);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xd1f0ff, 1.0);
    fillLight.position.set(-5, 3, 2);
    scene.add(fillLight);

    // ─── Load GLB Model ──────────────────────────────────────────────
    const loader = new GLTFLoader();
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    let logoModel: THREE.Object3D | null = null;
    let initialScale = 1;

    loader.load(
      '/3d/logo.glb',
      (gltf) => {
        logoModel = gltf.scene;

        // Centering
        const box = new THREE.Box3().setFromObject(logoModel);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        logoModel.position.x += -center.x;
        logoModel.position.y += -center.y;
        logoModel.position.z += -center.z;

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.6 / maxDim;
        initialScale = scale;

        // Entrance scale
        logoGroup.scale.set(0, 0, 0);
        logoGroup.add(logoModel);

        // Customize mesh materials to match glossy brand cobalt/blue
        logoModel.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.material) {
              const materials = Array.isArray(child.material) ? child.material : [child.material];
              materials.forEach((m) => {
                if (m instanceof THREE.MeshStandardMaterial) {
                  m.color.set('#0183c4');
                  m.roughness = 0.15;
                  m.metalness = 0.85;
                  m.emissive.set('#001a47');
                  m.needsUpdate = true;
                }
              });
            }
          }
        });

        setLoading(false);

        // Entrance Animation
        gsap.to(logoGroup.scale, {
          x: initialScale,
          y: initialScale,
          z: initialScale,
          duration: 1.5,
          ease: 'elastic.out(1, 0.75)',
        });

        gsap.fromTo(
          logoGroup.rotation,
          { y: -Math.PI * 2, x: 0.1 },
          {
            y: 0,
            x: 0,
            duration: 1.8,
            ease: 'power4.out',
          }
        );
      },
      undefined,
      (error) => {
        console.error('An error happened while loading 3D logo.glb:', error);
      }
    );

    // ─── Resize Handler (debounced to avoid framebuffer realloc spam) ──
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    // ─── Visibility-aware Animation Loop ───────────────────────────────
    const clock = new THREE.Clock();
    let animId: number;
    let isVisible = true;

    // Pause rAF when component scrolls off-screen to save GPU cycles
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          clock.getDelta(); // reset clock delta to avoid time jumps
          tick();
        }
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(container);

    const tick = () => {
      if (!isVisible) {
        animId = 0;
        return;
      }

      const elapsedTime = clock.getElapsedTime();

      if (logoGroup && logoModel) {
        // Continuous gentle rotation (Slow and ambient, no mouse interactivity)
        logoGroup.rotation.y += 0.006;
        
        // Gentle floating wave
        logoGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.12;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    };
    tick();

    // ─── Cleanup ──────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      visibilityObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);

      // Kill GSAP entrance tweens targeting Three.js objects
      gsap.killTweensOf(logoGroup.scale);
      gsap.killTweensOf(logoGroup.rotation);

      // Dispose all Three.js geometries, materials, and textures
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((mat) => {
            if (mat) {
              Object.values(mat).forEach((value) => {
                if (value instanceof THREE.Texture) {
                  value.dispose();
                }
              });
              mat.dispose();
            }
          });
        }
      });

      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      <canvas ref={canvasRef} className="w-full h-full outline-none" />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent z-10">
          <div className="w-10 h-10 border-4 border-main border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
