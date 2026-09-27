import { motion } from "framer-motion";

export const AboutLeftAnimation = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -180 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export const AboutRightAnimation = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 180 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export const AboutCardAnimation = ({
  children,
  className = "",
  delay = 0,
}) => {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 100,
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 50px rgba(168, 85, 247, 0.2)",
      }}
    >
      {children}
    </motion.div>
  );
};

export const AboutGlowAnimation = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      animate={{
        x: [0, 40, 0, -40, 0],
        y: [0, -30, 0, 30, 0],
        scale: [1, 1.15, 1, 0.9, 1],
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