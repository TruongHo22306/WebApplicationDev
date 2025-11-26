import { useEffect, useRef } from "react";
import { FiHeart, FiMessageCircle, FiSend, FiX } from "react-icons/fi";

export default function ReelModal({ reel, onClose, darkMode }) {
  const videoRef = useRef();

  // Close when pressing ESC
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Auto-play when modal opens
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  if (!reel) return null;

  return (
    <div className={`
      fixed inset-0 z-50 flex items-center justify-center
      bg-black/80 backdrop-blur-sm
    `}>
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white hover:scale-110 transition"
      >
        <FiX size={32} />
      </button>

      <div className="flex w-[90%] h-[85%] rounded-xl overflow-hidden bg-black">

        {/* LEFT — BIG VIDEO */}
        <div className="w-[60%] bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src={reel.src}
            className="w-full h-full object-contain"
            loop
            controls={false}
            playsInline
          />
        </div>

        {/* RIGHT — DETAIL PANEL */}
        <div className={`
          w-[40%] flex flex-col 
          ${darkMode ? "bg-neutral-900 text-white" : "bg-white text-black"}
          p-5 overflow-y-auto
        `}>

          {/* User header */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={reel.avatar || "/default-avatar.png"}
              className="w-10 h-10 rounded-full"
            />
            <div className="font-semibold">{reel.username}</div>
            <button className="ml-auto px-3 py-1 rounded-lg bg-pink-500 text-white text-sm">
              Follow
            </button>
          </div>

          {/* Caption */}
          <p className="text-sm mb-3">{reel.caption}</p>

          {/* LIKE / COMMENT / SEND */}
          <div className="flex gap-6 mt-4 text-xl">
            <button className="hover:scale-110 transition">
              <FiHeart />
            </button>
            <button className="hover:scale-110 transition">
              <FiMessageCircle />
            </button>
            <button className="hover:scale-110 transition">
              <FiSend />
            </button>
          </div>

          <div className="mt-2 mb-5 text-sm text-gray-400">
            {reel.likes} likes
          </div>

          {/* COMMENTS */}
          <div className="space-y-4 mt-4">
            {reel.commentsList?.map((c, i) => (
              <div key={i} className="flex items-start gap-3">
                <img src={c.avatar} className="w-8 h-8 rounded-full" />
                <div>
                  <span className="font-semibold mr-2">{c.username}</span>
                  {c.text}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
