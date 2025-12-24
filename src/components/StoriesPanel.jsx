import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

export default function StoriesPanel() {
  const [stories, setStories] = useState([]);

  // Fetch from Backend
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const token = localStorage.getItem("token");
        // Only fetch if logged in
        if (!token) return;

        const res = await fetch("http://localhost:5000/api/stories", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (res.ok) {
          const realStories = await res.json();
          setStories(realStories); // Load ONLY real stories
        }
      } catch (err) {
        console.error("Failed to load stories", err);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mb-8 px-2">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-[18px] dark:text-white">Stories</h2>
        <Link to="/stories" className="text-[13px] text-[#6B5C51] hover:underline font-semibold dark:text-gray-300">
          View all
        </Link>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2">
        {/* Create Button */}
        <Link
          to="/create-story"
          className="w-[110px] min-w-[110px] h-[160px] flex-shrink-0 rounded-3xl border-2 border-dashed border-[#7d7573]/40 dark:border-white/20 flex flex-col items-center justify-center text-sm font-semibold text-[#7d7573] dark:text-white/80 hover:border-[#5b6cff] hover:text-[#5b6cff] transition"
        >
          <div className="w-10 h-10 rounded-2xl border border-current flex items-center justify-center mb-2">
            <FiPlus size={20} />
          </div>
          Create Story
        </Link>

        {/* Story List */}
        {stories.map((story) => (
          <Link
            to={`/stories?active=${story._id}`}
            key={story._id}
            className="relative w-[110px] min-w-[110px] h-[160px] flex-shrink-0 rounded-3xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-sm ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg"
          >
            {/* Render Background */}
            {story.media.type === "gradient" ? (
              <div className="w-full h-full" style={{ background: story.media.src }} />
            ) : (
              <img src={story.media.src} alt="story" className="w-full h-full object-cover" />
            )}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

            {/* User Avatar */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-[2px] rounded-full bg-gradient-to-tr from-pink-500 via-amber-300 to-purple-500">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/90 bg-white">
                  <img 
                    src={story.user?.avatar || "https://i.pravatar.cc/150"} 
                    alt={story.user?.first} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            </div>

            {/* User Name */}
            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-[13px] font-semibold drop-shadow-sm whitespace-nowrap">
              {story.user?.first || "User"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}