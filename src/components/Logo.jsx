import React from "react";

export default function Logo() {
  return (
    <div
      className="
        flex items-center justify-center 
        mb-10 select-none cursor-default 
        animate-fadeDown
      "
    >
      <span className="text-5xl font-serif text-[#8b744f] tracking-wide drop-shadow-sm">
        D
      </span>
      <span className="text-3xl font-serif text-[#5a4b34] ml-1 drop-shadow-sm">
        Dexter
      </span>
    </div>
  );
}
