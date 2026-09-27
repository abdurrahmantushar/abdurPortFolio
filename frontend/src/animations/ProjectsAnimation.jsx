import { motion } from "framer-motion";

export const ProjectsHeaderAnimation = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export const ProjectCardAnimation = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 80,
        scale: 0.94,
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
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -10,
        scale: 1.015,
        boxShadow: "0 25px 60px rgba(168, 85, 247, 0.18)",
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

export const ProjectIconAnimation = ({ children }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.15,
        rotate: 8,
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

export const ProjectLinkAnimation = ({ children }) => {
  return (
    <motion.div
      whileHover={{
        x: 4,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
};