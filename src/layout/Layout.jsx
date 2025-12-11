import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import NotificationPopup from "../components/NotificationPopup";
import FriendPopup from "../components/FriendPopup";

export default function Layout({ children, darkMode, onToggleDarkMode }) {
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openFriends, setOpenFriends] = useState(false);

  const injectedChild =
    React.isValidElement(children) &&
    React.cloneElement(children, {
      onOpenNotifications: () => setOpenNotifications(true),
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
        onOpenNotifications={() => setOpenNotifications(true)}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 relative">
        {injectedChild || children}

        {/* NOTIFICATION POPUP */}
        <NotificationPopup
          open={openNotifications}
          onClose={() => setOpenNotifications(false)}
        />

        <FriendPopup
          open={openFriends}
          onClose={() => setOpenFriends(false)}
        />
      </div>
    </div>
  );
}
