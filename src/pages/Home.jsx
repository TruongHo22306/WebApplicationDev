import { useState } from "react";
import Topbar from "../components/Topbar";
import Uploader from "../components/Uploader";
import FeedPost from "../components/FeedPost";
import StoriesPanel from "../components/StoriesPanel";
import SuggestionList from "../components/SuggestionList";
import RightProfileCard from "../components/RightProfileCard";
import TrendingTags from "../components/TrendingTags";
import RightFooterLinks from "../components/RightFooterLinks";
import ChatHoverPanel from "../components/ChatHoverPanel";

export default function Home({ darkMode, onToggleDarkMode, onOpenNotifications, onOpenFriends }) {
  const initialPosts = [
    {
      id: "p-1",
      author: "Ella Moss",
      avatar: "https://i.pravatar.cc/60?img=24",
      content: "A peaceful morning walk with my favorite coffee. How is everyone today?",
      createdAt: "5m ago",
      privacy: "Public",
      attachments: { fileName: "", imageName: "", location: "" },
      stats: { likes: 152, comments: 18, shares: 9, reposts: 4 },
    },
    {
      id: "p-2",
      author: "Jordan Kim",
      avatar: "https://i.pravatar.cc/60?img=32",
      content: "Experimenting with a new color palette for the dashboard project. Loving the muted tones.",
      createdAt: "24m ago",
      privacy: "Friends",
      attachments: { fileName: "", imageName: "", location: "" },
      stats: { likes: 87, comments: 12, shares: 6, reposts: 3 },
    },
    {
      id: "p-3",
      author: "Riley Chen",
      avatar: "https://i.pravatar.cc/60?img=51",
      content: "Weekend trip photos are in! Can’t wait to sort through them tonight.",
      createdAt: "1h ago",
      privacy: "Only me",
      attachments: { fileName: "", imageName: "", location: "" },
      stats: { likes: 45, comments: 3, shares: 1, reposts: 1 },
    },
  ];

  const [posts, setPosts] = useState(initialPosts);

  const handleCreatePost = ({ content, privacy, attachments }) => {
    setPosts((prev) => [
      {
        id: `post-${Date.now()}`,
        author: "You",
        avatar: "https://i.pravatar.cc/60?img=7",
        content,
        createdAt: "Just now",
        privacy,
        attachments,
        stats: { likes: 0, comments: 0, shares: 0, reposts: 0 },
      },
      ...prev,
    ]);
  };

  return (
    <div
      className={
        "flex w-full min-h-screen transition-colors duration-300 " +
        (darkMode ? "bg-neutral-900 text-gray-100" : "bg-[#f7f5f4] text-black")
      }
    >

      {/* MAIN CONTENT AREA */}
      <div className="flex-1">

        {/* TOPBAR */}
        <Topbar
          onOpenNotifications={onOpenNotifications}
          onOpenFriends={onOpenFriends}
        />

        {/* MAIN WRAPPER */}
        <div className="flex px-10 mt-8 w-full justify-between gap-10">

          {/* FEED LEFT */}
          <div className="flex-1 max-w-[1100px] pr-10 transition-all duration-300">

            {/* Uploader */}
            <Uploader onSend={handleCreatePost} />

            {/* Feed Header */}
            <div className="mt-8 border-b pb-2 flex justify-between 
                text-gray-700 dark:text-gray-200 
                border-gray-300 dark:border-neutral-700 transition-colors duration-300">
              <h2 className="font-bold text-[20px]">Feeds</h2>
              <div className="flex space-x-8 text-[15px]">
                <span>Recents</span>
                <span>Friends</span>
                <span>Popular</span>
              </div>
            </div>

            {/* Posts */}
            {posts.map((post) => (
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
            ))}
          </div>

          {/* RIGHT PANEL */}
          <div className="w-[320px] ml-12 flex flex-col items-stretch 
              space-y-4 sticky top-[80px] h-fit transition-all duration-300">
            <StoriesPanel />
            <RightProfileCard />
            <SuggestionList />
            <TrendingTags />
            <RightFooterLinks />
          </div>

        </div>
      </div>
      <ChatHoverPanel />
    </div>
  );
}
