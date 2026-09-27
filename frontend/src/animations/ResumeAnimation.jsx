import { motion } from "framer-motion";

export const TimelineAnimation = ({ children }) => {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
      }}
      style={{ transformOrigin: "top" }}
    >
      {children}
    </motion.div>
  );
};

export const ResumeItemAnimation = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export const SkillAnimation = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.08,
        boxShadow: "0 0 20px rgba(168, 85, 247, 0.35)",
      }}
    >
      {children}
    </motion.div>
  );
};