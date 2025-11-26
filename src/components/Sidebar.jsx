import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiSearch,
  FiPlay,
  FiPlus,
  FiHeart,
  FiMessageCircle,
  FiMenu,
} from "react-icons/fi";

export default function Sidebar({ darkMode, onOpenNotifications }) {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // MENU LIST
  const menuItems = [
    { icon: <FiHome size={24} />, label: "Home", path: "/" },
    { icon: <FiSearch size={24} />, label: "Search", path: "/search" },
    { icon: <FiPlay size={24} />, label: "Reels", path: "/reels" },
    { icon: <FiPlus size={24} />, label: "Create", path: "/create" },
    {
      icon: <FiHeart size={24} />,
      label: "Notifications",
      special: "notifications",
    },
    { icon: <FiMessageCircle size={24} />, label: "Messages", path: "/messages" },
  ];

  // Ripple effect
  const createRipple = (e) => {
    const btn = e.currentTarget;
    const ripple = document.createElement("span");

    const size = Math.max(btn.clientWidth, btn.clientHeight);
    const rect = btn.getBoundingClientRect();

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.className = "ripple";

    const old = btn.getElementsByClassName("ripple")[0];
    if (old) old.remove();
    btn.appendChild(ripple);
  };

  const handleClick = (e, item) => {
    createRipple(e);

    if (item.special === "notifications") {
      onOpenNotifications();
      return;
    }

    if (item.path) navigate(item.path);
  };

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`
        sticky top-0 h-screen
        transition-all duration-300 
        ${expanded ? "w-56 px-4" : "w-16 px-2 items-center"}
        bg-[#7d7573] dark:bg-neutral-800 text-white 
        flex flex-col justify-between py-6
      `}
    >
      {/* LOGO */}
      <div
        className={`flex items-center ${
          expanded ? "justify-start" : "justify-center"
        } mb-10`}
      >
        <div className="font-serif text-3xl">D</div>
        {expanded && <span className="ml-3 text-xl font-semibold">Dexter</span>}
      </div>

      {/* MENU */}
      <div className="flex flex-col w-full space-y-3">
        {menuItems.map((item, index) => {
          const active = location.pathname === item.path;

          return (
            <button
              key={index}
              onClick={(e) => handleClick(e, item)}
              className={`
                relative overflow-hidden group
                flex items-center gap-4 w-full px-3 py-3 rounded-xl
                transition-all duration-200
                ${expanded ? "justify-start" : "justify-center"}
                ${
                  active
                    ? "bg-white/20 dark:bg-white/10"
                    : "hover:bg-white/20 dark:hover:bg-white/10"
                }
              `}
            >
              {/* ACTIVE DOT */}
              {active && expanded && (
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-pink-400"></div>
              )}

              {/* ICON */}
              <span
                className={`${
                  active ? "text-pink-300" : "text-white"
                } transition`}
              >
                {item.icon}
              </span>

              {/* LABEL */}
              {expanded && (
                <span
                  className={`text-[16px] ${
                    active ? "text-pink-300" : "text-white"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* BOTTOM MENU */}
      <button
        onClick={(e) => handleClick(e, { path: "/more" })}
        className={`
          relative overflow-hidden flex items-center gap-4 w-full px-3 py-3 
          rounded-xl hover:bg-white/20 dark:hover:bg-white/10 transition
          ${expanded ? "justify-start" : "justify-center"}
        `}
      >
        <FiMenu size={24} />
        {expanded && <span className="text-[16px]">More</span>}
      </button>
    </div>
  );
}
