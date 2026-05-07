import { useEffect, useRef } from "react";

const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

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

    let animationFrameId: number;
    const dotSpacing = 40;
    const dots: { x: number; y: number }[] = [];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const theme = document.documentElement.classList.contains("light") ? "light" : "dark";
      const dotColor = theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.05)";
      const highlightColor = "rgba(45, 212, 191, 0.4)";

      for (let x = 0; x < canvas.width; x += dotSpacing) {
        for (let y = 0; y < canvas.height; y += dotSpacing) {
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          ctx.beginPath();
          if (dist < 150) {
            const size = (1 - dist / 150) * 2 + 0.5;
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = highlightColor;
          } else {
            ctx.arc(x, y, 0.5, 0, Math.PI * 2);
            ctx.fillStyle = dotColor;
          }
          ctx.fill();
        }
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
        style={{ opacity: 0.6, transform: "translate3d(0,0,0)" }}
      />
    </div>
  );
};

export default GridBackground;
