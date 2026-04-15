import { useCallback, useEffect, useRef, useState } from "react";

export const useTiltEffect = (intensity = 10) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      ref.current.style.transform = `perspective(1000px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translate3d(0,0,0)`;
    },
    [isTouchDevice, intensity]
  );

  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translate3d(0,0,0)";
    }
  }, []);

  return { ref, handleMouseMove, handleMouseLeave, isTouchDevice };
};
