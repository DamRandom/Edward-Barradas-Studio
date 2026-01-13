"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type ModelInfoProps = {
  name: string;
  image: string;
  age?: number;
  location?: string;
  description: string;
};

export default function ModelInfo({
  name,
  image,
  age,
  location,
  description,
}: ModelInfoProps) {
  return (
    <motion.div
      className="
        w-full
        flex
        flex-col
        sm:flex-row
        gap-8
        items-start
        border-t
        border-black/10
        pt-12
      "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Portrait */}
      <div
        className="
          relative
          w-32
          h-44
          shrink-0
          overflow-hidden
          shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]
        "
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="128px"
          className="object-cover grayscale"
        />
      </div>

      {/* Text */}
      <div className="max-w-xl">
        <h3
          className="
            text-sm
            uppercase
            tracking-[0.35em]
            text-black
          "
        >
          {name}
        </h3>

        {(age || location) && (
          <p className="mt-2 text-[11px] uppercase tracking-widest text-gray-500">
            {age && <span>{age} years</span>}
            {age && location && <span className="mx-2">·</span>}
            {location && <span>{location}</span>}
          </p>
        )}

        <p className="mt-6 text-sm leading-relaxed text-gray-700">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
