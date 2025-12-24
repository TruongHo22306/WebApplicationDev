const events = [
  { title: "Garden BBQ", date: "Sat 16 June", place: "Tom's Garden", icon: "🌿" },
  { title: "City Council Vote", date: "Sat 16 June", place: "Town Hall", icon: "🏛️" },
  { title: "Post-punk Festival", date: "Sat 16 June", place: "Tom's Garden", icon: "🎸" },
  { title: "Maybe Boring Stand-up", date: "Sat 16 June", place: "Tom's Garden", icon: "🎤" },
  { title: "Yeboncé Tour 2023", date: "Sat 16 June", place: "Tom's Garden", icon: "🎵" },
];

export default function RightProfileCard() {
  return (
    <div className="w-full space-y-4">
      <div className="bg-white/80 dark:bg-neutral-800/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/60 dark:border-white/10">
        <h3 className="font-semibold text-[15px] mb-3">Your upcoming events</h3>
        <div className="space-y-3">
          {events.map((e) => (
            <div key={e.title} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-lg">
                {e.icon}
              </div>
              <div className="text-[13px] leading-tight">
                <p className="font-semibold text-[14px]">{e.title}</p>
                <p className="text-gray-500 dark:text-gray-400">{e.date}</p>
                <p className="text-gray-500 dark:text-gray-400">{e.place}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
