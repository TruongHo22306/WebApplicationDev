import { useState, useRef, useEffect } from "react";
import {
  FiBell,
  FiUser,
  FiBookmark,
  FiSettings,
  FiLogOut,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Topbar({
  onOpenNotifications,
  onOpenFriends,
}) {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(true); // simulate notification
  const [hasNewFriends, setHasNewFriends] = useState(true); // simulate friend requests

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // LOG OUT
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div
      className="
        sticky top-0 z-40
        flex justify-between items-center 
        px-10 py-4 
        bg-[#7d7573] dark:bg-neutral-800 
        text-white 
        backdrop-blur-md
      "
    >
      {/* SEARCH CENTER */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search now"
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
          className={`
            px-5 py-2 rounded-full bg-white text-black text-[15px] outline-none
            transition-all duration-300 shadow-sm
            ${searchFocus ? "w-[500px] shadow-lg" : "w-[350px]"}
          `}
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center space-x-4 absolute right-10">

        {/* 🔔 Notification Bell */}
        <button
          onClick={() => {
            onOpenNotifications();
            setHasNewNotification(false); // stop shaking when opened
          }}
          className={`
            relative transition 
            ${hasNewNotification ? "animate-bellShake" : "hover:opacity-80"}
          `}
        >
          <FiBell size={22} />

          {/* Badge */}
          {hasNewNotification && (
            <span className="absolute -top-1 -right-1 w-[10px] h-[10px] bg-red-500 rounded-full"></span>
          )}
        </button>

        {/* Friend Requests */}
        <button
          onClick={() => {
            onOpenFriends();
            setHasNewFriends(false);
          }}
          className={`relative transition flex items-center justify-center
            ${hasNewFriends ? "animate-bellShake" : "hover:opacity-80"}`}
        >
          <FiUsers size={18} className="text-gray-100" />
          {hasNewFriends && (
            <span className="absolute -top-1 -right-1 w-[10px] h-[10px] bg-pink-500 rounded-full"></span>
          )}
        </button>

        {/* AVATAR DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <img
            src="https://i.pravatar.cc/50?img=8"
            className="w-11 h-11 rounded-full cursor-pointer hover:opacity-80 transition"
            onClick={() => setDropdownOpen((prev) => !prev)}
          />

          {dropdownOpen && (
            <div
              className="
                absolute right-0 mt-2 w-48 
                bg-white dark:bg-neutral-900 
                text-black dark:text-white
                rounded-xl shadow-xl p-2
                animate-fadeSlide
                border border-gray-200 dark:border-neutral-700
              "
            >
              <button
                onClick={() => navigate("/profile")}
                className="dropdown-item"
              >
                <FiUser /> Profile
              </button>

              <button
                onClick={() => navigate("/saved")}
                className="dropdown-item"
              >
                <FiBookmark /> Saved
              </button>

              <button
                onClick={() => navigate("/settings")}
                className="dropdown-item"
              >
                <FiSettings /> Settings
              </button>

              <div className="border-t border-gray-300 dark:border-neutral-700 my-1"></div>

              <button
                onClick={handleLogout}
                className="dropdown-item text-red-500 hover:text-red-400"
              >
                <FiLogOut /> Log out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Extra Tailwind Animations */}
      <style>
        {`
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          transition: 0.2s;
        }
        .dropdown-item:hover {
          background: rgba(0,0,0,0.07);
        }
        .dark .dropdown-item:hover {
          background: rgba(255,255,255,0.1);
        }

        /* Fade + slide */
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeSlide { animation: fadeSlide 0.18s ease-out; }

        /* 🔔 Bell Shake Animation */
        @keyframes bellShake {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-15deg); }
          60% { transform: rotate(10deg); }
          80% { transform: rotate(-10deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-bellShake {
          animation: bellShake 0.45s ease-in-out infinite;
        }
        `}
      </style>
    </div>
  );
}
