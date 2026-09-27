import { motion, AnimatePresence } from "framer-motion";

export const NavbarAnimation = ({ children, scrolled }) => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`fixed left-0 top-0 z-50 w-full border-b transition-all duration-500 ${
        scrolled
          ? "border-purple-500/30 bg-black/60 shadow-xl shadow-purple-500/10 backdrop-blur-2xl"
          : "border-white/10 bg-black/80 backdrop-blur-xl"
      }`}
    >
      {children}
    </motion.nav>
  );
};

export const MobileMenuAnimation = ({ children, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.35,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const NavbarLinkAnimation = ({ children }) => {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      transition={{
        duration: 0.2,
      }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};