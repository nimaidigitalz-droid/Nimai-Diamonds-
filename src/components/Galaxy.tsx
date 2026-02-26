import React, { useRef, useEffect, useMemo } from 'react';

interface GalaxyProps {
  mouseRepulsion?: boolean;
  mouseInteraction?: boolean;
  density?: number;
  glowIntensity?: number;
  saturation?: number;
  hueShift?: number;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  repulsionStrength?: number;
  autoCenterRepulsion?: number;
  starSpeed?: number;
  speed?: number;
}

const Galaxy: React.FC<GalaxyProps> = ({
  mouseRepulsion = true,
  mouseInteraction = true,
  density = 1,
  glowIntensity = 0.3,
  saturation = 0,
  hueShift = 140,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.1,
  repulsionStrength = 2,
  autoCenterRepulsion = 0,
  starSpeed = 0.5,
  speed = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width: number;
    let height: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = canvas.width = parent.clientWidth;
        height = canvas.height = parent.clientHeight;
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const particleCount = Math.floor(1000 * density);
    const particles: any[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.max(width, height) * 0.8;
      particles.push({
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        baseX: width / 2 + Math.cos(angle) * radius,
        baseY: height / 2 + Math.sin(angle) * radius,
        size: Math.random() * 2 + 0.5,
        angle: angle,
        radius: radius,
        speed: (Math.random() * 0.001 + 0.0005) * starSpeed * speed,
        twinkle: Math.random() * Math.PI,
        hue: (hueShift + Math.random() * 20) % 360,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (mouseInteraction) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Background glow
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height));
      gradient.addColorStop(0, `hsla(${hueShift}, ${saturation}%, 10%, ${glowIntensity * 0.2})`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        // Rotation
        p.angle += p.speed * rotationSpeed;
        p.x = width / 2 + Math.cos(p.angle) * p.radius;
        p.y = height / 2 + Math.sin(p.angle) * p.radius;

        // Mouse interaction
        if (mouseInteraction && mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            if (mouseRepulsion) {
              const force = (150 - dist) / 150;
              p.x -= (dx / dist) * force * repulsionStrength * 10;
              p.y -= (dy / dist) * force * repulsionStrength * 10;
            }
          }
        }

        // Twinkle
        p.twinkle += 0.05 * speed;
        const opacity = 0.5 + Math.sin(p.twinkle) * twinkleIntensity;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, ${saturation}%, 80%, ${opacity})`;
        ctx.fill();

        // Subtle glow for larger stars
        if (p.size > 1.5) {
          ctx.shadowBlur = 5 * glowIntensity;
          ctx.shadowColor = `hsla(${p.hue}, ${saturation}%, 80%, ${opacity})`;
        } else {
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, glowIntensity, saturation, hueShift, twinkleIntensity, rotationSpeed, repulsionStrength, mouseRepulsion, mouseInteraction, starSpeed, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ background: 'transparent' }}
    />
  );
};

export default Galaxy;
