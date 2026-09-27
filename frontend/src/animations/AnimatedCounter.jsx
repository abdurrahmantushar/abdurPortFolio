import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AnimatedCounter = ({
  value,
  duration = 2,
  suffix = "",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) return;

    let start = 0;
    const increment = numericValue / (duration * 60);

    const timer = setInterval(() => {
      start += increment;

      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        isInView
          ? {
              opacity: 1,
              scale: 1,
            }
          : {}
      }
      transition={{ duration: 0.4 }}
    >
      {count}
      {suffix}
    </motion.span>
  );
};

export default AnimatedCounter;