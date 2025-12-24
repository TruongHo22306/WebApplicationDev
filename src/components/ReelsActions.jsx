import { useState } from "react";
import {
  FiHeart,
  FiMessageCircle,
  FiSend,
  FiBookmark,
  FiVolumeX,
  FiVolume2,
} from "react-icons/fi";

export default function ReelsActions({
  likes = 145200,
  comments = 2341,
  shares = 892,
}) {
  const [liked, setLiked] = useState(false);
  const [muted, setMuted] = useState(false);

  // Format: 145200 → 145.2K
  const formatNum = (num) => {
    if (num > 999999) return (num / 1000000).toFixed(1) + "M";
    if (num > 999) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  return (
    <div className="absolute right-4 bottom-8 flex flex-col items-center space-y-6">

      {/* LIKE BUTTON */}
      <button
        onClick={() => setLiked(!liked)}
        className="
          group relative
          w-12 h-12 rounded-full flex items-center justify-center
          bg-black/40 hover:bg-black/60
          transition-all duration-300
          backdrop-blur-md
        "
      >
        <FiHeart
          size={26}
          className={`
            transition-all duration-300
            ${liked ? "text-red-500 scale-125" : "text-white group-hover:scale-110"}
          `}
        />
      </button>
      <span className="text-white text-sm">{formatNum(likes + (liked ? 1 : 0))}</span>

      {/* COMMENTS */}
      <button
        className="
          group w-12 h-12 rounded-full flex items-center justify-center
          bg-black/40 hover:bg-black/60 transition-all duration-300 backdrop-blur-md
        "
      >
        <FiMessageCircle size={26} className="text-white group-hover:scale-110" />
      </button>
      <span className="text-white text-sm">{formatNum(comments)}</span>

      {/* SHARE */}
      <button
        className="
          group w-12 h-12 rounded-full flex items-center justify-center
          bg-black/40 hover:bg-black/60 transition-all duration-300 backdrop-blur-md
        "
      >
        <FiSend size={26} className="text-white group-hover:scale-110" />
      </button>
      <span className="text-white text-sm">{formatNum(shares)}</span>

      {/* SAVE */}
      <button
        className="
          group w-12 h-12 rounded-full flex items-center justify-center
          bg-black/40 hover:bg-black/60 transition-all duration-300 backdrop-blur-md
        "
      >
        <FiBookmark size={26} className="text-white group-hover:scale-110" />
      </button>

      {/* MUTE/UNMUTE */}
      <button
        onClick={() => setMuted(!muted)}
        className="
          group w-12 h-12 rounded-full flex items-center justify-center
          bg-black/40 hover:bg-black/60 transition-all duration-300 backdrop-blur-md
        "
      >
        {muted ? (
          <FiVolumeX size={26} className="text-white group-hover:scale-110" />
        ) : (
          <FiVolume2 size={26} className="text-white group-hover:scale-110" />
        )}
      </button>
    </div>
  );
}
