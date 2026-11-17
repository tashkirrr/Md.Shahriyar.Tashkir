import { motion, type MotionProps } from "framer-motion";
import { useTiltEffect } from "@/hooks/useTiltEffect";

interface TiltCardProps extends MotionProps {
  className?: string;
  children?: React.ReactNode;
}

const TiltCard = ({
  className,
  children,
  ...props
}: TiltCardProps) => {
  const { ref, handleMouseMove, handleMouseLeave } = useTiltEffect();

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default TiltCard;
