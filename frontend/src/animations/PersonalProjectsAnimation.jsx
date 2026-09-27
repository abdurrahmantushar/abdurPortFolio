import { motion } from "framer-motion";

export const PersonalHeaderAnimation = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export const PersonalProjectCardAnimation = ({
  children,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 70,
        scale: 0.94,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 25px 60px rgba(168, 85, 247, 0.18)",
      }}
    >
      {children}
    </motion.div>
  );
};

export const PersonalIconAnimation = ({ children }) => {
  return (
    <motion.div
      whileHover={{
        rotate: 8,
        scale: 1.12,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  );
};

export const PersonalGlowAnimation = ({ children }) => {
  return (
    <motion.div
      animate={{
        x: [0, 35, 0, -35, 0],
        y: [0, -25, 0, 25, 0],
        scale: [1, 1.1, 1, 0.92, 1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};