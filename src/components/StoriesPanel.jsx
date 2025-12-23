import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

const STORIES_KEY = "stories_feed_v1";

const mockStories = [
  {
    id: "s1",
    cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
    author: "James Bator",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: "s2",
    cover: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&q=80",
    author: "Riyan Ali",
    avatar: "https://i.pravatar.cc/100?img=35",
  },
  {
    id: "s3",
    cover: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=400&q=80",
    author: "Nolan Jhon",
    avatar: "https://i.pravatar.cc/100?img=20",
  },
  {
    id: "s4",
    cover: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
    author: "Miracle Diaz",
    avatar: "https://i.pravatar.cc/100?img=45",
  },
];

export default function StoriesPanel() {
  const [savedStories, setSavedStories] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORIES_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setSavedStories(parsed);
    } catch {
      // ignore storage errors
    }
  }, []);

  const stories = useMemo(() => {
    return [...savedStories, ...mockStories];
  }, [savedStories]);

  return (
    <div className="w-full max-w-5xl mx-auto mb-8 px-2">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-[18px]">Stories</h2>
        <Link
          to="/stories"
          className="text-[13px] text-[#6B5C51] hover:underline font-semibold"
        >
          View all
        </Link>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2">
        <Link
          to="/create-story"
          className="min-w-[110px] h-[160px] rounded-3xl border-2 border-dashed border-[#7d7573]/40 dark:border-white/20 flex flex-col items-center justify-center text-sm font-semibold text-[#7d7573] dark:text-white/80 hover:border-[#5b6cff] hover:text-[#5b6cff] transition"
        >
          <div className="w-10 h-10 rounded-2xl border border-current flex items-center justify-center mb-2">
            <FiPlus size={20} />
          </div>
          Create Story
        </Link>

        {stories.map((story) => (
          <Link
            to={`/stories?active=${story.id}`}
            key={story.id}
            className="relative min-w-[110px] h-[160px] rounded-3xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-sm ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg"
          >
            {story.coverType === "gradient" ? (
              <div className="w-full h-full" style={{ backgroundImage: story.cover }} />
            ) : (
              <img src={story.cover} alt={story.author} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-[2px] rounded-full bg-gradient-to-tr from-pink-500 via-amber-300 to-purple-500">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/90">
                  <img src={story.avatar} alt={story.author} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-[13px] font-semibold drop-shadow-sm">
              {story.author}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
