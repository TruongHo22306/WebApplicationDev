import { useState } from "react";
import { FiCamera, FiMail, FiUser, FiGlobe, FiCalendar } from "react-icons/fi";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="flex w-full min-h-screen bg-[#f7f5f4] text-black px-20 py-12">

      {/* LEFT SIDEBAR */}
      <div className="w-[220px] border-r pr-5">
        <ul className="space-y-2">

          {["Account","Privacy","Notifications","Appearance","Security"].map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`
                px-4 py-3 rounded-lg cursor-pointer text-[15px]
                ${activeTab === tab.toLowerCase()
                  ? "bg-white font-semibold shadow"
                  : "hover:bg-gray-200"
                }
              `}
            >
              {tab}
            </li>
          ))}

        </ul>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 pl-10">

        <h2 className="text-[22px] font-bold mb-5">Account Settings</h2>
        <p className="text-gray-600 mb-8">Manage your account information and profile</p>

        {/* AVATAR + UPLOAD */}
        <div className="flex items-center gap-6 mb-8">
          <img
            src="https://i.pravatar.cc/150?img=35"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FiCamera /> Upload Photo
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-5 max-w-[550px]">

          {/* FULL NAME */}
          <div>
            <label className="text-sm font-semibold">Full Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full mt-1 p-3 rounded-lg border"
            />
          </div>

          {/* USERNAME */}
          <div>
            <label className="text-sm font-semibold">Username</label>
            <div className="flex items-center border rounded-lg p-3 gap-2">
              <span>@</span>
              <input
                type="text"
                placeholder="yourusername"
                className="flex-1 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold">Email</label>
            <div className="flex items-center border rounded-lg p-3 gap-2">
              <FiMail className="text-gray-500" />
              <input
                type="email"
                placeholder="your.email@example.com"
                className="flex-1 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* BIO */}
          <div>
            <label className="text-sm font-semibold">Bio</label>
            <textarea
              rows="3"
              placeholder="Coffee enthusiast | Tech lover | Adventure seeker 🌍"
              className="w-full mt-1 p-3 rounded-lg border"
            />
            <p className="text-xs text-gray-500">52/150 characters</p>
          </div>

          {/* LOCATION */}
          <div>
            <label className="text-sm font-semibold">Location</label>
            <div className="flex items-center border rounded-lg p-3 gap-2">
              <FiGlobe className="text-gray-500" />
              <input
                type="text"
                placeholder="San Francisco, CA"
                className="flex-1 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* WEBSITE */}
          <div>
            <label className="text-sm font-semibold">Website</label>
            <input
              type="text"
              placeholder="yourwebsite.com"
              className="w-full mt-1 p-3 rounded-lg border"
            />
          </div>

          {/* BIRTHDAY */}
          <div>
            <label className="text-sm font-semibold">Birthday</label>
            <div className="flex items-center border rounded-lg p-3 gap-2">
              <FiCalendar className="text-gray-500" />
              <input type="date" className="flex-1 outline-none bg-transparent" />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-4 mt-6">
            <button className="px-5 py-2 rounded-lg border">Cancel</button>
            <button className="px-6 py-2 rounded-lg bg-blue-600 text-white">
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
