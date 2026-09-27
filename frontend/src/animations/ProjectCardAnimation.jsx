import { motion } from "framer-motion";

export const ProjectImageAnimation = ({ src, alt }) => {
  return (
    <motion.div
      className="relative overflow-hidden"
      whileHover="hover"
    >
      <motion.img
        src={src}
        alt={alt}
        className="h-52 w-full object-cover"
        variants={{
          hover: {
            scale: 1.1,
          },
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
        variants={{
          hover: {
            opacity: 1,
          },
        }}
        initial={{
          opacity: 0,
        }}
        transition={{
          duration: 0.4,
        }}
      />
    </motion.div>
  );
};

export const ProjectTechAnimation = ({ children, delay = 0 }) => {
  return (
    <motion.span
      initial={{
        opacity: 0,
        scale: 0.7,
        y: 10,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.4,
        delay,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.08,
      }}
    >
      {children}
    </motion.span>
  );
};

export const ProjectButtonAnimation = ({ children }) => {
  return (
    <motion.div
      whileHover={{
        y: -3,
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 18,
      }}
    >
      {children}
    </motion.div>
  );
};