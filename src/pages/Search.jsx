import { useState } from "react";
import { FiSearch, FiSliders, FiUserPlus, FiHash, FiMapPin, FiClock } from "react-icons/fi";

const peopleResults = [
  { name: "Alex Morgan", handle: "@alexmorgan", bio: "Digital creator · Photographer", mutual: 12, avatar: "https://i.pravatar.cc/80?img=14" },
  { name: "Sarah Johnson", handle: "@sarah", bio: "Travel · Food · Creator", mutual: 4, avatar: "https://i.pravatar.cc/80?img=31" },
  { name: "Jordan Lee", handle: "@jordanlee", bio: "Product designer at Rive", mutual: 6, avatar: "https://i.pravatar.cc/80?img=23" },
];

const tagResults = ["design", "coffee", "travel", "photography", "minimal", "ux", "reactjs"];

const postResults = [
  {
    author: "Alex Morgan",
    handle: "@alexmorgan",
    time: "3m ago",
    text: "New lighting setup for this portrait session—thoughts?",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    author: "Sarah Johnson",
    handle: "@sarah",
    time: "25m ago",
    text: "Weekend trails were unreal. Saving this route for autumn.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
  },
];

const mediaResults = [
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=600&q=80",
];

export default function Search() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="w-full min-h-screen px-6 lg:px-14 py-8 bg-[#f7f5f4] dark:bg-neutral-900 transition-colors">
      {/* Search + Filters */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search people, posts, tags..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-[#5b6cff] text-sm"
            />
          </div>
          <div className="flex gap-2">
            <FilterPill icon={<FiSliders size={16} />} label="Filters" />
            <FilterPill icon={<FiMapPin size={16} />} label="Location" />
            <FilterPill icon={<FiClock size={16} />} label="Recent" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mt-6 text-sm">
          {["All", "People", "Posts", "Tags", "Media"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-full border transition ${
                activeTab === tab
                  ? "bg-[#5b6cff] text-white border-[#5b6cff]"
                  : "border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-300 hover:border-[#5b6cff]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 mt-8">
          {/* Left: People + Posts */}
          <div className="space-y-6">
            {/* People */}
            <Card title="People">
              <div className="space-y-4">
                {peopleResults.map((p) => (
                  <div
                    key={p.handle}
                    className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-sm text-neutral-900 dark:text-gray-100">{p.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{p.handle}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{p.bio}</p>
                        <p className="text-xs text-[#5b6cff] mt-1">{p.mutual} mutual connections</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-[#5b6cff] text-white text-xs font-semibold hover:opacity-90 flex items-center gap-1">
                      <FiUserPlus size={14} /> Connect
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Posts */}
            <Card title="Posts">
              <div className="space-y-6">
                {postResults.map((post, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden"
                  >
                    <div className="flex items-center gap-3 p-4">
                      <img src="https://i.pravatar.cc/60?u=post" className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-semibold text-sm text-neutral-900 dark:text-gray-100">{post.author}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{post.handle} • {post.time}</p>
                      </div>
                    </div>
                    <p className="px-4 text-sm text-gray-700 dark:text-gray-200">{post.text}</p>
                    <div className="mt-3">
                      <img src={post.image} alt="" className="w-full h-64 object-cover" />
                    </div>
                    <div className="flex gap-6 px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                      <span>♥ 143</span>
                      <span>💬 26</span>
                      <span>↗ Share</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right: Tags + Media */}
          <div className="space-y-6">
            <Card title="Tags">
              <div className="flex flex-wrap gap-2">
                {tagResults.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-neutral-800 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <FiHash size={14} /> {tag}
                  </span>
                ))}
              </div>
            </Card>

            <Card title="Media">
              <div className="grid grid-cols-2 gap-3">
                {mediaResults.map((src, i) => (
                  <div key={i} className="rounded-xl overflow-hidden">
                    <img src={src} alt="" className="w-full h-32 object-cover" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-5 shadow-sm">
      {title && <h3 className="font-semibold text-neutral-900 dark:text-gray-100 mb-4">{title}</h3>}
      {children}
    </div>
  );
}

function FilterPill({ icon, label }) {
  return (
    <button className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-gray-700 dark:text-gray-200 hover:border-[#5b6cff] transition">
      {icon} {label}
    </button>
  );
}
