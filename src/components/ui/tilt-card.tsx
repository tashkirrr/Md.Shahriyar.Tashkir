import { motion, type MotionProps } from "framer-motion";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { useTiltEffect } from "@/hooks/useTiltEffect";

interface TiltCardProps extends MotionProps {
  as?: ElementType;
  className?: string;
  children?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

const TiltCard = ({
  as = "div",
  className,
  children,
  ...props
}: TiltCardProps) => {
  const { ref, handleMouseMove, handleMouseLeave } = useTiltEffect();
  const Component = motion[as as keyof typeof motion] || motion.div;

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
};

export default TiltCard;
