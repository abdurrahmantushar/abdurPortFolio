import { motion } from "framer-motion";

const SlideRight = ({ children, delay = 0, duration = 0.6, distance = 60 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -distance }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default SlideRight;