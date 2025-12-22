import { useEffect, useMemo, useRef, useState } from "react";
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
  const [media, setMedia] = useState(null); // { src, name }
  const [mode, setMode] = useState("move"); // move | text | sticker | draw
  const [preview, setPreview] = useState(false);

  // Objects on canvas: text and stickers
  const [objects, setObjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

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

  const bg = darkMode ? "bg-neutral-950 text-white" : "bg-[#f6f1ea] text-[#1f1a14]";
  const panel = darkMode ? "bg-neutral-900/70 border-white/10" : "bg-white/80 border-black/10";
  const soft = darkMode ? "bg-white/10 hover:bg-white/15" : "bg-black/5 hover:bg-black/10";
  const muted = darkMode ? "text-white/70" : "text-black/60";

  const emojiList = useMemo(() => ["\uD83D\uDE0A", "\uD83D\uDE02", "\uD83D\uDE0D", "\uD83D\uDE0E", "\uD83D\uDD25", "\uD83D\uDC4F", "\uD83D\uDC4D", "\u2764\uFE0F"], []);

  const colorPresets = useMemo(
    () => ["#ffffff", "#000000", "#ff3b30", "#ffcc00", "#34c759", "#007aff", "#af52de"],
    []
  );

  const selected = objects.find((o) => o.id === selectedId) || null;

  useEffect(() => {
    drawToCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strokes, media]);

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

  const onUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const src = URL.createObjectURL(file);
    setMedia({ src, name: file.name });

    // reset canvas state
    setObjects([]);
    setSelectedId(null);
    setStrokes([]);
    setRedoStrokes([]);
    setObjHistory([]);
    setObjRedo([]);
    setMode("move");
    setPreview(false);

    e.target.value = "";
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
  const dragRef = useRef({ dragging: false, id: null, start: null, orig: null });

  const onObjectMouseDown = (e, id) => {
    if (preview) return;
    if (mode === "draw") return;

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
      dragRef.current = { dragging: false, id: null, start: null, orig: null };
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
    // Demo only
    const payload = {
      media: media?.name || null,
      objects,
      strokesCount: strokes.length,
      where,
    };
    alert(`Story published (demo): ${where}\n\n` + JSON.stringify(payload, null, 2));
  };

  return (
    <div className={`min-h-screen w-full ${bg}`}>
      {/* Top bar */}
      <div className={`sticky top-0 z-20 border-b ${darkMode ? "border-white/10" : "border-black/10"} bg-black/30 backdrop-blur`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={`p-2 rounded-full ${soft} transition`}
              title="Close"
              onClick={() => alert("Close (demo)")}
            >
              <FiX />
            </button>

            <div className="ml-2">
              <div className="text-sm font-semibold">Create story</div>
              <div className={`text-xs ${muted}`}>
                {preview ? "Preview mode" : mode === "draw" ? "Draw mode" : "Edit mode"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className={`px-3 py-2 rounded-full text-sm cursor-pointer ${soft} transition flex items-center gap-2`}>
              <FiImage />
              <span className="hidden sm:inline">Upload</span>
              <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
            </label>

            <button
              type="button"
              className={`px-3 py-2 rounded-full text-sm ${soft} transition`}
              onClick={() => setPreview((v) => !v)}
              title="Toggle preview"
            >
              {preview ? "Edit" : "Preview"}
            </button>

            <div className="w-px h-7 bg-white/10 mx-1" />

            <button
              type="button"
              className={`p-2 rounded-full ${soft} transition`}
              title="Undo"
              onClick={() => {
                if (mode === "draw") undoDraw();
                else undoObjects();
              }}
            >
              <FiRotateCcw />
            </button>

            <button
              type="button"
              className={`p-2 rounded-full ${soft} transition`}
              title="Redo"
              onClick={() => {
                if (mode === "draw") redoDraw();
                else redoObjects();
              }}
            >
              <FiRotateCw />
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
                darkMode ? "border-white/10 bg-neutral-900" : "border-black/10 bg-white"
              }`}
              style={{ aspectRatio: "9 / 16" }}
              onMouseDown={onStageMouseDown}
              onMouseMove={onStageMouseMove}
              onMouseUp={onStageMouseUp}
              onMouseLeave={onStageMouseUp}
            >
              {/* Media */}
              {media ? (
                <img
                  src={media.src}
                  alt="story background"
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
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
                  <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/20" />
                  <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/20" />
                  <div className="absolute top-1/3 left-0 right-0 h-px bg-white/20" />
                  <div className="absolute top-2/3 left-0 right-0 h-px bg-white/20" />
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
                  onMouseDown={(e) => onObjectMouseDown(e, o.id)}
                />
              ))}

              {/* Selected outline hint */}
              {!preview && selectedId && mode !== "draw" && (
                <div className="absolute left-3 top-3 text-xs px-2 py-1 rounded-full bg-black/50 text-white/90">
                  Drag to move
                </div>
              )}
            </div>

            {/* Bottom publish buttons */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <button
                type="button"
                disabled={!media}
                onClick={() => publish("Your Story")}
                className={`py-3 rounded-2xl text-sm font-semibold transition ${
                  !media
                    ? "opacity-40 cursor-not-allowed bg-white/10"
                    : "bg-white text-black hover:opacity-90"
                }`}
              >
                Your Story
              </button>
              <button
                type="button"
                disabled={!media}
                onClick={() => publish("Close Friends")}
                className={`py-3 rounded-2xl text-sm font-semibold transition ${
                  !media
                    ? "opacity-40 cursor-not-allowed bg-white/10"
                    : "bg-[#1db954] text-black hover:opacity-90"
                }`}
              >
                Close Friends
              </button>
              <button
                type="button"
                disabled={!media}
                onClick={() => publish("Send To")}
                className={`py-3 rounded-2xl text-sm font-semibold transition ${
                  !media
                    ? "opacity-40 cursor-not-allowed bg-white/10"
                    : "bg-white/15 hover:bg-white/20"
                }`}
              >
                Send To
              </button>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className={`rounded-3xl border p-4 ${panel}`}>
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
              onClick={() => setMode("move")}
            />
            <ToolButton
              active={mode === "text"}
              disabled={preview}
              icon={<FiType />}
              label="Text"
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
              onClick={() => setMode("sticker")}
            />
            <ToolButton
              active={mode === "draw"}
              disabled={preview}
              icon={<FiEdit3 />}
              label="Draw"
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
                  onClick={addText}
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

function ToolButton({ active, disabled, icon, label, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-2xl px-3 py-3 text-xs font-semibold transition flex flex-col items-center justify-center gap-1 border
        ${disabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-95"}
        ${
          active
            ? "bg-white text-black border-white"
            : "bg-white/10 border-white/10 text-white"
        }
      `}
    >
      <div className="text-base">{icon}</div>
      <div>{label}</div>
    </button>
  );
}

function StageObject({ obj, selected, onMouseDown }) {
  const baseStyle = {
    left: `${obj.x}%`,
    top: `${obj.y}%`,
    transform: `translate(-50%, -50%) scale(${obj.scale}) rotate(${obj.rotation}deg)`,
  };

  if (obj.type === "text") {
    return (
      <div
        onMouseDown={onMouseDown}
        className={`absolute select-none cursor-grab active:cursor-grabbing px-2 py-1 rounded-xl ${
          selected ? "outline outline-2 outline-white/80 bg-black/20" : "bg-black/0"
        }`}
        style={baseStyle}
      >
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






