import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

export default function Create({ darkMode }) {
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDraft, setIsDraft] = useState(false);

  const sidebarColor = darkMode ? "#404040" : "#7d7573";

  const suggestedTags = ["LoveYourSkin", "GlowGoals", "BeautyEssentials"];

  const handleAddTag = (tag) => {
    if (!hashtags.includes(tag)) setHashtags([...hashtags, tag]);
  };

  const handleRemoveTag = (tag) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((f) => URL.createObjectURL(f));
    setUploadedImages([...uploadedImages, ...previews]);
  };

  return (
    <div
      className={`
        w-full min-h-screen flex px-10 py-8 gap-10 
        ${darkMode ? "bg-neutral-900 text-white" : "bg-[#f5f4f2] text-black"}
      `}
    >
      {/* LEFT – FORM */}
      <div className="flex-1 bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-lg">

        <h1 className="text-2xl font-semibold mb-6">New Post</h1>

        {/* PROFILE BAR */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/60?img=14"
              className="w-12 h-12 rounded-full"
            />
            <span className="font-semibold">@yourusername</span>
          </div>

          {/* 🔥 Switch Account button chỉnh lại màu giống sidebar */}
          <button
            className="px-4 py-1 rounded-full text-white transition"
            style={{ backgroundColor: sidebarColor }}
          >
            Switch Account
          </button>
        </div>

        {/* CAPTION */}
        <div className="mb-6">
          <label className="font-semibold text-sm">CAPTION</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full mt-2 p-4 h-32 rounded-lg bg-gray-100 dark:bg-neutral-700 outline-none"
            placeholder="Write your caption..."
          ></textarea>

          <div className="flex justify-between mt-2">
            <span className="text-sm opacity-70">{caption.length}/2200</span>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isDraft}
                onChange={() => setIsDraft(!isDraft)}
              />
              <span className="text-sm opacity-80">This is a draft</span>
            </label>
          </div>
        </div>

        {/* TAGS */}
        <div className="mb-6">
          <label className="font-semibold text-sm">TAGS</label>

          <div className="mt-2 bg-gray-100 dark:bg-neutral-700 p-3 rounded-xl">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && tagInput.trim() !== "") {
                  handleAddTag(tagInput.trim());
                  setTagInput("");
                }
              }}
              placeholder="Add your Instagram tags"
              className="bg-transparent outline-none w-full"
            />
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {hashtags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 rounded-full flex items-center gap-2 text-sm"
              >
                #{tag}
                <FiX className="cursor-pointer" onClick={() => handleRemoveTag(tag)} />
              </span>
            ))}
          </div>

          <div className="mt-4 text-sm opacity-70">Try:</div>
          <div className="flex gap-2 mt-1">
            {suggestedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleAddTag(tag)}
                className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* ADD IMAGES */}
        <div className="mb-8">
          <label className="font-semibold text-sm">ADD IMAGES</label>

          <div className="flex gap-4 mt-3">
            {uploadedImages.map((src, index) => (
              <div key={index} className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200">
                <img src={src} className="w-full h-full object-cover" />
              </div>
            ))}

            <label className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer">
              <FiPlus size={24} />
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        {/* 🔥 Schedule button – thu nhỏ + đổi màu */}
        <button
          className="w-[160px] mx-auto block py-3 rounded-full text-white text-lg font-medium shadow-md hover:opacity-90 transition"
          style={{ backgroundColor: sidebarColor }}
        >
          Post
        </button>
      </div>

      {/* RIGHT – PREVIEW */}
      <div className="w-[420px] bg-white dark:bg-neutral-800 rounded-xl shadow-xl p-6 text-center">
        
        {/* 🔥 PREVIEW TITLE CANH GIỮA */}
        <h2 className="text-xl font-semibold mb-1">Preview</h2>

        <p className="text-sm opacity-70 mb-5">
          Preview shows how your content will look when published.
        </p>

        <div className="border rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 p-4">
            <img src="https://i.pravatar.cc/50?img=14" className="w-10 h-10 rounded-full" />
            <span className="font-semibold text-sm">@yourusername</span>
          </div>

          <div className="w-full h-[350px] bg-gray-200 flex items-center justify-center">
            {uploadedImages[0] ? (
              <img src={uploadedImages[0]} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500 text-sm">No image uploaded</span>
            )}
          </div>

          <div className="p-4 text-sm text-left">
            <p className="font-semibold">@yourusername</p>
            <p>{caption || "Your caption will appear here..."}</p>
            {hashtags.length > 0 && (
              <div className="mt-2 text-blue-500">{hashtags.map((t) => `#${t} `)}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
