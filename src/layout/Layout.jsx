import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import FriendPopup from "../components/FriendPopup";

export default function Layout({ children, darkMode, onToggleDarkMode }) {
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
    <div className={`min-h-screen w-full transition-colors duration-300 ${shellTone}`}>
      <div className="relative min-h-screen w-full bg-inherit pl-20">
        {/* Sidebar stays fixed for every page */}
        <Sidebar darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />

        {/* Main content */}
        <main className="relative min-h-screen bg-inherit">
          <div className="min-h-screen w-full bg-inherit">
            {injectedChild || children}
          </div>

          <FriendPopup open={openFriends} onClose={() => setOpenFriends(false)} />
        </main>
      </div>
    </div>
  );
}
