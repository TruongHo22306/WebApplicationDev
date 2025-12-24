import { BsFillPostageHeartFill, BsPlusCircle } from "react-icons/bs";
import { FiBriefcase, FiDollarSign, FiStar, FiUser, FiUserPlus } from "react-icons/fi";

export default function ProfileMiniCard({
  avatar = "https://i.pravatar.cc/240?img=15",
  name = "Liam Roberts",
  role = "Product Designer",
  rating = "4.9",
  clients = "100+",
  price = "120",
  onToggle,
}) {
  return (
    <div className="overflow-hidden rounded-[28px] bg-[#f4ede2] text-[#2f2a25] shadow-[0_16px_36px_rgba(0,0,0,0.1)] border border-[#e3d8cb] w-full">
      <div className="w-full bg-[#e9dfd2] px-4 py-3 flex items-center">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border border-white shadow-sm"
        />
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold leading-tight">{name}</p>
          <p className="text-sm text-[#6b5c51] leading-tight">{role}</p>
        </div>

        <div className="rounded-2xl border border-[#e3d8cb] bg-[#f7f1e7] px-3 py-3 grid grid-cols-3 gap-2 text-center text-sm">
          <div className="flex flex-col items-center gap-1">
            <FiUserPlus className="text-[#d98c3b]" />
            <p className="font-semibold">{rating}</p>
            <p className="text-[12px] text-[#7a6f64]">Followers</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <BsPlusCircle className="text-[#5b6cff]" />
            <p className="font-semibold">{clients}</p>
            <p className="text-[12px] text-[#7a6f64]">Posts</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <FiUser className="text-[#1f7a5b]" />
            <p className="font-semibold">{price}</p>
            <p className="text-[12px] text-[#7a6f64]">Following</p>
          </div>
        </div>

        <button
          onClick={onToggle}
          className="w-full rounded-2xl bg-[#6b5c51] text-white py-3 font-semibold text-sm shadow-[0_12px_24px_rgba(0,0,0,0.14)] hover:-translate-y-0.5 transition-transform"
        >
          Follow
        </button>
      </div>
    </div>
  );
}
