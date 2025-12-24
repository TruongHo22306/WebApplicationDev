import { FiBell, FiX } from "react-icons/fi";

export default function NotificationsPanel({ open, onClose, notifications, onAction }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`absolute inset-y-0 left-0 w-[360px] bg-[#6b5c51]/95 text-white
        border-r border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        transform transition-all duration-300 ease-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <FiBell />
            </div>
            <div>
              <p className="text-xl font-semibold">Notifications</p>
              <p className="text-xs text-white/60">Latest updates</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10"
            title="Close"
          >
            <FiX />
          </button>
        </div>

        {/* List */}
        <div className="overflow-y-auto px-4 py-2">
          {notifications.map((n, idx) => (
            <div
              key={idx}
              className="flex gap-3 py-3 border-b border-white/10 last:border-b-0"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <FiBell />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{n.title}</p>
                <p className="text-xs text-white/60 truncate">{n.subtitle}</p>

                {n.actions?.length > 0 && (
                  <div className="mt-2 flex gap-2">
                    {n.actions.map((action) => (
                      <button
                        key={action}
                        type="button"
                        onClick={() => onAction?.(action, idx)}
                        className="px-3 py-1 rounded-full bg-white text-neutral-900 text-xs font-semibold hover:opacity-90 transition"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {n.unread && (
                <span className="mt-1 w-2.5 h-2.5 rounded-full bg-[#4cc3ff]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
