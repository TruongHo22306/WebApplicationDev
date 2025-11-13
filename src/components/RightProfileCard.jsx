export default function RightProfileCard() {
  return (
    <div className="w-full max-w-[260px] mx-auto bg-white/70 dark:bg-neutral-800/60 backdrop-blur-md rounded-xl p-4 shadow-sm border border-white/60 dark:border-white/10">
      <div className="flex items-center space-x-4">
        <img
          src="https://i.pravatar.cc/60?img=9"
          className="w-14 h-14 rounded-full"
        />
        <div>
          <h3 className="font-semibold text-[16px]">Bill Dexter</h3>
          <p className="text-gray-500 dark:text-gray-400 text-[13px]">
            @billdexter
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-4 text-center">
        <div>
          <p className="font-semibold">1,204</p>
          <p className="text-gray-500 dark:text-gray-400 text-[12px]">Posts</p>
        </div>
        <div>
          <p className="font-semibold">15.3K</p>
          <p className="text-gray-500 dark:text-gray-400 text-[12px]">
            Followers
          </p>
        </div>
        <div>
          <p className="font-semibold">890</p>
          <p className="text-gray-500 dark:text-gray-400 text-[12px]">
            Following
          </p>
        </div>
      </div>
    </div>
  );
}
