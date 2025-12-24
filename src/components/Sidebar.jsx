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
  FiUser,
  FiX,
  FiPlus,
} from "react-icons/fi";
import logoMellow from "../assets/logoMellow.png";
import userAvatar from "../assets/anoava.jpg";
import NotificationsPanel from "./NotificationsPanel";
import ThemeToggle from "./ThemeToggle";

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
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [notifications, setNotifications] = useState(notificationFeed);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: <FiHome size={23} />, label: "Feed", path: "/" },
    { icon: <FiSearch size={23} />, label: "Explore", path: "/search" },
    { icon: <FiPlay size={23} />, label: "Reels", path: "/reels" },
    {icon: <FiPlus size={23} />, label: "Create", path: "/create" },
    { icon: <FiMessageCircle size={23} />, label: "Messages", path: "/messages" },
    { icon: <FiBell size={23} />, label: "Notifications", path: "/notifications" },
    { icon: <FiUser size={23} />, label: "Profile", path: "/profile" },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    // Jump home then reload to ensure the feed is fresh.
    navigate("/", { replace: true });
    setTimeout(() => navigate(0), 250);
  };

  const handleNavigate = (path) => {
    if (!path) return;
    setShowCreateMenu(false);
    navigate(path);
  };

  const handleCloseNotifications = () => setShowNotifications(false);
  const handleNotificationAction = (action, index) => {
    if (!action) return;
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`
        fixed top-0 left-0 h-screen z-40 shrink-0
        ${expanded ? "w-80 px-6" : "w-20 px-3"}
        transition-all duration-300 ease-in-out
        bg-[#6b5c51] dark:bg-[#23201B] text-white dark:text-[#EDE5DA]
        flex flex-col py-8 overflow-hidden shadow-lg
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

        <div className="flex-1 flex flex-col items-stretch justify-start">
          <nav className="flex flex-col gap-3">
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

              if (item.label === "Create") {
                return (
                  <div key={item.label} className="relative">
                    <button
                      onClick={() => setShowCreateMenu((prev) => !prev)}
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
                      title={item.label}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {expanded && <span className="text-sm font-medium">{item.label}</span>}
                    </button>

                    {showCreateMenu && expanded && (
                      <div className="mt-2 ml-10 mr-3 space-y-2">
                        <button
                          type="button"
                          onClick={() => handleNavigate("/create")}
                          className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium bg-white/15 hover:bg-white/20 transition"
                        >
                          Post
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNavigate("/create-story")}
                          className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium bg-white/15 hover:bg-white/20 transition"
                        >
                          Create story
                        </button>
                      </div>
                    )}
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
                  {expanded && <span className="text-sm font-medium">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-2 space-y-2">
          <ThemeToggle
            darkMode={darkMode}
            onToggle={() => onToggleDarkMode && onToggleDarkMode()}
            expanded={expanded}
          />

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
        notifications={notifications}
        onAction={handleNotificationAction}
      />
    </>
  );
}
