import { useEffect, useState } from "react";
import { FiHeart, FiMessageCircle, FiRepeat, FiSend } from "react-icons/fi";

export default function FeedPost() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={
        "bg-[#d5cfcd] dark:bg-neutral-800 w-full h-[480px] rounded-2xl mt-8 shadow-md relative transform transition-all duration-500 " +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")
      }
    >
      <div className="absolute bottom-4 left-6 right-6 flex items-center space-x-10 text-black dark:text-gray-100 text-[16px]">
        <div className="flex items-center space-x-1">
          <FiHeart size={22} /> <span>935</span>
        </div>
        <div className="flex items-center space-x-1">
          <FiMessageCircle size={22} /> <span>935</span>
        </div>
        <div className="flex items-center space-x-1">
          <FiRepeat size={22} /> <span>935</span>
        </div>
        <div className="flex items-center space-x-1">
          <FiSend size={22} /> <span>935</span>
        </div>
      </div>
    </div>
  );
}
