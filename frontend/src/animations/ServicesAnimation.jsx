import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const ServiceCardAnimation = ({ children, delay = 0 }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });

  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX - rect.width / 2);
    y.set(mouseY - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 70, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        y: -10,
        boxShadow: "0 25px 60px rgba(168, 85, 247, 0.18)",
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

export const ServiceIconAnimation = ({ children }) => {
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