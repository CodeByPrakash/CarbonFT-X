import { useRef, useEffect } from 'react';

interface Particle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  opacity: number;
  yOffset: number;
  color: string;
}

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rotation = 0;

    const colors = ['#52B788', '#2D6A4F', '#00C9A7', '#D8F3DC'];
    const particles: Particle[] = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 140 + Math.random() * 60,
        speed: 0.002 + Math.random() * 0.004,
        size: 3 + Math.random() * 8,
        opacity: 0.2 + Math.random() * 0.5,
        yOffset: (Math.random() - 0.5) * 80,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const stars: { x: number; y: number; r: number; opacity: number; speed: number }[] = [];
    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: 0.5 + Math.random() * 1.5,
        opacity: 0.2 + Math.random() * 0.6,
        speed: 2 + Math.random() * 4,
      });
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const parent = canvas!.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.scale(dpr, dpr);
    }

    function drawGlobe(cx: number, cy: number, globeRadius: number) {
      if (!ctx) return;

      // Mouse influence
      const mx = (mouseRef.current.x - 0.5) * 0.3;
      const my = (mouseRef.current.y - 0.5) * 0.15;

      // Atmosphere glow
      const gradient = ctx.createRadialGradient(cx, cy, globeRadius * 0.8, cx, cy, globeRadius * 1.6);
      gradient.addColorStop(0, 'rgba(82, 183, 136, 0.15)');
      gradient.addColorStop(0.5, 'rgba(0, 201, 167, 0.08)');
      gradient.addColorStop(1, 'rgba(82, 183, 136, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Globe base
      const globeGrad = ctx.createRadialGradient(
        cx - globeRadius * 0.3, cy - globeRadius * 0.3, 0,
        cx, cy, globeRadius
      );
      globeGrad.addColorStop(0, '#1a4d35');
      globeGrad.addColorStop(0.6, '#0D2818');
      globeGrad.addColorStop(1, '#061a10');

      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius, 0, Math.PI * 2);
      ctx.fillStyle = globeGrad;
      ctx.fill();

      // Continents (simplified as blobs)
      const continentColor = '#1a3d2a';
      ctx.fillStyle = continentColor;

      const continents = [
        { lat: 0.3, lon: 0, w: 0.5, h: 0.4 },    // Africa/Europe
        { lat: 0.1, lon: -1.8, w: 0.4, h: 0.5 },  // Americas
        { lat: 0.2, lon: 1.5, w: 0.45, h: 0.35 }, // Asia
        { lat: -0.5, lon: 1.8, w: 0.25, h: 0.2 }, // Australia
      ];

      continents.forEach(cont => {
        const lat = cont.lat + my;
        const lon = cont.lon + rotation + mx;
        const px = cx + Math.sin(lon) * Math.cos(lat) * globeRadius * 0.9;
        const py = cy + Math.sin(lat) * globeRadius * 0.9;

        // Only draw if facing front
        if (Math.cos(lon) > -0.3) {
          ctx.beginPath();
          ctx.ellipse(px, py, cont.w * globeRadius * 0.5, cont.h * globeRadius * 0.5, lon * 0.1, 0, Math.PI * 2);
          ctx.fill();

          // Add some texture/noise
          for (let j = 0; j < 5; j++) {
            const ox = (Math.random() - 0.5) * cont.w * globeRadius;
            const oy = (Math.random() - 0.5) * cont.h * globeRadius;
            ctx.beginPath();
            ctx.arc(px + ox, py + oy, 2 + Math.random() * 4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(45, 106, 79, ${0.3 + Math.random() * 0.3})`;
            ctx.fill();
          }
          ctx.fillStyle = continentColor;
        }
      });

      // Grid lines
      ctx.strokeStyle = 'rgba(82, 183, 136, 0.1)';
      ctx.lineWidth = 1;

      // Latitude lines
      for (let i = -2; i <= 2; i++) {
        const lat = (i / 3) * Math.PI * 0.5;
        const r = Math.cos(lat) * globeRadius;
        const y = cy + Math.sin(lat) * globeRadius;
        ctx.beginPath();
        ctx.ellipse(cx, y, r, r * 0.15, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Longitude lines
      for (let i = 0; i < 6; i++) {
        const lon = (i / 6) * Math.PI * 2 + rotation;
        ctx.beginPath();
        ctx.ellipse(
          cx + Math.sin(lon) * globeRadius * 0.3,
          cy,
          globeRadius * 0.15,
          globeRadius,
          0, 0, Math.PI * 2
        );
        ctx.stroke();
      }

      // Rim glow (Fresnel effect)
      const rimGrad = ctx.createRadialGradient(cx, cy, globeRadius * 0.85, cx, cy, globeRadius * 1.05);
      rimGrad.addColorStop(0, 'rgba(82, 183, 136, 0)');
      rimGrad.addColorStop(0.8, 'rgba(0, 201, 167, 0.3)');
      rimGrad.addColorStop(1, 'rgba(82, 183, 136, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius * 1.05, 0, Math.PI * 2);
      ctx.fillStyle = rimGrad;
      ctx.fill();

      // Orbiting particles (leaves)
      particles.forEach((p) => {
        p.angle += p.speed;
        const px = cx + Math.cos(p.angle) * p.radius;
        const py = cy + Math.sin(p.angle) * p.radius * 0.4 + p.yOffset;

        // Simple leaf shape
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(p.angle * 2);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Stars
      stars.forEach((star) => {
        const twinkle = Math.sin(time / 1000 * star.speed) * 0.3 + 0.5;
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();
      });

      // Globe
      const globeRadius = Math.min(width, height) * 0.28;
      const cx = width / 2;
      const cy = height / 2 - 20;

      rotation += 0.003;
      drawGlobe(cx, cy, globeRadius);

      frameRef.current = requestAnimationFrame(draw);
    }

    resize();
    frameRef.current = requestAnimationFrame(draw);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
        className="opacity-90"
      />
    </div>
  );
}
