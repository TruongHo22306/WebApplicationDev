import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle({ darkMode, onToggle, expanded }) {
  return (
    <button
      type="button"
      onClick={onToggle}
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
  );
}
