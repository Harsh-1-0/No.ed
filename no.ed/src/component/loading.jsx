import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black 0 bg-opacity-95">
      {/* Main loading spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute w-16 h-16 border-4 border-t-black 500 border-opacity-50 rounded-full animate-spin"></div>
        <div className="absolute w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Loading text */}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold text-white">
          Loading Your Roadmap 😎
        </h2>
        <div className="flex items-center bg-black justify-center mt-2">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100 mx-1"></span>
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
