import { useState } from "react";
import { FiMessageSquare, FiX, FiEdit } from "react-icons/fi";
import ChatPopUp from "./ChatPopUp";

export default function MessagesPanel({ open, onClose, chats = [], onCompose }) {
  const unreadCount = chats.filter((c) => c.unread).length;
  const [popupChat, setPopupChat] = useState(null);

  const handleOpenChat = (chat) => {
    setPopupChat(chat);
    if (onClose) onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        <div
          className={`fixed top-0 right-0 bottom-0 w-[420px] max-w-full bg-[#6b5c51]/95 text-white shadow-[0_24px_80px_rgba(0,0,0,0.55)] border-l border-white/10 transform transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#6b5c51]/95 sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shadow-inner">
                <FiMessageSquare />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">Messages</p>
                {unreadCount > 0 && (
                  <span className="min-w-[22px] h-5 px-2 rounded-full bg-red-500 text-[11px] font-semibold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 rounded-full hover:bg-white/10 transition"
                title="New chat"
                onClick={onCompose || (() => {})}
              >
                <FiEdit size={16} />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition"
                title="Close"
              >
                <FiX />
              </button>
            </div>
          </div>

          <div className="relative h-full pb-16">
            <div className="overflow-y-auto h-full px-4 py-3 space-y-2">
              {chats.map((chat) => (
                <button
                  key={chat.name}
                  onClick={() => handleOpenChat(chat)}
                  className="w-full text-left flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-white/10 transition border border-transparent hover:border-white/10"
                >
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold leading-tight truncate">
                        {chat.name}
                      </p>
                      <span className="text-[11px] text-white/70 whitespace-nowrap">
                        {chat.time}
                      </span>
                    </div>
                    <p className="text-[12px] text-white/70 leading-tight truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unread && (
                    <span className="mt-1 w-2.5 h-2.5 rounded-full bg-[#4cc3ff] inline-block"></span>
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="absolute right-4 bottom-4 w-12 h-12 rounded-full bg-[#6b5c51] text-white shadow-lg hover:opacity-90 transition flex items-center justify-center"
              title="Compose"
              onClick={onCompose || (() => {})}
            >
              <FiEdit size={18} />
            </button>
          </div>
        </div>
      </div>

      <ChatPopUp
        open={!!popupChat}
        onClose={() => setPopupChat(null)}
        user={
          popupChat
            ? {
                name: popupChat.name,
                title: popupChat.location || "Chat",
                avatar: popupChat.avatar,
                online: popupChat.unread || false,
              }
            : undefined
        }
      />
    </>
  );
}
