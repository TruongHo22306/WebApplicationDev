import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiX,
  FiChevronUp,
  FiChevronDown,
  FiImage,
  FiGrid,
  FiMapPin,
  FiCheck,
  FiAlertCircle,
  FiSmile,
} from "react-icons/fi";
import { MdEmojiEmotions } from "react-icons/md";

const DRAFT_KEY = "create_post_draft_v1";
const POSTS_KEY = "home_posts_v1";

export default function Create({ darkMode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const [uploadedImages, setUploadedImages] = useState([]); // [{ id, src, fileName }]
  const [imageEdits, setImageEdits] = useState([]); // [{ scale, offsetX, offsetY, alt }]
  const [activeIndex, setActiveIndex] = useState(-1);

  const [isDraft, setIsDraft] = useState(false);
  const [audience, setAudience] = useState("Public"); // Public | Close Friends
  const [location, setLocation] = useState("");

  const [showGrid, setShowGrid] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const captionRef = useRef(null);

  const sidebarColor = darkMode ? "#404040" : "#7d7573";

  const defaultEditState = useMemo(
    () => ({ scale: 1, offsetX: 0, offsetY: 0, alt: "" }),
    []
  );

  const suggestedTags = ["LoveYourSkin", "GlowGoals", "BeautyEssentials"];

  const gridOverlayStyle = useMemo(
    () => ({
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.22) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.22) 1px, transparent 1px)
      `,
      backgroundSize: "50px 50px",
      mixBlendMode: "screen",
    }),
    []
  );

  const transformFor = (edit) =>
    `translate(${edit.offsetX}%, ${edit.offsetY}%) scale(${edit.scale})`;

  const MAX_TAGS = 30;
  const MAX_CAPTION = 2200;

  /* ---------------- DRAFT: LOAD ---------------- */

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);

      setCaption(d.caption ?? "");
      setHashtags(Array.isArray(d.hashtags) ? d.hashtags : []);
      setIsDraft(Boolean(d.isDraft));
      setAudience(d.audience ?? "Public");
      setLocation(d.location ?? "");
      setShowGrid(Boolean(d.showGrid));

      // Images cannot be restored from blob URLs reliably after refresh
      // Keep UI stable by not restoring uploadedImages
    } catch {
      // ignore
    }
  }, []);

  /* ---------------- DRAFT: AUTOSAVE ---------------- */

  useEffect(() => {
    const payload = {
      caption,
      hashtags,
      isDraft,
      audience,
      location,
      showGrid,
      savedAt: Date.now(),
    };
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }
  }, [caption, hashtags, isDraft, audience, location, showGrid]);

  /* ---------------- TAGS ---------------- */

  const tagIsDuplicate = (tag) => hashtags.includes(tag);

  const handleAddTag = (tag) => {
    const clean = (tag || "").trim().replace(/^#/, "");
    if (!clean) return;
    if (hashtags.length >= MAX_TAGS) return;
    if (tagIsDuplicate(clean)) return;
    setHashtags((prev) => [...prev, clean]);
  };

  const handleRemoveTag = (tag) => {
    setHashtags((prev) => prev.filter((t) => t !== tag));
  };

  /* ---------------- IMAGE UPLOAD ---------------- */

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const mapped = files.map((f) => ({
      id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
      src: URL.createObjectURL(f),
      fileName: f.name,
    }));

    setUploadedImages((prev) => {
      const next = [...prev, ...mapped];
      setActiveIndex(next.length - 1);
      return next;
    });

    setImageEdits((prev) => [
      ...prev,
      ...mapped.map(() => ({ ...defaultEditState })),
    ]);

    // clear input so same file can be reselected
    e.target.value = "";
  };

  const currentIndex = uploadedImages.length
    ? Math.min(activeIndex === -1 ? 0 : activeIndex, uploadedImages.length - 1)
    : -1;

  const activeImage = currentIndex >= 0 ? uploadedImages[currentIndex] : null;
  const activeEdit =
    currentIndex >= 0 ? imageEdits[currentIndex] || defaultEditState : defaultEditState;

  const updateEdit = (key, value) => {
    if (currentIndex < 0) return;
    setImageEdits((prev) => {
      const next = [...prev];
      next[currentIndex] = { ...(prev[currentIndex] || defaultEditState), [key]: value };
      return next;
    });
  };

  const moveImage = (from, direction) => {
    const to = from + direction;
    if (from < 0 || to < 0) return;
    if (from >= uploadedImages.length || to >= uploadedImages.length) return;

    setUploadedImages((prev) => {
      const next = [...prev];
      const tmp = next[from];
      next[from] = next[to];
      next[to] = tmp;
      return next;
    });

    setImageEdits((prev) => {
      const next = [...prev];
      const tmp = next[from];
      next[from] = next[to];
      next[to] = tmp;
      return next;
    });

    setActiveIndex(to);
  };

  const removeImage = (index) => {
    if (index < 0 || index >= uploadedImages.length) return;

    // revoke blob url
    try {
      URL.revokeObjectURL(uploadedImages[index].src);
    } catch {
      // ignore
    }

    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    setImageEdits((prev) => prev.filter((_, i) => i !== index));

    setActiveIndex((prev) => {
      const nextLen = uploadedImages.length - 1;
      if (nextLen <= 0) return -1;
      const next = Math.min(index, nextLen - 1);
      return Math.max(0, next);
    });
  };

  /* ---------------- EMOJI ---------------- */

  const emojiList = ["😀","😅","😍","😂","🥳","👍","👏","❤️","🔥","🎉","🤝","😊"];

  const insertEmoji = (emoji) => {
    const el = captionRef.current;
    if (!el) {
      setCaption((p) => p + emoji);
      return;
    }
    const start = el.selectionStart ?? caption.length;
    const end = el.selectionEnd ?? caption.length;

    const next = caption.slice(0, start) + emoji + caption.slice(end);
    setCaption(next);

    // restore cursor
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + emoji.length;
      el.setSelectionRange(pos, pos);
    });
  };

  /* ---------------- VALIDATION HELPERS ---------------- */

  const captionTooLong = caption.length > MAX_CAPTION;
  const nearLimit = caption.length >= MAX_CAPTION - 100 && !captionTooLong;
  const tagsFull = hashtags.length >= MAX_TAGS;

  const hashtagsText = hashtags.length ? hashtags.map((t) => `#${t}`).join(" ") : "";

  /* ---------------- UI ---------------- */

  return (
    <div className={darkMode ? "min-h-screen w-full bg-neutral-900 text-white" : "min-h-screen w-full bg-[#d9ccbe] text-black"}>
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[minmax(0,1.05fr)_320px] gap-6 px-4 py-6">
        {/* LEFT FORM */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-lg">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">New Post</h1>
            <p className="text-sm opacity-70 mt-1">
              Create your post 
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isDraft}
                onChange={() => setIsDraft((v) => !v)}
              />
              <span className="text-sm opacity-80">Draft</span>
            </label>
          </div>
        </div>

        {/* PROFILE BAR */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/60?img=14"
              className="w-12 h-12 rounded-full"
              alt="profile"
            />
            <div className="leading-tight">
              <span className="font-semibold block">@Username</span>
              <span className="text-xs opacity-70">Posting to {audience}</span>
            </div>
          </div>

          {/* Audience */}
          <div className="flex items-center gap-2">
            <span className="text-xs opacity-90">Audience</span>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="text-sm rounded-lg px-3 py-2 bg-gray-100 dark:bg-neutral-700 outline-none"
            >
              <option>Public</option>
              <option>Close Friends</option>
              <option>Private</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="font-semibold text-sm flex items-center gap-2">
            <FiMapPin /> LOCATION
          </label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Add location (optional)"
            className="w-full mt-2 px-4 py-3 rounded-lg bg-gray-100 dark:bg-neutral-700 outline-none"
          />
        </div>

        {/* CAPTION */}
        <div className="mb-6">
          <label className="font-semibold text-sm flex items-center justify-between">
            <span>CAPTION</span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowEmoji((v) => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-neutral-700 hover:opacity-90 transition"
                title="Emoji"
              >
                <FiSmile size={20} />
                <span className="text-xs opacity-80">Emoji</span>
              </button>
            </div>
          </label>

          {showEmoji && (
            <div className="mt-2 p-3 rounded-xl bg-gray-100 dark:bg-neutral-700 flex flex-wrap gap-2">
              {emojiList.map((emo) => (
                <button
                  key={emo}
                  type="button"
                  onClick={() => insertEmoji(emo)}
                  className="px-3 py-2 rounded-lg bg-white/70 dark:bg-neutral-800 hover:opacity-90 transition text-lg"
                  aria-label={`insert ${emo}`}
                >
                  {emo}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowEmoji(false)}
                className="ml-auto text-xs opacity-70 hover:opacity-100 transition"
              >
                Close
              </button>
            </div>
          )}

          <textarea
            ref={captionRef}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className={`w-full mt-2 p-4 h-32 rounded-lg bg-gray-100 dark:bg-neutral-700 outline-none ${
              captionTooLong ? "ring-2 ring-red-500" : ""
            }`}
            placeholder="Write your caption..."
          />

          <div className="flex justify-between mt-2 items-center">
            <div className="flex items-center gap-2">
              <span
                className={`text-sm ${
                  captionTooLong ? "text-red-500" : nearLimit ? "text-orange-500" : "opacity-70"
                }`}
              >
                {caption.length}/{MAX_CAPTION}
              </span>
              {captionTooLong && (
                <span className="text-xs text-red-500 flex items-center gap-1">
                  <FiAlertCircle /> Too long
                </span>
              )}
            </div>

            <span className="text-xs opacity-70">
              Tip: captions and tags update preview instantly.
            </span>
          </div>
        </div>

        {/* TAGS */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-sm">TAGS</label>
            <span className={`text-xs ${tagsFull ? "text-red-500" : "opacity-70"}`}>
              {hashtags.length}/{MAX_TAGS}
            </span>
          </div>

          <div className="mt-2 bg-gray-100 dark:bg-neutral-700 p-3 rounded-xl">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!tagInput.trim()) return;
                  handleAddTag(tagInput.trim());
                  setTagInput("");
                }
              }}
              placeholder={tagsFull ? "Tag limit reached" : "Add hashtags and press Enter"}
              disabled={tagsFull}
              className="bg-transparent outline-none w-full disabled:opacity-50"
            />
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {hashtags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 rounded-full flex items-center gap-2 text-sm"
              >
                #{tag}
                <FiX
                  className="cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                  title="Remove"
                />
              </span>
            ))}
          </div>

          <div className="mt-4 text-sm opacity-70">Try:</div>
          <div className="flex gap-2 mt-1 flex-wrap">
            {suggestedTags.map((tag) => {
              const disabled = tagsFull || tagIsDuplicate(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleAddTag(tag)}
                  disabled={disabled}
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    disabled
                      ? "bg-orange-100/60 text-orange-600/60 cursor-not-allowed"
                      : "bg-orange-100 text-orange-600 hover:opacity-90"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* ADD IMAGES */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-sm">ADD IMAGES</label>

            <button
              type="button"
              onClick={() => setShowGrid((v) => !v)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                showGrid
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-gray-100 dark:bg-neutral-700 hover:opacity-90"
              }`}
              title="Toggle grid overlay"
            >
              <FiGrid />
              <span className="text-xs">Grid</span>
            </button>
          </div>

          <div className="flex gap-4 mt-3 flex-wrap">
            {uploadedImages.map((img, index) => (
              <div key={img.id} className="relative">
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`w-24 h-24 rounded-lg overflow-hidden bg-gray-200 relative border transition ${
                    currentIndex === index
                      ? "ring-2 ring-blue-500 border-transparent"
                      : "border-transparent hover:opacity-90"
                  }`}
                  title={img.fileName}
                >
                  <img src={img.src} className="w-full h-full object-cover" alt="" />
                </button>

                {/* reorder controls */}
                <div className="absolute -top-2 -right-2 flex flex-col gap-1">
                  <button
                    type="button"
                    className="w-7 h-7 rounded-full bg-white dark:bg-neutral-800 shadow flex items-center justify-center hover:opacity-90"
                    onClick={() => moveImage(index, -1)}
                    disabled={index === 0}
                    title="Move up"
                  >
                    <FiChevronUp />
                  </button>
                  <button
                    type="button"
                    className="w-7 h-7 rounded-full bg-white dark:bg-neutral-800 shadow flex items-center justify-center hover:opacity-90"
                    onClick={() => moveImage(index, +1)}
                    disabled={index === uploadedImages.length - 1}
                    title="Move down"
                  >
                    <FiChevronDown />
                  </button>
                  <button
                    type="button"
                    className="w-7 h-7 rounded-full bg-white dark:bg-neutral-800 shadow flex items-center justify-center hover:opacity-90"
                    onClick={() => removeImage(index)}
                    title="Remove"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            ))}

            <label className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:opacity-90 transition">
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

          {uploadedImages.length > 0 && (
            <div className="mt-3 text-xs opacity-70 flex items-center gap-2">
              <FiImage />
              Carousel order is the thumbnail order. Use the arrows to reorder.
            </div>
          )}
        </div>

        {/* EDIT IMAGE + ALT TEXT */}
        {activeImage && (
          <div className="mb-10 grid grid-cols-3 gap-4 bg-gray-50 dark:bg-neutral-700/60 p-4 rounded-xl">
            <div className="col-span-3 font-semibold text-sm flex items-center justify-between">
              <span>Edit image</span>
              <span className="text-xs opacity-70">
                {currentIndex + 1} of {uploadedImages.length}
              </span>
            </div>

            <label className="text-xs col-span-3 flex flex-col gap-2">
              <span>Zoom</span>
              <input
                type="range"
                min="0.6"
                max="2"
                step="0.05"
                value={activeEdit.scale}
                onChange={(e) => updateEdit("scale", Number(e.target.value))}
              />
            </label>

            <label className="text-xs flex flex-col gap-2">
              <span>Slide (X)</span>
              <input
                type="range"
                min="-30"
                max="30"
                step="1"
                value={activeEdit.offsetX}
                onChange={(e) => updateEdit("offsetX", Number(e.target.value))}
              />
            </label>

            <label className="text-xs flex flex-col gap-2">
              <span>Slide (Y)</span>
              <input
                type="range"
                min="-30"
                max="30"
                step="1"
                value={activeEdit.offsetY}
                onChange={(e) => updateEdit("offsetY", Number(e.target.value))}
              />
            </label>

            <div className="text-xs flex flex-col gap-2">
              <span>Grid</span>
              <button
                type="button"
                onClick={() => setShowGrid((v) => !v)}
                className={`px-3 py-2 rounded-lg transition ${
                  showGrid
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-gray-200 dark:bg-neutral-800 hover:opacity-90"
                }`}
              >
                {showGrid ? "On" : "Off"}
              </button>
            </div>

            <label className="text-xs col-span-3 flex flex-col gap-2">
              <span>Alt text (accessibility)</span>
              <input
                value={activeEdit.alt || ""}
                onChange={(e) => updateEdit("alt", e.target.value)}
                placeholder="Describe the image for accessibility (optional)"
                className="px-4 py-3 rounded-lg bg-gray-100 dark:bg-neutral-800 outline-none"
              />
            </label>
          </div>
        )}

        POST BUTTON
        <button
          type="button"
          className="w-[200px] mx-auto block py-3 rounded-full text-white text-lg font-medium shadow-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: sidebarColor }}
          disabled={captionTooLong || loading}
          onClick={async () => {
            const token = localStorage.getItem("token"); // 1. Retrieve the real token
            
            if (!token) {
              alert("You must be logged in to post.");
              return navigate("/login");
            }

            const baseContent = caption.trim() || "New post";
            const tagLine = hashtags.length
              ? `\n\n${hashtags.map((tag) => `#${tag}`).join(" ")}`
              : "";
            
            setLoading(true);

            try {
              // 2. Call your protected backend route
              const response = await fetch("http://localhost:5000/api/posts", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}` // 3. Include the token in headers
                },
                body: JSON.stringify({
                  content: baseContent + tagLine,
                  image: uploadedImages.length > 0 ? uploadedImages[0].src : "", // Sends the first image URL
                  location: location.trim()
                }),
              });

              if (response.ok) {
                // Success: Clear the draft and go to feed
                localStorage.removeItem(DRAFT_KEY);
                navigate("/");
              } else {
                const errorData = await response.json();
                alert(errorData.msg || "Failed to save post to server");
              }
            } catch (err) {
              console.error("Post Error:", err);
              alert("Connection error. Is the backend running?");
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

      {/* RIGHT PREVIEW */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-5 text-center w-full">
        <h2 className="text-xl font-semibold mb-1">Preview</h2>
        <p className="text-sm opacity-70 mb-5">
          Preview shows how your content will look when published.
        </p>

        <div className="border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between gap-3 p-4">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/50?img=14"
                className="w-10 h-10 rounded-full"
                alt="profile"
              />
              <div className="text-left leading-tight">
                <span className="font-semibold text-sm block">@Username</span>
                <span className="text-xs opacity-70">
                  {audience}
                  {location ? ` • ${location}` : ""}
                </span>
              </div>
            </div>

            {uploadedImages.length > 1 && (
              <div className="text-xs px-2 py-1 rounded-full bg-black/70 text-white">
                {currentIndex + 1}/{uploadedImages.length}
              </div>
            )}
          </div>

          <div className="relative w-full h-[350px] bg-gray-200 flex items-center justify-center overflow-hidden">
            {showGrid && (
              <div
                className="absolute inset-0 opacity-70 pointer-events-none"
                style={gridOverlayStyle}
              />
            )}

            {activeImage ? (
              <img
                src={activeImage.src}
                alt={activeEdit.alt || "uploaded"}
                className="w-full h-full object-cover transition-transform duration-200"
                style={{ transform: transformFor(activeEdit) }}
              />
            ) : (
              <span className="text-gray-500 text-sm">No image uploaded</span>
            )}

            {/* Dots indicator like Instagram */}
            {uploadedImages.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {uploadedImages.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === currentIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="p-4 text-sm text-left">
            <p className="font-semibold">@yourusername</p>
            <p className={captionTooLong ? "text-red-500" : ""}>
              {caption || "Your caption will appear here..."}
            </p>

            {hashtags.length > 0 && (
              <div className="mt-2 text-blue-500 whitespace-pre-wrap">
                {hashtagsText}
              </div>
            )}

            {activeImage && activeEdit.alt?.trim() && (
              <div className="mt-3 text-xs opacity-70 flex items-center gap-2">
                <FiCheck /> Alt text set for this image
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-xs opacity-70 text-left">
          Note: uploaded images are not restored after refresh because browser blob URLs expire.
        </div>
      </div>
    </div>
  </div>
  );
}
