import { motion } from "motion/react";

export function Logo() {
  return (
    <motion.div
      className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-indigo-600/10 border border-indigo-500/20 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.img
        src="/shared/favicon.svg"
        alt="Miguel Motta Logo"
        className="w-5 h-5 transition-all duration-300 filter group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.8)] group-hover:brightness-125"
      />
      <motion.div
        className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </motion.div>
  );
}
