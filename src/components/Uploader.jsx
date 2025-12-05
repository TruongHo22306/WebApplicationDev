import { useRef, useState } from "react";
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

export default function Uploader({ onSend }) {
  const [privacy, setPrivacy] = useState("Public");
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [imageName, setImageName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [location, setLocation] = useState("");
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const privacyOptions = [
    { label: "Public", icon: <FiGlobe /> },
    { label: "Friends", icon: <FiUsers /> },
    { label: "Only me", icon: <FiLock /> },
  ];

  const handleSubmit = () => {
    const content = text.trim();
    if (!content) return;
    onSend?.({
      content,
      privacy,
      attachments: {
        fileName,
        imageName,
        imageUrl: imagePreview,
        location,
      },
    });
    setText("");
    setFileName("");
    setImageName("");
    setImagePreview("");
    setLocation("");
  };

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
          className="flex-1 bg-transparent outline-none text-black dark:text-white placeholder-gray-200 text-[15px]"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />

        <FiSmile className="text-gray-200 dark:text-gray-300" size={20} />
      </div>

      {/* ACTION BAR */}
      <div className="flex items-start justify-between mt-4 text-[15px] gap-4">

        {/* ACTIONS LEFT */}
        <div className="flex-1 flex flex-col gap-3 text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-6">
            <button
              className="flex items-center gap-2 hover:opacity-70 transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setFileName(file ? file.name : "");
                }}
              />
              <FiFile size={18} />
              <span>File</span>
            </button>

            <button
              className="flex items-center gap-2 hover:opacity-70 transition"
              onClick={() => imageInputRef.current?.click()}
            >
              <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageName(file.name);
                  const url = URL.createObjectURL(file);
                  setImagePreview(url);
                } else {
                  setImageName("");
                  setImagePreview("");
                }
              }}
            />
              <FiImage size={18} />
              <span>Image</span>
            </button>

            <button
              className="flex items-center gap-2 hover:opacity-70 transition"
              onClick={() => {
                const value = window.prompt("Enter location");
                if (value !== null) setLocation(value.trim());
              }}
            >
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

          <div className="flex flex-wrap gap-2 text-sm">
            {imageName && (
              <span className="px-2 py-1 rounded-full bg-gray-200 dark:bg-neutral-700">
                Image: {imageName}
              </span>
            )}
            {fileName && (
              <span className="px-2 py-1 rounded-full bg-gray-200 dark:bg-neutral-700">
                File: {fileName}
              </span>
            )}
            {location && (
              <span className="px-2 py-1 rounded-full bg-gray-200 dark:bg-neutral-700">
                Location: {location}
              </span>
            )}
            <span className="px-2 py-1 rounded-full bg-gray-200 dark:bg-neutral-700">
              Privacy: {privacy}
            </span>
          </div>
        </div>

        {/* SEND BUTTON */}
        <button
          onClick={handleSubmit}
          className="
            px-6 py-2 rounded-full 
            bg-[#7d7573] dark:bg-[#7d7573] 
            text-white 
            font-semibold 
            shadow-md hover:opacity-80 
            transition
          "
        >
          Send
        </button>
      </div>
    </div>
  );
}
