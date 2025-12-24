import { useMemo, useState } from "react";
import { FiMessageSquare, FiX, FiEdit } from "react-icons/fi";
import ChatPopUp from "./ChatPopUp";

const NEW_MESSAGE_USERS = [
  { id: "u1", name: "Alicia Bennett", avatar: "https://i.pravatar.cc/80?img=12" },
  { id: "u2", name: "Aiden Park", avatar: "https://i.pravatar.cc/80?img=20" },
  { id: "u3", name: "Allison Brooks", avatar: "https://i.pravatar.cc/80?img=41" },
  { id: "u4", name: "Amir Hassan", avatar: "https://i.pravatar.cc/80?img=56" },
  { id: "u5", name: "Anya Kim", avatar: "https://i.pravatar.cc/80?img=27" },
  { id: "u6", name: "Arielle Tran", avatar: "https://i.pravatar.cc/80?img=31" },
];

export default function MessagesPanel({ open, onClose, chats = [], onCompose }) {
  const unreadCount = chats.filter((c) => c.unread).length;
  const [popupChat, setPopupChat] = useState(null);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [newMessageQuery, setNewMessageQuery] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  const filteredNewUsers = useMemo(() => {
    const q = newMessageQuery.trim().toLowerCase();
    if (!q) return NEW_MESSAGE_USERS;
    return NEW_MESSAGE_USERS.filter((u) => u.name.toLowerCase().includes(q));
  }, [newMessageQuery]);

  const handleCompose = () => {
    setShowNewMessage(true);
    if (onCompose) onCompose();
  };

  const handleOpenChat = (chat) => {
    setPopupChat(chat);
    if (onClose) {
      setTimeout(() => onClose(), 0);
    }
  };

  const handleStartChat = () => {
    if (!selectedRecipient) return;
    setPopupChat({
      name: selectedRecipient.name,
      location: "New chat",
      avatar: selectedRecipient.avatar,
      unread: true,
    });
    setShowNewMessage(false);
    setSelectedRecipient(null);
    setNewMessageQuery("");
    if (onClose) {
      setTimeout(() => onClose(), 0);
    }
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
                onClick={handleCompose}
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
              onClick={handleCompose}
            >
              <FiEdit size={18} />
            </button>
          </div>
        </div>
      </div>

      {showNewMessage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60"
          onClick={() => setShowNewMessage(false)}
        >
          <div
            className="w-[420px] max-w-[92vw] rounded-3xl bg-[#f3ede5] text-[#4b4239] shadow-2xl border border-[#cbbdaa]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#cbbdaa]">
              <div className="font-semibold">New message</div>
              <button
                type="button"
                onClick={() => setShowNewMessage(false)}
                className="p-2 rounded-full hover:bg-black/5 transition"
                title="Close"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="px-5 py-3 border-b border-[#cbbdaa]">
              <div className="flex items-center gap-3 text-sm">
                <span className="font-semibold">To:</span>
                <input
                  type="text"
                  placeholder="Search..."
                  value={newMessageQuery}
                  onChange={(e) => setNewMessageQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#8b7d72]"
                />
              </div>
            </div>

            <div className="h-[320px] overflow-y-auto px-4 py-3 text-sm text-[#6b5c51]">
              {filteredNewUsers.length === 0 ? (
                <div className="h-full rounded-2xl border border-[#cbbdaa] bg-white/60 flex items-center justify-center text-[#8b7d72]">
                  No users found
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredNewUsers.map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => setSelectedRecipient(user)}
                      className={`w-full flex items-center gap-3 rounded-2xl border px-3 py-2 transition ${
                        selectedRecipient?.id === user.id
                          ? "border-[#6b5c51] bg-[#6b5c51]/15 text-[#4b4239]"
                          : "border-[#d6c9bb] bg-white/70 hover:bg-white text-[#4b4239]"
                      }`}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-9 w-9 rounded-full object-cover border border-[#d6c9bb]"
                      />
                      <span className="text-sm font-medium">{user.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="px-5 pb-5">
              <button
                type="button"
                className={`w-full rounded-2xl py-3 font-semibold transition ${
                  selectedRecipient
                    ? "bg-[#6b5c51] text-white hover:bg-[#5f5248]"
                    : "bg-[#d6c9bb] text-[#8b7d72] cursor-not-allowed"
                }`}
                disabled={!selectedRecipient}
                onClick={handleStartChat}
              >
                Chat
              </button>
            </div>
          </div>
        </div>
      )}

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
