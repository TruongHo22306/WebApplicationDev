import { Link } from "react-router-dom";

const mockStories = [
  { id: "s1", cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80", author: "Ben Goro" },
  { id: "s2", cover: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=300&q=80", author: "Ava Thompson" },
  { id: "s3", cover: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=300&q=80", author: "Peter Pot" },
];

export default function StoriesPanel() {
  return (
    <div className="w-full max-w-[260px] mx-auto mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-[18px]">Stories</h2>
        <Link
          to="/stories"
          className="text-[13px] text-[#5b6cff] hover:underline font-semibold"
        >
          View all
        </Link>
      </div>

      <div className="flex justify-center space-x-4">
        {mockStories.map((story) => (
          <Link
            to={`/stories?active=${story.id}`}
            key={story.id}
            className="w-20 h-28 rounded-xl overflow-hidden shadow-sm border border-white/60 dark:border-neutral-700 transition-transform duration-200 hover:scale-105 hover:shadow-lg"
          >
            <img src={story.cover} alt={story.author} className="w-full h-full object-cover" />
          </Link>
        ))}
      </div>
    </div>
  );
}
