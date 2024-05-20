"use client";
import AvgNodeView from "@/components/AvgNodeView";
import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/stores/store";
import LanguageSelector from "@/components/LanguageSelector";

export default function Home() {
  const mainRef = React.useRef<HTMLElement>(null);
  return (
    <Provider store={store}>
      <motion.main className="w-full h-full m-16" ref={mainRef}>
        <motion.div
          // dragConstraints={mainRef}
          className="absolute bg-base-200 w-auto h-auto p-16 rounded-lg shadow-lg"
        >
          <AvgNodeView />
        </motion.div>
        <LanguageSelector />
      </motion.main>
    </Provider>
  );
}
