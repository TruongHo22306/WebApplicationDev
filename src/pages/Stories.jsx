import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FiX } from "react-icons/fi";

const stories = [
  {
    id: "s1",
    author: "Ben Goro",
    time: "20 hours ago",
    avatar: "https://i.pravatar.cc/80?img=28",
    slides: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "s2",
    author: "Ava Thompson",
    time: "20 minutes ago",
    avatar: "https://i.pravatar.cc/80?img=41",
    slides: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "s3",
    author: "Peter Pot",
    time: "2 hours ago",
    avatar: "https://i.pravatar.cc/80?img=56",
    slides: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "s4",
    author: "Amelie Shiba",
    time: "2 hours ago",
    avatar: "https://i.pravatar.cc/80?img=66",
    slides: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "s5",
    author: "Ethan Reynolds",
    time: "5 hours ago",
    avatar: "https://i.pravatar.cc/80?img=25",
    slides: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

const reactions = [
  { emoji: "❤️", label: "Love" },
  { emoji: "😂", label: "Haha" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😭", label: "Sad" },
  { emoji: "👍", label: "Like" },
];

export default function Stories() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const initialId = query.get("active");
  const initialIndex = Math.max(0, stories.findIndex((s) => s.id === initialId));

  const [current, setCurrent] = useState(initialIndex);
  const [slideIndex, setSlideIndex] = useState(0);
  const [reply, setReply] = useState("");

  const activeStory = stories[current];
  const totalSlides = activeStory.slides.length;

  const goPrevStory = () => {
    setSlideIndex(0);
    setCurrent((prev) => (prev - 1 + stories.length) % stories.length);
  };
  const goNextStory = () => {
    setSlideIndex(0);
    setCurrent((prev) => (prev + 1) % stories.length);
  };

  const goPrevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  const goNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white shadow-lg z-10"
        aria-label="Close stories"
      >
        <FiX size={20} />
      </button>
      <div className="max-w-7xl mx-auto w-full px-6 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr_260px] gap-6">
        {/* Left rail */}
        <div className="bg-neutral-800 rounded-2xl p-4 space-y-4 min-h-[80vh]">
          <div>
            <h2 className="text-lg font-bold">Connected</h2>
            <h1 className="text-2xl font-semibold mt-1">Stories</h1>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs rounded-full bg-neutral-700 hover:bg-neutral-600">Settings</button>
            <button className="px-3 py-1.5 text-xs rounded-full bg-neutral-700 hover:bg-neutral-600">Archive</button>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Your story</p>
            <StoryListItem story={stories[0]} active={current === 0} onSelect={() => { setCurrent(0); setSlideIndex(0); }} />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold">Followed stories</p>
            {stories.slice(1).map((s, idx) => {
              const storyIdx = idx + 1;
              return (
                <StoryListItem
                  key={s.id}
                  story={s}
                  active={current === storyIdx}
                  onSelect={() => { setCurrent(storyIdx); setSlideIndex(0); }}
                />
              );
            })}
          </div>
        </div>

        {/* Center viewer */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <img
              src={activeStory.slides[slideIndex]}
              alt={activeStory.author}
              className="w-[420px] h-[680px] object-cover rounded-2xl shadow-2xl"
            />

            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <img src={activeStory.avatar} alt={activeStory.author} className="w-10 h-10 rounded-full border-2 border-white/70" />
                <div>
                  <p className="font-semibold">{activeStory.author}</p>
                  <p className="text-xs text-gray-200">{activeStory.time}</p>
                </div>
              </div>
              <div className="flex gap-2 text-xs text-gray-200">
                <span>{slideIndex + 1}/{totalSlides}</span>
              </div>
            </div>

            {/* Navigation arrows */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={goPrevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60"
                >
                  <FiChevronLeft size={22} />
                </button>
                <button
                  onClick={goNextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60"
                >
                  <FiChevronRight size={22} />
                </button>
              </>
            )}

            {/* Reply & reactions overlay */}
            <div className="absolute left-0 right-0 bottom-0 p-4 pb-5 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-b-2xl">
              <div className="space-y-3">
                <input
                  type="text"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Write a reply"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none placeholder:text-gray-300 text-white"
                />
                <div className="flex items-center justify-center gap-3">
                  {reactions.map((item) => (
                    <button
                      key={item.emoji}
                      className="w-11 h-11 rounded-full bg-white text-lg flex items-center justify-center shadow-md hover:scale-105 transition"
                      aria-label={`React with ${item.label}`}
                    >
                      {item.emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right preview column */}
        <div className="hidden lg:flex flex-col gap-4">
          <PreviewCard story={stories[(current - 1 + stories.length) % stories.length]} label="Previous" onSelect={goPrevStory} />
          <PreviewCard story={stories[(current + 1) % stories.length]} label="Next" onSelect={goNextStory} />
        </div>
      </div>
    </div>
  );
}

function StoryListItem({ story, active, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={`flex items-center gap-3 w-full rounded-xl px-2 py-2 transition ${
        active ? "bg-neutral-700" : "hover:bg-neutral-700/60"
      }`}
    >
      <img src={story.avatar} alt={story.author} className="w-10 h-10 rounded-full border-2 border-blue-400/60" />
      <div className="text-left">
        <p className="text-sm font-semibold">{story.author}</p>
        <p className="text-xs text-gray-300">{story.time}</p>
      </div>
    </button>
  );
}

function PreviewCard({ story, label, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="relative w-full h-60 rounded-2xl overflow-hidden shadow-lg bg-neutral-800"
    >
      <img src={story.slides[0]} alt={story.author} className="w-full h-full object-cover opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
      <div className="absolute bottom-3 left-3 text-left text-white">
        <p className="text-xs uppercase tracking-wide">{label}</p>
        <p className="font-semibold">{story.author}</p>
      </div>
    </button>
  );
}
