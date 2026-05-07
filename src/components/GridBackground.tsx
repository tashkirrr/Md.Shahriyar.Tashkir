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
    const count = 45; // Increased slightly for more life
    nodesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    // Shooting stars logic
    let stars: { x: number; y: number; vx: number; vy: number; length: number; opacity: number }[] = [];

    let animationFrameId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      const maxDist = 180; // Slightly increased for more connections

      // Handle shooting stars
      if (Math.random() < 0.01 && stars.length < 3) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 2),
          vx: Math.random() * 4 + 2,
          vy: Math.random() * 2 + 1,
          length: Math.random() * 80 + 40,
          opacity: 1
        });
      }

      stars = stars.filter(s => {
        s.x += s.vx;
        s.y += s.vy;
        s.opacity -= 0.01;
        
        if (s.opacity <= 0) return false;

        ctx.beginPath();
        const gradient = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * s.length/10, s.y - s.vy * s.length/10);
        gradient.addColorStop(0, `rgba(45, 212, 191, ${s.opacity * 0.6})`);
        gradient.addColorStop(1, "rgba(45, 212, 191, 0)");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * s.length/10, s.y - s.vy * s.length/10);
        ctx.stroke();
        return s.x < canvas.width + 100 && s.y < canvas.height + 100;
      });

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        // Mouse interaction
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 120) {
          n.x += (mdx / mDist) * 0.8;
          n.y += (mdy / mDist) * 0.8;
        }

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.25;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(45, 212, 191, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(45, 212, 191, 0.5)";
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
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1, pointerEvents: "none" }}>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: 0.7, transform: "translate3d(0,0,0)" }}
      />
    </div>
  );
};

export default GridBackground;
