import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Profile({ darkMode, onToggleDarkMode }) {
  const [activeTab, setActiveTab] = useState("posts");

  // FAKE DATA (sau này connect backend)
  const posts = Array.from({ length: 12 });

  return (
    <div
      className={
        "flex w-full min-h-screen " +
        (darkMode ? "bg-neutral-900 text-gray-100" : "bg-[#f7f5f4] text-black")
      }
    >
      <Sidebar />

      <div className="flex-1">
        <Topbar darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />

        <div className="px-10 mt-8">

          {/* COVER */}
          <div className="w-full h-56 bg-gray-300 dark:bg-neutral-700 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1200&q=60"
              className="w-full h-full object-cover"
            />
          </div>

          {/* PROFILE HEADER */}
          <div className="flex items-start mt-[-50px] px-4 relative">

            {/* AVATAR */}
            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-neutral-900 overflow-hidden shadow-md">
              <img
                src="https://picsum.photos/300"
                className="w-full h-full object-cover"
              />
            </div>

            {/* USER INFO */}
            <div className="ml-8 flex flex-col mt-4">
              <h1 className="text-3xl font-bold">Thien Truong</h1>
              <span className="text-gray-500 dark:text-gray-400">@trgdx</span>

              {/* BIO */}
              <p className="mt-3 max-w-lg text-[15px]">
                Mechanical / Software Dev. Building Dexter App 🚀
              </p>

              {/* STATS */}
              <div className="flex mt-4 space-x-8 text-[15px]">
                <span><strong>122</strong> Posts</span>
                <span><strong>8,523</strong> Followers</span>
                <span><strong>223</strong> Following</span>
              </div>

              {/* BUTTONS */}
              <div className="flex mt-6 space-x-3">
                <button className="px-5 py-2 rounded-lg border dark:border-neutral-600 hover:bg-gray-100 dark:hover:bg-neutral-700 transition">
                  Edit Profile
                </button>
                <button className="px-5 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition">
                  Follow
                </button>
                <button className="px-5 py-2 rounded-lg border dark:border-neutral-600 hover:bg-gray-100 dark:hover:bg-neutral-700 transition">
                  Message
                </button>
              </div>
            </div>

          </div>

          {/* TAB SELECTOR */}
          <div className="flex justify-center mt-10 border-b border-gray-300 dark:border-neutral-700">
            {["posts", "saved", "tagged"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-[16px] font-medium capitalize transition relative
                  ${activeTab === tab ? "text-black dark:text-white" : "text-gray-500"}
                `}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute left-0 right-0 -bottom-[1px] h-[3px] bg-black dark:bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* POSTS GRID */}
          {activeTab === "posts" && (
            <div className="grid grid-cols-3 gap-4 mt-8 pb-10">
              {posts.map((_, i) => (
                <div
                  key={i}
                  className="w-full h-40 rounded-xl bg-gray-300 dark:bg-neutral-700 overflow-hidden animate-fade"
                >
                  <img
                    src={`https://picsum.photos/500?random=${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* SAVED */}
          {activeTab === "saved" && (
            <div className="text-center mt-10 text-gray-500 dark:text-gray-400">
              No saved posts yet.
            </div>
          )}

          {/* TAGGED */}
          {activeTab === "tagged" && (
            <div className="text-center mt-10 text-gray-500 dark:text-gray-400">
              No tagged posts yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
