"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface ImageRevealProps {
  images: string[];
}

interface MemoryCardProps {
  src: string;
  index: number;
}

function MemoryCard({
  src,
  index,
}: MemoryCardProps) {
  const [hasError, setHasError] =
    useState(false);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-[18px] border border-white/10 bg-[#12091d]/80 shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
      whileHover={{
        y: -8,
        scale: 1.025,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 18,
      }}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">

        {!hasError ? (
          <Image
            src={src}
            alt={`Memory ${index + 1}`}
            fill
            sizes="(max-width: 768px) 45vw, (max-width: 1200px) 25vw, 220px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => {
              setHasError(true);
            }}
            priority={index < 4}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#160a24] px-4 text-center">
            <div className="mb-3 h-10 w-10 rounded-full border border-purple-300/20 bg-purple-500/10 flex items-center justify-center">
              <span className="text-lg text-purple-200/50">
                ✦
              </span>
            </div>

            <p className="text-sm font-medium text-purple-100/70">
              Memory {index + 1}
            </p>

            <p className="mt-1 text-[10px] tracking-wide text-purple-200/35">
              Image unavailable
            </p>
          </div>
        )}

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Number */}

        <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 backdrop-blur-md">
          <span className="text-[9px] font-semibold tracking-[0.2em] text-white/60">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

      </div>
    </motion.div>
  );
}

export default function ImageReveal({
  images,
}: ImageRevealProps) {
  return (
    <div className="relative mx-auto w-full max-w-6xl">

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">

        {images.map((src, index) => (
          <MemoryCard
            key={`${src}-${index}`}
            src={src}
            index={index}
          />
        ))}

      </div>

    </div>
  );
}