import { FaRobot, FaTrash, FaPlus } from "react-icons/fa";

function Navbar({ clearChat }) {
  const newChat = () => {
    clearChat();
  };

  return (
    <nav className="h-16 bg-slate-900 border-b border-slate-700 px-6 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-3">
        <FaRobot className="text-cyan-400 text-3xl" />

        <div>
          <h1 className="text-xl font-bold text-white">
            AI Student Chatbot
          </h1>

          <p className="text-xs text-gray-400">
            Student Support Services
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex gap-3">

        <button
          onClick={newChat}
          className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg text-white flex items-center gap-2 transition"
        >
          <FaPlus />
          New Chat
        </button>

        <button
          onClick={clearChat}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white flex items-center gap-2 transition"
        >
          <FaTrash />
          Clear Chat
        </button>

      </div>
    </nav>
  );
}

export default Navbar;