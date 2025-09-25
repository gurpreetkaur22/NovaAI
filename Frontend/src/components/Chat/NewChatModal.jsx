import AnimatedBtn from "../AnimatedBtn/AnimatedBtn";

const NewChatModal = ({
  showModal,
  chatTitle,
  setChatTitle,
  onCreateChat,
  onClose,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="backdrop-blur-2xl bg-black/30 border border-[#3c6e71]/30 rounded-2xl !p-6 w-full max-w-md mx-4">
        <h3 className="text-xl font-bold text-white !mb-4 text-center">
          Create New Chat
        </h3>
        <input
          type="text"
          value={chatTitle}
          onChange={(e) => setChatTitle(e.target.value)}
          placeholder="Enter chat title..."
          className="w-full !px-4 !py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#3c6e71] focus:outline-none focus:ring-2 focus:ring-[#3c6e71]/50 transition-all !mb-4"
          autoFocus
          onKeyDown={(e) => e.key === "Enter" && onCreateChat()}
        />
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="!px-6 !py-2 !mt-5 border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 rounded-xl transition-all text-xl"
          >
            Cancel
          </button>
          <AnimatedBtn onClick={onCreateChat} disabled={!chatTitle.trim()}>
            Create Chat
          </AnimatedBtn>
        </div>
      </div>
    </div>
  );
};

export default NewChatModal;
