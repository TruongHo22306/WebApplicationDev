import { FiSun, FiMoon } from "react-icons/fi";

export default function Topbar({ darkMode, onToggleDarkMode }) {
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
      <div className="text-2xl font-semibold pl-2">Dexter</div>

      <input
        type="text"
        placeholder="Search now"
        className="w-[350px] px-5 py-2 rounded-full bg-white text-black text-[15px] outline-none"
      />

      <div className="flex items-center space-x-4">

        {/* Toggle Dark Mode */}
        <button
          onClick={onToggleDarkMode}
          className="
            px-3 py-2 rounded-full 
            bg-white/10 hover:bg-white/20 
            transition-all flex items-center justify-center
          "
        >
          {darkMode ? (
            <FiSun
              size={18}
              className="text-yellow-300 animate-spinOnce"
            />
          ) : (
            <FiMoon
              size={18}
              className="text-gray-200 animate-spinOnce"
            />
          )}
        </button>

        <img
          src="https://i.pravatar.cc/50?img=8"
          className="w-11 h-11 rounded-full"
        />
      </div>
    </div>
  );
}
