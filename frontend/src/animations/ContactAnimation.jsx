import { motion } from "framer-motion";

export const ContactAnimation = {
  header: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, ease: "easeOut" },
  },

  left: {
    initial: { opacity: 0, x: -60 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.8, ease: "easeOut" },
  },

  right: {
    initial: { opacity: 0, x: 60 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.8, ease: "easeOut" },
  },

  item: {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, ease: "easeOut" },
  },

  button: {
    whileHover: {
      scale: 1.02,
      y: -2,
    },
    whileTap: {
      scale: 0.98,
    },
    transition: {
      duration: 0.2,
    },
  },

  social: {
    whileHover: {
      scale: 1.05,
      y: -4,
    },
    whileTap: {
      scale: 0.97,
    },
    transition: {
      duration: 0.2,
    },
  },

  glow: {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.1, 0.18, 0.1],
    },
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export { motion };