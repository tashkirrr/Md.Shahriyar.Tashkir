import { motion } from "framer-motion";

const FloatingBlobs = () => {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1, pointerEvents: "none" }}>
      <div className="absolute inset-0 overflow-hidden opacity-50">
        {/* Primary Blob - Reduced blur and size */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[5%] -left-[5%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[80px]"
      />
      
      {/* Accent Blob - Simplified movement */}
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[30%] -right-[5%] w-[25%] h-[25%] bg-accent/10 rounded-full blur-[70px]"
      />
    </div>
  </div>
  );
};

export default FloatingBlobs;
