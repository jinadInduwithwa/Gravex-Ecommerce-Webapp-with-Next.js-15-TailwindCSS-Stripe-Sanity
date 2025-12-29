"use client";
import { motion } from "motion/react";

const Loading = () => {
  return (
    <div className="fixed min-h-screen w-full bg-white/50 left-0 top-0 flex items-center justify-center z-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        className="w-16 h-16 border-4 border-black border-t-transparent rounded-full"
      />
    </div>
  );
};

export default Loading;
