import { useState } from "react";
import Sidebar from "../components/Sidebar";
import NotificationPopup from "../components/NotificationPopup";

export default function Layout({ children, darkMode }) {
  const [openNotifications, setOpenNotifications] = useState(false);

  return (
    <div
      className={
        "flex min-h-screen w-full transition-colors duration-300 " +
        (darkMode ? "bg-neutral-900 text-white" : "bg-[#f7f5f4] text-black")
      }
    >
      {/* SIDEBAR */}
      <Sidebar
        darkMode={darkMode}
        onOpenNotifications={() => setOpenNotifications(true)}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 relative">
        {children}

        {/* NOTIFICATION POPUP */}
        <NotificationPopup
          open={openNotifications}
          onClose={() => setOpenNotifications(false)}
        />
      </div>
    </div>
  );
}
