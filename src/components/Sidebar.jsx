import {
  FiHome,
  FiSearch,
  FiPlay,
  FiPlus,
  FiHeart,
  FiMessageCircle,
  FiMenu,
} from "react-icons/fi";

export default function Sidebar() {
  const iconStyle =
    "cursor-pointer text-white hover:text-[#ffbfbf] transition-all duration-200";
  const iconContainer =
    "p-3 rounded-xl hover:bg-white/20 hover:scale-110 transition-all duration-200 flex items-center justify-center";

  return (
    <div
      className="
        w-16
        bg-[#7d7573]
        dark:bg-neutral-800
        text-white
        h-screen
        sticky top-0           /* ← đứng im khi scroll */
        flex flex-col justify-between
        py-6
      "
    >
      {/* Top */}
      <div className="flex flex-col items-center">
        <div className="font-serif text-xl mb-10">D</div>
      </div>

      {/* Center */}
      <div className="flex flex-col items-center space-y-8">
        <div className={iconContainer}>
          <FiHome size={26} className={iconStyle} />
        </div>
        <div className={iconContainer}>
          <FiSearch size={26} className={iconStyle} />
        </div>
        <div className={iconContainer}>
          <FiPlay size={26} className={iconStyle} />
        </div>
        <div className={iconContainer}>
          <FiPlus size={26} className={iconStyle} />
        </div>
        <div className={iconContainer}>
          <FiHeart size={26} className={iconStyle} />
        </div>
        <div className={iconContainer}>
          <FiMessageCircle size={26} className={iconStyle} />
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col items-center mt-10">
        <div className={iconContainer}>
          <FiMenu size={26} className={iconStyle} />
        </div>
      </div>
    </div>
  );
}
