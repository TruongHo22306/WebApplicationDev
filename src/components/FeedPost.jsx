import { useEffect, useMemo, useState } from "react";
import {
  FiHeart,
  FiMessageCircle,
  FiSend,
  FiMapPin,
  FiThumbsDown,
  FiBookmark,
} from "react-icons/fi";


export default function FeedPost({
  author = "You",
  avatar = "https://i.pravatar.cc/60?img=7",
  createdAt = "Just now",
  content = "New post",
  attachments = {},
  stats = { likes: 0, comments: 0, shares: 0 },
}) {
  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(stats.likes || 0);
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(stats.comments || 0);
  const [shareCount, setShareCount] = useState(stats.shares || 0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const images = useMemo(() => {
    if (attachments?.images?.length) return attachments.images;
    if (attachments?.imageUrl) return [attachments.imageUrl];
    return [];
  }, [attachments]);

  const layout =
    attachments?.layout || (images.length > 1 ? "collage" : "single");

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? Math.max(prev - 1, 0) : prev + 1));
  };

  const handleAddComment = () => {
    const text = commentInput.trim();
    if (!text) return;
    setComments((prev) => [
      {
        id: Date.now(),
        text,
        author: "You",
        avatar: "https://i.pravatar.cc/40?img=7",
        createdAt: new Date().toLocaleTimeString(),
        likes: 0,
        dislikes: 0,
        liked: false,
        disliked: false,
      },
      ...prev,
    ]);
    setCommentInput("");
    setCommentCount((prev) => prev + 1);
    if (!commentOpen) setCommentOpen(true);
  };

  const toggleCommentReaction = (id, type) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        if (type === "like") {
          const nextLiked = !c.liked;
          const resetDislike = nextLiked && c.disliked;
          return {
            ...c,
            liked: nextLiked,
            dislikes: c.dislikes - (resetDislike ? 1 : 0),
            disliked: resetDislike ? false : c.disliked,
            likes: c.likes + (nextLiked ? 1 : -1),
          };
        }
        if (type === "dislike") {
          const nextDisliked = !c.disliked;
          const resetLike = nextDisliked && c.liked;
          return {
            ...c,
            disliked: nextDisliked,
            likes: c.likes - (resetLike ? 1 : 0),
            liked: resetLike ? false : c.liked,
            dislikes: c.dislikes + (nextDisliked ? 1 : -1),
          };
        }
        return c;
      })
    );
  };

  const handleShare = () => setShareCount((prev) => prev + 1);

  const renderGallery = () => {
    if (!images.length) return null;

    if (layout === "collage" && images.length > 1) {
      const displayImages = images.slice(0, 5);
      const overflow = images.length - displayImages.length;
      return (
        <div className="mt-4 grid grid-cols-3 grid-rows-2 gap-3 rounded-3xl overflow-hidden">
          {displayImages.map((src, idx) => {
            const isHero = idx === 0;
            const isLast = idx === displayImages.length - 1 && overflow > 0;
            return (
              <div
                key={idx}
                className={`relative ${isHero ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}`}
              >
                <img
                  src={src}
                  alt={`post-${idx}`}
                  className="w-full h-full object-cover"
                />
                {isLast && overflow > 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg font-semibold">
                    +{overflow}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    if (layout === "grid" && images.length > 1) {
      return (
        <div className="mt-4 grid grid-cols-2 gap-3 rounded-3xl overflow-hidden">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`post-${idx}`}
              className="w-full h-full object-cover"
            />
          ))}
        </div>
      );
    }

    return (
      <div className="mt-4">
        <img
          src={images[0]}
          alt="post attachment"
          className="w-full max-h-[460px] object-cover rounded-3xl"
        />
      </div>
    );
  };

  return (
    <div
      className={
        "bg-[#F3ECE2] text-neutral-900 dark:bg-[#2B2722] dark:text-[#EDE5DA] w-full min-h-[240px] rounded-3xl mt-8 mb-10 border border-[#E3D9CE] dark:border-[#23201B] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] transform transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-26px_rgba(0,0,0,0.4)] " +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")
      }
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={avatar} alt="" className="w-11 h-11 rounded-full" />
            <div className="leading-tight">
              <p className="font-semibold text-[16px] text-neutral-900 dark:text-white">
                {author}
              </p>
              <p className="text-sm text-neutral-500 dark:text-gray-400">
                {createdAt}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-5 text-[16px] leading-relaxed whitespace-pre-line">
          {content}
        </p>

        {renderGallery()}

        {attachments?.location && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-gray-100">
              <FiMapPin size={16} /> {attachments.location}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between text-[15px] mt-auto pt-6 text-neutral-600 dark:text-neutral-300">
          <div className="flex items-center gap-5">
            <button
              className="flex items-center gap-1 hover:opacity-80"
              onClick={(e) => {
                e.stopPropagation();
                toggleLike();
              }}
            >
              <FiHeart size={20} className={liked ? "text-red-500" : ""} />
              <span className={liked ? "text-red-500" : ""}>{likeCount}</span>
            </button>

            <button
              className="flex items-center gap-1 hover:opacity-80"
              onClick={(e) => {
                e.stopPropagation();
                setCommentOpen((prev) => !prev);
              }}
            >
              <FiMessageCircle size={20} />
              <span>{commentCount}</span>
            </button>

            <button
              className="flex items-center gap-1 hover:opacity-80"
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
            >
              <FiSend size={20} />
              <span>{shareCount}</span>
            </button>
          </div>

          <button
            className="p-1 rounded hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition"
            onClick={(e) => e.stopPropagation()}
          >
            <FiBookmark size={20} />
          </button>
        </div>

        {commentOpen && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  className="flex-1 w-full rounded-full px-3 py-2 pr-20 bg-[#6b5c51] text-white placeholder-white/70 text-sm outline-none"
                  placeholder="Write a comment..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddComment();
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            {comments.length > 0 ? (
              <div className="space-y-2">
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-start gap-3 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img src={c.avatar} alt="" className="w-9 h-9 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {c.author}
                        </div>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {c.createdAt}
                        </span>
                      </div>
                      <p className="mt-1 text-neutral-800 dark:text-neutral-200">
                        {c.text}
                      </p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-neutral-600 dark:text-neutral-400">
                        <button
                          className={`flex items-center gap-1 hover:opacity-80 ${c.liked ? "text-red-500" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCommentReaction(c.id, "like");
                          }}
                        >
                          <FiHeart size={14} /> {c.likes}
                        </button>
                        <button
                          className={`flex items-center gap-1 hover:opacity-80 ${c.disliked ? "text-blue-500" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCommentReaction(c.id, "dislike");
                          }}
                        >
                          <FiThumbsDown size={14} /> {c.dislikes}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                No comments yet.
              </p>
            )}
          </div>
        )}


      </div>
    </div>
  );
}
