import { useMemo, useState } from "react";
import {
  FiSearch,
  FiSend,
  FiImage,
  FiPaperclip,
  FiMic,
  FiPhone,
  FiVideo,
  FiMoreVertical,
  FiUser,
} from "react-icons/fi";

const chats = [
  { id: 1, name: "Sid Polls", snippet: "looking forward for", time: "14:11", unread: 2, avatar: "https://i.pravatar.cc/80?img=11", online: true },
  { id: 2, name: "Merry Richard", snippet: "please send me as", time: "14:01", unread: 0, avatar: "https://i.pravatar.cc/80?img=12", online: true },
  { id: 3, name: "Mia Stif", snippet: "sure", time: "13:54", unread: 0, avatar: "https://i.pravatar.cc/80?img=13", online: false },
  { id: 4, name: "Andy Roy", snippet: "will see it tomorrow", time: "13:41", unread: 0, avatar: "https://i.pravatar.cc/80?img=14", online: false },
  { id: 5, name: "John David", snippet: "sent you the file", time: "13:41", unread: 0, avatar: "https://i.pravatar.cc/80?img=15", online: true },
  { id: 6, name: "Alisha Boe", snippet: "okay", time: "13:30", unread: 0, avatar: "https://i.pravatar.cc/80?img=16", online: true },
  { id: 7, name: "Harry Patrik", snippet: "checked the layout again", time: "13:12", unread: 0, avatar: "https://i.pravatar.cc/80?img=17", online: false },
  { id: 8, name: "Simona", snippet: "I don't think so", time: "13:10", unread: 0, avatar: "https://i.pravatar.cc/80?img=18", online: true },
];

const messagesByChat = {
  1: [
    { id: "a1", from: "them", text: "Hello Linh!", time: "09:20" },
    { id: "a2", from: "them", text: "How does it sound for you ?", time: "09:21" },
    { id: "a3", from: "them", text: "Voice message", time: "09:22", type: "voice" },
    { id: "a4", from: "me", text: "Hi, that sounds good!", time: "09:24" },
    { id: "a5", from: "me", text: "Voice message", time: "09:25", type: "voice" },
    { id: "a6", from: "me", text: "Okay", time: "09:26" },
    { id: "a7", from: "me", text: "Let me know once you’re done", time: "09:27" },
    { id: "a8", from: "them", text: "Typing...", time: "09:28", typing: true },
    { id: "a9", from: "me", text: "That's cool idea 👍", time: "09:29" },
  ],
};

const mediaThumbs = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=400&q=80",
];

export default function Messages() {
  const [activeChatId, setActiveChatId] = useState(1);
  const [input, setInput] = useState("");
  const activeMessages = useMemo(() => messagesByChat[activeChatId] || [], [activeChatId]);
  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  return (
    <div className="min-h-screen bg-neutral-900 text-white grid grid-cols-1 lg:grid-cols-[320px_1fr_300px]">
      {/* Left: chat list */}
      <div className="border-r border-neutral-800 bg-neutral-950/70 backdrop-blur-sm">
        <div className="px-4 py-4">
          <div className="text-xs uppercase tracking-wide text-gray-400 mb-2">All chats</div>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              placeholder="Search"
              className="w-full bg-neutral-800 text-sm rounded-lg pl-9 pr-3 py-2 outline-none border border-neutral-700 focus:border-[#5b6cff]"
            />
          </div>
        </div>
        <div className="text-xs text-gray-500 px-4 pb-2">Unread</div>
        <div className="overflow-y-auto h-[calc(100vh-80px)]">
          {chats.map((chat) => {
            const isActive = chat.id === activeChatId;
            return (
              <button
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`w-full px-4 py-3 flex items-center gap-3 text-left transition ${
                  isActive ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <div className="relative">
                  <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full object-cover" />
                  {chat.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-neutral-900" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold truncate">{chat.name}</p>
                    <span className="text-[11px] text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{chat.snippet}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="min-w-[20px] h-[20px] rounded-full bg-[#5b6cff] text-[11px] flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Middle: conversation */}
      <div className="bg-neutral-900 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold text-sm">{activeChat.name}</p>
              <p className="text-xs text-green-400">Active now</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <FiPhone className="cursor-pointer hover:text-white" />
            <FiVideo className="cursor-pointer hover:text-white" />
            <FiMoreVertical className="cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3">
          {activeMessages.map((m) => {
            const isMe = m.from === "me";
            const align = isMe ? "items-end" : "items-start";
            const bubble = isMe
              ? "bg-[#4b8dff] text-white rounded-2xl rounded-br-sm"
              : "bg-neutral-800 text-gray-100 rounded-2xl rounded-bl-sm";
            return (
              <div key={m.id} className={`flex flex-col ${align} gap-1`}>
                <div className={`max-w-[70%] px-4 py-2 ${bubble}`}>
                  {m.type === "voice" ? <div className="text-xs opacity-80">Voice message •••••</div> : m.text}
                </div>
                <span className="text-[11px] text-gray-500">{m.time}</span>
              </div>
            );
          })}
        </div>

        {/* Composer */}
        <div className="px-6 py-4 border-t border-neutral-800 flex items-center gap-3 bg-neutral-950/60 backdrop-blur">
          <button className="p-2 rounded-full hover:bg-white/10">
            <FiImage />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10">
            <FiPaperclip />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10">
            <FiMic />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a reply"
            className="flex-1 bg-neutral-800 text-sm rounded-full px-4 py-2 outline-none border border-neutral-700 focus:border-[#5b6cff]"
          />
          <button className="p-3 rounded-full bg-[#5b6cff] hover:opacity-90 text-white">
            <FiSend />
          </button>
        </div>
      </div>

      {/* Right: info */}
      <div className="hidden lg:flex flex-col border-l border-neutral-800 bg-neutral-950/70 backdrop-blur-sm">
        <div className="px-6 py-6 flex flex-col items-center gap-2 border-b border-neutral-800">
          <img src={activeChat.avatar} alt={activeChat.name} className="w-16 h-16 rounded-full" />
          <p className="font-semibold text-sm">{activeChat.name}</p>
          <p className="text-xs text-green-400">ONLINE</p>
          <div className="flex gap-3 mt-3 text-gray-300">
            <IconPill icon={<FiUser />} />
            <IconPill icon={<FiPhone />} />
            <IconPill icon={<FiVideo />} />
          </div>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">Media, Files and Links</p>
            <div className="flex gap-2 text-xs">
              <TagPill label="Media" />
              <TagPill label="Files" />
              <TagPill label="Links" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
              <p>Images</p>
              <button className="text-[#5b6cff] hover:underline text-xs">See all</button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {mediaThumbs.map((src, idx) => (
                <img key={idx} src={src} alt="" className="w-full h-20 object-cover rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconPill({ icon }) {
  return (
    <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 cursor-pointer transition">
      {icon}
    </div>
  );
}

function TagPill({ label }) {
  return (
    <span className="px-3 py-1 rounded-full bg-neutral-800 text-gray-200 border border-neutral-700">
      {label}
    </span>
  );
}
