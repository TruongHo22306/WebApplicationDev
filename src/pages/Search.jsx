import React from "react";

export default function Search() {
  return (
    <div className="w-full min-h-screen px-6 lg:px-16 mt-6">

      {/* Search Input */}
      <div className="w-full max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search for people, posts, photos..."
          className="w-full p-3 rounded-xl border dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm outline-none"
        />
      </div>

      {/* Trending Searches */}
      <div className="w-full max-w-2xl mx-auto mt-4">
        <div className="rounded-xl border dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4">
          <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-200">
            🔥 Trending Searches
          </h3>

          <div className="flex flex-wrap gap-2">
            {["Technology", "Travel", "Design", "Nature", "Food"].map(
              (tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-gray-100 dark:bg-neutral-800 text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-2xl mx-auto mt-6 flex items-center gap-6 text-sm border-b pb-3 dark:border-neutral-700">
        {["All", "People", "Posts", "Photos", "Videos"].map((tab, i) => (
          <button
            key={i}
            className={`pb-2 ${
              i === 0
                ? "font-semibold border-b-2 border-black dark:border-white"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* SECTION: People */}
      <div className="w-full max-w-2xl mx-auto mt-8">
        <h2 className="font-bold text-lg dark:text-gray-100 mb-3">People</h2>

        {/* User Card */}
        <div className="border rounded-xl dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4 flex justify-between items-center mb-3">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Alex Morgan</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">@alexmorgan</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Digital creator | Photographer</p>
          </div>
          <button className="px-4 py-1 text-sm bg-black text-white rounded-lg hover:opacity-80 dark:bg-white dark:text-black">
            Follow
          </button>
        </div>

        {/* Another User */}
        <div className="border rounded-xl dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4 flex justify-between items-center">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Sarah Johnson</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">@sarah</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Travel | Foodie | Creator</p>
          </div>
          <button className="px-4 py-1 text-sm bg-neutral-200 dark:bg-neutral-800 rounded-lg text-gray-700 dark:text-gray-300">
            Following
          </button>
        </div>
      </div>

      {/* SECTION: Posts */}
      <div className="w-full max-w-2xl mx-auto mt-10">
        <h2 className="font-bold text-lg dark:text-gray-100 mb-3">Posts</h2>

        {/* Post 1 */}
        <div className="border dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-xl p-4 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <img
              src="https://via.placeholder.com/40"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h4 className="font-semibold">Alex Morgan</h4>
              <p className="text-xs text-gray-500">3m ago</p>
            </div>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Just captured this amazing sunset!
          </p>

          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
            className="rounded-xl w-full"
          />

          <div className="flex gap-6 mt-3 text-gray-600 dark:text-gray-400 text-sm">
            <span>❤️ 143</span>
            <span>💬 26</span>
            <span>↗️ Share</span>
          </div>
        </div>

        {/* Post 2 */}
        <div className="border dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <img
              src="https://via.placeholder.com/40"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h4 className="font-semibold">Sarah Johnson</h4>
              <p className="text-xs text-gray-500">1h ago</p>
            </div>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Trying out this new recipe today!
          </p>

          <img
            src="https://images.unsplash.com/photo-1550547660-d9450f859349"
            className="rounded-xl w-full"
          />

          <div className="flex gap-6 mt-3 text-gray-600 dark:text-gray-400 text-sm">
            <span>❤️ 892</span>
            <span>💬 112</span>
            <span>↗️ Share</span>
          </div>
        </div>
      </div>

      {/* SECTION: Photos Grid */}
      <div className="w-full max-w-2xl mx-auto mt-12 pb-20">
        <h2 className="font-bold text-lg dark:text-gray-100 mb-3">Photos</h2>

        <div className="grid grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-full h-28 bg-black rounded-lg dark:bg-neutral-800"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
