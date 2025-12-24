import React, { useRef, useEffect, useState } from "react";
import {
  FiHeart,
  FiMessageCircle,
  FiSend,
  FiVolume2,
  FiVolumeX,
  FiChevronUp,
  FiChevronDown,
  FiBookmark,
  FiX,
} from "react-icons/fi";
import MessagesPanel from "../components/MessagesPanel";

// TODO: Replace with backend-provided reel list (id, src, username, caption, counts)
const reelsData = [
  {
    id: 1,
    src: "https://videos.pexels.com/video-files/854260/854260-hd_1920_1080_30fps.mp4",
    username: "alex.morgan",
    caption: "Morning vibes.",
    likes: 12400,
    comments: 521,
  },
  {
    id: 2,
    src: "https://videos.pexels.com/video-files/2795741/2795741-hd_1920_1080_30fps.mp4",
    username: "travel.earth",
    caption: "Vietnam is beautiful.",
    likes: 31100,
    comments: 1204,
  },
  {
    id: 3,
    src: "https://videos.pexels.com/video-files/853427/853427-hd_1920_1080_30fps.mp4",
    username: "foodie",
    caption: "Best burger ever.",
    likes: 8932,
    comments: 212,
  },
];

const recentChats = [
  {
    name: "Julia Clarke",
    location: "New York, USA",
    avatar: "https://i.pravatar.cc/60?img=11",
    lastMessage: "See you at the shoot?",
    time: "10:24",
    unread: true,
  },
  {
    name: "Sara Cliene",
    location: "Sydney, Australia",
    avatar: "https://i.pravatar.cc/60?img=22",
    lastMessage: "Dropped the files",
    time: "09:10",
    unread: false,
  },
  {
    name: "Amy Ruth",
    location: "Dubai, UAE",
    avatar: "https://i.pravatar.cc/60?img=36",
    lastMessage: "Thanks!",
    time: "Yesterday",
    unread: true,
  },
];

const sampleComments = [
  // TODO: Replace with backend comments data
  {
    id: 1,
    user: "amayra.3850",
    time: "18 hours",
    text: "🔥 😂",
    likes: 12,
    replies: 2,
    avatar: "https://i.pravatar.cc/60?img=45",
  },
  {
    id: 2,
    user: "allee_muhmmad",
    time: "1 day",
    text: "Pantesan beliau panjang umur",
    likes: 307,
    replies: 3,
    avatar: "https://i.pravatar.cc/60?img=15",
  },
];

export default function Reels({ darkMode }) {
  const videoRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(() => reelsData.map(() => false));
  const [showHeart, setShowHeart] = useState(() => reelsData.map(() => false));
  const [muted, setMuted] = useState(true);
  const [loaded, setLoaded] = useState(() => reelsData.map(() => false));
  const [openMessages, setOpenMessages] = useState(false);
  const toolbarIconClass = darkMode ? "text-white" : "text-[#6b5c51]";
  const toolbarLabelClass = darkMode ? "text-white" : "text-[#6b5c51]";
  const [openComments, setOpenComments] = useState(false);
  const [activeReel, setActiveReel] = useState(null);

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

  // Sync mute state video
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) v.muted = muted;
    });
  }, [muted]);

  const handleDoubleTap = (index) => {
    // double-tap to like
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

  const openCommentPanel = (index) => {
    // TODO: Fetch comments + interactions for this reel from backend using reelsData[index].id
    setActiveReel(index);
    setOpenComments(true);
  };

  const scrollToReel = (direction) => {
    setCurrentIndex((prev) => {
      const next = Math.min(
        Math.max(prev + (direction === "up" ? -1 : 1), 0),
        reelsData.length - 1
      );
      const target = videoRefs.current[next];
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return next;
    });
  };

  return (
    <div
      className={
        "relative flex w-full min-h-screen justify-center py-5 transition-colors duration-300 " +
        (darkMode ? "bg-black text-white" : "bg-[#d9ccbe] text-black")
      }
    >
      {/* Container swipe reel */}
      <div className="w-[500px] h-[90vh] overflow-y-scroll snap-y snap-mandatory no-scrollbar space-y-6">
        {reelsData.map((reel, index) => (
          <div key={reel.id} className="relative snap-center h-[88vh] mx-auto flex items-center gap-3">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl bg-black h-full w-[420px]"
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

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              {/* Loading skeleton */}
              {!loaded[index] && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-white animate-spin" />
                </div>
              )}

              {/* Big heart when double tapping */}
              {showHeart[index] && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <FiHeart className="text-white/90 reel-heart-pop" size={90} />
                </div>
              )}

              {/* Bottom info */}
              <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">@{reel.username}</span>
                </div>
                <p className="text-sm opacity-95 line-clamp-2">{reel.caption}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => toggleLike(index)}
                  className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition"
                >
                  <FiHeart
                    size={28}
                    className={
                      liked[index]
                        ? "text-red-500 drop-shadow-[0_0_5px_rgba(0,0,0,0.6)]"
                        : toolbarIconClass
                    }
                  />
                </button>
                <span className={`text-xs font-semibold ${toolbarLabelClass}`}></span>
              </div>

              <button
                className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition"
                onClick={() => openCommentPanel(index)}
              >
                <FiMessageCircle size={28} className={toolbarIconClass} />
              </button>

              <button className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition">
                <FiSend size={26} className={toolbarIconClass} />
              </button>

              <button className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition">
                <FiBookmark size={28} className={toolbarIconClass} />
              </button>

              <button
                onClick={() => setMuted((m) => !m)}
                className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition"
              >
                {muted ? (
                  <FiVolumeX size={24} className={toolbarIconClass} />
                ) : (
                  <FiVolume2 size={24} className={toolbarIconClass} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40">
        <button
          onClick={() => scrollToReel("up")}
          disabled={currentIndex === 0}
          className="w-14 h-14 rounded-full bg-black/60 text-white shadow-2xl flex items-center justify-center hover:bg-black/70 transition disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous reel"
        >
          <FiChevronUp size={22} />
        </button>
        <button
          onClick={() => scrollToReel("down")}
          disabled={currentIndex === reelsData.length - 1}
          className="w-14 h-14 rounded-full bg-black/60 text-white shadow-2xl flex items-center justify-center hover:bg-black/70 transition disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next reel"
        >
          <FiChevronDown size={22} />
        </button>
      </div>

      <button
        onClick={() => setOpenMessages(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#6b5c51] px-4 py-3 text-white shadow-lg hover:shadow-xl transition"
      >
        <FiMessageCircle />
        <span className="font-semibold text-sm">Messages</span>
        <span className="inline-flex items-center justify-center min-w-[26px] h-6 px-2 rounded-full bg-red-500 text-[11px] font-semibold">
          {recentChats.filter((c) => c.unread).length}
        </span>
      </button>

      <MessagesPanel
        open={openMessages}
        onClose={() => setOpenMessages(false)}
        chats={recentChats}
        onCompose={() => setOpenMessages(true)}
      />

      {/* Comments panel */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          openComments ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setOpenComments(false)}
          aria-hidden="true"
        />

        <div
          className={`fixed right-4 top-1/2 -translate-y-1/2 w-[420px] max-w-full bg-neutral-900/95 text-white rounded-2xl shadow-2xl border border-white/10 transition-transform duration-300 ${
            openComments ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <h3 className="text-lg font-semibold">Comments</h3>
            <button
              type="button"
              onClick={() => setOpenComments(false)}
              className="p-2 rounded-full hover:bg-white/10 transition"
              aria-label="Close comments"
            >
              <FiX />
            </button>
          </div>

          <div className="max-h-[65vh] overflow-y-auto px-5 py-4 space-y-6">
            {sampleComments.map((c) => (
              <div key={c.id} className="space-y-2">
                <div className="flex items-start gap-3">
                  <img
                    src={c.avatar}
                    alt={c.user}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold">{c.user}</span>
                      <span className="text-white/60">{c.time}</span>
                    </div>
                    <p className="text-[15px] leading-snug break-words">{c.text}</p>
                    <div className="flex items-center gap-4 text-xs text-white/70">
                      <span>{c.likes} like</span>
                      <button className="hover:text-white transition">Answer</button>
                      <span>···</span>
                    </div>
                    <button className="text-xs text-white/70 hover:text-white transition">
                      See all {c.replies} reply
                    </button>
                  </div>
                  <FiHeart className="text-white/70" />
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 py-4 border-t border-white/10">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2">
              <img
                src="https://i.pravatar.cc/48?img=66"
                alt="you"
                className="w-8 h-8 rounded-full object-cover"
              />
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/60"
              />
              <button
                type="button"
                className="p-2 rounded-full hover:bg-white/10 transition"
                aria-label="Send comment"
              >
                <FiSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
