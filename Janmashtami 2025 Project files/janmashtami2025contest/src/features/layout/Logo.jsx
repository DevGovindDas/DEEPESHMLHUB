import React from "react";
import LogoImg from "./LogoImg";

// Decorative elements data for cleaner code
const decorativeElements = [
  { emoji: "🕉️", position: "top-4 left-10", size: "text-6xl" },
  { emoji: "🪷", position: "top-8 right-16", size: "text-4xl" },
  { emoji: "🦚", position: "bottom-4 left-20", size: "text-5xl" },
  { emoji: "🌺", position: "bottom-6 right-10", size: "text-4xl" },
];

const cornerDecorations = [
  { emoji: "🌟", position: "top-2 left-2", color: "text-orange-400" },
  { emoji: "🌟", position: "top-2 right-2", color: "text-orange-400" },
  { emoji: "💫", position: "bottom-2 left-2", color: "text-red-400" },
  { emoji: "💫", position: "bottom-2 right-2", color: "text-red-400" },
];

export default function Logo() {
  return (
    <div className="relative w-full bg-gradient-to-r from-amber-100 via-orange-300 to-yellow-100 border-b-4 border-orange-300 shadow-lg">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        {decorativeElements.map((element, index) => (
          <div
            key={index}
            className={`absolute ${element.position} ${element.size}`}
          >
            {element.emoji}
          </div>
        ))}
      </div>

      {/* Main logo content */}
      <div className="relative flex justify-between items-center p-3 sm:p-4 md:p-6">
        {/* Left Logo Image */}
        <div className="transform hover:scale-105 transition-transform duration-300 relative">
          <div className="ring-2 sm:ring-4 ring-orange-400 ring-offset-2 sm:ring-offset-4 ring-offset-white rounded-full hover:ring-orange-500 transition-all duration-300">
            <LogoImg imgSrc="/little-Krishna.jpg" />
          </div>
        </div>

        {/* Center Title */}
        <div className="flex-1 text-center px-4">
          <div className="relative">
            {/* Decorative elements around text */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-yellow-500 text-2xl animate-pulse">
              ✨
            </div>

            <h1 className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent font-black text-2xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight tracking-wide">
              Sri Sri Krishna
            </h1>

            <h2 className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent font-bold text-lg sm:text-2xl md:text-4xl lg:text-5xl mt-1 tracking-wide">
              Janmashtami 2025
            </h2>

            {/* Floating decoration */}
            <div className="absolute -bottom-2 right-1/2 transform translate-x-1/2 text-orange-500 text-2xl animate-bounce">
              🎊
            </div>
          </div>
        </div>

        {/* Right Logo Image */}
        <div className="transform hover:scale-105 transition-transform duration-300 relative">
          <div className="ring-2 sm:ring-4 ring-orange-400 ring-offset-2 sm:ring-offset-4 ring-offset-white rounded-full hover:ring-orange-500 transition-all duration-300">
            <LogoImg imgSrc="/gifts.jpg" />
          </div>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 animate-pulse"></div>

      {/* Corner decorations */}
      {cornerDecorations.map((decoration, index) => (
        <div
          key={index}
          className={`absolute ${decoration.position} ${decoration.color} text-xl opacity-70`}
        >
          {decoration.emoji}
        </div>
      ))}
    </div>
  );
}
