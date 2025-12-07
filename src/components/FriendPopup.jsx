import { FiX } from "react-icons/fi";

const requests = [
  {
    id: 1,
    name: "Sophia Carter",
    avatar: "https://i.pravatar.cc/80?img=8",
    time: "5 min ago",
    note: "Sent you a friend request",
    type: "incoming",
  },
  {
    id: 2,
    name: "Liam Johnson",
    avatar: "https://i.pravatar.cc/80?img=21",
    time: "20 min ago",
    note: "Accepted your request",
    type: "accepted",
  },
  {
    id: 3,
    name: "Olivia Nguyen",
    avatar: "https://i.pravatar.cc/80?img=34",
    time: "1h ago",
    note: "Sent you a friend request",
    type: "incoming",
  },
];

export default function FriendPopup({ open, onClose }) {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
      />

      <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 py-10">
        <div className="w-full max-w-lg bg-white text-neutral-900 rounded-2xl shadow-2xl overflow-hidden animate-fadeSlide">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold">Friend requests</h3>
            <button onClick={onClose} aria-label="Close friend requests">
              <FiX size={20} />
            </button>
          </div>

          <div className="divide-y divide-gray-200">
            {requests.map((r) => (
              <div key={r.id} className="p-4 flex items-start gap-3">
                <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold">{r.name}</span> {r.note}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{r.time}</p>
                </div>
                {r.type === "incoming" ? (
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-lg bg-black text-white text-sm hover:opacity-90">
                      Accept
                    </button>
                    <button className="px-3 py-1 rounded-lg bg-gray-200 text-sm hover:bg-gray-300">
                      Decline
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-green-600 font-semibold">Accepted</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
