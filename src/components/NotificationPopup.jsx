import { FiX } from "react-icons/fi";

export default function NotificationPopup({ open, onClose }) {
  if (!open) return null;

  const data = [
    {
      id: 1,
      type: "follow_request",
      name: "alley_toxicc",
      avatar: "https://i.pravatar.cc/150?img=12",
      time: "15 phút trước",
      requestCount: 18,
    },
    {
      id: 2,
      name: "zina_zkk",
      avatar: "https://i.pravatar.cc/150?img=33",
      text: "đã yêu cầu theo dõi bạn.",
      time: "6 ngày",
      action: "accept_request",
    },
    {
      id: 3,
      name: "kenscuujust",
      avatar: "https://i.pravatar.cc/150?img=25",
      text: "đã bắt đầu theo dõi bạn.",
      time: "Nov 03",
      action: "follow_back",
    },
    {
      id: 4,
      name: "cunhockhocyvueu_7",
      avatar: "https://i.pravatar.cc/150?img=55",
      text: "đã bắt đầu theo dõi bạn.",
      time: "Nov 03",
      action: "follow_back",
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
      />

      {/* Popup Panel (from LEFT) */}
      <div
        className="
          fixed left-0 top-0 h-full w-[380px]
          bg-neutral-900 text-white 
          shadow-xl z-[100]
          animate-slideLeftPopup
          p-6 overflow-y-auto
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Thông báo</h2>
          <button onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        {/* Follow Request big box */}
        <div className="mb-6">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 cursor-pointer">
            <img
              src={data[0].avatar}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">Yêu cầu theo dõi</p>
              <span className="text-sm text-gray-400">
                {data[0].name} + {data[0].requestCount} người khác
              </span>
            </div>

            <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>
        </div>

        {/* This Month */}
        <h3 className="text-gray-400 uppercase text-sm mb-2">Tháng này</h3>

        {data.slice(1).map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 mb-2"
          >
            <div className="flex items-center gap-3">
              <img className="w-10 h-10 rounded-full" src={item.avatar} />
              <div>
                <p className="text-sm">
                  <span className="font-semibold">{item.name}</span>{" "}
                  {item.text}
                </p>
                <p className="text-xs text-gray-400">{item.time}</p>
              </div>
            </div>

            {item.action === "accept_request" && (
              <div className="flex gap-2">
                <button className="bg-blue-500 px-3 py-1 rounded-lg text-sm">
                  Xác nhận
                </button>
                <button className="bg-gray-700 px-3 py-1 rounded-lg text-sm">
                  Xóa
                </button>
              </div>
            )}

            {item.action === "follow_back" && (
              <button className="bg-gray-700 px-3 py-1 rounded-lg text-sm">
                Theo dõi lại
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
