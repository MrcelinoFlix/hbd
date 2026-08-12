"use client";

import React from "react";
import { motion } from "framer-motion";

interface ImageRevealProps {
  images: string[];
}

export default function ImageReveal({ images }: ImageRevealProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {images.map((image, index) => (
          <motion.div
            key={`${image}-${index}`}
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.6,
              delay: (index % 4) * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -8,
              scale: 1.025,
              transition: {
                duration: 0.25,
                ease: "easeOut",
              },
            }}
            className="group relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-[#160a24]/80 shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
              {/* Glow ketika hover */}
              <div className="absolute inset-0 z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-purple-500/30 via-transparent to-transparent pointer-events-none" />

              {/* Image */}
              <img
                src={image}
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Nomor foto */}
              <div className="absolute bottom-3 left-3 z-20">
                <span className="text-[10px] md:text-xs font-medium tracking-[0.18em] text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  MEMORY {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}