import { useState } from "react";

export default function SuggestionList() {
  const [users, setUsers] = useState([
    { id: 1, name: "Thien Truong", following: false },
    { id: 2, name: "Thien Truong", following: false },
    { id: 3, name: "Thien Truong", following: false },
  ]);

  const toggleFollow = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, following: !u.following } : u
      )
    );
  };

  return (
    <div className="w-full max-w-[260px] mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-[18px]">Suggestion</h2>
        <button className="text-sm text-gray-600">See all</button>
      </div>

      <div className="space-y-5">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#f56c6c] rounded-full" />
              <span className="font-semibold text-[15px]">{user.name}</span>
            </div>

            <button
              onClick={() => toggleFollow(user.id)}
              className={
                "px-4 py-[7px] rounded-full text-sm font-semibold transition-all duration-200 transform shadow-[0_10px_22px_rgba(0,0,0,0.18)] border " +
                (user.following
                  ? "bg-[#837568] border-[#837568] text-white hover:-translate-y-0.5 hover:shadow-[0_14px_26px_rgba(0,0,0,0.2)]"
                  : "bg-[#6b5c51] border-[#6b5c51] text-white hover:-translate-y-0.5 hover:shadow-[0_14px_26px_rgba(0,0,0,0.2)]")
              }
            >
              {user.following ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>

      <div className="border-b mt-6 border-gray-300 dark:border-neutral-700" />
    </div>
  );
}
