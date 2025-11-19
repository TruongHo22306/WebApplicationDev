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

export default function Sidebar({ darkMode }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // MENU ITEMS
  const menuItems = [
    { icon: <FiHome size={24} />, label: "Home", path: "/" },
    { icon: <FiSearch size={24} />, label: "Search", path: "/search" },
    { icon: <FiPlay size={24} />, label: "Reels", path: "/reels" },
    { icon: <FiPlus size={24} />, label: "Create", path: "/create" },
    { icon: <FiHeart size={24} />, label: "Notifications", path: "/notifications" },
    { icon: <FiMessageCircle size={24} />, label: "Messages", path: "/messages" },
  ];

  // RIPPLE
  const createRipple = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");

    const size = Math.max(button.clientWidth, button.clientHeight);
    const rect = button.getBoundingClientRect();

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";
    ripple.className = "ripple";

    const old = button.getElementsByClassName("ripple")[0];
    if (old) old.remove();

    button.appendChild(ripple);
  };

  const handleClick = (e, path) => {
    createRipple(e);
    navigate(path);
  };

  return (
    <div
      className={`
        h-screen sticky top-0
        ${expanded ? "w-56 px-3" : "w-16 px-2 items-center"}
        bg-[#7d7573] dark:bg-neutral-800
        text-white
        flex flex-col justify-between
        py-6
        transition-all duration-300
        overflow-hidden
      `}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* TOP LOGO */}
      <div
        className={`flex items-center ${
          expanded ? "justify-start" : "justify-center"
        } mb-10`}
      >
        <div className="font-serif text-3xl">D</div>
        {expanded && <span className="ml-3 text-xl font-semibold">Dexter</span>}
      </div>

      {/* MENU */}
      <div className="flex flex-col space-y-4 w-full">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={idx}
              onClick={(e) => handleClick(e, item.path)}
              className={`
                relative overflow-hidden
                flex items-center gap-4
                w-full
                p-3 rounded-xl
                transition-all duration-200
                ${expanded ? "justify-start" : "justify-center"}
                ${
                  isActive
                    ? "bg-white/25 dark:bg-white/10"
                    : "hover:bg-white/20 dark:hover:bg-white/10"
                }
              `}
            >
              {/* ACTIVE DOT */}
              {isActive && expanded && (
                <div className="absolute left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-pink-400"></div>
              )}

              {/* ICON */}
              <div
                className={`${
                  isActive ? "text-pink-300" : "text-white"
                } transition`}
              >
                {item.icon}
              </div>

              {/* LABEL */}
              {expanded && (
                <span
                  className={`text-[16px] ${
                    isActive ? "text-pink-300" : "text-white"
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
        onClick={(e) => handleClick(e, "/more")}
        className={`
          relative overflow-hidden
          flex items-center gap-4 w-full
          p-3 rounded-xl
          transition-all duration-200
          ${expanded ? "justify-start" : "justify-center"}
          hover:bg-white/20 dark:hover:bg-white/10
        `}
      >
        <FiMenu size={24} className="text-white" />
        {expanded && <span className="text-[16px]">More</span>}
      </button>
    </div>
  );
}
