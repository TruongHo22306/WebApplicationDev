export default function Uploader() {
  return (
    <div className="flex items-center bg-[#c9c0bd] px-5 py-4 rounded-xl shadow-sm">
      <img
        src="https://i.pravatar.cc/45?img=12"
        className="w-11 h-11 rounded-full mr-3"
      />

      <input
        type="text"
        placeholder="Something new?"
        className="flex-1 bg-transparent outline-none text-black text-[16px]"
      />

      <button className="bg-[#8d817f] text-white px-5 py-2 rounded-full text-[14px]">
        Upload
      </button>
    </div>
  );
}
