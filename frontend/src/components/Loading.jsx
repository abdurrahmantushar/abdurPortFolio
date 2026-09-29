import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-purple-950 via-gray-950 to-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12),transparent_45%)]" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full border border-purple-500/20"
            animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0.2, 0.8] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute h-14 w-14 rounded-full border-2 border-purple-500/30 border-t-purple-400"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="h-3 w-3 rounded-full bg-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.9)]" />
        </div>

        <motion.h2
          className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-purple-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Loading
        </motion.h2>

        <motion.div
          className="mt-3 h-1 w-32 overflow-hidden rounded-full bg-white/10"
        >
          <motion.div
            className="h-full w-12 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.8)]"
            animate={{ x: [-48, 128] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <p className="mt-4 text-xs text-gray-500">
          Preparing your project...
        </p>
      </div>
    </div>
  );
};

export default Loading;