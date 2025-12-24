import React from "react";
import logoMellow from "../assets/logoMellow.png";

export default function Logo() {
  return (
    <div className="flex items-center justify-center mb-10 select-none cursor-default animate-fadeDown">
      <img src={logoMellow} alt="Mellow logo" className="h-20 w-auto drop-shadow-sm" />
    </div>
  );
}
