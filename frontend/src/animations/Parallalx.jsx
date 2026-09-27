import { motion, useScroll, useTransform } from "framer-motion";

const Parallax = ({ children, distance = 100 }) => {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 800], [0, distance]);

  return <motion.div style={{ y }}>{children}</motion.div>;
};

export default Parallax;