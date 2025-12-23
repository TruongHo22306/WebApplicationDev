import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiX,
  FiCheck,
  FiImage,
  FiType,
  FiSmile,
  FiEdit3,
  FiTrash2,
  FiRotateCcw,
  FiRotateCw,
  FiMinus,
  FiPlus,
} from "react-icons/fi";

const BACKGROUND_PRESETS = [
  {
    id: "bg-1",
    type: "gradient",
    label: "Sunset",
    value: "linear-gradient(135deg, #ff8a00 0%, #e52e71 50%, #5f2eea 100%)",
  },
  {
    id: "bg-2",
    type: "gradient",
    label: "Dawn",
    value: "linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)",
  },
  {
    id: "bg-3",
    type: "gradient",
    label: "Noir",
    value: "linear-gradient(135deg, #111827 0%, #1f2937 60%, #4b5563 100%)",
  },
  {
    id: "bg-4",
    type: "image",
    label: "City",
    value:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "bg-5",
    type: "image",
    label: "Studio",
    value:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "bg-6",
    type: "image",
    label: "Sketch",
    value:
      "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=900&q=80",
  },
];

const DRAFT_KEY = "create_story_draft_v1";
const STORIES_KEY = "stories_feed_v1";

/**
 * StoryCreation.jsx
 * Instagram style Story Creation page (9:16 canvas)
 * Features:
 * - Upload image
 * - Text tool (add/move/scale/rotate/color)
 * - Sticker emoji (add/move/scale/rotate)
 * - Draw tool (simple pen)
 * - Undo/redo (basic for draw + objects)
 * - Preview mode (hides guides and tool panels)
 * - Publish buttons: Your Story, Close Friends, Send To
 */

export default function StoryCreation({ darkMode = true }) {
  const navigate = useNavigate();
  const [media, setMedia] = useState(null); // { src, name }
  const [mode, setMode] = useState("move"); // move | text | sticker | draw
  const [preview, setPreview] = useState(false);

  // Objects on canvas: text and stickers
  const [objects, setObjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  // Drawing
  const [penColor, setPenColor] = useState("#ffffff");
  const [penSize, setPenSize] = useState(6);
  const [strokes, setStrokes] = useState([]); // [{ color, size, points:[{x,y}]}]
  const [redoStrokes, setRedoStrokes] = useState([]);

  // History for objects (simple)
  const [objHistory, setObjHistory] = useState([]);
  const [objRedo, setObjRedo] = useState([]);

  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const drawing = useRef(false);
  const editInputRef = useRef(null);

  const bg = darkMode ? "bg-neutral-950 text-white" : "bg-[#d9ccbe] text-[#1f1a14]";
  const panel = darkMode
    ? "bg-neutral-900/70 border-white/10"
    : "bg-[#f3ede5]/90 border-black/10";
  const soft = darkMode ? "bg-white/10 hover:bg-white/15" : "bg-black/5 hover:bg-black/10";
  const topSoft = darkMode ? soft : "bg-[#6b5c51] text-white hover:bg-[#5f5248]";
  const muted = darkMode ? "text-white/70" : "text-black/60";

  const emojiList = useMemo(() => ["\uD83D\uDE0A", "\uD83D\uDE02", "\uD83D\uDE0D", "\uD83D\uDE0E", "\uD83D\uDD25", "\uD83D\uDC4F", "\uD83D\uDC4D", "\u2764\uFE0F"], []);

  const textPresets = useMemo(
    () => [
      { id: "title", label: "Title", fontSize: 48, weight: 800 },
      { id: "subtitle", label: "Subtitle", fontSize: 34, weight: 700 },
      { id: "caption", label: "Caption", fontSize: 24, weight: 600 },
    ],
    []
  );

  const colorPresets = useMemo(
    () => ["#ffffff", "#000000", "#ff3b30", "#ffcc00", "#34c759", "#007aff", "#af52de"],
    []
  );

  const selected = objects.find((o) => o.id === selectedId) || null;

  useEffect(() => {
    drawToCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strokes, media]);

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved?.media) setMedia(saved.media);
      if (Array.isArray(saved?.objects)) setObjects(saved.objects);
      if (Array.isArray(saved?.strokes)) setStrokes(saved.strokes);
      setSelectedId(null);
      setEditingId(null);
      setEditingValue("");
      setMode("move");
      setPreview(false);
      setRedoStrokes([]);
      setObjHistory([]);
      setObjRedo([]);
    } catch {
      // ignore corrupted draft
    }
  }, []);

  useEffect(() => {
    try {
      if (!media && objects.length === 0 && strokes.length === 0) {
        localStorage.removeItem(DRAFT_KEY);
        return;
      }
      const payload = JSON.stringify({ media, objects, strokes });
      localStorage.setItem(DRAFT_KEY, payload);
    } catch {
      // ignore storage errors
    }
  }, [media, objects, strokes]);

  const pushObjHistory = (nextObjects) => {
    setObjHistory((h) => [...h, objects]);
    setObjRedo([]);
    setObjects(nextObjects);
  };

  const undoObjects = () => {
    setObjHistory((h) => {
      if (!h.length) return h;
      const prev = h[h.length - 1];
      setObjRedo((r) => [objects, ...r]);
      setObjects(prev);
      setSelectedId(null);
      return h.slice(0, -1);
    });
  };

  const redoObjects = () => {
    setObjRedo((r) => {
      if (!r.length) return r;
      const next = r[0];
      setObjHistory((h) => [...h, objects]);
      setObjects(next);
      setSelectedId(null);
      return r.slice(1);
    });
  };

  const undoDraw = () => {
    setStrokes((s) => {
      if (!s.length) return s;
      const last = s[s.length - 1];
      setRedoStrokes((r) => [last, ...r]);
      return s.slice(0, -1);
    });
  };

  const redoDraw = () => {
    setRedoStrokes((r) => {
      if (!r.length) return r;
      const first = r[0];
      setStrokes((s) => [...s, first]);
      return r.slice(1);
    });
  };

  const resetCanvasState = () => {
    setObjects([]);
    setSelectedId(null);
    setStrokes([]);
    setRedoStrokes([]);
    setObjHistory([]);
    setObjRedo([]);
    setMode("move");
    setPreview(false);
  };

  const onUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const src = URL.createObjectURL(file);
    resetCanvasState();
    setMedia({ src, name: file.name, type: "image" });

    e.target.value = "";
  };

  const applyBackground = (preset) => {
    const nextMedia =
      preset.type === "gradient"
        ? { type: "gradient", gradient: preset.value, name: preset.label }
        : { type: "image", src: preset.value, name: preset.label };
    resetCanvasState();
    setMedia(nextMedia);
  };

  const addText = () => {
    const id = `t_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const next = [
      ...objects,
      {
        id,
        type: "text",
        text: "Type something",
        x: 50,
        y: 25,
        scale: 1,
        rotation: 0,
        color: "#ffffff",
        fontSize: 36,
        weight: 700,
        align: "center",
      },
    ];
    pushObjHistory(next);
    setSelectedId(id);
    setMode("text");
  };

  const addTextWithStyle = (preset) => {
    const id = `t_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const next = [
      ...objects,
      {
        id,
        type: "text",
        text: preset.label,
        x: 50,
        y: 40,
        scale: 1,
        rotation: 0,
        color: "#ffffff",
        fontSize: preset.fontSize,
        weight: preset.weight,
        align: "center",
      },
    ];
    pushObjHistory(next);
    setSelectedId(id);
    setMode("text");
  };

  const addSticker = (emoji) => {
    const id = `s_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const next = [
      ...objects,
      {
        id,
        type: "sticker",
        emoji,
        x: 50,
        y: 55,
        scale: 1,
        rotation: 0,
      },
    ];
    pushObjHistory(next);
    setSelectedId(id);
    setMode("sticker");
  };

  const removeSelected = () => {
    if (!selectedId) return;
    const next = objects.filter((o) => o.id !== selectedId);
    pushObjHistory(next);
    setSelectedId(null);
  };

  const updateSelected = (patch) => {
    if (!selectedId) return;
    const next = objects.map((o) => (o.id === selectedId ? { ...o, ...patch } : o));
    setObjects(next);
  };

  const commitSelected = (patch) => {
    if (!selectedId) return;
    const next = objects.map((o) => (o.id === selectedId ? { ...o, ...patch } : o));
    pushObjHistory(next);
  };

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const stageToPercent = (clientX, clientY) => {
    const el = stageRef.current;
    if (!el) return { x: 50, y: 50 };
    const r = el.getBoundingClientRect();
    const px = ((clientX - r.left) / r.width) * 100;
    const py = ((clientY - r.top) / r.height) * 100;
    return { x: clamp(px, 0, 100), y: clamp(py, 0, 100) };
  };

  // Drag objects
  const dragRef = useRef({ dragging: false, id: null, start: null, orig: null, didDrag: false });

  const onObjectMouseDown = (e, id) => {
    if (preview) return;
    if (mode === "draw") return;
    if (editingId && editingId !== id) commitEditingText();

    e.stopPropagation();
    setSelectedId(id);

    const { x, y } = stageToPercent(e.clientX, e.clientY);
    const obj = objects.find((o) => o.id === id);
    if (!obj) return;

    dragRef.current = {
      dragging: true,
      id,
      start: { x, y },
      orig: { x: obj.x, y: obj.y },
      didDrag: false,
    };
  };

  const onStageMouseMove = (e) => {
    if (preview) return;

    // drag object
    if (dragRef.current.dragging && dragRef.current.id) {
      const id = dragRef.current.id;
      const { x, y } = stageToPercent(e.clientX, e.clientY);
      const dx = x - dragRef.current.start.x;
      const dy = y - dragRef.current.start.y;
      if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) {
        dragRef.current.didDrag = true;
      }
      const nx = clamp(dragRef.current.orig.x + dx, 0, 100);
      const ny = clamp(dragRef.current.orig.y + dy, 0, 100);
      updateSelected({ x: nx, y: ny });
    }

    // draw
    if (mode === "draw" && drawing.current) {
      const pos = getCanvasPoint(e);
      setStrokes((prev) => {
        if (!prev.length) return prev;
        const next = [...prev];
        const last = next[next.length - 1];
        last.points = [...last.points, pos];
        return next;
      });
    }
  };

  const onStageMouseUp = () => {
    if (preview) return;

    if (dragRef.current.dragging && dragRef.current.id) {
      // commit drag to history
      const id = dragRef.current.id;
      const obj = objects.find((o) => o.id === id);
      dragRef.current = { dragging: false, id: null, start: null, orig: null, didDrag: false };
      if (obj) {
        commitSelected({ x: obj.x, y: obj.y });
      }
    }

    if (mode === "draw" && drawing.current) {
      drawing.current = false;
      setRedoStrokes([]); // new stroke clears redo
    }
  };

  const onStageMouseDown = (e) => {
    if (preview) return;
    if (editingId) commitEditingText();

    // deselect when clicking empty
    if (mode !== "draw") {
      setSelectedId(null);
    }

    // draw start
    if (mode === "draw") {
      const pos = getCanvasPoint(e);
      drawing.current = true;
      setStrokes((prev) => [
        ...prev,
        { color: penColor, size: penSize, points: [pos] },
      ]);
    }
  };

  const getCanvasPoint = (e) => {
    const el = canvasRef.current;
    const stage = stageRef.current;
    if (!el || !stage) return { x: 0, y: 0 };

    const r = stage.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;

    const w = el.width;
    const h = el.height;

    const sx = w / r.width;
    const sy = h / r.height;

    return { x: cx * sx, y: cy * sy };
  };

  const drawToCanvas = () => {
    const cnv = canvasRef.current;
    const stage = stageRef.current;
    if (!cnv || !stage) return;
    const ctx = cnv.getContext("2d");
    if (!ctx) return;

    // match canvas size to stage box for crisp drawing
    const r = stage.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const targetW = Math.floor(r.width * dpr);
    const targetH = Math.floor(r.height * dpr);

    if (cnv.width !== targetW || cnv.height !== targetH) {
      cnv.width = targetW;
      cnv.height = targetH;
    }

    ctx.clearRect(0, 0, cnv.width, cnv.height);

    // Draw strokes
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (const s of strokes) {
      if (!s.points?.length) continue;
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.size * dpr;

      ctx.beginPath();
      const p0 = s.points[0];
      ctx.moveTo(p0.x * dpr, p0.y * dpr);
      for (let i = 1; i < s.points.length; i++) {
        const p = s.points[i];
        ctx.lineTo(p.x * dpr, p.y * dpr);
      }
      ctx.stroke();
    }

    ctx.restore();
  };

  // keep canvas in sync with stage resize
  useEffect(() => {
    const onResize = () => drawToCanvas();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strokes]);

  const publish = (where) => {
    const payload = {
      media: media?.name || null,
      objects,
      strokesCount: strokes.length,
      where,
    };

    const newStory = {
      id: `story_${Date.now()}`,
      cover: media?.type === "gradient" ? media.gradient : media?.src,
      coverType: media?.type === "gradient" ? "gradient" : "image",
      author: "You",
      avatar: "https://i.pravatar.cc/100?img=7",
      payload,
    };

    try {
      const raw = localStorage.getItem(STORIES_KEY);
      const list = raw ? JSON.parse(raw) : [];
      const next = [newStory, ...(Array.isArray(list) ? list : [])];
      localStorage.setItem(STORIES_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }

    navigate("/");
  };

  const handleClose = () => {
    try {
      const payload = JSON.stringify({ media, objects, strokes });
      localStorage.setItem(DRAFT_KEY, payload);
    } catch {
      // ignore storage errors
    }
    navigate("/");
  };

  const startEditingText = (obj) => {
    if (preview) return;
    if (mode === "draw") return;
    setSelectedId(obj.id);
    setMode("text");
    setEditingId(obj.id);
    setEditingValue(obj.text || "");
  };

  const commitEditingText = () => {
    if (!editingId) return;
    setEditingId(null);
    commitSelected({ text: editingValue });
  };

  const cancelEditingText = () => {
    setEditingId(null);
    setEditingValue("");
  };

  const onObjectClick = (obj) => {
    if (dragRef.current.didDrag) return;
    if (obj.type !== "text") return;
    if (editingId && editingId !== obj.id) commitEditingText();
    startEditingText(obj);
  };

  return (
    <div className={`min-h-screen w-full ${bg}`}>
      {/* Top bar */}
      <div
        className={`sticky top-0 z-20 border-b ${
          darkMode ? "border-white/10 bg-black/30" : "border-black/10 bg-transparent"
        } backdrop-blur`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={`p-3 rounded-full ${topSoft} transition`}
              title="Close"
              onClick={handleClose}
            >
              <FiX size={18} />
            </button>

            <div className="ml-2">
              <div className="text-base font-semibold">Create story</div>
              <div className={`text-sm ${muted}`}>
                {preview ? "Preview mode" : mode === "draw" ? "Draw mode" : "Edit mode"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className={`px-4 py-2.5 rounded-full text-sm cursor-pointer ${topSoft} transition flex items-center gap-2`}>
              <FiImage size={16} />
              <span className="hidden sm:inline text-sm">Upload</span>
              <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
            </label>

            <button
              type="button"
              className={`px-4 py-2.5 rounded-full text-sm ${topSoft} transition`}
              onClick={() => setPreview((v) => !v)}
              title="Toggle preview"
            >
              {preview ? "Edit" : "Preview"}
            </button>

            <div className="w-px h-7 bg-white/10 mx-1" />

            <button
              type="button"
              className={`p-3 rounded-full ${topSoft} transition`}
              title="Undo"
              onClick={() => {
                if (mode === "draw") undoDraw();
                else undoObjects();
              }}
            >
              <FiRotateCcw size={16} />
            </button>

            <button
              type="button"
              className={`p-3 rounded-full ${topSoft} transition`}
              title="Redo"
              onClick={() => {
                if (mode === "draw") redoDraw();
                else redoObjects();
              }}
            >
              <FiRotateCw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
        {/* Stage */}
        <div className="flex items-start justify-center">
          <div className="w-full max-w-[420px]">
            <div
              ref={stageRef}
              className={`relative rounded-3xl overflow-hidden border ${
                darkMode ? "border-white/10 bg-neutral-900" : "border-black/10 bg-[#f4efe8]"
              }`}
              style={{ aspectRatio: "9 / 16" }}
              onMouseDown={onStageMouseDown}
              onMouseMove={onStageMouseMove}
              onMouseUp={onStageMouseUp}
              onMouseLeave={onStageMouseUp}
            >
              {/* Media */}
              {media ? (
                media.type === "gradient" ? (
                  <div
                    className="absolute inset-0"
                    style={{ backgroundImage: media.gradient }}
                  />
                ) : (
                  <img
                    src={media.src}
                    alt="story background"
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                  />
                )
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${soft}`}>
                    <FiImage size={22} />
                  </div>
                  <div className="text-sm font-semibold">Upload a photo</div>
                  <div className={`text-xs ${muted}`}>Stories are vertical 9:16</div>
                </div>
              )}

              {/* Guide lines (rule of thirds) */}
              {!preview && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-1/3 top-0 bottom-0 w-[2px] bg-black/40" />
                  <div className="absolute left-2/3 top-0 bottom-0 w-[2px] bg-black/40" />
                  <div className="absolute top-1/3 left-0 right-0 h-[2px] bg-black/40" />
                  <div className="absolute top-2/3 left-0 right-0 h-[2px] bg-black/40" />
                </div>
              )}

              {/* Safe area hint */}
              {!preview && (
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className="absolute left-4 right-4 top-[12%] h-[2px] bg-black/40"
                  />
                  <div
                    className="absolute left-4 right-4 bottom-[12%] h-[2px] bg-black/40"
                  />
                  <div
                    className={`absolute top-[12%] right-4 text-[10px] ${
                      darkMode ? "text-white/70" : "text-black/60"
                    }`}
                  >
                    Safe area
                  </div>
                </div>
              )}

              {/* Draw canvas */}
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

              {/* Objects layer */}
              {objects.map((o) => (
                <StageObject
                  key={o.id}
                  obj={o}
                  selected={o.id === selectedId && !preview}
                  editing={o.id === editingId}
                  editingValue={editingValue}
                  editInputRef={editInputRef}
                  onChangeEditing={(value) => setEditingValue(value)}
                  onCommitEditing={commitEditingText}
                  onCancelEditing={cancelEditingText}
                  onClick={() => onObjectClick(o)}
                  darkMode={darkMode}
                  onMouseDown={(e) => onObjectMouseDown(e, o.id)}
                />
              ))}

              {/* Floating toolbar */}
              {!preview && (
                <div className="absolute top-3 left-3 right-3 flex justify-between pointer-events-none">
                  <div
                    className={`pointer-events-auto flex items-center gap-1 rounded-full px-2 py-1 border ${
                      darkMode ? "bg-black/50 border-white/10" : "bg-white/80 border-black/10"
                    }`}
                  >
                    <ToolbarButton
                      active={mode === "move"}
                      icon={<FiCheck />}
                      onClick={() => setMode("move")}
                      darkMode={darkMode}
                      title="Move"
                    />
                    <ToolbarButton
                      active={mode === "text"}
                      icon={<FiType />}
                      onClick={() => {
                        setMode("text");
                        if (!selected || selected?.type !== "text") addTextWithStyle(textPresets[0]);
                      }}
                      darkMode={darkMode}
                      title="Text"
                    />
                    <ToolbarButton
                      active={mode === "sticker"}
                      icon={<FiSmile />}
                      onClick={() => setMode("sticker")}
                      darkMode={darkMode}
                      title="Sticker"
                    />
                    <ToolbarButton
                      active={mode === "draw"}
                      icon={<FiEdit3 />}
                      onClick={() => setMode("draw")}
                      darkMode={darkMode}
                      title="Draw"
                    />
                  </div>

                  <div
                    className={`pointer-events-auto flex items-center gap-1 rounded-full px-2 py-1 border ${
                      darkMode ? "bg-black/50 border-white/10" : "bg-white/80 border-black/10"
                    }`}
                  >
                    <ToolbarButton
                      icon={<FiRotateCcw />}
                      onClick={() => {
                        if (mode === "draw") undoDraw();
                        else undoObjects();
                      }}
                      darkMode={darkMode}
                      title="Undo"
                    />
                    <ToolbarButton
                      icon={<FiRotateCw />}
                      onClick={() => {
                        if (mode === "draw") redoDraw();
                        else redoObjects();
                      }}
                      darkMode={darkMode}
                      title="Redo"
                    />
                  </div>
                </div>
              )}

              {/* Selected outline hint */}
              {!preview && selectedId && mode !== "draw" && (
                <div className="absolute left-3 top-3 text-xs px-2 py-1 rounded-full bg-black/50 text-white/90">
                  Drag to move
                </div>
              )}

              {/* Quick add text */}
              {!preview && media && objects.length === 0 && (
                <div className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none">
                  <button
                    type="button"
                    className={`pointer-events-auto px-4 py-2 rounded-full text-xs font-semibold border ${
                      darkMode ? "bg-black/60 border-white/20 text-white" : "bg-white/80 border-black/10"
                    }`}
                    onClick={() => addTextWithStyle(textPresets[0])}
                  >
                    Add text
                  </button>
                </div>
              )}
            </div>

            {/* Bottom publish buttons */}
            <div className="mt-4 grid grid-cols-1 gap-2">
              <button
                type="button"
                disabled={!media}
                onClick={() => publish("Send")}
                className={`w-full py-3 rounded-2xl text-sm font-semibold transition ${
                  !media
                    ? "opacity-40 cursor-not-allowed bg-white/10"
                    : "bg-[#6b5c51] text-white hover:bg-[#5f5248]"
                }`}
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className={`rounded-3xl border p-4 ${panel}`}>
          {!media && (
            <div className="mb-4">
              <div className="text-sm font-semibold">Backgrounds</div>
              <div className={`text-xs ${muted} mt-1`}>Start with a cover</div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {BACKGROUND_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={`h-20 rounded-2xl overflow-hidden border hover:opacity-90 transition ${
                      darkMode ? "border-white/10" : "border-black/10"
                    }`}
                    onClick={() => applyBackground(preset)}
                    title={preset.label}
                    style={{
                      backgroundImage:
                        preset.type === "gradient"
                          ? preset.value
                          : `url(${preset.value})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Tools</div>
            <div className={`text-xs ${muted}`}>{preview ? "Locked" : "Editable"}</div>
          </div>

          {/* Mode buttons */}
          <div className="mt-3 grid grid-cols-4 gap-2">
            <ToolButton
              active={mode === "move"}
              disabled={preview}
              icon={<FiCheck />}
              label="Move"
              darkMode={darkMode}
              onClick={() => setMode("move")}
            />
            <ToolButton
              active={mode === "text"}
              disabled={preview}
              icon={<FiType />}
              label="Text"
              darkMode={darkMode}
              onClick={() => {
                setMode("text");
                if (!selected || selected?.type !== "text") addText();
              }}
            />
            <ToolButton
              active={mode === "sticker"}
              disabled={preview}
              icon={<FiSmile />}
              label="Sticker"
              darkMode={darkMode}
              onClick={() => setMode("sticker")}
            />
            <ToolButton
              active={mode === "draw"}
              disabled={preview}
              icon={<FiEdit3 />}
              label="Draw"
              darkMode={darkMode}
              onClick={() => setMode("draw")}
            />
          </div>

          {/* Sticker picker */}
          {!preview && mode === "sticker" && (
            <div className="mt-4">
              <div className={`text-xs ${muted} mb-2`}>Tap to add</div>
              <div className="flex flex-wrap gap-2">
                {emojiList.map((emo) => (
                  <button
                    key={emo}
                    type="button"
                    className={`w-11 h-11 rounded-2xl ${soft} transition text-xl flex items-center justify-center`}
                    onClick={() => addSticker(emo)}
                    title={`Add ${emo}`}
                  >
                    {emo}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Draw controls */}
          {!preview && mode === "draw" && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Pen</div>
                <div className={`text-xs ${muted}`}>{strokes.length} strokes</div>
              </div>

              <div>
                <div className={`text-xs ${muted} mb-2`}>Color</div>
                <div className="flex flex-wrap gap-2">
                  {colorPresets.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setPenColor(c)}
                      className={`w-9 h-9 rounded-full border ${
                        penColor === c ? "border-white" : "border-white/20"
                      }`}
                      style={{ background: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className={`text-xs ${muted} mb-2`}>Size</div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className={`p-2 rounded-xl ${soft} transition`}
                    onClick={() => setPenSize((v) => clamp(v - 1, 2, 18))}
                  >
                    <FiMinus />
                  </button>
                  <input
                    type="range"
                    min="2"
                    max="18"
                    value={penSize}
                    onChange={(e) => setPenSize(Number(e.target.value))}
                    className="flex-1"
                  />
                  <button
                    type="button"
                    className={`p-2 rounded-xl ${soft} transition`}
                    onClick={() => setPenSize((v) => clamp(v + 1, 2, 18))}
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              <button
                type="button"
                className={`w-full py-3 rounded-2xl ${soft} transition flex items-center justify-center gap-2`}
                onClick={() => {
                  setStrokes([]);
                  setRedoStrokes([]);
                }}
              >
                <FiTrash2 />
                Clear drawings
              </button>
            </div>
          )}

          {/* Selected object controls */}
          {!preview && selected && mode !== "draw" && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">
                  {selected.type === "text" ? "Text" : "Sticker"} settings
                </div>
                <button
                  type="button"
                  className={`p-2 rounded-xl ${soft} transition`}
                  onClick={removeSelected}
                  title="Delete selected"
                >
                  <FiTrash2 />
                </button>
              </div>

              {/* Scale */}
              <div>
                <div className={`text-xs ${muted} mb-2`}>Scale</div>
                <input
                  type="range"
                  min="0.5"
                  max="2.2"
                  step="0.05"
                  value={selected.scale}
                  onChange={(e) => updateSelected({ scale: Number(e.target.value) })}
                  onMouseUp={(e) => commitSelected({ scale: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              {/* Rotation */}
              <div>
                <div className={`text-xs ${muted} mb-2`}>Rotation</div>
                <input
                  type="range"
                  min="-25"
                  max="25"
                  step="1"
                  value={selected.rotation}
                  onChange={(e) => updateSelected({ rotation: Number(e.target.value) })}
                  onMouseUp={(e) => commitSelected({ rotation: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              {/* Text specific */}
              {selected.type === "text" && (
                <>
                  <div>
                    <div className={`text-xs ${muted} mb-2`}>Styles</div>
                    <div className="grid grid-cols-3 gap-2">
                      {textPresets.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          className={`py-2 rounded-xl ${soft} transition text-xs font-semibold`}
                          onClick={() =>
                            commitSelected({
                              fontSize: preset.fontSize,
                              weight: preset.weight,
                            })
                          }
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className={`text-xs ${muted} mb-2`}>Content</div>
                    <input
                      value={selected.text}
                      onChange={(e) => updateSelected({ text: e.target.value })}
                      onBlur={(e) => commitSelected({ text: e.target.value })}
                      className={`w-full px-4 py-3 rounded-2xl outline-none ${
                        darkMode ? "bg-white/10" : "bg-black/5"
                      }`}
                      placeholder="Type..."
                    />
                  </div>

                  <div>
                    <div className={`text-xs ${muted} mb-2`}>Color</div>
                    <div className="flex flex-wrap gap-2">
                      {colorPresets.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => commitSelected({ color: c })}
                          className={`w-9 h-9 rounded-full border ${
                            selected.color === c ? "border-white" : "border-white/20"
                          }`}
                          style={{ background: c }}
                          title={c}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className={`text-xs ${muted} mb-2`}>Font size</div>
                    <input
                      type="range"
                      min="18"
                      max="64"
                      step="1"
                      value={selected.fontSize}
                      onChange={(e) => updateSelected({ fontSize: Number(e.target.value) })}
                      onMouseUp={(e) => commitSelected({ fontSize: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* Empty state */}
          {!preview && !selected && mode !== "draw" && (
            <div className="mt-4">
              <div className={`text-sm font-semibold`}>Quick actions</div>
              <div className={`text-xs ${muted} mt-1`}>
                Add text or stickers, then drag to position.
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={!media}
                  onClick={() => addTextWithStyle(textPresets[0])}
                  className={`py-3 rounded-2xl ${soft} transition flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  <FiType />
                  Add text
                </button>
                <button
                  type="button"
                  disabled={!media}
                  onClick={() => addSticker("\uD83D\uDE0A")}
                  className={`py-3 rounded-2xl ${soft} transition flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  <FiSmile />
                  Add sticker
                </button>
              </div>

            </div>
          )}

          {/* Tips */}
          <div className={`mt-6 text-xs ${muted} leading-relaxed`}>
            Tips:
            <div className="mt-1">- Upload a photo to start.</div>
            <div>- Use Preview to see final output.</div>
            <div>- In Draw mode, drag is disabled to avoid accidents.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Helpers ---------------- */

function ToolButton({ active, disabled, icon, label, onClick, darkMode }) {
  const base = darkMode
    ? "bg-white/10 border-white/10 text-white"
    : "bg-white/70 border-black/10 text-[#3a312a]";
  const hover = darkMode ? "hover:opacity-95" : "hover:bg-white";
  const activeStyle = darkMode
    ? "bg-white text-black border-white"
    : "bg-[#6b5c51] text-white border-[#6b5c51]";
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-2xl px-3 py-3 text-xs font-semibold transition flex flex-col items-center justify-center gap-1 border
        ${disabled ? "opacity-40 cursor-not-allowed" : hover}
        ${active ? activeStyle : base}
      `}
    >
      <div className="text-base">{icon}</div>
      <div>{label}</div>
    </button>
  );
}

function ToolbarButton({ active, icon, onClick, title, darkMode }) {
  const base = darkMode
    ? "text-white bg-white/10 hover:bg-white/20"
    : "text-black bg-black/5 hover:bg-black/10";
  const activeStyle = darkMode ? "bg-white text-black" : "bg-black text-white";
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`h-8 w-8 rounded-full flex items-center justify-center text-xs transition ${
        active ? activeStyle : base
      }`}
    >
      {icon}
    </button>
  );
}

function StageObject({
  obj,
  selected,
  editing,
  editingValue,
  editInputRef,
  onChangeEditing,
  onCommitEditing,
  onCancelEditing,
  onClick,
  onMouseDown,
  darkMode,
}) {
  const baseStyle = {
    left: `${obj.x}%`,
    top: `${obj.y}%`,
    transform: `translate(-50%, -50%) scale(${obj.scale}) rotate(${obj.rotation}deg)`,
  };

  if (obj.type === "text") {
    return (
      <div
        onMouseDown={editing ? undefined : onMouseDown}
        onClick={onClick}
        className={`absolute select-none cursor-grab active:cursor-grabbing px-2 py-1 rounded-xl ${
          selected ? "outline outline-2 outline-white/80 bg-black/20" : "bg-black/0"
        }`}
        style={baseStyle}
      >
        {editing ? (
          <textarea
            ref={editInputRef}
            value={editingValue}
            onChange={(e) => onChangeEditing(e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onBlur={onCommitEditing}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onCommitEditing();
              } else if (e.key === "Escape") {
                e.preventDefault();
                onCancelEditing();
              }
            }}
            className={`min-w-[140px] max-w-[240px] rounded-lg px-2 py-1 text-center outline-none ${
              darkMode ? "bg-black/40 text-white" : "bg-white/90 text-black"
            }`}
            style={{
              color: obj.color,
              fontSize: obj.fontSize,
              fontWeight: obj.weight,
              textAlign: obj.align,
              lineHeight: 1.1,
            }}
            rows={2}
          />
        ) : (
          <div
            className="whitespace-pre-wrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]"
            style={{
              color: obj.color,
              fontSize: obj.fontSize,
              fontWeight: obj.weight,
              textAlign: obj.align,
              lineHeight: 1.1,
            }}
          >
            {obj.text}
          </div>
        )}
      </div>
    );
  }

  // sticker
  return (
    <div
      onMouseDown={onMouseDown}
      className={`absolute select-none cursor-grab active:cursor-grabbing px-3 py-2 rounded-2xl ${
        selected ? "outline outline-2 outline-white/80 bg-black/20" : "bg-black/0"
      }`}
      style={baseStyle}
    >
      <div className="text-5xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
        {obj.emoji}
      </div>
    </div>
  );
}






