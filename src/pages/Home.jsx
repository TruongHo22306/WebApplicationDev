import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Uploader from "../components/Uploader";
import FeedPost from "../components/FeedPost";
import StoriesPanel from "../components/StoriesPanel";
import SuggestionList from "../components/SuggestionList";
import RightProfileCard from "../components/RightProfileCard";
import TrendingTags from "../components/TrendingTags";
import RightFooterLinks from "../components/RightFooterLinks";

export default function Home({ darkMode, onToggleDarkMode }) {
  return (
    <div
      className={
        "flex w-full min-h-screen transition-colors duration-300 " +
        (darkMode ? "bg-neutral-900 text-gray-100" : "bg-[#f7f5f4] text-black")
      }
    >
      {/* SIDEBAR */}
      <Sidebar darkMode={darkMode} />

      {/* MAIN AREA */}
      <div className="flex-1">
        {/* TOPBAR */}
        <Topbar darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />

        {/* CONTENT WRAPPER */}
        <div className="flex px-10 mt-8 w-full justify-between gap-10">

          {/* FEED */}
          <div className="flex-1 max-w-[1100px] pr-10 transition-all duration-300">
            <Uploader />

            {/* FEED HEADER */}
            <div className="mt-8 border-b pb-2 flex justify-between 
                text-gray-700 dark:text-gray-200 
                border-gray-300 dark:border-neutral-700 transition-colors duration-300">
              <h2 className="font-bold text-[20px]">Feeds</h2>
              <div className="flex space-x-8 text-[15px]">
                <span>Recents</span>
                <span>Friends</span>
              </div>
            </div>

            {/* POSTS */}
            <FeedPost />
            <FeedPost />
            <FeedPost />
          </div>

          {/* RIGHT PANEL */}
          <div className="w-[300px] ml-12 flex flex-col items-center 
              space-y-8 sticky top-[100px] h-fit transition-all duration-300">
            <RightProfileCard />
            <StoriesPanel />
            <SuggestionList />
            <TrendingTags />
            <RightFooterLinks />
          </div>

        </div>
      </div>
    </div>
  );
}
