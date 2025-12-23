import { FiX, FiSmile, FiPaperclip, FiSend, FiMic } from "react-icons/fi";

export default function ChatPopUp({
  open = false,
  onClose = () => {},
  user = {
    name: "Joohny Dunny",
    title: "Financial Officer",
    avatar: "https://i.pravatar.cc/60?img=12",
    online: true,
  },
  messages = [
    { id: 1, from: "them", text: "Thank You! Alina", time: "10:24" },
    { id: 2, type: "divider", label: "12 FEB" },
    { id: 3, from: "them", text: "Hello, how's it going?", time: "10:25" },
    { id: 4, from: "me", text: "Thank you :)", time: "10:27" },
  ],
}) {
  if (!open) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="w-[360px] bg-[#6b5c51] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-neutral-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {user.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 ring-2 ring-white"></span>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-100">{user.name}</p>
              <p className="text-xs text-neutral-400">{user.title}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 transition"
            aria-label="Close"
          >
            <FiX className="text-neutral-300" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 bg-neutral-50 px-4 py-4 overflow-y-auto space-y-3">
          {messages.map((msg) => {
            if (msg.type === "divider") {
              return (
                <div key={msg.id} className="flex items-center gap-2 text-[11px] text-neutral-400">
                  <span className="flex-1 h-px bg-neutral-300"></span>
                  <span>{msg.label}</span>
                  <span className="flex-1 h-px bg-neutral-300"></span>
                </div>
              );
            }

            const isMe = msg.from === "me";
            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    isMe
                      ? "bg-[#e5e8ff] text-neutral-800 rounded-tr-sm"
                      : "bg-[#fff3d6] text-neutral-800 rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Composer */}
        <div className="border-t border-neutral-200 bg-white px-3 py-2">
          <div className="flex items-center gap-2 bg-transparent">
            <button className="p-2 rounded-full hover:bg-neutral-100 transition">
              <FiSmile className="text-neutral-500" />
            </button>
            <button className="p-2 rounded-full hover:bg-neutral-100 transition">
              <FiPaperclip className="text-neutral-500" />
            </button>
            <button className="p-2 rounded-full hover:bg-neutral-100 transition">
              <FiMic className="text-neutral-500" />
            </button>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter Message"
              className="flex-1 border border-neutral-200 rounded-full px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#e5e8ff] focus:border-transparent"
            />
            <button className="p-2 rounded-full bg-[#e5e8ff] text-neutral-700 hover:bg-[#d8dbff] transition">
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}