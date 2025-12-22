import { useMemo, useState, useEffect, useRef } from "react";
import {
  FiSearch,
  FiSend,
  FiImage,
  FiPaperclip,
  FiMic,
  FiPhone,
  FiVideo,
  FiMoreVertical,
  FiCheck,
} from "react-icons/fi";

/* ---------------- INITIAL DATA ---------------- */

const INITIAL_CHATS = [
  {
    id: 1,
    name: "Alexander Jameson",
    status: "Online",
    time: "4:45 pm",
    unread: 0,
    pinned: true,
    group: false,
    avatar: "https://i.pravatar.cc/60?img=31",
  },
  {
    id: 2,
    name: "Sarah Connors",
    status: "How’s going with your property search?",
    time: "5:38 pm",
    unread: 2,
    pinned: true,
    group: false,
    avatar: "https://i.pravatar.cc/60?img=5",
  },
  {
    id: 3,
    name: "Design Team",
    status: "Project files uploaded 📁",
    time: "1:20 pm",
    unread: 0,
    pinned: false,
    group: true,
    avatar: "https://i.pravatar.cc/60?img=8",
  },
];

const INITIAL_THREADS = {
  1: [
    {
      id: "m1",
      from: "them",
      text: "I'm a manager that's here to help",
      time: "10:37 am",
    },
    {
      id: "m2",
      from: "them",
      type: "audio",
      duration: "2:19",
      time: "10:41 am",
    },
    {
      id: "m3",
      from: "them",
      type: "stats",
      title:
        "Modern townhouse in a quiet neighborhood. 3 bedrooms, 2 bathrooms. 🏠",
      stats: [
        { label: "Visitors", value: "2.4k" },
        { label: "Age", value: "3Y" },
        { label: "Temp", value: "28°F" },
      ],
      time: "11:19 am",
    },
    {
      id: "m4",
      from: "them",
      type: "gallery",
      caption: "Here are the photos:",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=150&q=80",
        "https://images.unsplash.com/photo-1600596542815-2495db9dc2c3?auto=format&fit=crop&w=150&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=150&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=150&q=80",
      ],
      time: "11:19 am",
    },
    {
      id: "m5",
      from: "me",
      text: "Looks good 🙌 I want to sign up for a viewing",
      time: "12:25 pm",
    },
  ],
  2: [
    { id: "m1", from: "them", text: "Hey! Are you still looking?", time: "5:30 pm" },
  ],
  3: [],
};

/* ---------------- PAGE ---------------- */

export default function Messages() {
  const [activeChatId, setActiveChatId] = useState(1);
  const [activeTab, setActiveTab] = useState("Pinned");
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // State for messages to allow updates
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const scrollRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [threads, activeChatId]);

  // Handle Sending Messages
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      from: "me",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setThreads((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage],
    }));
    setInput("");
  };

  // Sorting and Filtering Logic
  const sortedChats = useMemo(() => {
    return [...INITIAL_CHATS]
      .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  }, [searchQuery]);

  const filteredChats = useMemo(() => {
    let list = sortedChats;
    if (activeTab === "Pinned") list = sortedChats.filter((c) => c.pinned);
    if (activeTab === "Unread") list = sortedChats.filter((c) => (c.unread || 0) > 0);
    if (activeTab === "Groups") list = sortedChats.filter((c) => c.group);
    
    // Fallback: if filter is empty, show all (optional UX choice)
    return list.length ? list : [];
  }, [activeTab, sortedChats]);

  const activeChat = INITIAL_CHATS.find((c) => c.id === activeChatId) || INITIAL_CHATS[0];
  const activeMessages = threads[activeChatId] || [];

  return (
    <div className="h-screen flex bg-[#d9ccbe] font-sans text-[#4b4239]">
      {/* LEFT SIDEBAR */}
      <aside className="w-[300px] bg-[#d9ccbe] border-r border-[#6b5c51]/20 flex flex-col flex-shrink-0">
        
        {/* User Profile & Search */}
        <div className="p-5 border-b border-[#6b5c51]/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
                <img
                src="https://i.pravatar.cc/60?img=11"
                alt="My Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#d9ccbe] rounded-full"></div>
            </div>
            <div className="relative flex-1 group">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b5c51] group-focus-within:text-[#2f6f57] transition-colors" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chats..."
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-white/50 bg-white/50 text-[#4b4239] placeholder:text-[#6b5c51]/60 outline-none focus:bg-white focus:ring-2 ring-[#6b5c51]/10 transition-all"
              />
            </div>
          </div>

          <TabNav activeTab={activeTab} onChange={setActiveTab} />
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {filteredChats.length === 0 ? (
            <div className="text-center py-8 text-sm text-[#6b5c51]/50">No chats found</div>
          ) : (
            filteredChats.map((chat) => (
                <ChatRow
                key={chat.id}
                chat={chat}
                activeId={activeChatId}
                onSelect={() => setActiveChatId(chat.id)}
                />
            ))
          )}
        </div>
      </aside>

      {/* MAIN CHAT AREA */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#e3ddd5]/30">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white/60 backdrop-blur-md border-b border-[#6b5c51]/10 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
                <img src={activeChat.avatar} className="w-10 h-10 rounded-full shadow-sm" />
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-500" />
            </div>
            <div>
              <h2 className="font-bold text-[#2c241b] leading-tight">{activeChat.name}</h2>
              <p className="text-xs text-[#6b5c51] font-medium flex items-center gap-1">
                 {activeChat.status.includes("Online") ? <span className="w-1.5 h-1.5 rounded-full bg-green-500"/> : null}
                 {activeChat.status}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#6b5c51]">
            <IconButton icon={<FiPhone />} />
            <IconButton icon={<FiVideo />} />
            <div className="w-px h-6 bg-[#6b5c51]/20 mx-1" />
            <IconButton icon={<FiMoreVertical />} />
          </div>
        </header>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scroll-smooth">
          {activeMessages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={scrollRef} />
        </div>

        {/* Input Area */}
        <footer className="p-4 bg-white border-t border-[#6b5c51]/10">
          <form onSubmit={handleSend} className="flex items-end gap-2 max-w-4xl mx-auto">
            <div className="flex gap-1 mb-2 text-[#6b5c51]">
                <IconButton icon={<FiImage />} size="sm" />
                <IconButton icon={<FiPaperclip />} size="sm" />
            </div>
            <div className="flex-1 bg-[#f5f2ef] rounded-2xl flex items-center gap-2 px-4 py-3 border border-transparent focus-within:border-[#6b5c51]/20 focus-within:bg-white transition-all">
                <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent text-[#4b4239] placeholder:text-[#6b5c51]/50 outline-none text-sm"
                />
                <button type="button" className="text-[#6b5c51] hover:text-[#2c241b] transition">
                    <FiMic />
                </button>
            </div>
            <button 
                type="submit"
                disabled={!input.trim()}
                className="bg-[#2c241b] text-white p-3.5 rounded-xl shadow-lg hover:bg-[#4a3e32] disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 transition-all"
            >
              <FiSend size={18} />
            </button>
          </form>
        </footer>
      </main>
    </div>
  );
}

/* ---------------- SUB COMPONENTS ---------------- */

function IconButton({ icon, size = "md" }) {
    const p = size === "sm" ? "p-2" : "p-2.5";
    return (
        <button className={`${p} rounded-full hover:bg-[#6b5c51]/10 transition-colors`}>
            {icon}
        </button>
    )
}

function MessageBubble({ message }) {
  const isMe = message.from === "me";

  return (
    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
      <div className={`max-w-[80%] lg:max-w-[60%] space-y-1`}>
        {message.type === "audio" && (
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm w-64">
            <div className="w-8 h-8 bg-[#6b5c51] rounded-full flex items-center justify-center text-white">
                <FiMic size={14}/>
            </div>
            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-[#6b5c51]" />
            </div>
            <span className="text-xs font-medium text-gray-500">{message.duration}</span>
          </div>
        )}

        {message.type === "stats" && (
          <div className="bg-white border border-gray-100 rounded-2xl p-1 shadow-sm overflow-hidden">
             <div className="bg-[#2c241b] p-4 text-white rounded-xl mb-1">
                <p className="text-sm leading-relaxed opacity-90">{message.title}</p>
             </div>
            <div className="grid grid-cols-3 gap-1 p-1">
              {message.stats.map((s) => (
                <div key={s.label} className="bg-[#f5f2ef] rounded-lg p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-[#6b5c51] mb-1">{s.label}</p>
                  <p className="font-bold text-[#2c241b]">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {message.type === "gallery" && (
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs font-semibold text-[#6b5c51] mb-2 px-1">{message.caption}</p>
            <div className="grid grid-cols-2 gap-2">
              {message.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="h-24 w-full object-cover rounded-lg hover:opacity-90 transition cursor-pointer"
                />
              ))}
            </div>
          </div>
        )}

        {!message.type && (
          <div
            className={`px-5 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
              isMe
                ? "bg-[#2c241b] text-white rounded-br-none"
                : "bg-white text-[#2c241b] border border-gray-100 rounded-bl-none"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className={`flex items-center gap-1 mt-1 px-1 ${isMe ? "justify-end" : "justify-start"}`}>
            <span className="text-[10px] font-medium text-[#6b5c51]/60">
            {message.time}
            </span>
            {isMe && <FiCheck size={12} className="text-[#6b5c51]" />}
        </div>
      </div>
    </div>
  );
}

function ChatRow({ chat, activeId, onSelect }) {
  const isTyping =
    chat.typing ||
    (typeof chat.status === "string" && chat.status.toLowerCase().includes("typing"));
  
  const isActive = chat.id === activeId;

  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 group ${
        isActive 
            ? "bg-white shadow-md shadow-[#6b5c51]/5 scale-[1.02]" 
            : "hover:bg-white/40 hover:scale-[1.01]"
      }`}
    >
      <div className="relative">
        <img src={chat.avatar} className="w-12 h-12 rounded-full object-cover shadow-sm" alt={chat.name} />
        {chat.unread > 0 && <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-[#d9ccbe] rounded-full" />}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-0.5">
            <p className={`text-sm font-bold truncate ${isActive ? "text-[#2c241b]" : "text-[#4b4239]"}`}>
                {chat.name}
            </p>
            <span className={`text-[10px] ${isActive ? "text-[#6b5c51]" : "text-[#6b5c51]/60"}`}>{chat.time}</span>
        </div>
        
        <p className={`text-xs truncate ${isTyping ? "text-green-600 font-medium" : "text-[#6b5c51]/80"}`}>
          {chat.status}
        </p>
      </div>
    </button>
  );
}

function TabNav({ activeTab, onChange }) {
  const tabs = ["Pinned", "Unread", "Groups"];
  return (
    <div className="flex items-center gap-1 mt-2">
      {tabs.map((tab) => {
        const active = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`px-4 py-1.5 text-xs rounded-lg transition-all border ${
              active
                ? "bg-[#4b4239] text-white border-[#4b4239] font-medium shadow-md"
                : "bg-transparent text-[#6b5c51] border-transparent hover:bg-white/30"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}