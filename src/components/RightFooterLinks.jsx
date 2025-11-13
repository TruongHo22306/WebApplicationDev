export default function RightFooterLinks() {
  const links = [
    "About",
    "Help",
    "Privacy",
    "Terms",
    "API",
    "Jobs",
    "Language"
  ];

  return (
    <div className="w-full max-w-[260px] mx-auto mt-6 mb-10 text-[12px] text-gray-500 space-x-2 flex flex-wrap">
      {links.map((link, i) => (
        <span key={i} className="hover:underline cursor-pointer">
          {link}
        </span>
      ))}
    </div>
  );
}
