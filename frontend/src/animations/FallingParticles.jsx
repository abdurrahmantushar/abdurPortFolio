import { motion } from "framer-motion";

const drops = Array.from({ length: 18 });

export default function PageLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[20] overflow-hidden">
      {drops.map((_, index) => (
        <motion.div
          key={index}
          className="absolute top-[-30px] h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.9)]"
          style={{
            left: `${3 + index * 5.5}%`,
          }}
          animate={{
            y: ["0vh", "115vh"],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 0.8],
          }}
          transition={{
            duration: 3 + (index % 3),
            delay: index * 0.35,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}