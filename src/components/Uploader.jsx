import { useState } from "react";
import {
  FiImage,
  FiFile,
  FiMapPin,
  FiChevronDown,
  FiSmile,
  FiGlobe,
  FiUsers,
  FiLock,
} from "react-icons/fi";

export default function Uploader() {
  const [privacy, setPrivacy] = useState("Public");
  const [openPrivacy, setOpenPrivacy] = useState(false);

  const privacyOptions = [
    { label: "Public", icon: <FiGlobe /> },
    { label: "Friends", icon: <FiUsers /> },
    { label: "Only me", icon: <FiLock /> },
  ];

  return (
    <div className="bg-white dark:bg-[#222] rounded-xl p-4 shadow-sm w-full transition">

      {/* INPUT BAR */}
      <div
        className="
          flex items-center 
          rounded-full 
          px-4 py-2 
          bg-[#7d7573]/25 
          dark:bg-neutral-700 
          transition
        "
      >
        <img
          src="https://i.pravatar.cc/50?img=7"
          className="w-9 h-9 rounded-full mr-3"
        />

        <input
          type="text"
          placeholder="Share something..."
          className="flex-1 bg-transparent outline-none text-black dark:text-white placeholder-gray-200 text-[17px]"
        />

        <FiSmile className="text-gray-200 dark:text-gray-300" size={20} />
      </div>

      {/* ACTION BAR */}
      <div className="flex items-center justify-between mt-4 text-[15px]">

        {/* ACTIONS LEFT */}
        <div className="flex items-center gap-6 text-gray-700 dark:text-gray-300">

          <button className="flex items-center gap-2 hover:opacity-70 transition">
            <FiFile size={18} /> File
          </button>

          <button className="flex items-center gap-2 hover:opacity-70 transition">
            <FiImage size={18} /> Image
          </button>

          <button className="flex items-center gap-2 hover:opacity-70 transition">
            <FiMapPin size={18} /> Location
          </button>

          {/* PRIVACY DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setOpenPrivacy(!openPrivacy)}
              className="flex items-center gap-1 hover:opacity-80"
            >
              {
                privacyOptions.find((p) => p.label === privacy)?.icon
              }{" "}
              {privacy}
              <FiChevronDown size={16} />
            </button>

            {openPrivacy && (
              <div className="absolute left-0 mt-2 w-36 bg-white dark:bg-neutral-800 shadow-lg rounded-lg overflow-hidden z-20 text-[14px]">
                {privacyOptions.map((p) => (
                  <div
                    key={p.label}
                    onClick={() => {
                      setPrivacy(p.label);
                      setOpenPrivacy(false);
                    }}
                    className="
                      px-4 py-2 
                      flex items-center gap-2
                      hover:bg-gray-100 dark:hover:bg-neutral-700 
                      cursor-pointer
                    "
                  >
                    {p.icon} {p.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SEND BUTTON — màu sidebar */}
        <button
          className="
            px-6 py-2 rounded-full 
            bg-[#7d7573] dark:bg-[#7d7573] 
            text-white 
            font-semibold 
            shadow-md hover:opacity-80 
            transition
          "
        >
          Upload
        </button>
      </div>
    </div>
  );
}
