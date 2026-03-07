"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const Loading = () => {
  const items = [
    { label: "Text Search", color: "bg-red-500", x: -120, y: -20 },
    { label: "Vibe Search", color: "bg-red-400", x: -40, y: 20 },
    { label: "Image Search", color: "bg-red-600", x: 40, y: -20 },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full bg-slate-50 overflow-hidden">
      {/* Search Header */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 mb-4">
          <span className="text-rose-500">🔍</span>
          <span className="text-slate-600 font-medium italic">
            "Traditional Diwali white kurti..."
          </span>
        </div>
        <p className="text-slate-400 text-sm animate-pulse">
          Getting your vibes...
        </p>
      </div>

      <div className="relative flex items-center justify-center h-64 w-full">
        {/* The Central "Result" Glow - Appears when cards merge */}
        <motion.div
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-40 h-52 bg-rose-200 blur-3xl rounded-full"
        />

        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ x: item.x, y: item.y, opacity: 0, scale: 0.5 }}
            animate={{
              // 1. Scatter/Float
              x: [item.x, item.x + (i % 2 === 0 ? 5 : -5), 0, 0],
              y: [item.y, item.y + (i % 2 === 0 ? -10 : 10), 0, 0],
              // 2. Merge/Scale
              scale: [0.9, 1, 1.1, 0.8],
              // 3. Fade into the "Result"
              opacity: [0, 1, 1, 0],
              rotate: [0, i % 2 === 0 ? 5 : -5, 0, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              times: [0, 0.4, 0.8, 1], // Timing segments: 0-40% floating, 40-80% merging, 80-100% reset
              ease: "easeInOut",
              delay: i * 0.1,
            }}
            className="absolute"
          >
            <Card
              className={`${item.color} w-28 h-40 shadow-2xl border-none flex flex-col items-center justify-end p-3 overflow-hidden`}
            >
              {/* Silhouette Placeholder */}
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <div className="w-16 h-24 bg-white/10 rounded-t-full mt-8" />
              </div>

              {/* Label */}
              <div className="z-10 bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm">
                <span className="text-[10px] font-bold text-slate-800 tracking-tighter uppercase">
                  {item.label}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}

        {/* The "Final Result" Card Shadow - Briefly flashes at the end of the merge */}
        <motion.div
          animate={{
            opacity: [0, 0, 1, 0],
            scale: [0.8, 0.8, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            times: [0, 0.7, 0.85, 1],
          }}
          className="absolute w-32 h-44 bg-white border-2 border-rose-100 rounded-xl shadow-2xl flex items-center justify-center"
        >
          <span className="text-2xl">✨</span>
        </motion.div>
      </div>

      {/* Progress Line */}
      <div className="mt-12 w-64 h-1 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-rose-500"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default Loading;
