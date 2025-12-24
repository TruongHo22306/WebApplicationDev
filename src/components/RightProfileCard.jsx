import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMessageSquare, FiLock, FiMessageCircle } from "react-icons/fi";
import MessagesPanel from "./MessagesPanel";
import { suggestions } from "../data/suggestions";

const recentChats = [
  {
    name: "Julia Clarke",
    location: "New York, USA",
    avatar: "https://i.pravatar.cc/60?img=11",
    lastMessage: "See you at the shoot?",
    time: "10:24",
    unread: true,
  },
  {
    name: "Sara Cliene",
    location: "Sydney, Australia",
    avatar: "https://i.pravatar.cc/60?img=22",
    lastMessage: "Dropped the files",
    time: "09:10",
    unread: false,
  },
  {
    name: "Amy Ruth",
    location: "Dubai, UAE",
    avatar: "https://i.pravatar.cc/60?img=36",
    lastMessage: "Thanks! ❤️",
    time: "Yesterday",
    unread: true,
  },
  {
    name: "Mark Stefine",
    location: "Chicago, USA",
    avatar: "https://i.pravatar.cc/60?img=9",
    lastMessage: "Let’s plan next week",
    time: "Mon",
    unread: false,
  },
  {
    name: "Trinity Sipson",
    location: "New York, USA",
    avatar: "https://i.pravatar.cc/60?img=56",
    lastMessage: "Call me when free",
    time: "Sun",
    unread: false,
  },
  {
    name: "Albini Vjosa",
    location: "Tokyo, Japan",
    avatar: "https://i.pravatar.cc/60?img=14",
    lastMessage: "Can you review this?",
    time: "Sat",
    unread: true,
  },
];

const upcomingSchedule = [
  {
    dayLabel: "Tue",
    date: "10",
    title: "Google job interview",
    time: "09:00 - 10:00",
    location: "Zoom Meeting",
    color: "bg-red-400",
  },
  {
    dayLabel: "Thu",
    date: "11",
    title: "Meeting with client",
    time: "20:00 - End",
    location: "Starbucks",
    color: "bg-blue-400",
  },
  {
    dayLabel: "Fri",
    date: "14",
    title: "Landing page creation date",
    time: "09:00 - 10:00",
    location: "Zoom Meeting",
    color: "bg-amber-400",
  },
];

export default function RightProfileCard() {
  const navigate = useNavigate();
  const [followed, setFollowed] = useState(() =>
    suggestions.reduce((acc, s) => ({ ...acc, [s.name]: false }), {})
  );
  const [openMessages, setOpenMessages] = useState(false);

  const toggleFollow = (name) => {
    setFollowed((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const openProfile = (item) => {
    navigate("/profile", { state: { suggestion: item } });
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
              <button
                type="button"
                onClick={() => openProfile(item)}
                className="flex items-center gap-3 flex-1 text-left"
                title={`Open ${item.name}`}
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
              </button>
              <button
                onClick={() => toggleFollow(item.name)}
                className={`px-4 py-1.5 text-[12px] font-semibold rounded-full transition transform active:scale-95 shadow-[0_10px_22px_rgba(0,0,0,0.18)] border ${
                  followed[item.name]
                    ? "bg-[#6b5c51] border-[#6b5c51] text-white"
                    : "bg-[#6b5c51] border-[#6b5c51] text-white"
                } hover:-translate-y-0.5 hover:shadow-[0_14px_26px_rgba(0,0,0,0.2)]`}
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

                  <button className="w-full py-2 rounded-full bg-[#6b5c51] text-white font-semibold text-[14px] hover:-translate-y-0.5 transition transform shadow-[0_10px_22px_rgba(0,0,0,0.18)] hover:shadow-[0_14px_26px_rgba(0,0,0,0.2)]">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming schedule */}
      <div className="px-4">
        <div className="rounded-2xl border border-[#E3D9CE] dark:border-[#2B2722] bg-[#F3ECE2] dark:bg-[#2B2722] shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <h3 className="font-semibold text-[15px] text-neutral-900 dark:text-[#EDE5DA]">
              Upcoming schedule
            </h3>
            <span className="text-neutral-400 text-xs">?</span>
          </div>
          <div className="divide-y divide-neutral-200/80 dark:divide-[#23201B]">
            {upcomingSchedule.map((item) => (
              <div key={item.title} className="flex items-start gap-3 px-4 py-3">
                <div className="text-center min-w-[36px]">
                  <p className="text-[12px] text-neutral-500 dark:text-[#B89B6C] leading-tight">
                    {item.dayLabel}
                  </p>
                  <p className="text-sm font-semibold text-neutral-800 dark:text-[#EDE5DA]">
                    {item.date}
                  </p>
                </div>
                <div className="mt-1">
                  <div className={`w-1.5 h-14 rounded-full ${item.color}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-[#EDE5DA] truncate">
                    {item.title}
                  </p>
                  <p className="text-[12px] text-neutral-500 dark:text-[#B89B6C] flex items-center gap-2">
                    <span>{item.time}</span>
                    <span className="text-xs">•</span>
                    <span className="truncate">{item.location}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Chats / Messages panel trigger */}
      <div className="p-4">
        <button
          onClick={() => setOpenMessages(true)}
          className="w-full md:w-auto md:fixed md:bottom-6 md:right-6 flex items-center justify-between pl-5 pr-6 py-3 rounded-full bg-[#6b5c51] text-white shadow-lg hover:shadow-xl transition z-40 gap-3"
        >
          <div className="flex items-center gap-2">
            <FiMessageCircle />
            <span className="font-semibold text-sm">Messages</span>
          </div>
          <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full bg-red-500 text-xs font-semibold">
            {recentChats.filter((c) => c.unread).length}
          </span>
        </button>
      </div>

      <MessagesPanel
        open={openMessages}
        onClose={() => setOpenMessages(false)}
        chats={recentChats}
        onCompose={() => setOpenMessages(true)}
      />
    </div>
  );
}
