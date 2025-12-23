import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import FriendPopup from "../components/FriendPopup";

export default function Layout({ children, darkMode, onToggleDarkMode, routeKey }) {
  const [openFriends, setOpenFriends] = useState(false);

  const shellTone = darkMode
    ? "bg-neutral-900 text-white"
    : "bg-[#d9ccbe] text-black";

  const injectedChild =
    React.isValidElement(children) &&
    React.cloneElement(children, {
      onOpenFriends: () => setOpenFriends(true),
    });

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${shellTone} ${darkMode ? "dark" : ""}`}>
      <div className="relative min-h-screen w-full bg-inherit pl-20">
        {/* Sidebar stays fixed for every page */}
        <Sidebar darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />

        {/* Main content */}
        <main className="relative min-h-screen bg-inherit">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={routeKey}
              className="min-h-screen w-full bg-inherit"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.25, ease: "easeOut" } }}
              exit={{ opacity: 0, x: -12, transition: { duration: 0.2, ease: "easeIn" } }}
            >
              {injectedChild || children}
            </motion.div>
          </AnimatePresence>

          <FriendPopup open={openFriends} onClose={() => setOpenFriends(false)} />
        </main>
      </div>
    </div>
  );
}
