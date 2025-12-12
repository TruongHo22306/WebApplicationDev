import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import FriendPopup from "../components/FriendPopup";

export default function Layout({ children, darkMode, onToggleDarkMode }) {
  const [openFriends, setOpenFriends] = useState(false);

  const injectedChild =
    React.isValidElement(children) &&
    React.cloneElement(children, {
      onOpenFriends: () => setOpenFriends(true),
    });

  return (
    <div
      className={
        "flex min-h-screen w-full transition-colors duration-300 " +
        (darkMode ? "bg-neutral-900 text-white" : "bg-[#d9ccbe] text-black")
      }
    >
      {/* SIDEBAR */}
      <Sidebar
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 relative">
        {injectedChild || children}

        <FriendPopup
          open={openFriends}
          onClose={() => setOpenFriends(false)}
        />
      </div>
    </div>
  );
}
