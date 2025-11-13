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
                "px-4 py-[6px] border rounded-full text-sm transition-all duration-200 hover:scale-105 active:scale-95 " +
                (user.following
                  ? "bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-gray-100 border-transparent"
                  : "bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-100 hover:bg-blue-500 hover:text-white hover:shadow-md")
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
