import { useEffect, useState } from "react";
import { FiHeart, FiMessageCircle, FiRepeat, FiSend, FiMapPin, FiImage, FiFile, FiThumbsDown } from "react-icons/fi";

export default function FeedPost({
  author = "You",
  avatar = "https://i.pravatar.cc/60?img=7",
  createdAt = "Just now",
  content = "New post",
  privacy = "Public",
  attachments = {},
  stats = { likes: 0, comments: 0, shares: 0, reposts: 0 },
}) {
  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(stats.likes || 0);
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(stats.comments || 0);
  const [shareCount, setShareCount] = useState(stats.shares || 0);
  const [repostCount, setRepostCount] = useState(stats.reposts || 0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

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
  const handleRepost = () => setRepostCount((prev) => prev + 1);

  return (
    <div
      className={
        "bg-[#d5cfcd] dark:bg-neutral-800 w-full min-h-[240px] rounded-2xl mt-8 shadow-md transform transition-all duration-500 " +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")
      }
    >
      <div className="p-6 flex flex-col h-full text-neutral-900 dark:text-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={avatar} alt="" className="w-11 h-11 rounded-full" />
            <div className="leading-tight">
              <p className="font-semibold">{author}</p>
              <p className="text-sm text-neutral-700 dark:text-gray-400">{createdAt}</p>
            </div>
          </div>
          <span className="text-sm text-neutral-700 dark:text-gray-400">{privacy}</span>
        </div>

        <p className="mt-5 text-[16px] leading-relaxed whitespace-pre-line">
          {content}
        </p>

        {attachments?.imageUrl && (
          <div className="mt-4">
            <img
              src={attachments.imageUrl}
              alt={attachments?.imageName || "Uploaded image"}
              className="w-full max-h-[420px] object-cover rounded-xl"
            />
          </div>
        )}

        {(attachments?.imageName || attachments?.fileName || attachments?.location) && (
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            {attachments?.imageName && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-200 dark:bg-neutral-700">
                <FiImage size={16} /> {attachments.imageName}
              </span>
            )}
            {attachments?.fileName && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-200 dark:bg-neutral-700">
                <FiFile size={16} /> {attachments.fileName}
              </span>
            )}
            {attachments?.location && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-200 dark:bg-neutral-700">
                <FiMapPin size={16} /> {attachments.location}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center space-x-8 text-[15px] mt-auto pt-6 border-t border-neutral-300/60 dark:border-neutral-700">
          <div className="flex items-center space-x-1">
            <button className="flex items-center space-x-1 hover:opacity-80" onClick={toggleLike}>
              <FiHeart size={20} className={liked ? "text-red-500" : ""} /> <span>{likeCount}</span>
            </button>
          </div>
          <div className="flex items-center space-x-1">
            <button
              className="flex items-center space-x-1 hover:opacity-80"
              onClick={() => setCommentOpen((prev) => !prev)}
            >
              <FiMessageCircle size={20} /> <span>{commentCount}</span>
            </button>
          </div>
          <div className="flex items-center space-x-1">
            <button className="flex items-center space-x-1 hover:opacity-80" onClick={handleRepost}>
              <FiRepeat size={20} /> <span>{repostCount}</span>
            </button>
          </div>
          <div className="flex items-center space-x-1">
            <button className="flex items-center space-x-1 hover:opacity-80" onClick={handleShare}>
              <FiSend size={20} /> <span>{shareCount}</span>
            </button>
          </div>
        </div>

        {commentOpen && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="flex-1 rounded-full px-3 py-2 bg-neutral-100 dark:bg-neutral-800 text-sm outline-none"
                placeholder="Write a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddComment();
                  }
                }}
              />
              <button
                className="px-3 py-2 rounded-full text-sm bg-[#7d7573] text-white hover:opacity-85 transition"
                onClick={handleAddComment}
              >
                Comment
              </button>
            </div>
            {comments.length > 0 ? (
              <div className="space-y-2">
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-start gap-3 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-sm"
                  >
                    <img src={c.avatar} alt="" className="w-9 h-9 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {c.author}
                        </div>
                        <span className="text-xs text-neutral-600 dark:text-neutral-400">
                          {c.createdAt}
                        </span>
                      </div>
                      <p className="mt-1 text-neutral-800 dark:text-neutral-200">{c.text}</p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-neutral-600 dark:text-neutral-400">
                        <button
                          className={`flex items-center gap-1 hover:opacity-80 ${c.liked ? "text-red-500" : ""}`}
                          onClick={() => toggleCommentReaction(c.id, "like")}
                        >
                          <FiHeart size={14} /> {c.likes}
                        </button>
                        <button
                          className={`flex items-center gap-1 hover:opacity-80 ${c.disliked ? "text-blue-500" : ""}`}
                          onClick={() => toggleCommentReaction(c.id, "dislike")}
                        >
                          <FiThumbsDown size={14} /> {c.dislikes}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">No comments yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
