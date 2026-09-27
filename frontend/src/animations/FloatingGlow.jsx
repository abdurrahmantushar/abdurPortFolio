import { motion } from "framer-motion";

const FloatingGlow = ({
  children,
  duration = 6,
  distance = 20,
}) => {
  return (
    <motion.div
      animate={{
        y: [0, -distance, 0],
        x: [0, 10, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingGlow;