import { useMemo, useState, useEffect, useRef } from "react";
import {
  FiSearch,
  FiSend,
  FiImage,
  FiMic,
  FiSmile,
  FiPhone,
  FiVideo,
  FiMoreVertical,
  FiCheck,
  FiEdit2,
  FiEdit,
} from "react-icons/fi";

const INITIAL_CHATS = [
  {
    id: 1,
    name: "Alexander Jameson",
    status: "Active now",
    time: "4:45 PM",
    unread: 0,
    pinned: true,
    group: false,
    avatar: "https://i.pravatar.cc/80?img=31",
  },
  {
    id: 2,
    name: "Sarah Connors",
    status: "Typing...",
    time: "5:38 PM",
    unread: 2,
    pinned: true,
    group: false,
    avatar: "https://i.pravatar.cc/80?img=5",
  },
  {
    id: 3,
    name: "Design Team",
    status: "Sent a photo",
    time: "1:20 PM",
    unread: 0,
    pinned: false,
    group: true,
    avatar: "https://i.pravatar.cc/80?img=8",
  },
];

const INITIAL_THREADS = {
  1: [
    {
      id: "m1",
      from: "them",
      text: "Hey! Let me know if you want to visit the place.",
      time: "10:37 AM",
    },
    {
      id: "m2",
      from: "me",
      text: "Looks great, I want to book a viewing.",
      time: "12:25 PM",
    },
  ],
  2: [{ id: "m1", from: "them", text: "Still interested?", time: "5:30 PM" }],
  3: [],
};

export default function Messages({ darkMode = false }) {
  const [activeChatId, setActiveChatId] = useState(1);
  const [activeTab, setActiveTab] = useState("Pinned");
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [replyTo, setReplyTo] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [threads, activeChatId]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      from: "me",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      replyToId: replyTo?.id || null,
    };

    setThreads((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage],
    }));
    setInput("");
    setReplyTo(null);
    setShowEmojiPicker(false);
  };

  const handleImageUpload = (file) => {
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    const newMessage = {
      id: Date.now(),
      from: "me",
      imageUrl,
      text: "",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setThreads((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage],
    }));
    setReplyTo(null);
    setShowEmojiPicker(false);
  };

  const appendEmoji = (emoji) => {
    setInput((prev) => `${prev}${emoji}`);
    setShowEmojiPicker(false);
  };

  const toggleReaction = (chatId, messageId, emoji) => {
    setThreads((prev) => {
      const list = prev[chatId] || [];
      const updated = list.map((m) =>
        m.id === messageId
          ? { ...m, reaction: m.reaction === emoji ? undefined : emoji }
          : m
      );
      return { ...prev, [chatId]: updated };
    });
  };

  const sortedChats = useMemo(() => {
    return [...INITIAL_CHATS]
      .filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  }, [searchQuery]);

  const filteredChats = useMemo(() => {
    if (activeTab === "Pinned") return sortedChats.filter((c) => c.pinned);
    if (activeTab === "Unread") return sortedChats.filter((c) => c.unread > 0);
    if (activeTab === "Groups") return sortedChats.filter((c) => c.group);
    return sortedChats;
  }, [activeTab, sortedChats]);

  const activeChat =
    INITIAL_CHATS.find((c) => c.id === activeChatId) || INITIAL_CHATS[0];
  const activeMessages = threads[activeChatId] || [];

  return (
    <div className="h-screen flex bg-[#d9ccbe] text-[#4b4239] dark:bg-[#23201B] dark:text-[#EDE5DA]">
      {/* SIDEBAR */}
      <aside className="w-[360px] border-r border-[#6b5c51]/25 flex flex-col bg-[#d9ccbe] dark:bg-[#23201B] dark:border-[#3a332c]">
        <div className="p-4 border-b border-[#6b5c51]/15 space-y-3 bg-white/50 backdrop-blur-sm dark:bg-[#2B2722]/80 dark:border-[#3a332c]">
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg text-[#2c241b] dark:text-[#EDE5DA]">Messages</span>
            <div className="flex gap-2">
              <IconButton icon={<FiEdit size={22} />} />
            </div>
          </div>

          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b5c51] dark:text-[#B89B6C]" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats..."
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-white/80 border border-white/60 text-[#4b4239] placeholder:text-[#6b5c51]/60 outline-none focus:ring-2 ring-[#6b5c51]/15 focus:bg-white transition dark:bg-[#2B2722] dark:border-[#3a332c] dark:text-[#EDE5DA] dark:placeholder:text-[#B89B6C]/70 dark:focus:bg-[#2B2722]"
            />
          </div>

          <div className="flex justify-center">
            <TabNav activeTab={activeTab} onChange={setActiveTab} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <ChatRowStyled
              key={chat.id}
              chat={chat}
              activeId={activeChatId}
              onSelect={() => setActiveChatId(chat.id)}
            />
          ))}
        </div>
      </aside>

      {/* CHAT AREA */}
      <main className="flex-1 flex flex-col bg-[#f0e8dc] dark:bg-[#1f1b16]">
        <header className="flex items-center justify-between px-7 py-5 border-b border-[#b8a895] bg-[#d9ccbe] dark:bg-[#2B2722] dark:border-[#3a332c]">
          <div className="flex items-center gap-3">
            <img
              src={activeChat.avatar}
              className="w-10 h-10 rounded-full border border-white shadow-sm"
            />
            <div>
              <p className="font-semibold text-[#4b3b31] dark:text-[#EDE5DA]">{activeChat.name}</p>
              <p className="text-xs text-[#6b5c51] dark:text-[#B89B6C]">{activeChat.status}</p>
            </div>
          </div>
          <div className="flex gap-2 text-[#5d4d42] dark:text-[#B89B6C]">
            <IconButton icon={<FiPhone size={22} />} />
            <IconButton icon={<FiVideo size={22} />} />
            <IconButton icon={<FiMoreVertical size={22} />} />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {activeMessages.map((msg) => {
            const repliedTo = msg.replyToId
              ? activeMessages.find((m) => m.id === msg.replyToId)
              : null;
            return (
              <MessageBubble
                key={msg.id}
                message={msg}
                repliedTo={repliedTo}
                onReact={(emoji) => toggleReaction(activeChatId, msg.id, emoji)}
                onReply={() => setReplyTo(msg)}
              />
            );
          })}
          <div ref={scrollRef} />
        </div>

        <footer className="p-4 bg-[#f0e8dc] space-y-2 dark:bg-[#1f1b16]">
          {replyTo && (
            <div className="flex items-center justify-between text-xs text-[#5d4d42] bg-white/60 border border-[#d6c9bb] rounded-xl px-3 py-2 dark:bg-[#2B2722] dark:border-[#3a332c] dark:text-[#B89B6C]">
              <div className="truncate">
                Replying to{" "}
                <span className="font-semibold">
                  {replyTo.from === "me" ? "You" : replyTo.from || "Them"}
                </span>
                {replyTo.text && (
                  <span className="ml-1 text-[#7b6d63] dark:text-[#B89B6C]/80">
                    “{replyTo.text.slice(0, 60)}
                    {replyTo.text.length > 60 ? "…" : ""}”
                  </span>
                )}
              </div>
              <button
                onClick={() => setReplyTo(null)}
                className="text-[#6b5c51] hover:text-[#4b3b31] dark:text-[#B89B6C] dark:hover:text-[#EDE5DA]"
              >
                Cancel
              </button>
            </div>
          )}
          <form
            onSubmit={handleSend}
            className="flex items-center justify-center"
          >
            <div className="flex items-center gap-2 w-[96%] bg-[#f4efe7] px-4 py-2 rounded-full border border-[#d6c9bb] focus-within:border-[#6b5c51]/40 transition relative dark:bg-[#2B2722] dark:border-[#3a332c]">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message..."
                className="flex-1 bg-transparent outline-none text-sm text-[#4b4239] placeholder:text-[#7b6d63] dark:text-[#EDE5DA] dark:placeholder:text-[#B89B6C]/70"
              />
              <div className="flex items-center gap-2 text-[#5d4d42] relative dark:text-[#B89B6C]">
                <IconButton icon={<FiMic size={22} />} />
                <IconButton
                  icon={<FiImage size={22} />}
                  onClick={() => fileInputRef.current?.click()}
                />
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker((v) => !v)}
                  className="p-2 rounded-full hover:bg-white/80 text-[#5d4d42] transition dark:hover:bg-[#3a332c] dark:text-[#B89B6C]"
                  title="Stickers"
                >
                  <FiSmile size={22} />
                </button>
                {showEmojiPicker && (
                  <div className="absolute right-0 bottom-full mb-2 flex gap-1 bg-white shadow-lg border border-[#d6c9bb] rounded-xl px-2 py-1 dark:bg-[#2B2722] dark:border-[#3a332c]">
                    {["😊", "😂", "❤️", "👍", "🔥", "👏"].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => appendEmoji(emoji)}
                        className="h-7 w-7 rounded-full hover:bg-[#f4efe7] flex items-center justify-center dark:hover:bg-[#3a332c]"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e.target.files?.[0])}
              />
            </div>

          </form>
        </footer>
      </main>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function IconButton({ icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-2 rounded-full text-[#6b5c51] hover:bg-[#6b5c51]/10 transition dark:text-[#B89B6C] dark:hover:bg-[#3a332c]"
    >
      {icon}
    </button>
  );
}

function MessageBubble({ message, repliedTo, onReact, onReply }) {
  const isMe = message.from === "me";
  const reactions = ["👍", "❤️", "😊"];

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div className="relative space-y-1 max-w-[65%]">
        {repliedTo && (
          <div className="text-[11px] text-[#7b6d63] bg-white/60 border border-[#e7e0d5] rounded-xl px-3 py-2 dark:bg-[#2B2722] dark:border-[#3a332c] dark:text-[#B89B6C]">
            Replying to{" "}
            <span className="font-semibold">
              {repliedTo.from === "me" ? "You" : repliedTo.from || "them"}
            </span>
            {": "}
            <span className="italic">{repliedTo.text}</span>
          </div>
        )}
        <div
          className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${
            isMe
              ? "bg-[#6b5c51] text-white rounded-br-none"
              : "bg-white text-[#2c241b] border border-[#e7e0d5] rounded-bl-none dark:bg-[#2B2722] dark:text-[#EDE5DA] dark:border-[#3a332c]"
          }`}
        >
          {message.imageUrl ? (
            <img
              src={message.imageUrl}
              alt="shared"
              className="rounded-xl max-h-64 object-cover mb-2 border border-[#e7e0d5] dark:border-[#3a332c]"
            />
          ) : null}
          {message.text && <div>{message.text}</div>}
          <div className="text-[10px] opacity-70 mt-1 text-right">
            {message.time} {isMe && <FiCheck className="inline ml-1" />}
          </div>
          {message.reaction && (
            <span className="absolute -bottom-2 right-2 bg-white shadow px-2 py-1 rounded-full text-sm border border-[#e7e0d5] dark:bg-[#2B2722] dark:border-[#3a332c] dark:text-[#EDE5DA]">
              {message.reaction}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-[#7b6d63] dark:text-[#B89B6C]">
          <div className="flex items-center gap-1">
            {reactions.map((emoji) => (
              <button
                key={emoji}
                onClick={() => onReact?.(emoji)}
                className={`h-7 w-7 rounded-full border border-transparent hover:border-[#d6c9bb] bg-white/70 flex items-center justify-center transition dark:bg-[#2B2722] dark:hover:border-[#3a332c] ${
                  message.reaction === emoji ? "ring-2 ring-[#6b5c51]/40" : ""
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
          <button
            onClick={onReply}
            className="text-[#6b5c51] hover:text-[#4b3b31] font-semibold dark:text-[#B89B6C] dark:hover:text-[#EDE5DA]"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}

function ChatRowStyled({ chat, activeId, onSelect }) {
  const isActive = chat.id === activeId;

  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
        isActive
          ? "bg-white/80 border-l-4 border-[#6b5c51] dark:bg-[#2B2722] dark:border-[#B89B6C]"
          : "hover:bg-white/60 dark:hover:bg-[#2B2722]"
      }`}
    >
      <img
        src={chat.avatar}
        className="w-14 h-14 rounded-full border border-white shadow-sm"
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate text-[#2c241b] dark:text-[#EDE5DA]">{chat.name}</p>
        <p className="text-xs text-[#6b5c51] truncate dark:text-[#B89B6C]">{chat.status}</p>
      </div>
      {chat.unread > 0 && (
        <div className="w-2.5 h-2.5 rounded-full bg-[#6b5c51] dark:bg-[#B89B6C]" />
      )}
    </button>
  );
}

function TabNav({ activeTab, onChange }) {
  const tabs = ["Pinned", "Unread", "Groups"];
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => {
        const active = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`text-xs px-3 py-1 rounded-full border ${
              active
                ? "bg-[#6b5c51] text-white border-[#6b5c51]"
                : "bg-white/60 text-[#6b5c51] border-transparent hover:bg-white dark:bg-[#2B2722] dark:text-[#B89B6C] dark:hover:bg-[#3a332c]"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
