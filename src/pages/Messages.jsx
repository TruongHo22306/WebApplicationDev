import React, { useState, useRef, useEffect } from "react";
import {
  FiPhone,
  FiVideo,
  FiInfo,
  FiSend,
  FiMic,
  FiImage,
  FiCheck,
  FiCheckCircle,
  FiPlayCircle,
  FiFilter,
} from "react-icons/fi";
import ReelModal from "../components/ReelModal"; 
import Sidebar from "../components/Sidebar";

// Dummy avatar fallback
const AVATAR =
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200";

export default function Messages({ darkMode }) {
  // ===== FILTER & CHAT LIST =====
  const [filter, setFilter] = useState("all"); // all | unread | groups | requests
  const [activeChatId, setActiveChatId] = useState(1);
  const [loadingChat, setLoadingChat] = useState(false);

  const [chats] = useState([
    {
      id: 1,
      name: "Fleurpourelle 🌷",
      lastMessage: "Liked your message",
      time: "15 phút",
      unread: 0,
      isGroup: false,
      isRequest: false,
      hasStory: true,
      avatar: AVATAR,
    },
    {
      id: 2,
      name: "D&Flower Studio",
      lastMessage: "Đơn hoa mai đã xác nhận",
      time: "2 ngày",
      unread: 2,
      isGroup: false,
      isRequest: false,
      hasStory: false,
      avatar:
        "https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    {
      id: 3,
      name: "Nhóm Lớp 12A1",
      lastMessage: "Mai 7h họp nhen",
      time: "1 giờ",
      unread: 5,
      isGroup: true,
      isRequest: false,
      hasStory: true,
      avatar:
        "https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    {
      id: 4,
      name: "Request • Vintage Shop",
      lastMessage: "Bạn có rảnh nghe máy không?",
      time: "3 ngày",
      unread: 1,
      isGroup: false,
      isRequest: true,
      hasStory: false,
      avatar:
        "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
  ]);

  const filterChats = () => {
    return chats.filter((c) => {
      if (filter === "all") return !c.isRequest;
      if (filter === "unread") return c.unread > 0 && !c.isRequest;
      if (filter === "groups") return c.isGroup;
      if (filter === "requests") return c.isRequest;
      return true;
    });
  };

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  // ===== MESSAGES STATE =====
  const [messagesByChat, setMessagesByChat] = useState({
    1: [
      {
        id: "m1",
        from: "them",
        type: "text",
        text: "Đây mai mấy giờ b cần ạ",
        time: "10:02",
        read: true,
      },
      {
        id: "m2",
        from: "me",
        type: "text",
        text: "Tầm mấy giờ thì mình lấy hoa được á?",
        time: "10:05",
        read: true,
      },
      {
        id: "m3",
        from: "them",
        type: "reel",
        reel: {
          src: "https://videos.pexels.com/video-files/2795741/2795741-hd_1920_1080_30fps.mp4",
          username: "fleurpourelle",
          caption: "Setup tiệm hôm nay nè 🌸",
          avatar: AVATAR,
          likes: "7,7k",
          commentsList: [
            {
              username: "flowerlover",
              text: "Đẹp quá trời luôn!",
              avatar: AVATAR,
            },
          ],
        },
        time: "10:09",
        read: true,
      },
    ],
    2: [],
    3: [],
    4: [],
  });

  const messages = messagesByChat[activeChatId] || [];

  // ===== INPUT / TYPING / READ RECEIPTS =====
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false); // đối phương đang gõ
  const [selectedReel, setSelectedReel] = useState(null);

  // voice
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recording, setRecording] = useState(false);

  // image
  const fileInputRef = useRef(null);

  const handleChangeChat = (id) => {
    if (id === activeChatId) return;
    setLoadingChat(true);
    setTimeout(() => {
      setActiveChatId(id);
      setLoadingChat(false);
    }, 350);
  };

  const pushMessage = (chatId, message) => {
    setMessagesByChat((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), message],
    }));
  };

  const simulateReply = (chatId) => {
    setTyping(true);
    setTimeout(() => {
      pushMessage(chatId, {
        id: Date.now() + "-reply",
        from: "them",
        type: "text",
        text: "Oke, để shop note lại nha 🌸",
        time: "Vừa xong",
        read: true,
      });
      setTyping(false);
    }, 1500);
  };

  const handleSendText = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      from: "me",
      type: "text",
      text: input.trim(),
      time: "Vừa xong",
      read: false,
    };
    pushMessage(activeChatId, newMsg);
    setInput("");
    // giả lập đã đọc sau 1–1.5s
    setTimeout(() => {
      setMessagesByChat((prev) => {
        const arr = [...(prev[activeChatId] || [])];
        const idx = arr.findIndex((m) => m.id === newMsg.id);
        if (idx !== -1) arr[idx] = { ...arr[idx], read: true };
        return { ...prev, [activeChatId]: arr };
      });
    }, 1200);
    simulateReply(activeChatId);
  };

  // ===== IMAGE UPLOAD =====
  const handleChooseImage = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleImageSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const newMsg = {
      id: Date.now().toString(),
      from: "me",
      type: "image",
      imageUrl: url,
      time: "Vừa xong",
      read: false,
    };
    pushMessage(activeChatId, newMsg);
    e.target.value = "";
    setTimeout(() => {
      setMessagesByChat((prev) => {
        const arr = [...(prev[activeChatId] || [])];
        const idx = arr.findIndex((m) => m.id === newMsg.id);
        if (idx !== -1) arr[idx] = { ...arr[idx], read: true };
        return { ...prev, [activeChatId]: arr };
      });
    }, 1200);
  };

  // ===== VOICE MESSAGE (HOLD TO RECORD) =====
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        const newMsg = {
          id: Date.now().toString(),
          from: "me",
          type: "voice",
          audioUrl: url,
          time: "Vừa xong",
          read: false,
        };
        pushMessage(activeChatId, newMsg);
        setTimeout(() => {
          setMessagesByChat((prev) => {
            const arr = [...(prev[activeChatId] || [])];
            const idx = arr.findIndex((m) => m.id === newMsg.id);
            if (idx !== -1) arr[idx] = { ...arr[idx], read: true };
            return { ...prev, [activeChatId]: arr };
          });
        }, 1200);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Cannot record audio", err);
      alert("Trình duyệt không cho phép ghi âm (micro).");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
      setRecording(false);
    }
  };

  // ===== REEL PREVIEW CLICK =====
  const handleReelClick = (reel) => setSelectedReel(reel);
  const closeReelModal = () => setSelectedReel(null);

  // ===== RENDER HELPERS =====
  const bubbleBase =
    "max-w-[65%] rounded-2xl px-4 py-2 text-sm shadow-sm transition-all";

  const renderMessage = (m, idx, arr) => {
    const isMe = m.from === "me";
    const isLastMine =
      isMe && arr.filter((mm) => mm.from === "me").slice(-1)[0]?.id === m.id;

    const bubbleClass = isMe
      ? `${bubbleBase} bg-[#3797f0] text-white rounded-br-sm`
      : `${bubbleBase} bg-neutral-800/80 text-white rounded-bl-sm`;

    return (
      <div
        key={m.id}
        className={`w-full flex mb-2 ${isMe ? "justify-end" : "justify-start"}`}
      >
        {!isMe && (
          <div className="w-8 mr-2 flex justify-center">
            {idx === 0 || arr[idx - 1].from === "me" ? (
              <img
                src={activeChat.avatar}
                className="w-8 h-8 rounded-full"
                alt=""
              />
            ) : (
              <div className="w-8" />
            )}
          </div>
        )}

        <div className="flex flex-col items-end">
          {/* Bubble */}
          {m.type === "text" && (
            <div className={bubbleClass}>
              <span>{m.text}</span>
            </div>
          )}

          {m.type === "image" && (
            <div className={`${bubbleClass} p-1 overflow-hidden`}>
              <img
                src={m.imageUrl}
                className="rounded-xl max-h-64 object-cover"
                alt="sent"
              />
            </div>
          )}

          {m.type === "voice" && (
            <div className={`${bubbleClass} flex items-center gap-2`}>
              <FiMic className="opacity-80" />
              <audio controls src={m.audioUrl} className="h-8" />
            </div>
          )}

          {m.type === "reel" && (
            <button
              onClick={() => handleReelClick(m.reel)}
              className={`${bubbleClass} bg-black/80 flex items-center gap-3 hover:bg-black transition`}
            >
              <div className="relative w-16 h-20 rounded-lg overflow-hidden">
                <video
                  src={m.reel.src}
                  className="w-full h-full object-cover"
                  muted
                  loop
                />
                <FiPlayCircle className="absolute inset-0 m-auto text-white text-2xl drop-shadow" />
              </div>
              <div className="flex flex-col items-start text-left text-xs">
                <span className="font-semibold">@{m.reel.username}</span>
                <span className="line-clamp-2 opacity-80">
                  {m.reel.caption}
                </span>
                <span className="text-[11px] opacity-60 mt-1">
                  Tap to open reel
                </span>
              </div>
            </button>
          )}

          {/* Time + read receipts */}
          <div className="flex items-center gap-1 mt-1 text-[11px] text-gray-400">
            <span>{m.time}</span>
            {isMe && isLastMine && (
              <>
                {m.read ? (
                  <FiCheckCircle className="text-blue-400" />
                ) : (
                  <FiCheck className="opacity-70" />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const filteredChats = filterChats();

  return (
    <div
      className={
        "flex w-full min-h-screen " +
        (darkMode ? "bg-black text-gray-100" : "bg-[#f7f5f4] text-black")
      }
    >
      {/* Nếu Sidebar global rồi thì KHÔNG cần thêm Sidebar ở đây */}

      {/* LEFT: CHAT LIST */}
      <div
        className={`border-r ${
          darkMode ? "border-neutral-800" : "border-gray-300"
        } w-[320px] flex flex-col`}
      >
        {/* Search */}
        <div className="px-4 pt-4 pb-2">
          <input
            placeholder="Tìm kiếm"
            className="w-full rounded-full px-4 py-2 text-sm bg-neutral-800/70 text-white outline-none"
          />
        </div>

        {/* Filters */}
        <div className="px-4 pb-3 flex items-center justify-between">
          <div className="flex gap-2 text-xs">
            {[
              { key: "all", label: "All" },
              { key: "unread", label: "Unread" },
              { key: "groups", label: "Groups" },
              { key: "requests", label: "Requests" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-3 py-1 rounded-full border text-xs transition-all ${
                  filter === tab.key
                    ? "bg-white text-black border-transparent"
                    : "border-neutral-600 text-gray-300 hover:bg-neutral-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <FiFilter className="text-gray-400" />
        </div>

        {/* Chats */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => {
            const isActive = chat.id === activeChatId;
            return (
              <button
                key={chat.id}
                onClick={() => handleChangeChat(chat.id)}
                className={`w-full flex items-center px-4 py-3 text-left transition-all group ${
                  isActive
                    ? "bg-white/10"
                    : "hover:bg-white/5 dark:hover:bg-neutral-900/80"
                }`}
              >
                {/* avatar + story ring */}
                <div className="relative mr-3">
                  {chat.hasStory && (
                    <div className="absolute inset-[-2px] rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400" />
                  )}
                  <img
                    src={chat.avatar}
                    className={`relative w-10 h-10 rounded-full ${
                      chat.hasStory ? "p-[2px] bg-black" : ""
                    }`}
                    alt=""
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold truncate">
                      {chat.name}
                    </span>
                    <span className="text-[11px] text-gray-400 ml-2">
                      {chat.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-gray-400 truncate">
                      {chat.lastMessage}
                    </span>
                    {chat.unread > 0 && (
                      <span className="ml-2 min-w-[18px] h-[18px] rounded-full bg-[#3797f0] text-[10px] flex items-center justify-center text-white">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT: CHAT WINDOW */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div
          className={`flex items-center justify-between px-4 py-3 border-b ${
            darkMode ? "border-neutral-800" : "border-gray-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <img
              src={activeChat.avatar}
              className="w-8 h-8 rounded-full"
              alt=""
            />
            <div>
              <div className="text-sm font-semibold">{activeChat.name}</div>
              <div className="text-[11px] text-gray-400">Đang hoạt động</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-300">
            <FiPhone className="cursor-pointer hover:text-white" />
            <FiVideo className="cursor-pointer hover:text-white" />
            <FiInfo className="cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 flex flex-col">
          {loadingChat ? (
            // Skeleton loading
            <div className="flex-1 flex flex-col justify-center items-center gap-4 px-6">
              <div className="w-32 h-32 rounded-full bg-neutral-800/60 animate-pulse" />
              <div className="w-52 h-4 rounded-full bg-neutral-800/60 animate-pulse" />
              <div className="w-40 h-4 rounded-full bg-neutral-800/60 animate-pulse" />
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {messages.map((m, idx) => renderMessage(m, idx, messages))}

                {/* typing indicator */}
                {typing && (
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      src={activeChat.avatar}
                      className="w-6 h-6 rounded-full"
                      alt=""
                    />
                    <div className="px-3 py-2 rounded-2xl bg-neutral-800 text-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-300" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input row */}
              <div
                className={`px-4 py-3 border-t flex items-center gap-3 ${
                  darkMode ? "border-neutral-800" : "border-gray-300"
                }`}
              >
                {/* hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelected}
                />

                <button
                  onClick={handleChooseImage}
                  className="p-2 rounded-full hover:bg-white/10"
                >
                  <FiImage />
                </button>

                {/* Voice hold to record */}
                <button
                  onMouseDown={startRecording}
                  onMouseUp={stopRecording}
                  onMouseLeave={stopRecording}
                  onTouchStart={startRecording}
                  onTouchEnd={stopRecording}
                  className={`p-2 rounded-full hover:bg-white/10 ${
                    recording ? "bg-red-500 text-white" : ""
                  }`}
                  title="Hold to record"
                >
                  <FiMic />
                </button>

                <div className="flex-1">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && !e.shiftKey && handleSendText()
                    }
                    placeholder="Nhắn tin..."
                    className="w-full bg-neutral-800/80 text-sm rounded-full px-4 py-2 outline-none"
                  />
                </div>

                <button
                  onClick={handleSendText}
                  className="p-2 rounded-full bg-[#3797f0] text-white hover:bg-[#2c81d1] transition"
                >
                  <FiSend />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* REEL MODAL */}
      <ReelModal
        reel={selectedReel}
        onClose={closeReelModal}
        darkMode={darkMode}
      />
    </div>
  );
}
