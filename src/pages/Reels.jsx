import React, { useRef, useEffect, useState } from "react";
import {
  FiHeart,
  FiMessageCircle,
  FiSend,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";

const reelsData = [
  {
    id: 1,
    src: "https://videos.pexels.com/video-files/854260/854260-hd_1920_1080_30fps.mp4",
    username: "alex.morgan",
    caption: "Morning vibes 🌅",
    likes: 12400,
    comments: 521,
  },
  {
    id: 2,
    src: "https://videos.pexels.com/video-files/2795741/2795741-hd_1920_1080_30fps.mp4",
    username: "travel.earth",
    caption: "Vietnam is beautiful 🇻🇳",
    likes: 31100,
    comments: 1204,
  },
  {
    id: 3,
    src: "https://videos.pexels.com/video-files/853427/853427-hd_1920_1080_30fps.mp4",
    username: "foodie",
    caption: "Best burger ever 🤤🍔",
    likes: 8932,
    comments: 212,
  },
];

export default function Reels({ darkMode }) {
  const videoRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(() => reelsData.map(() => false));
  const [showHeart, setShowHeart] = useState(() => reelsData.map(() => false));
  const [muted, setMuted] = useState(true);
  const [loaded, setLoaded] = useState(() => reelsData.map(() => false));

  // Auto play/pause + detect current reel
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          const index = Number(video.dataset.index);

          if (entry.isIntersecting) {
            setCurrentIndex(index);
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  // Sync mute state cho tất cả video
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) v.muted = muted;
    });
  }, [muted]);

  const formatNumber = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1).replace(".0", "") + "k";
    return num.toString();
  };

  const handleDoubleTap = (index) => {
    // bật like
    setLiked((prev) => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });

    // trigger big heart
    setShowHeart((prev) => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });

    setTimeout(() => {
      setShowHeart((prev) => {
        const copy = [...prev];
        copy[index] = false;
        return copy;
      });
    }, 650);
  };

  const toggleLike = (index) => {
    setLiked((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const handleLoaded = (index) => {
    setLoaded((prev) => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });
  };

  return (
    <div
      className={
        "flex w-full min-h-screen justify-center py-5 transition-colors duration-300 " +
        (darkMode ? "bg-black text-white" : "bg-[#f7f5f4] text-black")
      }
    >
      {/* Container swipe dọc từng reel */}
      <div className="w-[420px] h-[90vh] overflow-y-scroll snap-y snap-mandatory no-scrollbar space-y-6">
        {reelsData.map((reel, index) => (
          <div
            key={reel.id}
            className="relative snap-center rounded-2xl overflow-hidden shadow-2xl bg-black h-[88vh] mx-auto flex"
            onDoubleClick={() => handleDoubleTap(index)}
          >
            {/* Video */}
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              data-index={index}
              src={reel.src}
              className="w-full h-full object-cover"
              loop
              muted={muted}
              playsInline
              onLoadedData={() => handleLoaded(index)}
            />

            {/* Gradient overlay sang trọng */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

            {/* Loading skeleton */}
            {!loaded[index] && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-white animate-spin" />
              </div>
            )}

            {/* Big heart khi double tap */}
            {showHeart[index] && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <FiHeart className="text-white/90 reel-heart-pop" size={90} />
              </div>
            )}

            {/* Toolbar bên phải */}
            <div className="absolute right-4 bottom-24 flex flex-col space-y-6 items-center z-20">
              {/* Avatar giả + follow */}
              <div className="flex flex-col items-center mb-2">
                <div className="w-12 h-12 rounded-full border-2 border-pink-400 overflow-hidden mb-1 bg-gradient-to-tr from-pink-500 to-yellow-400 flex items-center justify-center text-xs font-semibold">
                  {reel.username.charAt(0).toUpperCase()}
                </div>
                <button className="px-3 py-1 rounded-full bg-white text-black text-xs font-semibold hover:bg-gray-100">
                  Follow
                </button>
              </div>

              <button
                onClick={() => toggleLike(index)}
                className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center hover:scale-110 transition"
              >
                <FiHeart
                  size={26}
                  className={
                    "drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] " +
                    (liked[index] ? "text-red-500" : "text-white")
                  }
                />
              </button>
              <span className="text-xs">{formatNumber(reel.likes)}</span>

              <button className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center hover:scale-110 transition">
                <FiMessageCircle
                  size={26}
                  className="text-white drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]"
                />
              </button>
              <span className="text-xs">{formatNumber(reel.comments)}</span>

              <button className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center hover:scale-110 transition">
                <FiSend
                  size={24}
                  className="text-white drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]"
                />
              </button>

              {/* Mute toggle – auto mute khi vào page, user có thể bật lên */}
              <button
                onClick={() => setMuted((m) => !m)}
                className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center hover:scale-110 transition"
              >
                {muted ? (
                  <FiVolumeX
                    size={24}
                    className="text-white drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]"
                  />
                ) : (
                  <FiVolume2
                    size={24}
                    className="text-white drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]"
                  />
                )}
              </button>
            </div>

            {/* Info dưới đáy */}
            <div className="absolute bottom-5 left-5 right-24 text-white z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">@{reel.username}</span>
              </div>
              <p className="text-sm opacity-95 line-clamp-2">{reel.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
