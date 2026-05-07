import { useEffect, useRef } from "react";

const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const nodes = nodesRef.current;
    const count = 120; // Significantly more stars
    nodesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      twinkle: Math.random() * Math.PI,
    }));

    // Floating shapes
    const shapes = Array.from({ length: 8 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 30 + 20,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      rotation: Math.random() * Math.PI * 2,
      rv: (Math.random() - 0.5) * 0.01,
    }));

    // Mouse trail
    let trail: { x: number; y: number; life: number; size: number }[] = [];
    // Shooting stars
    let stars: { x: number; y: number; vx: number; vy: number; length: number; opacity: number }[] = [];

    let animationFrameId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current as any[];
      const mouse = mouseRef.current;
      const maxDist = 120;

      // Handle trail
      if (mouse.x > 0) {
        trail.push({ x: mouse.x, y: mouse.y, life: 1, size: Math.random() * 2 + 1 });
      }
      trail = trail.filter(t => {
        t.life -= 0.02;
        if (t.life <= 0) return false;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.size * t.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${t.life * 0.3})`;
        ctx.fill();
        return true;
      });

      // Handle shapes
      for (const s of shapes) {
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rv;
        if (s.x < -50) s.x = canvas.width + 50;
        if (s.x > canvas.width + 50) s.x = -50;
        if (s.y < -50) s.y = canvas.height + 50;
        if (s.y > canvas.height + 50) s.y = -50;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.beginPath();
        ctx.moveTo(0, -s.size / 2);
        ctx.lineTo(s.size / 2, s.size / 2);
        ctx.lineTo(-s.size / 2, s.size / 2);
        ctx.closePath();
        ctx.strokeStyle = "rgba(45, 212, 191, 0.1)";
        ctx.stroke();
        ctx.restore();
      }

      // Handle shooting stars
      if (Math.random() < 0.02 && stars.length < 5) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 2),
          vx: Math.random() * 4 + 3,
          vy: Math.random() * 2 + 1,
          length: Math.random() * 100 + 50,
          opacity: 1
        });
      }

      stars = stars.filter(s => {
        s.x += s.vx;
        s.y += s.vy;
        s.opacity -= 0.015;
        
        if (s.opacity <= 0) return false;

        ctx.beginPath();
        const gradient = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * s.length/10, s.y - s.vy * s.length/10);
        gradient.addColorStop(0, `rgba(45, 212, 191, ${s.opacity * 0.8})`);
        gradient.addColorStop(1, "rgba(45, 212, 191, 0)");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * s.length/10, s.y - s.vy * s.length/10);
        ctx.stroke();
        return s.x < canvas.width + 100 && s.y < canvas.height + 100;
      });

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.twinkle += 0.03;

        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        // Mouse interaction
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 100) {
          n.x += (mdx / mDist) * 0.5;
          n.y += (mdy / mDist) * 0.5;
        }

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(45, 212, 191, ${opacity})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }

        // Draw star with twinkle
        const currentOpacity = 0.3 + Math.abs(Math.sin(n.twinkle)) * 0.4;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${currentOpacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        opacity: 0.9, 
        transform: "translate3d(0,0,0)",
        zIndex: 1 
      }}
    />
  );
};

export default GridBackground;
