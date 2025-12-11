import { useCallback, useRef, useState, useEffect } from "react";
import FeedPost from "../components/FeedPost";
import StoriesPanel from "../components/StoriesPanel";
import RightProfileCard from "../components/RightProfileCard";

const INITIAL_POSTS = [
  {
    id: "p-1",
    author: "Ella Moss",
    avatar: "https://i.pravatar.cc/60?img=24",
    content:
      "Cool summer breezes rustling the leaves and the whisper of a mountain stream.",
    attachments: {
      images: [
        "https://images.unsplash.com/photo-1504788363733-507549153474?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1438109491414-7198515b166b?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1504198458649-3128b932f49b?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80",
      ],
      layout: "collage",
    },
    createdAt: "5m ago",
    privacy: "Public",
    stats: { likes: 4520, comments: 2190, shares: 1750, reposts: 980 },
  },
  {
    id: "p-2",
    author: "Jordan Kim",
    avatar: "https://i.pravatar.cc/60?img=32",
    content:
      "Experimenting with a new color palette for the dashboard project. Loving the muted tones.",
    attachments: {
      images: [
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
      ],
      layout: "grid",
    },
    createdAt: "24m ago",
    privacy: "Friends",
    stats: { likes: 87, comments: 12, shares: 6, reposts: 3 },
  },
  {
    id: "p-3",
    author: "Riley Chen",
    avatar: "https://i.pravatar.cc/60?img=51",
    content: "Weekend trip photos are in! Can't wait to sort through them tonight.",
    createdAt: "1h ago",
    privacy: "Only me",
    attachments: { images: [], layout: "single" },
    stats: { likes: 45, comments: 3, shares: 1, reposts: 1 },
  },
];

export default function Home({ darkMode, onToggleDarkMode, onOpenNotifications, onOpenFriends }) {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);

  const pullStartRef = useRef(0);
  const pullingRef = useRef(false);

  const triggerRefresh = useCallback(() => {
    setIsRefreshing(true);
    const newPost = {
      id: `ref-${Date.now()}`,
      author: "Dexter",
      avatar: "https://i.pravatar.cc/60?img=8",
      content: "Feed just refreshed. Here's a fresh view!",
      createdAt: "Just now",
      privacy: "Public",
      attachments: { images: [], layout: "single" },
      stats: { likes: 0, comments: 0, shares: 0, reposts: 0 },
    };
    setTimeout(() => {
      setPosts((prev) => [newPost, ...prev]);
      setIsRefreshing(false);
    }, 900);
  }, []);

  useEffect(() => {
    const MAX_PULL = 120;
    const THRESHOLD = 80;

    const onTouchStart = (e) => {
      if (window.scrollY > 2 || isRefreshing) return;
      pullStartRef.current = e.touches[0].clientY;
      pullingRef.current = true;
    };

    const onTouchMove = (e) => {
      if (!pullingRef.current) return;
      const distance = e.touches[0].clientY - pullStartRef.current;
      if (distance > 0) {
        if (distance > 12) e.preventDefault();
        setPullDistance(Math.min(distance, MAX_PULL));
      } else {
        setPullDistance(0);
      }
    };

    const onTouchEnd = () => {
      if (!pullingRef.current) return;
      const shouldRefresh = pullDistance >= THRESHOLD && !isRefreshing;
      setPullDistance(0);
      pullingRef.current = false;
      if (shouldRefresh) triggerRefresh();
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isRefreshing, pullDistance, triggerRefresh]);

  const visiblePosts = posts;

  return (
    <div
      className={
        "flex w-full min-h-screen transition-colors duration-300 " +
        (darkMode ? "bg-neutral-900 text-neutral-200" : "bg-[#d9ccbe] text-neutral-900")
      }
    >

      {/* MAIN CONTENT AREA */}
      <div className="flex-1">

        {/* MAIN WRAPPER */}
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row justify-center gap-8 px-4 lg:px-8 mt-6">

          {/* FEED LEFT */}
          <div className="flex-1 max-w-[820px] w-full mx-auto transition-all duration-300 p-6">

            {/* Stories */}
            <StoriesPanel />

            {/* Pull-to-refresh indicator */}
            <div
              className={`overflow-hidden transition-all duration-200 ${
                pullDistance > 0 || isRefreshing ? "max-h-14 mb-3" : "max-h-0 mb-0"
              }`}
            >
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-200">
                <div
                  className={`h-7 w-7 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center ${
                    isRefreshing ? "animate-spin border-t-[#7d7573] dark:border-t-[#7d7573]" : ""
                  }`}
                  style={!isRefreshing ? { transform: `rotate(${(pullDistance / 120) * 180}deg)` } : {}}
                >
                  {!isRefreshing && <span className="text-[11px]">↓</span>}
                </div>
                <span>
                  {isRefreshing
                    ? "Refreshing..."
                    : pullDistance >= 80
                      ? "Release to refresh"
                      : "Pull to refresh"}
                </span>
              </div>
            </div>

            {/* Feed Header */}
            <div className="mt-6 pb-2 flex items-center text-gray-700 dark:text-gray-200 transition-colors duration-300">
              <h2 className="font-semibold tracking-tight text-[20px]">Feeds</h2>
            </div>

            {/* Posts */}
            {visiblePosts.length === 0 ? (
              <div className="mt-6 p-8 rounded-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm text-gray-600 dark:text-gray-300 text-center shadow-sm">
                <div className="text-2xl mb-2">¯\\_(ツ)_/¯</div>
                <div className="font-semibold mb-1">Chưa có bài viết nào</div>
                <p className="text-sm">Hãy tạo bài đầu tiên hoặc đổi bộ lọc.</p>
              </div>
            ) : (
              visiblePosts.map((post) => (
                <FeedPost
                  key={post.id}
                  author={post.author}
                  avatar={post.avatar}
                  content={post.content}
                  createdAt={post.createdAt}
                  privacy={post.privacy}
                  attachments={post.attachments}
                  stats={post.stats}
                />
              ))
            )}
          </div>

          {/* RIGHT PANEL */}
          <div className="w-full lg:w-[320px] flex-shrink-0 pt-6">
            <RightProfileCard />
          </div>

        </div>
      </div>
    </div>
  );
}
