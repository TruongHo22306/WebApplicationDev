
import { useMemo, useState } from "react";
import {
  FiSearch,
  FiX,
  FiLink,
  FiMessageCircle,
  FiMail,
  FiAtSign,
  FiSend,
} from "react-icons/fi";

const DEFAULT_RECIPIENTS = [
  { id: "u1", name: "Aiden Park", avatar: "https://i.pravatar.cc/80?img=20" },
  { id: "u2", name: "Alicia Bennett", avatar: "https://i.pravatar.cc/80?img=12" },
  { id: "u3", name: "Allison Brooks", avatar: "https://i.pravatar.cc/80?img=41" },
  { id: "u4", name: "Amir Hassan", avatar: "https://i.pravatar.cc/80?img=56" },
  { id: "u5", name: "Anya Kim", avatar: "https://i.pravatar.cc/80?img=27" },
  { id: "u6", name: "Arielle Tran", avatar: "https://i.pravatar.cc/80?img=31" },
  { id: "u7", name: "Eric", avatar: "https://i.pravatar.cc/80?img=64" },
  { id: "u8", name: "Khang Tran", avatar: "https://i.pravatar.cc/80?img=9" },
  { id: "u9", name: "Ngoc Mai", avatar: "https://i.pravatar.cc/80?img=47" },
  { id: "u10", name: "Xinh Sao", avatar: "https://i.pravatar.cc/80?img=36" },
  { id: "u11", name: "Nhan Nguyen", avatar: "https://i.pravatar.cc/80?img=25" },
  { id: "u12", name: "Thanh Nguyen", avatar: "https://i.pravatar.cc/80?img=18" },
];

const SHARE_ACTIONS = [
  { id: "copy", label: "Copy link", icon: <FiLink size={18} /> },
  { id: "message", label: "Messenger", icon: <FiMessageCircle size={18} /> },
  { id: "email", label: "Email", icon: <FiMail size={18} /> },
  { id: "mention", label: "Mention", icon: <FiAtSign size={18} /> },
  { id: "send", label: "Send", icon: <FiSend size={18} /> },
];

export default function SharePopup({
  open,
  onClose,
  onShare,
  recipients = DEFAULT_RECIPIENTS,
  title = "Share",
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [messageText, setMessageText] = useState("");

  const filteredRecipients = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return recipients;
    return recipients.filter((user) =>
      user.name.toLowerCase().includes(q)
    );
  }, [query, recipients]);


  const handleSend = () => {
    if (!selected) return;
    if (onShare) {
      onShare({ actionId: "send", recipient: selected, message: messageText.trim() });
    }
    setMessageText("");
  };

  const handleShareAction = (actionId) => {
    if (onShare) {
      onShare({ actionId, recipient: selected });
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/55"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed inset-x-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 mx-auto w-full sm:max-w-[520px] rounded-t-3xl sm:rounded-3xl bg-[#1f2226] text-white shadow-2xl border border-white/10 transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full sm:translate-y-8"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="text-base font-semibold">{title}</div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition"
            aria-label="Close share"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-sm outline-none focus:bg-white/15"
            />
          </div>

          <div className="max-h-[320px] overflow-y-auto pr-1">
            {filteredRecipients.length === 0 ? (
              <div className="h-40 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-sm text-white/60">
                No matches
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {filteredRecipients.map((user) => {
                  const active = selected?.id === user.id;
                  return (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => setSelected(user)}
                      className={`flex flex-col items-center gap-2 rounded-2xl px-2 py-3 transition ${
                        active ? "bg-white/10" : "hover:bg-white/5"
                      }`}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-14 h-14 rounded-2xl object-cover"
                      />
                      <span className="text-xs font-semibold text-center leading-tight">
                        {user.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 space-y-3">
            <input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type a message..."
              className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-sm outline-none focus:bg-white/15"
            />
            <button
              type="button"
              onClick={handleSend}
              className={`w-full rounded-xl py-2 text-sm font-semibold transition ${
                selected
                  ? "bg-[#4f6cff] text-white hover:bg-[#465fe0]"
                  : "bg-white/10 text-white/50 cursor-not-allowed"
              }`}
              disabled={!selected}
            >
              Send
            </button>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 pb-1 border-t border-white/10">
            {SHARE_ACTIONS.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => handleShareAction(action.id)}
                className="flex flex-col items-center gap-2 text-xs text-white/80 hover:text-white transition"
              >
                <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  {action.icon}
                </span>
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
