import { useState } from "react";
import { FiMessageSquare, FiLock } from "react-icons/fi";

const suggestions = [
  {
    name: "Webuistylist",
    location: "Elk Grove, California",
    avatar: "https://i.pravatar.cc/60?img=68",
    stats: { posts: 0, followers: 210, following: 197 },
  },
  {
    name: "Anghelina",
    location: "Sibiu, Romania",
    avatar: "https://i.pravatar.cc/60?img=32",
    stats: { posts: 12, followers: 12_300, following: 480 },
  },
  {
    name: "Mais Designer",
    location: "Ukraine",
    avatar: "https://i.pravatar.cc/60?img=16",
    stats: { posts: 45, followers: 8900, following: 340 },
  },
  {
    name: "Vera Cherry",
    location: "Bremen, Germany",
    avatar: "https://i.pravatar.cc/60?img=47",
    stats: { posts: 103, followers: 21_000, following: 540 },
  },
  {
    name: "Josh e-Sport",
    location: "Elk Grove, California",
    avatar: "https://i.pravatar.cc/60?img=5",
    stats: { posts: 64, followers: 15_800, following: 610 },
  },
];

const recentChats = [
  { name: "Julia Clarke", location: "New York, USA", avatar: "https://i.pravatar.cc/60?img=11" },
  { name: "Sara Cliene", location: "Sydney, Australia", avatar: "https://i.pravatar.cc/60?img=22" },
  { name: "Amy Ruth", location: "Dubai, UAE", avatar: "https://i.pravatar.cc/60?img=36" },
  { name: "Mark Stefine", location: "Chicago, USA", avatar: "https://i.pravatar.cc/60?img=9" },
  { name: "Trinity Sipson", location: "New York, USA", avatar: "https://i.pravatar.cc/60?img=56" },
  { name: "Albini Vjosa", location: "Tokyo, Japan", avatar: "https://i.pravatar.cc/60?img=14" },
];

export default function RightProfileCard() {
  const [followed, setFollowed] = useState(() =>
    suggestions.reduce((acc, s) => ({ ...acc, [s.name]: false }), {})
  );

  const toggleFollow = (name) => {
    setFollowed((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="w-full space-y-4">
      <div className="p-4">
        <h3 className="font-semibold text-[15px] mb-3">Suggestions</h3>
        <div className="space-y-3">
          {suggestions.map((item) => (
            <div
              key={item.name}
              className="group relative flex items-center gap-3 p-2 rounded-xl hover:bg-white/50 dark:hover:bg-neutral-800/70 transition-colors"
            >
              <img
                src={item.avatar}
                alt={item.name}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div className="leading-tight flex-1">
                <p className="font-semibold text-[14px] text-neutral-900 dark:text-neutral-100">
                  {item.name}
                </p>
                <p className="text-[12px] text-neutral-500 dark:text-neutral-400">
                  {item.location}
                </p>
              </div>
              <button
                onClick={() => toggleFollow(item.name)}
                className={`px-4 py-1.5 text-[12px] font-semibold rounded-full border transition transform active:scale-95 shadow-md bg-[#6B5C51] border-[#6B5C51] text-white hover:-translate-y-0.5 hover:shadow-lg ${
                  followed[item.name] ? "opacity-85" : ""
                }`}
              >
                {followed[item.name] ? "Following" : "Follow"}
              </button>

              {/* Hover profile preview */}
              <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 opacity-0 translate-x-2 z-50">
                <div className="w-72 rounded-2xl bg-neutral-900 text-white shadow-2xl border border-white/10 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20" />
                    <div>
                      <p className="font-semibold text-[15px]">{item.name}</p>
                      <p className="text-[12px] text-white/70">{item.location}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 text-center text-[12px] mb-3">
                    <div>
                      <p className="font-semibold text-[14px]">{item.stats.posts}</p>
                      <p className="text-white/70">Posts</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[14px]">{item.stats.followers.toLocaleString()}</p>
                      <p className="text-white/70">Followers</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[14px]">{item.stats.following}</p>
                      <p className="text-white/70">Following</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 mb-3">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                      <FiLock className="text-white/80" size={18} />
                    </div>
                    <p className="font-semibold text-[13px]">Private account</p>
                    <p className="text-[12px] text-center text-white/70 px-2">
                      Follow to see their photos and videos.
                    </p>
                  </div>

                  <button className="w-full py-2 rounded-full bg-[#6B5C51] text-white font-semibold text-[14px] hover:opacity-90 transition">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Chats */}
      <div className="p-4">
        <h3 className="font-semibold text-[15px] mb-3">Recent Chats</h3>
        <div className="space-y-3">
          {recentChats.map((chat) => (
            <div
              key={chat.name}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/50 dark:hover:bg-neutral-800/70 transition-colors"
            >
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div className="leading-tight flex-1">
                <p className="font-semibold text-[14px] text-neutral-900 dark:text-neutral-100">
                  {chat.name}
                </p>
                <p className="text-[12px] text-neutral-500 dark:text-neutral-400">
                  {chat.location}
                </p>
              </div>
              <button
                aria-label={`Message ${chat.name}`}
                className="p-2 rounded-full bg-[#6B5C51] text-white hover:opacity-90 hover:-translate-y-0.5 transition transform shadow-md active:scale-95"
              >
                <FiMessageSquare size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
