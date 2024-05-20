"use client";
import AvgNodeView from "@/components/AvgNodeView";
import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/stores/store";
import LanguageSelector from "@/components/LanguageSelector";
import AvgCanvasView from "@/components/AvgCanvasView";

export default function Home() {
  const mainRef = React.useRef<HTMLElement>(null);
  return (
    <Provider store={store}>
      <motion.main className="w-screen h-screen" ref={mainRef}>
        <motion.div
          // dragConstraints={mainRef}
          className="w-full h-full relative"
        >
          <AvgCanvasView />
        </motion.div>
      </motion.main>
    </Provider>
  );
}
