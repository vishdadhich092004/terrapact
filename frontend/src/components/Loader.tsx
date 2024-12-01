// Loader.tsx
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-16 h-16 animate-spin">
        <div
          className="absolute w-full h-full border-4 border-solid rounded-full"
          style={{
            borderColor: "#fec89a transparent transparent transparent",
          }}
        ></div>
        <div
          className="absolute w-full h-full border-4 border-solid rounded-full"
          style={{
            borderColor: "#ffd7ba transparent transparent transparent",
            animationDelay: "-0.15s",
          }}
        ></div>
        <div
          className="absolute w-full h-full border-4 border-solid rounded-full"
          style={{
            borderColor: "#a24c02 transparent transparent transparent",
            animationDelay: "-0.3s",
          }}
        ></div>
        <div
          className="absolute w-full h-full border-4 border-solid rounded-full"
          style={{
            borderColor: "#512601 transparent transparent transparent",
            animationDelay: "-0.45s",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
