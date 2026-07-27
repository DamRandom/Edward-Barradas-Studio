"use client";

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function LoadingSpinner({
  fullScreen = false,
  size = "md",
}: LoadingSpinnerProps) {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
    : "flex flex-col items-center justify-center p-4 w-full h-full";

  const spinnerSizes = {
    sm: "h-8 w-8",
    md: "h-14 w-14",
    lg: "h-24 w-24",
  };

  const currentSize = spinnerSizes[size];

  return (
    <div className={containerClasses} aria-live="polite" aria-busy="true">
      <div className="relative flex items-center justify-center">
        {/* Outer slow-spinning thin ring */}
        <motion.div
          className={`${currentSize} rounded-full border border-black/[0.04] absolute`}
          style={{ borderTopColor: "var(--accent-gold)" }}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: "linear",
          }}
        />

        {/* Inner reverse-spinning golden ring (only for larger versions) */}
        {size !== "sm" && (
          <motion.div
            className="h-10 w-10 rounded-full border border-transparent absolute"
            style={{ borderBottomColor: "var(--accent-gold)", opacity: 0.6 }}
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "linear",
            }}
          />
        )}
      </div>

      {/* Decorative Brand Text Loading Animation */}
      {size !== "sm" && (
        <motion.p
          className="mt-6 text-[8px] uppercase tracking-[0.45em] text-foreground/40 font-light text-center select-none"
          initial={{ opacity: 0.3, letterSpacing: "0.3em" }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            letterSpacing: ["0.3em", "0.5em", "0.3em"],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Edward Barradas
        </motion.p>
      )}
    </div>
  );
}
