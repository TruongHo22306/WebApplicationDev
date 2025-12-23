import { useCallback, useRef, useState, useEffect } from "react";
import FeedPost from "../components/FeedPost";
import StoriesPanel from "../components/StoriesPanel";
import RightProfileCard from "../components/RightProfileCard";

// Logic Change: We no longer need INITIAL_POSTS or POSTS_KEY constants

export default function Home({ darkMode, onToggleDarkMode, onOpenNotifications, onOpenFriends }) {
  // Logic Change: Initialize state for live database data
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);

  const pullStartRef = useRef(0);
  const pullingRef = useRef(false);

  // Logic Change: Function to fetch from your Backend
  const fetchLivePosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts");
      const data = await response.json();
      if (response.ok) {
        setPosts(data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Logic Change: Load database posts on mount
  useEffect(() => {
    fetchLivePosts();
  }, []);

  // Logic Change: Refresh now pulls from DB instead of a dummy "Dexter" post
  const triggerRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchLivePosts();
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

  return (
    <div
      className={
        "flex w-full min-h-screen transition-colors duration-300 " +
        (darkMode ? "bg-[#23201B] text-[#EDE5DA]" : "bg-[#d9ccbe] text-neutral-900")
      }
    >
      <div className="flex-1">
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row justify-center gap-8 px-4 lg:px-8 mt-6">
          <div className="flex-1 max-w-[820px] w-full mx-auto transition-all duration-300 p-6">
            <StoriesPanel />

            {/* Refresh Indicator - UI Kept Exactly */}
            <div
              className={`overflow-hidden transition-all duration-200 ${
                pullDistance > 0 || isRefreshing ? "max-h-14 mb-3" : "max-h-0 mb-0"
              }`}
            >
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-200">
                <div
                  className={`h-7 w-7 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center ${
                    isRefreshing ? "animate-spin border-t-[#7d7573]" : ""
                  }`}
                  style={!isRefreshing ? { transform: `rotate(${(pullDistance / 120) * 180}deg)` } : {}}
                >
                  {!isRefreshing && <span className="text-[11px]">↓</span>}
                </div>
                <span>{isRefreshing ? "Refreshing..." : "Pull to refresh"}</span>
              </div>
            </div>

            <div className="mt-6 pb-2 flex items-center text-gray-700 dark:text-gray-200 transition-colors duration-300">
              <h2 className="font-semibold tracking-tight text-[20px]">Feeds</h2>
            </div>

            {/* Logic Change: Map through DB results */}
            {loading ? (
              <div className="text-center py-10 opacity-70">Loading feed...</div>
            ) : posts.length === 0 ? (
              <div className="mt-6 p-8 rounded-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm text-gray-600 dark:text-gray-300 text-center shadow-sm">
                <div className="text-2xl mb-2">¯\_(ツ)_/¯</div>
                <div className="font-semibold mb-1">Chưa có bài viết nào</div>
                <p className="text-sm">Hãy tạo bài đầu tiên hoặc đổi bộ lọc.</p>
              </div>
            ) : (
              posts.map((post) => (
                <FeedPost
                  key={post._id} // MongoDB uses _id
                  author={post.user ? `${post.user.first} ${post.user.last}` : "Anonymous"}
                  avatar={post.user?.avatar || "https://i.pravatar.cc/150"}
                  content={post.content}
                  createdAt={new Date(post.createdAt).toLocaleDateString()}
                  privacy={post.privacy || "Public"}
                  attachments={{
                    images: post.image ? [post.image] : [],
                    layout: "single"
                  }}
                  stats={post.stats || { likes: 0, comments: 0, shares: 0 }}
                />
              ))
            )}
          </div>

          <div className="w-full lg:w-[320px] flex-shrink-0 pt-6">
            <RightProfileCard />
          </div>
        </div>
      </div>
    </div>
  );
}