import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FiMail,
  FiGlobe,
  FiMapPin,
  FiBookOpen,
  FiUsers,
  FiImage,
  FiMessageCircle,
  FiEdit2,
  FiCamera,
  FiX,
  FiCheck,
  FiFileText,
  FiHash,
  FiUser,
  FiBookmark,
} from "react-icons/fi";
import { FaYoutube, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Uploader from "../components/Uploader";
import FeedPost from "../components/FeedPost";

const POSTS_KEY = "home_posts_v1";

const coverUrl =
  "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1400&q=80";
const avatarUrl = "https://i.pravatar.cc/160?img=14";

const HIGHLIGHTS = [
  { id: "h-1", label: "Trips", src: "https://i.pravatar.cc/80?img=12" },
  { id: "h-2", label: "Studio", src: "https://i.pravatar.cc/80?img=32" },
  { id: "h-3", label: "Mood", src: "https://i.pravatar.cc/80?img=45" },
  { id: "h-4", label: "Sketches", src: "https://i.pravatar.cc/80?img=8" },
];

const INITIAL_POSTS = [
  {
    id: "profile-post-1",
    author: "Mathew Anderson",
    avatar: "https://i.pravatar.cc/100?img=14",
    content:
      "Sezawu himov tol re deb lasica ihdefru oze cu acu han ap wa ejo. Sa fa nivefudu kogzapo cap wieddep vod gim hosjov gat fumus luhudnypi so jaf.",
    createdAt: "15 min ago",
    privacy: "Public",
    pinned: true,
    attachments: {
      imageUrl:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      imageName: "mountain-road.jpg",
      fileName: "",
      location: "",
    },
    stats: { likes: 120, comments: 12, shares: 5, reposts: 3 },
  },
  {
    id: "profile-post-2",
    author: "Mathew Anderson",
    avatar: "https://i.pravatar.cc/100?img=14",
    content: "New sketch explorations for a dashboard hero layout.",
    createdAt: "1h ago",
    privacy: "Friends",
    pinned: true,
    attachments: {
      imageUrl: "",
      imageName: "",
      fileName: "wireframe.pdf",
      location: "NYC Studio",
    },
    stats: { likes: 48, comments: 4, shares: 2, reposts: 1 },
  },
];

const DEFAULT_PROFILE = {
  name: "Mathew Anderson",
  username: "mathew",
  role: "Designer",
  bio:
    "Hello, I am Mathew Anderson. I love making websites and graphics. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  email: "xyzjonathan@gmail.com",
  website: "www.xyz.com",
  location: "New York, USA - 100001",
  school: "Sir, P P Institute Of Science",
  verified: true,
};

const STAT_LIST = {
  Posts: ["Pinned ideas", "Sketch dump", "Moodboard", "Studio shots"],
  Followers: ["Ari Lane", "Jasper Reed", "Cleo Park", "Romy Diaz", "Noah Kim"],
  Following: ["Lana Dean", "Studio Nine", "Gabi Chen", "Tom Wu"],
};

export default function Profile({ darkMode = false }) {
  const location = useLocation();
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [draftProfile, setDraftProfile] = useState(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);

  const [avatarSrc, setAvatarSrc] = useState(avatarUrl);
  const [coverSrc, setCoverSrc] = useState(coverUrl);
  const [coverOffset, setCoverOffset] = useState(50);
  const [isRepositioning, setIsRepositioning] = useState(false);
  const [isCoverDragging, setIsCoverDragging] = useState(false);
  const coverRef = useRef(null);
  const coverDragRef = useRef({ startY: 0, startOffset: 50 });

  const socialLinks = [
    {
      name: "YouTube",
      href: "https://youtube.com",
      bg: "bg-[#e9eafe]",
      color: "text-[#5b6cff]",
      icon: <FaYoutube size={18} />,
    },
    {
      name: "GitHub",
      href: "https://github.com",
      bg: "bg-[#e9f6ff]",
      color: "text-[#1f6feb]",
      icon: <FaGithub size={18} />,
    },
    {
      name: "X",
      href: "https://twitter.com",
      bg: "bg-[#ffe9f0]",
      color: "text-[#e04c86]",
      icon: <FaXTwitter size={18} />,
    },
  ];

  const [posts, setPosts] = useState(() => {
    try {
      const raw = localStorage.getItem(POSTS_KEY);
      const stored = raw ? JSON.parse(raw) : [];
      const storedPosts = Array.isArray(stored)
        ? stored.map((p) => ({
            ...p,
            origin: "local",
            pinned: Boolean(p.pinned),
          }))
        : [];
      return [...storedPosts, ...INITIAL_POSTS];
    } catch {
      return [...INITIAL_POSTS];
    }
  });

  const [activeTab, setActiveTab] = useState("Posts");
  const [activeStat, setActiveStat] = useState(null);
  const [profileStats, setProfileStats] = useState({
    posts: 938,
    followers: 3586,
    following: 2659,
  });

  const pinnedPosts = useMemo(() => posts.filter((p) => p.pinned), [posts]);
  const regularPosts = useMemo(() => posts.filter((p) => !p.pinned), [posts]);

  const galleryImages = useMemo(() => {
    const images = [];
    posts.forEach((post) => {
      if (post.attachments?.images?.length) {
        images.push(...post.attachments.images);
      } else if (post.attachments?.imageUrl) {
        images.push(post.attachments.imageUrl);
      }
    });
    return images.slice(0, 9);
  }, [posts]);

  useEffect(() => {
    const localPosts = posts.filter((p) => p.origin === "local");
    try {
      localStorage.setItem(POSTS_KEY, JSON.stringify(localPosts));
    } catch {
      // ignore
    }
  }, [posts]);

  useEffect(() => {
    if (!isCoverDragging) return;

    const onMove = (e) => {
      if (!coverRef.current) return;
      const rect = coverRef.current.getBoundingClientRect();
      const dy = e.clientY - coverDragRef.current.startY;
      const delta = (dy / rect.height) * 100;
      const next = Math.max(0, Math.min(100, coverDragRef.current.startOffset + delta));
      setCoverOffset(next);
    };

    const onUp = () => {
      setIsCoverDragging(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isCoverDragging]);

  const handleCreatePost = ({ content, privacy, attachments }) => {
    setPosts((prev) => [
      {
        id: `profile-post-${Date.now()}`,
        author: "You",
        avatar: "https://i.pravatar.cc/100?img=7",
        content,
        createdAt: "Just now",
        privacy,
        pinned: false,
        origin: "local",
        attachments,
        stats: { likes: 0, comments: 0, shares: 0, reposts: 0 },
      },
      ...prev,
    ]);
  };

  const togglePin = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, pinned: !post.pinned } : post
      )
    );
  };

  const handleStartEdit = () => {
    setDraftProfile(profile);
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setProfile(draftProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setDraftProfile(profile);
    setIsEditing(false);
  };

  const onCoverMouseDown = (e) => {
    if (!isRepositioning) return;
    coverDragRef.current = { startY: e.clientY, startOffset: coverOffset };
    setIsCoverDragging(true);
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const src = URL.createObjectURL(file);
    setCoverSrc(src);
    setCoverOffset(50);
    setIsRepositioning(false);
    e.target.value = "";
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const src = URL.createObjectURL(file);
    setAvatarSrc(src);
    e.target.value = "";
  };

  useEffect(() => {
    const suggestion = location.state?.suggestion;
    if (!suggestion) {
      setProfile(DEFAULT_PROFILE);
      setDraftProfile(DEFAULT_PROFILE);
      setAvatarSrc(avatarUrl);
      setProfileStats({ posts: 938, followers: 3586, following: 2659 });
      return;
    }

    const username = suggestion.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 14);
    const nextProfile = {
      ...DEFAULT_PROFILE,
      name: suggestion.name,
      username: username || DEFAULT_PROFILE.username,
      role: "Creator",
      location: suggestion.location || DEFAULT_PROFILE.location,
    };
    setProfile(nextProfile);
    setDraftProfile(nextProfile);
    if (suggestion.avatar) setAvatarSrc(suggestion.avatar);
    setProfileStats({
      posts: suggestion.stats?.posts ?? 0,
      followers: suggestion.stats?.followers ?? 0,
      following: suggestion.stats?.following ?? 0,
    });
  }, [location.state]);

  const formatStat = (value) =>
    typeof value === "number" ? value.toLocaleString() : value;

  const pageTone = darkMode
    ? "bg-[#23201B] text-[#EDE5DA]"
    : "bg-[#d9ccbe] text-neutral-900";
  const cardTone = darkMode
    ? "bg-[#2B2722] text-[#EDE5DA] border border-[#3a332c]"
    : "bg-white text-neutral-900";
  const modalTone = darkMode ? "bg-[#2B2722] text-[#EDE5DA]" : "bg-white";

  return (
    <div className={`min-h-screen ${pageTone}`}>
      <div className="max-w-6xl mx-auto py-8 px-6 space-y-6">
        {/* COVER & HEADER */}
        <div className={`rounded-2xl shadow-sm overflow-hidden ${cardTone}`}>
          <div className="relative">
            <div
              ref={coverRef}
              className={`h-40 bg-gradient-to-r from-[#c6b5ff] to-[#9db8ff] relative ${
                isRepositioning ? "cursor-grab active:cursor-grabbing" : ""
              }`}
              onMouseDown={onCoverMouseDown}
            >
              <img
                src={coverSrc}
                alt="Cover"
                className="w-full h-full object-cover opacity-90"
                style={{ objectPosition: `50% ${coverOffset}%` }}
                draggable={false}
              />
              {isRepositioning && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-sm">
                  Drag to reposition
                </div>
              )}
            </div>

            <div className="absolute top-3 right-3 flex items-center gap-2">
              <label className="px-3 py-1.5 rounded-full bg-white/90 text-xs font-medium flex items-center gap-2 cursor-pointer shadow dark:bg-[#2B2722]/90 dark:text-[#EDE5DA]">
                <FiCamera />
                <span className="hidden sm:inline">Change cover</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
              </label>
              <button
                type="button"
                className={`px-3 py-1.5 rounded-full text-xs font-medium shadow ${
                  isRepositioning ? "bg-black text-white" : "bg-white/90 dark:bg-[#2B2722]/90 dark:text-[#EDE5DA]"
                }`}
                onClick={() => setIsRepositioning((v) => !v)}
              >
                {isRepositioning ? "Done" : "Reposition"}
              </button>
            </div>

            <div className="absolute left-1/2 -bottom-10 -translate-x-1/2">
              <div className="relative">
                <img
                  src={avatarSrc}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                />
                {isEditing && (
                  <label className="absolute inset-0 rounded-full bg-black/40 text-white text-xs font-medium flex items-center justify-center cursor-pointer">
                    <FiCamera className="mr-1" />
                    Change
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="pt-12 pb-6 px-8">
            <div className="relative flex w-full flex-col items-center gap-4">
              <div className="flex flex-col items-center text-center space-y-2">
                {isEditing ? (
                  <>
                    <input
                      value={draftProfile.name}
                      onChange={(e) =>
                        setDraftProfile((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="text-xl font-semibold text-center bg-neutral-100 rounded-lg px-3 py-1.5 dark:bg-[#3a332c] dark:text-[#EDE5DA]"
                    />
                    <input
                      value={draftProfile.username}
                      onChange={(e) =>
                        setDraftProfile((prev) => ({ ...prev, username: e.target.value }))
                      }
                      className="text-xs text-neutral-500 text-center bg-neutral-100 rounded-lg px-3 py-1.5 dark:bg-[#3a332c] dark:text-[#B89B6C]"
                    />
                    <input
                      value={draftProfile.role}
                      onChange={(e) =>
                        setDraftProfile((prev) => ({ ...prev, role: e.target.value }))
                      }
                      className="text-xs text-neutral-500 text-center bg-neutral-100 rounded-lg px-3 py-1.5 dark:bg-[#3a332c] dark:text-[#B89B6C]"
                    />
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl font-semibold">{profile.name}</h1>
                      {profile.verified && (
                        <span className="w-6 h-6 rounded-full bg-[#5b6cff] text-white flex items-center justify-center">
                          <FiCheck size={14} />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-[#B89B6C]">@{profile.username}</p>
                    <p className="text-xs text-neutral-500 dark:text-[#B89B6C]">{profile.role}</p>
                  </>
                )}
              </div>

              <div className="flex items-center justify-center gap-3 lg:justify-end">
                {isEditing ? (
                  <>
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-medium"
                    onClick={handleSaveProfile}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-full bg-neutral-100 text-xs font-medium"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-full bg-[#d9ccbe] border border-[#cfc2b4] text-xs font-medium flex items-center gap-2 dark:bg-[#3a332c] dark:border-[#4a4036] dark:text-[#EDE5DA]"
                  onClick={handleStartEdit}
                >
                  <FiEdit2 />
                  Edit profile
                </button>
              )}
            </div>

              <div className="flex flex-wrap items-center justify-center gap-2 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-9 h-9 rounded-full ${link.bg} ${link.color} flex items-center justify-center hover:opacity-80 transition`}
                    title={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* STATS */}
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <Stat
                label="Posts"
                value={formatStat(profileStats.posts)}
                onClick={() => setActiveStat("Posts")}
                tone="indigo"
              />
              <Stat
                label="Followers"
                value={formatStat(profileStats.followers)}
                onClick={() => setActiveStat("Followers")}
                tone="sky"
              />
              <Stat
                label="Following"
                value={formatStat(profileStats.following)}
                onClick={() => setActiveStat("Following")}
                tone="rose"
              />
            </div>
          </div>
        </div>

        <div className="space-y-0">
          {/* TABS */}
          <div className="px-2 py-2 border-b border-[#cfc2b4]/70 dark:border-[#3a332c]">
            <div className="flex w-full justify-between max-w-sm mx-auto">
              {[
                { id: "Posts", icon: <FiFileText /> },
                { id: "Tagged", icon: <FiHash /> },
                { id: "About", icon: <FiUser /> },
              ].map((tab) => (
                <TabButton
                  key={tab.id}
                  active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                </TabButton>
              ))}
            </div>
          </div>

          {activeTab === "About" && (
            <div className={`rounded-b-2xl shadow-sm p-6 ${cardTone}`}>
              <h3 className="text-lg font-semibold">About activity</h3>
              <p className="text-sm text-neutral-600 mt-2">
                Recent highlights and profile changes will appear here.
              </p>
            </div>
          )}

          {activeTab === "Posts" && (
            <div className="space-y-2 pt-3">
              <div className="text-lg font-semibold uppercase tracking-wide text-black px-3 -mb-1 dark:text-[#EDE5DA]">
                Post
              </div>
              {pinnedPosts.map((post) => (
                <PostCard key={post.id} post={post} onTogglePin={togglePin} />
              ))}
              {regularPosts.map((post) => (
                <PostCard key={post.id} post={post} onTogglePin={togglePin} />
              ))}
            </div>
          )}

          {activeTab === "Tagged" && (
            <div className={`rounded-b-2xl shadow-sm p-8 text-center ${cardTone}`}>
              <div className="mx-auto w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center">
                <FiUsers />
              </div>
              <h3 className="text-lg font-semibold mt-4">No tagged posts</h3>
              <p className="text-sm text-neutral-500 mt-2">
                Photos and videos you are tagged in appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      {activeStat && (
        <StatsModal
          title={activeStat}
          items={STAT_LIST[activeStat] || []}
          onClose={() => setActiveStat(null)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

function Stat({ label, value, onClick, tone = "indigo" }) {
  const toneStyles = {
    indigo: "bg-[#eef0ff] border-[#d8dcff] text-[#5b6cff]",
    sky: "bg-[#e9f6ff] border-[#cfeaff] text-[#1f6feb]",
    rose: "bg-[#ffe9f0] border-[#ffd4e3] text-[#e04c86]",
  };

  return (
    <button
      type="button"
      className={`rounded-2xl px-3 py-3 border transition ${toneStyles[tone] || toneStyles.indigo}`}
      onClick={onClick}
    >
      <p className="text-base font-semibold">{value}</p>
      <p className="text-[10px] mt-1 uppercase tracking-wide text-black/60 dark:text-[#B89B6C]">
        {label}
      </p>
    </button>
  );
}

function InfoRow({ icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#5b6cff]">{icon}</span>
      <span className="flex-1">{text}</span>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`pb-2 text-xl transition border-b-2 ${
        active
          ? "border-[#7d7573] text-black dark:border-[#B89B6C] dark:text-[#EDE5DA]"
          : "border-transparent text-black/70 hover:text-black dark:text-[#B89B6C] dark:hover:text-[#EDE5DA]"
      }`}
    >
      {children}
    </button>
  );
}

function PostCard({ post, onTogglePin }) {
  return (
    <div className="rounded-2xl">
      <div className="flex items-center justify-end px-3 pt-3 pb-1">
        <button
          type="button"
          className="text-xs text-neutral-500 hover:text-neutral-900 transition flex items-center gap-1 dark:text-[#B89B6C] dark:hover:text-[#EDE5DA]"
          onClick={() => onTogglePin(post.id)}
        >
          <FiBookmark size={12} />
          {post.pinned ? "Unpin" : "Pin"}
        </button>
      </div>
      <FeedPost
        author={post.author}
        avatar={post.avatar}
        content={post.content}
        createdAt={post.createdAt}
        privacy={post.privacy}
        attachments={post.attachments}
        stats={post.stats}
      />
    </div>
  );
}

function ImageGrid({ images }) {
  if (!images.length) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-200 p-6 text-center text-sm text-neutral-500">
        No images yet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {images.map((src, idx) => (
        <div key={`${src}-${idx}`} className="aspect-square overflow-hidden rounded-xl">
          <img src={src} alt="gallery" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}

function StatsModal({ title, items, onClose, darkMode }) {
  const modalTone = darkMode ? "bg-[#2B2722] text-[#EDE5DA]" : "bg-white";
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <div className={`rounded-2xl w-full max-w-md p-6 shadow-lg ${modalTone}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            type="button"
            className="p-2 rounded-full hover:bg-neutral-100"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>
        <div className="space-y-3 max-h-72 overflow-auto">
          {items.length ? (
            items.map((name) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-xl bg-neutral-50 px-4 py-3 text-sm dark:bg-[#3a332c] dark:text-[#EDE5DA]"
              >
                <span>{name}</span>
                <button
                  type="button"
                  className="text-xs px-3 py-1 rounded-full bg-neutral-900 text-white dark:bg-[#1f1b16]"
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <div className="text-sm text-neutral-500 dark:text-[#B89B6C]">No data yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
