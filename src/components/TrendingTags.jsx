export default function TrendingTags() {
  const tags = [
    { name: "#Photography", posts: "98K posts" },
    { name: "#AnimeArt", posts: "24K posts" },
    { name: "#CodingLife", posts: "17K posts" },
    { name: "#Lifestyle", posts: "9K posts" },
    { name: "#DesignUI", posts: "7.3K posts" },
  ];

  return (
    <div className="w-full max-w-[260px] mx-auto mb-10">
      <h2 className="font-bold text-[18px] mb-3">Trending</h2>

      <div className="space-y-3">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex justify-between items-center cursor-pointer group transition-all"
          >
            <span className="font-medium text-[15px] group-hover:text-blue-500 transition-all duration-200 group-hover:translate-x-[4px]">
              {tag.name}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-[12px] group-hover:text-blue-400 group-hover:opacity-100 opacity-80 transition-all duration-200">
              {tag.posts}
            </span>
          </div>
        ))}
      </div>

      <div className="border-b mt-4 border-gray-300 dark:border-neutral-700" />
    </div>
  );
}
