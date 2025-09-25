import AnimatedBtn from "../AnimatedBtn/AnimatedBtn";

const ChatInput = ({
  sidebarOpen,
  inputMessage,
  setInputMessage,
  onSendMessage,
  isTyping,
}) => {
  return (
    <div
      className={`!p-4 fixed bottom-0 z-10 transition-all duration-300 ${
        sidebarOpen 
          ? "left-0 right-0 w-full md:left-80 md:right-0 md:w-[calc(100%-320px)]" 
          : "left-0 right-0 w-full"
      }`}
    >
      <div className="backdrop-blur-2xl bg-black/30 border border-[#3c6e71]/30 shadow-2xl shadow-[#549295]/20 rounded-2xl !p-4">
        <form onSubmit={onSendMessage} className="flex gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message to Nova..."
            className="flex-1 !px-4 !py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#3c6e71] focus:outline-none focus:ring-2 focus:ring-[#3c6e71]/50 transition-all"
            disabled={isTyping}
          />
          <AnimatedBtn
            type="submit"
            disabled={!inputMessage.trim() || isTyping}
          >
            {isTyping ? "..." : "Send"}
          </AnimatedBtn>
        </form>
        <div className="flex justify-between items-center !mt-3">
          <p className="text-xs text-gray-500">
            Nova AI can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
