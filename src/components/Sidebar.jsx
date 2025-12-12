import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiSearch,
  FiPlay,
  FiSettings,
  FiLogOut,
  FiMessageCircle,
  FiBell,
  FiX,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import logoMellow from "../assets/logoMellow.png";
import NotificationsPanel from "./NotificationsPanel";

const notificationFeed = [
  {
    title: "New follow request",
    subtitle: "alley_toxicc + 19 others",
    unread: true,
    actions: [],
  },
  {
    title: "nhtheienn_ sent a follow request",
    subtitle: "4h ago",
    actions: ["Accept", "Delete"],
  },
  {
    title: "ericdoan_gudmorning and others liked your post",
    subtitle: "Dec 01",
    actions: [],
  },
  {
    title: "zina_zkk sent a follow request",
    subtitle: "Nov 19",
    actions: ["Accept", "Delete"],
  },
];

export default function Sidebar({ darkMode = false, onToggleDarkMode }) {
  const [expanded, setExpanded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: <FiHome size={23} />, label: "Feed", path: "/" },
    { icon: <FiSearch size={23} />, label: "Explore", path: "/search" },
    { icon: <FiPlay size={23} />, label: "Reels", path: "/reels" },
    { icon: <FiMessageCircle size={23} />, label: "Messages", path: "/messages" },
    { icon: <FiBell size={23} />, label: "Notifications", path: "/notifications" },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    // Slight delay to let the animation play before reloading.
    setTimeout(() => navigate(0), 400);
  };

  const handleNavigate = (path) => {
    if (!path) return;
    navigate(path);
  };

  const handleCloseNotifications = () => setShowNotifications(false);

  return (
    <>
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`
        sticky top-0 h-screen
        ${expanded ? "w-80 px-6" : "w-20 px-3"}
        transition-all duration-300 ease-in-out
        bg-[#6b5c51] dark:bg-[#23201B] text-white dark:text-[#EDE5DA]
        flex flex-col py-8 overflow-hidden
      shadow-lg
    `}
  >
        {/* Brand logo */}
        <button
          type="button"
          onClick={handleRefresh}
          className={`flex items-center ${expanded ? "justify-start gap-3" : "justify-center"} mb-6`}
          title="Refresh"
        >
          <img
            src={logoMellow}
            alt="Mellow logo"
            className={`w-16 h-16 object-contain transition-transform duration-500 ease-out ${refreshing ? "scale-95 rotate-180" : ""}`}
          />
          {expanded && <div className="leading-tight"></div>}
        </button>

        <div className="flex-1 flex flex-col items-stretch justify-center">
          <nav className="flex flex-col justify-center gap-3">
            {menuItems.map((item) => {
              const active = location.pathname === item.path;

              if (item.label === "Notifications") {
                return (
                  <div key={item.label} className="relative">
                    <button
                      onClick={() => setShowNotifications(true)}
                      className={`
                      flex items-center gap-3 w-full px-3 py-3 rounded-xl
                      transition-colors duration-150
                      ${expanded ? "justify-start text-left" : "justify-center"}
                      ${active ? "bg-white/20 text-white" : "text-white/90 hover:bg-white/10 dark:hover:bg-[#2B2722]"}
                    `}
                    title={item.label}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {expanded && <span className="text-sm font-medium">{item.label}</span>}
                    </button>
                  </div>
                );
              }

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavigate(item.path)}
                  className={`
                  flex items-center gap-3 w-full px-3 py-3 rounded-xl
                  transition-colors duration-150
                  ${expanded ? "justify-start text-left" : "justify-center"}
                  ${
                    active
                      ? "bg-white/20 text-white dark:text-[#EDE5DA]"
                      : "text-white/90 hover:bg-white/10 dark:hover:bg-[#2B2722] dark:text-[#EDE5DA]"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                {expanded && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-2 space-y-2">
          <button
            onClick={() => onToggleDarkMode && onToggleDarkMode()}
            className={`
            flex items-center gap-3 w-full px-3 py-3 rounded-xl
            transition-colors duration-150
            ${expanded ? "justify-start text-left" : "justify-center"}
            text-white/80 hover:bg-white/10 hover:text-white
          `}
          >
            {darkMode ? <FiSun size={23} /> : <FiMoon size={23} />}
            {expanded && (
              <span className="text-sm font-medium">
                {darkMode ? "Light mode" : "Dark mode"}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavigate("/settings")}
            className={`
            flex items-center gap-3 w-full px-3 py-3 rounded-xl
            transition-colors duration-150
            ${expanded ? "justify-start text-left" : "justify-center"}
            ${
              location.pathname === "/settings"
                ? "bg-white/20 text-white dark:text-[#EDE5DA]"
                : "text-white/80 hover:bg-white/10 hover:text-white dark:text-[#EDE5DA] dark:hover:bg-[#2B2722]"
            }
          `}
          >
            <FiSettings size={23} />
            {expanded && <span className="text-sm font-medium">Settings</span>}
          </button>

          <button
            onClick={() => handleNavigate("/login")}
            className={`
            flex items-center gap-3 w-full px-3 py-3 rounded-xl
            transition-colors duration-150
            ${expanded ? "justify-start text-left" : "justify-center"}
            text-white/80 hover:bg-white/10 hover:text-white
          `}
          >
            <FiLogOut size={23} />
            {expanded && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      <NotificationsPanel
        open={showNotifications}
        onClose={handleCloseNotifications}
        notifications={notificationFeed}
      />
    </>
  );
}
