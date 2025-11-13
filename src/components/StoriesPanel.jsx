export default function StoriesPanel() {
  return (
    <div className="w-full max-w-[260px] mx-auto mb-6">
      <h2 className="font-bold text-[18px] mb-4">Stories</h2>

      <div className="flex justify-center space-x-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-20 h-28 bg-[#cdc5c2] rounded-xl transition-transform duration-200 hover:scale-105 hover:shadow-lg"
          />
        ))}
      </div>
    </div>
  );
}
