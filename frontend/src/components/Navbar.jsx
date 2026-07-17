import {
  FaRobot,
  FaTrash,
  FaPlus,
  FaDownload,
  FaUserShield,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar({ clearChat }) {
  const navigate = useNavigate();

  const newChat = () => {
    clearChat();
  };

  return (
    <nav className="h-16 bg-[#0f62fe] shadow-lg px-6 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="bg-white p-2 rounded-full">
          <FaRobot className="text-[#0f62fe] text-2xl" />
        </div>

        <div>
          <h1 className="text-xl font-bold text-white">
            IBM AI Student Support
          </h1>

          <p className="text-sm text-blue-100">
            Smart Campus Chatbot
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        <button
          onClick={newChat}
          className="bg-white text-[#0f62fe] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
        >
          <FaPlus />
          New Chat
        </button>

        <button
          onClick={clearChat}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          <FaTrash />
          Clear
        </button>

        <button
          onClick={() => navigate("/login")}
          className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          <FaUserShield />
          Admin
        </button>

      </div>
    </nav>
  );
}

export default Navbar;