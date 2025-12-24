import { useRef, useState } from "react";
import { FiCamera, FiMail, FiUser, FiGlobe, FiCalendar } from "react-icons/fi";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");
  const [avatarSrc, setAvatarSrc] = useState("https://i.pravatar.cc/150?img=35");
  const avatarInputRef = useRef(null);

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const nextUrl = URL.createObjectURL(file);
    setAvatarSrc(nextUrl);
    e.target.value = "";
  };

  return (
    <div className="flex w-full min-h-screen bg-inherit text-inherit px-20 py-12">

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
                  ? "bg-[#f3ede5] font-semibold shadow border border-[#d6c9bb]"
                  : "hover:bg-[#efe6db]"
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
        {activeTab === "account" && (
          <>
            <h2 className="text-[22px] font-bold mb-5">Account Settings</h2>
            <p className="text-[#6b5c51]/80 mb-8">Manage your account information and profile</p>

            {/* AVATAR + UPLOAD */}
            <div className="flex items-center gap-6 mb-8">
              <img
                src={avatarSrc}
                className="w-20 h-20 rounded-full object-cover"
              />
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="bg-[#6b5c51] hover:bg-[#5f5248] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
              >
                <FiCamera /> Upload Photo
              </button>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>

            {/* FORM */}
            <div className="space-y-5 max-w-[550px]">

              {/* FULL NAME */}
              <div>
                <label className="text-sm font-semibold">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full mt-1 p-3 rounded-lg border border-[#d6c9bb] bg-[#f9f5ef] outline-none"
                />
              </div>

              {/* USERNAME */}
              <div>
                <label className="text-sm font-semibold">Username</label>
                <div className="flex items-center border border-[#d6c9bb] rounded-lg p-3 gap-2 bg-[#f9f5ef]">
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
                <div className="flex items-center border border-[#d6c9bb] rounded-lg p-3 gap-2 bg-[#f9f5ef]">
                  <FiMail className="text-[#6b5c51]/70" />
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
                  placeholder="Coffee enthusiast | Tech lover | Adventure seeker dYO?"
                  className="w-full mt-1 p-3 rounded-lg border border-[#d6c9bb] bg-[#f9f5ef] outline-none"
                />
                <p className="text-xs text-[#6b5c51]/70">52/150 characters</p>
              </div>

              {/* LOCATION */}
              <div>
                <label className="text-sm font-semibold">Location</label>
                <div className="flex items-center border border-[#d6c9bb] rounded-lg p-3 gap-2 bg-[#f9f5ef]">
                  <FiGlobe className="text-[#6b5c51]/70" />
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
                  className="w-full mt-1 p-3 rounded-lg border border-[#d6c9bb] bg-[#f9f5ef] outline-none"
                />
              </div>

              {/* BIRTHDAY */}
              <div>
                <label className="text-sm font-semibold">Birthday</label>
                <div className="flex items-center border border-[#d6c9bb] rounded-lg p-3 gap-2 bg-[#f9f5ef]">
                  <FiCalendar className="text-[#6b5c51]/70" />
                  <input type="date" className="flex-1 outline-none bg-transparent" />
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-4 mt-6">
                <button className="px-5 py-2 rounded-lg border border-[#d6c9bb] bg-[#f3ede5] text-[#6b5c51] hover:bg-[#efe6db] transition">
                  Cancel
                </button>
                <button className="px-6 py-2 rounded-lg bg-[#6b5c51] hover:bg-[#5f5248] text-white transition">
                  Save Changes
                </button>
              </div>

            </div>
          </>
        )}

        {activeTab === "privacy" && (
          <>
            <h2 className="text-[22px] font-bold mb-5">Privacy</h2>
            <p className="text-[#6b5c51]/80 mb-8">Control who can see your info and interact with you.</p>

            <div className="space-y-4 max-w-[560px]">
              <div className="rounded-2xl border border-[#d6c9bb] bg-[#f9f5ef] p-4">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-semibold">Private account</div>
                    <p className="text-sm text-[#6b5c51]/70 mt-1">
                      Only approved followers can see your posts.
                    </p>
                  </div>
                  <input type="checkbox" className="h-5 w-5 accent-[#6b5c51]" />
                </div>
              </div>

              <div className="rounded-2xl border border-[#d6c9bb] bg-[#f9f5ef] p-4">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-semibold">Show activity status</div>
                    <p className="text-sm text-[#6b5c51]/70 mt-1">
                      Allow others to see when you are active.
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5 accent-[#6b5c51]" />
                </div>
              </div>

              <div className="rounded-2xl border border-[#d6c9bb] bg-[#f9f5ef] p-4">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-semibold">Message requests</div>
                    <p className="text-sm text-[#6b5c51]/70 mt-1">
                      Allow messages from people you do not follow.
                    </p>
                  </div>
                  <input type="checkbox" className="h-5 w-5 accent-[#6b5c51]" />
                </div>
              </div>

              <div className="rounded-2xl border border-[#d6c9bb] bg-[#f9f5ef] p-4">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-semibold">Allow tag mentions</div>
                    <p className="text-sm text-[#6b5c51]/70 mt-1">
                      Only people you follow can tag you in posts.
                    </p>
                  </div>
                  <input type="checkbox" className="h-5 w-5 accent-[#6b5c51]" />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button className="px-5 py-2 rounded-lg border border-[#d6c9bb] bg-[#f3ede5] text-[#6b5c51] hover:bg-[#efe6db] transition">
                  Cancel
                </button>
                <button className="px-6 py-2 rounded-lg bg-[#6b5c51] hover:bg-[#5f5248] text-white transition">
                  Save Changes
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === "notifications" && (
          <>
            <h2 className="text-[22px] font-bold mb-5">Notifications</h2>
            <p className="text-[#6b5c51]/80 mb-8">
              Choose what alerts you want to receive.
            </p>

            <div className="space-y-4 max-w-[560px]">
              <div className="rounded-2xl border border-[#d6c9bb] bg-[#f9f5ef] p-4">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-semibold">Push notifications</div>
                    <p className="text-sm text-[#6b5c51]/70 mt-1">
                      Get alerts on your device.
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5 accent-[#6b5c51]" />
                </div>
              </div>

              <div className="rounded-2xl border border-[#d6c9bb] bg-[#f9f5ef] p-4">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-semibold">Email notifications</div>
                    <p className="text-sm text-[#6b5c51]/70 mt-1">
                      Receive updates by email.
                    </p>
                  </div>
                  <input type="checkbox" className="h-5 w-5 accent-[#6b5c51]" />
                </div>
              </div>

              <div className="rounded-2xl border border-[#d6c9bb] bg-[#f9f5ef] p-4">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-semibold">Comment activity</div>
                    <p className="text-sm text-[#6b5c51]/70 mt-1">
                      Notify when someone comments on your post.
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5 accent-[#6b5c51]" />
                </div>
              </div>

              <div className="rounded-2xl border border-[#d6c9bb] bg-[#f9f5ef] p-4">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-semibold">New followers</div>
                    <p className="text-sm text-[#6b5c51]/70 mt-1">
                      Alert me when someone follows me.
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5 accent-[#6b5c51]" />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button className="px-5 py-2 rounded-lg border border-[#d6c9bb] bg-[#f3ede5] text-[#6b5c51] hover:bg-[#efe6db] transition">
                  Cancel
                </button>
                <button className="px-6 py-2 rounded-lg bg-[#6b5c51] hover:bg-[#5f5248] text-white transition">
                  Save Changes
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === "appearance" && (
          <>
            <h2 className="text-[22px] font-bold mb-5">Appearance</h2>
            <p className="text-[#6b5c51]/80 mb-8">
              Customize how the app looks for you.
            </p>

            <div className="space-y-4 max-w-[560px]">
              <div className="rounded-2xl border border-[#d6c9bb] bg-[#f9f5ef] p-4">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-semibold">Theme</div>
                    <p className="text-sm text-[#6b5c51]/70 mt-1">
                      Switch between light and dark mode.
                    </p>
                  </div>
                  <select className="rounded-lg border border-[#d6c9bb] bg-white/80 px-3 py-2 text-sm text-[#4b4239]">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                  </select>
                </div>
              </div>

              <div className="rounded-2xl border border-[#d6c9bb] bg-[#f9f5ef] p-4">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-semibold">Compact layout</div>
                    <p className="text-sm text-[#6b5c51]/70 mt-1">
                      Reduce spacing to show more content.
                    </p>
                  </div>
                  <input type="checkbox" className="h-5 w-5 accent-[#6b5c51]" />
                </div>
              </div>

              <div className="rounded-2xl border border-[#d6c9bb] bg-[#f9f5ef] p-4">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-semibold">Animations</div>
                    <p className="text-sm text-[#6b5c51]/70 mt-1">
                      Enable motion effects across the UI.
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5 accent-[#6b5c51]" />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button className="px-5 py-2 rounded-lg border border-[#d6c9bb] bg-[#f3ede5] text-[#6b5c51] hover:bg-[#efe6db] transition">
                  Cancel
                </button>
                <button className="px-6 py-2 rounded-lg bg-[#6b5c51] hover:bg-[#5f5248] text-white transition">
                  Save Changes
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === "security" && (
          <>
            <h2 className="text-[22px] font-bold mb-5">Security</h2>
            <p className="text-[#6b5c51]/80 mb-8">
              Manage account security and access.
            </p>

            <div className="space-y-4 max-w-[560px]">
              <div className="rounded-2xl border border-[#d6c9bb] bg-[#f9f5ef] p-4">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-semibold">Two-factor authentication</div>
                    <p className="text-sm text-[#6b5c51]/70 mt-1">
                      Add an extra layer of protection.
                    </p>
                  </div>
                  <input type="checkbox" className="h-5 w-5 accent-[#6b5c51]" />
                </div>
              </div>

              <div className="rounded-2xl border border-[#d6c9bb] bg-[#f9f5ef] p-4">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-semibold">Login alerts</div>
                    <p className="text-sm text-[#6b5c51]/70 mt-1">
                      Get notified about new sign-ins.
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5 accent-[#6b5c51]" />
                </div>
              </div>

              <div className="rounded-2xl border border-[#d6c9bb] bg-[#f9f5ef] p-4">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-semibold">Password updates</div>
                    <p className="text-sm text-[#6b5c51]/70 mt-1">
                      Require password on sensitive changes.
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5 accent-[#6b5c51]" />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button className="px-5 py-2 rounded-lg border border-[#d6c9bb] bg-[#f3ede5] text-[#6b5c51] hover:bg-[#efe6db] transition">
                  Cancel
                </button>
                <button className="px-6 py-2 rounded-lg bg-[#6b5c51] hover:bg-[#5f5248] text-white transition">
                  Save Changes
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
