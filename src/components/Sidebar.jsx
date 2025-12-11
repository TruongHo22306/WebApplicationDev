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
  FiChevronRight,
} from "react-icons/fi";
import logoMellow from "../assets/logoMellow.png";

const notificationFeed = [
  {
    title: "Yêu cầu theo dõi",
    subtitle: "alley_toxicc + 19 người khác",
    unread: true,
    actions: [],
  },
  {
    title: "nhtheienn_ đã yêu cầu theo dõi bạn",
    subtitle: "4 giờ",
    actions: ["Xác nhận", "Xóa"],
  },
  {
    title: "ericdoan_gudmo.rning và những người khác đã thích tin của bạn",
    subtitle: "Dec 01",
    actions: [],
  },
  {
    title: "zina_zkk đã yêu cầu theo dõi bạn",
    subtitle: "Nov 19",
    actions: ["Xác nhận", "Xóa"],
  },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: <FiHome size={20} />, label: "Feed", path: "/" },
    { icon: <FiSearch size={20} />, label: "Explore", path: "/search" },
    { icon: <FiPlay size={20} />, label: "Reels", path: "/reels" },
    { icon: <FiSettings size={20} />, label: "Settings", path: "/settings" },
    { icon: <FiMessageCircle size={20} />, label: "Messages", path: "/messages" },
    { icon: <FiBell size={20} />, label: "Notifications", path: "/notifications" },
  ];

  const handleNavigate = (path) => {
    if (!path) return;
    navigate(path);
  };

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`
        sticky top-0 h-screen
        ${expanded ? "w-80 px-6" : "w-20 px-3"}
        transition-all duration-300 ease-in-out
        bg-[#6b5c51] dark:bg-neutral-800 text-white
        flex flex-col py-8 overflow-hidden
      shadow-lg
    `}
  >
      <div className="flex-1 flex flex-col items-stretch justify-center gap-6">

        {/* Brand logo */}
        <div
          className={`flex items-center ${expanded ? "justify-start gap-3" : "justify-center"} mb-2`}
        >
          <img
            src={logoMellow}
            alt="Mellow logo"
            className="w-12 h-12 object-contain"
          />
          {expanded && (
            <div className="leading-tight">
            </div>
          )}
        </div>

        <nav className={`space-y-2 ${expanded ? "" : "mt-4"}`}>
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            if (item.label === "Notifications") {
              return (
                <div key={item.label} className="relative group">
                  <button
                    onClick={() => handleNavigate(item.path)}
                    className={`
                      flex items-center gap-3 w-full px-3 py-3 rounded-xl
                      transition-colors duration-150
                      ${expanded ? "justify-start text-left" : "justify-center"}
                      ${active ? "bg-white/20 text-white" : "text-white/90 hover:bg-white/10"}
                    `}
                    title={item.label}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {expanded && <span className="text-sm font-medium">{item.label}</span>}
                  </button>

                  {/* Hover popup */}
                  <div
                    className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 absolute left-full top-0 ml-3 z-50 w-80 bg-neutral-900 text-white rounded-2xl shadow-2xl border border-white/10 p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-lg font-semibold">Thông báo</p>
                      <FiChevronRight className="text-white/60" />
                    </div>

                    <div className="space-y-3">
                      {notificationFeed.map((n, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 pb-3 border-b border-white/10 last:border-0 last:pb-0"
                        >
                          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm">
                            <FiBell />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold leading-tight">{n.title}</p>
                            <p className="text-xs text-white/60">{n.subtitle}</p>
                            {n.actions.length > 0 && (
                              <div className="mt-2 flex gap-2">
                                {n.actions.map((action) => (
                                  <button
                                    key={action}
                                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-neutral-900 hover:opacity-90 transition"
                                  >
                                    {action}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          {n.unread && (
                            <span className="mt-1 w-2 h-2 rounded-full bg-[#4cc3ff] inline-block"></span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
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
                      ? "bg-white/20 text-white"
                      : "text-white/90 hover:bg-white/10"
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

      <div className="mt-2">
        <button
          onClick={() => handleNavigate("/signout")}
          className={`
            flex items-center gap-3 w-full px-3 py-3 rounded-xl
            transition-colors duration-150
            ${expanded ? "justify-start text-left" : "justify-center"}
            text-white/80 hover:bg-white/10 hover:text-white
          `}
        >
          <FiLogOut size={20} />
          {expanded && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
