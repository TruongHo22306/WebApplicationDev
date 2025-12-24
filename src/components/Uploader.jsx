import { useRef, useState } from "react";
import {
  FiImage,
  FiMapPin,
  FiSmile,
  FiX,
} from "react-icons/fi";

export default function Uploader({ onSend }) {
  const [privacy] = useState("Public");
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState("");
  const [layout, setLayout] = useState("collage");
  const imageInputRef = useRef(null);

  const handleSubmit = () => {
    const content = text.trim();
    if (!content && images.length === 0) return;
    onSend?.({
      content,
      privacy,
      attachments: {
        images,
        layout,
        location,
      },
    });
    setText("");
    setImages([]);
    setLocation("");
    setLayout("collage");
  };

  const layoutOptions = [
    { value: "single", label: "Single" },
    { value: "collage", label: "Collage" },
    { value: "grid", label: "Grid" },
  ];

  return (
    <div className="rounded-2xl p-4 w-full transition">

      {/* INPUT BAR */}
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <img
            src="src/assets/anoava.jpg"
            className="w-10 h-10 rounded-full object-cover shadow-sm"
          />
        </div>

        <div className="flex-1">
          <div
            className="
              flex items-center justify-between w-full 
              bg-white dark:bg-neutral-900 
              rounded-3xl shadow-inner px-4 py-2
            "
          >
            <input
              type="text"
              placeholder="Share something..."
              className="
                w-full bg-transparent outline-none 
                placeholder:text-gray-400 text-sm
                text-neutral-800 dark:text-white dark:placeholder-neutral-500
              "
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />

            <button
              onClick={handleSubmit}
              className="ml-3 text-sm font-semibold px-3 py-1 rounded-full bg-[#6B5C51] text-white hover:opacity-90 transition"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* ACTION BAR removed as requested */}
    </div>
  );
}
