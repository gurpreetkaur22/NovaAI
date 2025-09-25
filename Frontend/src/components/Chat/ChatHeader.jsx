import React from 'react';
import { Link } from 'react-router-dom';
import ai from '/ai.svg';

const ChatHeader = ({ sidebarOpen, onToggleSidebar }) => {
  return (
    <div
      className={`backdrop-blur-2xl bg-black/30 border-b border-[#3c6e71]/30 shadow-lg shadow-[#549295]/20 !p-4 fixed top-0 z-30 h-20 flex items-center transition-all duration-300 ${
        sidebarOpen 
          ? "left-0 w-full md:left-80 md:w-[calc(100%-320px)]" 
          : "left-0 w-full"
      }`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle */}
          <button
            onClick={onToggleSidebar}
            className="!p-2 hover:bg-[#3c6e71]/20 rounded-lg transition-all"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1">
              <div className="w-full h-0.5 bg-white"></div>
              <div className="w-full h-0.5 bg-white"></div>
              <div className="w-full h-0.5 bg-white"></div>
            </div>
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <h1 className="text-xl md:text-2xl uppercase font-bold bg-gradient-to-r from-[#3c6e71] via-white to-[#3c6e71] bg-clip-text text-transparent">
              Nova
            </h1>
            <img src={ai} alt="Nova" className="w-6 h-6" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-300 text-sm hidden sm:block">
            💬 Chat with Nova AI
          </span>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2 h-2 bg-[#3c6e71] rounded-full animate-pulse"></span>
            <span>AI Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;