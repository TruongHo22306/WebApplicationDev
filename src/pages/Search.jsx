import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCheck,
  FiGrid,
  FiHash,
  FiHeart,
  FiImage,
  FiMessageCircle,
  FiSearch,
  FiSmile,
  FiSend,
  FiBookmark,
  FiUserPlus,
  FiUsers,
  FiX,
} from "react-icons/fi";
import ProfileMiniCard from "../components/ProfileMiniCard";

const peopleResults = [
  { id: 1, name: "Alex Morgan", username: "@alexm", mutual: 12, avatar: "https://i.pravatar.cc/80?img=14" },
  { id: 2, name: "Sarah Johnson", username: "@sarahj", mutual: 4, avatar: "https://i.pravatar.cc/80?img=31" },
  { id: 3, name: "Jordan Lee", username: "@jlee", mutual: 6, avatar: "https://i.pravatar.cc/80?img=23" },
  { id: 4, name: "Casey Williams", username: "@casey_w", mutual: 2, avatar: "https://i.pravatar.cc/80?img=11" },
];

const mediaResults = [
  { id: 1, src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80", likes: "4.3k", comments: 182, height: 280, title: "Mountain View", author: "Alex Morgan", avatar: "https://i.pravatar.cc/60?img=14" },
  { id: 2, src: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=900&q=80", likes: "2.1k", comments: 64, height: 340, title: "Coffee Time", author: "Sarah Johnson", avatar: "https://i.pravatar.cc/60?img=31" },
  { id: 3, src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80", likes: "5.9k", comments: 241, height: 240, title: "Sunset", author: "Jordan Lee", avatar: "https://i.pravatar.cc/60?img=23" },
  { id: 4, src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80", likes: "3.7k", comments: 129, height: 320, title: "Forest Path", author: "Casey Williams", avatar: "https://i.pravatar.cc/60?img=11" },
  { id: 5, src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80", likes: "6.4k", comments: 301, height: 260, title: "Desert Run", author: "Liam Carter", avatar: "https://i.pravatar.cc/60?img=13" },
  { id: 6, src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80", likes: "2.9k", comments: 98, height: 300, title: "Mossy Ridge", author: "Priya Desai", avatar: "https://i.pravatar.cc/60?img=47" },
  { id: 7, src: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=900&q=80", likes: "4.8k", comments: 154, height: 280, title: "Desk Calm", author: "Sarah Johnson", avatar: "https://i.pravatar.cc/60?img=31" },
  { id: 8, src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80", likes: "3.3k", comments: 112, height: 240, title: "Soft Peaks", author: "Alex Morgan", avatar: "https://i.pravatar.cc/60?img=14" },
  { id: 9, src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80", likes: "7.2k", comments: 402, height: 320, title: "Canyon Drive", author: "Jordan Lee", avatar: "https://i.pravatar.cc/60?img=23" },
  { id: 10, src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80", likes: "4.1k", comments: 188, height: 300, title: "Golden Valley", author: "Casey Williams", avatar: "https://i.pravatar.cc/60?img=11" },
];

const mockComments = [
  { id: 1, user: "wolfia.x", text: "Queen 🙌🔥", time: "3w", likes: 12, liked: false, replyToId: null },
  { id: 2, user: "hulk97579", text: "😍😍😍", time: "3w", likes: 4, liked: false, replyToId: null },
  { id: 3, user: "ruhsora369", text: "👏👏👏👏👏", time: "3w", likes: 6, liked: false, replyToId: null },
  { id: 4, user: "champiglion_paris", text: "🔥🔥🔥🔥🔥", time: "3w", likes: 3, liked: false, replyToId: null },
];

const initialCommentsByPost = mediaResults.reduce((acc, m) => {
  acc[m.id] = mockComments.map((c) => ({ ...c }));
  return acc;
}, {});

const tagResults = ["design", "coffee", "travel", "photography", "minimal", "ux", "reactjs", "frontend", "nature"];

const TABS = [
  { id: "all", label: "All", icon: <FiGrid size={14} /> },
  { id: "people", label: "People", icon: <FiUsers size={14} /> },
  { id: "media", label: "Media", icon: <FiImage size={14} /> },
];

const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const fadeItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function Search() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [following, setFollowing] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [commentsByPost, setCommentsByPost] = useState(initialCommentsByPost);
  const [commentText, setCommentText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const commentInputRef = useRef(null);
  const [shouldFocusComment, setShouldFocusComment] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [showMiniProfiles, setShowMiniProfiles] = useState(false);

  const peoplePanelClasses = showMiniProfiles
    ? "p-0 bg-[#d9ccbe] border-0 shadow-none rounded-none"
    : "bg-white/80 dark:bg-neutral-800/90 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-white/20 dark:border-neutral-700";

  const toggleLikeComment = (mediaId, id) => {
    setCommentsByPost((prev) => {
      const list = prev[mediaId] || [];
      const updated = list.map((c) => {
        if (c.id !== id) return c;
        const liked = !c.liked;
        return { ...c, liked, likes: liked ? c.likes + 1 : Math.max(0, c.likes - 1) };
      });
      return { ...prev, [mediaId]: updated };
    });
  };

  const startReply = (comment) => {
    setReplyTo(comment);
    const prefix = `@${comment.user} `;
    setCommentText((prev) => (prev.startsWith(prefix) ? prev : prefix));
    requestAnimationFrame(() => commentInputRef.current?.focus());
  };

  if (selectedMedia && shouldFocusComment) {
    requestAnimationFrame(() => {
      commentInputRef.current?.focus();
      setShouldFocusComment(false);
    });
  }

  const handlePost = () => {
    if (!selectedMedia) return;
    const mediaId = selectedMedia.id;
    const trimmed = commentText.trim();
    if (!trimmed) return;
    const newComment = {
      id: Date.now(),
      user: "You",
      text: trimmed,
      time: "now",
      likes: 0,
      liked: false,
      replyToId: replyTo?.id || null,
    };
    setCommentsByPost((prev) => {
      const list = prev[mediaId] || [];
      return { ...prev, [mediaId]: [newComment, ...list] };
    });
    setCommentText("");
    setReplyTo(null);
  };

  const openMedia = (media, focusComment = false) => {
    setSelectedMedia(media);
    setShouldFocusComment(focusComment);
    setReplyTo(null);
    setCommentText("");
  };

  const togglePostLike = (mediaId) => {
    setLikedPosts((prev) => ({ ...prev, [mediaId]: !prev[mediaId] }));
  };

  const focusCommentField = () => {
    setShouldFocusComment(true);
    requestAnimationFrame(() => {
      commentInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      commentInputRef.current?.focus();
    });
  };

  const toggleFollow = (id) => {
    setFollowing((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredPeople = useMemo(() => {
    return peopleResults.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.username.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const filteredMedia = useMemo(() => {
    return query === "" ? mediaResults : mediaResults.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const filteredTags = useMemo(() => {
    return tagResults.filter((t) => t.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const hasResults = filteredPeople.length > 0 || filteredMedia.length > 0 || filteredTags.length > 0;

  return (
    <div className="w-full min-h-screen px-4 lg:px-8 py-6 bg-[#d9ccbe] dark:bg-neutral-900 transition-colors font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 md:items-center">
            <div className="flex-1 relative group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#5b6cff] transition-colors" size={20} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white/60 dark:bg-neutral-800 border-2 border-transparent focus:border-[#5b6cff]/20 outline-none focus:bg-white dark:focus:bg-neutral-800 focus:ring-4 focus:ring-[#5b6cff]/10 text-base transition-all shadow-sm"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-500 transition"
                >
                  <FiX size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap border ${
                  activeTab === tab.id
                    ? "bg-[#6b5c51] text-white border-[#6b5c51] shadow-[0_10px_22px_rgba(0,0,0,0.18)] scale-[1.02]"
                    : "bg-[#e9dfd2] text-[#6b5c51] border-[#d6c9ba] hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(0,0,0,0.12)]"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {!hasResults ? (
          <div className="text-center py-20 opacity-50">
            <p>No results found for "{query}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            {(activeTab === "all" || activeTab === "media") && (
              <div className={`${activeTab === "media" ? "xl:col-span-12" : "xl:col-span-8"} space-y-6`}>
                {/* Trending */}
                <motion.section className="space-y-3" variants={staggerContainer} initial="initial" animate="animate">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg text-[#2f2a25]">Trending</h2>
                  </div>
                  <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" variants={staggerContainer}>
                    {filteredMedia.slice(0, 8).map((media) => (
                      <motion.button
                        key={media.id}
                        className="group relative rounded-2xl overflow-hidden aspect-[5/4] shadow-md"
                        onClick={() => openMedia(media, true)}
                        variants={fadeItem}
                      >
                        <img
                          src={media.src}
                          alt={media.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute inset-0 flex items-end p-3">
                          <p className="text-sm font-semibold text-white drop-shadow">{media.title}</p>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.section>
              </div>
            )}

            {(activeTab === "all" || activeTab === "people") && (
              <div className={`${activeTab === "people" ? "xl:col-span-8 xl:col-start-3" : "xl:col-span-4"} space-y-6 sticky top-6`}>
                <motion.div
                  className={peoplePanelClasses}
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  <div className={`flex items-center justify-between ${showMiniProfiles ? "mb-4 px-1" : "mb-6"}`}>
                    <h3 className="font-bold text-lg dark:text-white">People</h3>
                    <button
                      className="text-xs font-semibold text-[#6b5c51] hover:underline"
                      onClick={() => {
                        setActiveTab("people");
                        setShowMiniProfiles((prev) => !prev);
                      }}
                    >
                      {showMiniProfiles ? "Compact view" : "View all"}
                    </button>
                  </div>

                  {showMiniProfiles ? (
                    <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={staggerContainer}>
                      {filteredPeople.map((p) => (
                        <motion.div key={p.id} variants={fadeItem}>
                          <ProfileMiniCard
                            avatar={p.avatar}
                            name={p.name}
                            role="Product Designer"
                            rating="4.9"
                            clients={`${p.mutual}+`}
                            price="200"
                            onToggle={() => toggleFollow(p.id)}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div className="space-y-4" variants={staggerContainer}>
                      {filteredPeople.map((p) => {
                        const isFollowed = following.includes(p.id);
                        return (
                          <motion.div key={p.id} className="flex items-center justify-between" variants={fadeItem}>
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <img
                                  src={p.avatar}
                                  alt={p.name}
                                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white/70 dark:ring-neutral-700"
                                />
                                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white"></span>
                              </div>
                              <div>
                                <p className="font-semibold text-[15px] text-neutral-900 dark:text-gray-100 leading-tight">{p.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">{p.username}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => toggleFollow(p.id)}
                              className={`px-4 h-9 rounded-full text-sm font-semibold flex items-center gap-2 shadow-[0_12px_22px_rgba(0,0,0,0.2)] border transition ${
                                isFollowed ? "bg-[#6b5c51] text-white border-[#6b5c51]" : "bg-[#6b5c51] text-white border-[#6b5c51]"
                              }`}
                            >
                              {isFollowed ? <FiCheck size={14} /> : <FiUserPlus size={14} />}
                              {isFollowed ? "Following" : "Follow"}
                            </button>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </motion.div>

                {activeTab === "all" && (
                  <motion.div
                    className="bg-white/50 dark:bg-neutral-800/50 rounded-3xl p-6 border border-white/20 dark:border-neutral-700"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    <h3 className="font-bold text-sm text-900 tracking-wider mb-">Trending Tags</h3>
                    <motion.div className="flex flex-wrap gap-2" variants={staggerContainer}>
                      {filteredTags.map((tag) => (
                        <motion.button
                          key={tag}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-white dark:bg-neutral-700 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:text-[#5b6cff] hover:scale-105 transition-all shadow-sm"
                          variants={fadeItem}
                        >
                          <FiHash className="text-[#6b5c51]" size={12} /> {tag}
                        </motion.button>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 text-[#2f2a25] shadow-lg hover:bg-white transition flex items-center justify-center text-lg font-semibold z-50"
            onClick={() => setSelectedMedia(null)}
          >
            <FiX />
          </button>
          <div
            className="w-full max-w-6xl h-[80vh] bg-[#d9ccbe] text-[#2f2a25] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.9fr)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-black">
              <img
                src={selectedMedia.src}
                alt={selectedMedia.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col bg-[#d9ccbe]">
              <header className="flex items-center justify-between px-4 py-3 border-b border-[#c6b8a8] sticky top-0 z-10 bg-[#d9ccbe]">
                <div className="flex items-center gap-3">
                  <img src={selectedMedia.avatar} alt={selectedMedia.author} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm text-[#2f2a25]">{selectedMedia.author}</p>
                    <p className="text-xs text-[#4b4239]/70">{selectedMedia.title}</p>
                  </div>
                </div>
                <button className="px-4 py-1.5 text-[12px] font-semibold rounded-full transition transform active:scale-95 shadow-[0_10px_22px_rgba(0,0,0,0.18)] border bg-[#6b5c51] border-[#6b5c51] text-white hover:-translate-y-0.5 hover:shadow-[0_14px_26px_rgba(0,0,0,0.2)]">
                  Follow
                </button>
              </header>

              <div className="flex-1 overflow-y-auto px-4 py-3 pb-32 space-y-4">
                {(commentsByPost[selectedMedia.id] || [])
                  .filter((c) => !c.replyToId)
                  .map((c) => {
                    const replies = (commentsByPost[selectedMedia.id] || []).filter((r) => r.replyToId === c.id);
                    return (
                      <div key={c.id} className="space-y-3">
                        <div className="flex gap-3 text-sm">
                          <div className="h-9 w-9 rounded-full bg-white/60 flex items-center justify-center text-xs font-semibold text-[#2f2a25]">
                            {c.user[0]?.toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-[#2f2a25]">{c.user}</p>
                            <p className="text-[#2f2a25]/80">{c.text}</p>
                            <div className="flex items-center gap-3 text-xs text-[#4b4239]/70 mt-1">
                              <span>{c.time}</span>
                              <span>{c.likes} likes</span>
                              <button
                                className="hover:text-[#2f2a25] transition"
                                onClick={() => startReply(c)}
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleLikeComment(selectedMedia.id, c.id)}
                            aria-pressed={c.liked}
                            className="self-center transition transform hover:scale-110"
                          >
                            <FiHeart
                              className={c.liked ? "text-[#e11d48]" : "text-[#4b4239]/70 hover:text-[#2f2a25]"}
                              style={{
                                fill: c.liked ? "#e11d48" : "none",
                                stroke: c.liked ? "#e11d48" : undefined,
                              }}
                            />
                          </button>
                        </div>

                        {replies.length > 0 && (
                          <div className="pl-10 border-l border-[#c6b8a8] space-y-3">
                            {replies.map((r) => (
                              <div key={r.id} className="flex gap-3 text-sm">
                                <div className="h-8 w-8 rounded-full bg-white/70 flex items-center justify-center text-[11px] font-semibold text-[#2f2a25]">
                                  {r.user[0]?.toUpperCase()}
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold text-[#2f2a25]">
                                    {r.user}{" "}
                                    {r.replyToId && (
                                      <span className="text-[#5b6cff] font-normal">@{(commentsByPost[selectedMedia.id] || []).find((cm) => cm.id === r.replyToId)?.user}</span>
                                    )}
                                  </p>
                                  <p className="text-[#2f2a25]/80">{r.text}</p>
                                  <div className="flex items-center gap-3 text-xs text-[#4b4239]/70 mt-1">
                                    <span>{r.time}</span>
                                    <span>{r.likes} likes</span>
                                    <button
                                      className="hover:text-[#2f2a25] transition"
                                      onClick={() => startReply(r)}
                                    >
                                      Reply
                                    </button>
                                  </div>
                                </div>
                                <button
                                  onClick={() => toggleLikeComment(selectedMedia.id, r.id)}
                                  aria-pressed={r.liked}
                                  className="self-center transition transform hover:scale-110"
                                >
                                  <FiHeart
                                    className={r.liked ? "text-[#e11d48]" : "text-[#4b4239]/70 hover:text-[#2f2a25]"}
                                    style={{
                                      fill: r.liked ? "#e11d48" : "none",
                                      stroke: r.liked ? "#e11d48" : undefined,
                                    }}
                                  />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>

              <div className="px-4 py-3 border-t border-[#c6b8a8] text-[#4b4239] bg-[#d9ccbe] flex flex-col gap-1">
                <div className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-4">
                    <button
                      className="hover:opacity-80 transition"
                      onClick={() => togglePostLike(selectedMedia.id)}
                    >
                      <FiHeart
                        className={likedPosts[selectedMedia.id] ? "text-[#e11d48]" : ""}
                        style={{
                          fill: likedPosts[selectedMedia.id] ? "#e11d48" : "none",
                          stroke: likedPosts[selectedMedia.id] ? "#e11d48" : undefined,
                        }}
                      />
                    </button>
                    <button
                      className="hover:opacity-80 transition"
                      onClick={focusCommentField}
                    >
                      <FiMessageCircle />
                    </button>
                    <button className="hover:opacity-80 transition"><FiSend /></button>
                  </div>
                  <button className="text-lg hover:opacity-80 transition"><FiBookmark /></button>
                </div>
                <div className="text-xs leading-tight">
                  <p className="font-semibold text-[#2f2a25]">{selectedMedia.likes} likes</p>
                  <p className="text-[#4b4239]/80">2 days ago</p>
                </div>
              </div>

              <div className="px-4 py-3 flex items-center gap-3 bg-[#d9ccbe]">
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#6b5c51] hover:text-[#4b4239] transition">
                  <FiSmile size={18} />
                </button>
                <div className="flex-1 flex flex-col gap-1">
                  {replyTo && (
                    <div className="flex items-center justify-between text-xs text-[#4b4239]/80 px-2">
                      <span>Replying to @{replyTo.user}</span>
                      <button
                        className="text-[#6b5c51] hover:text-[#8c7a6b]"
                        onClick={() => setReplyTo(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  <input
                    ref={commentInputRef}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handlePost();
                      }
                    }}
                    placeholder="Add a comment..."
                    className="flex-1 bg-white/80 border border-[#c6b8a8] rounded-full px-4 py-2 text-sm placeholder:text-[#4b4239]/60 text-[#2f2a25] outline-none focus:border-[#6b5c51]/60"
                  />
                </div>
                <button
                  onClick={handlePost}
                  className="text-sm font-semibold text-[#6b5c51] hover:text-[#8c7a6b] transition"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
