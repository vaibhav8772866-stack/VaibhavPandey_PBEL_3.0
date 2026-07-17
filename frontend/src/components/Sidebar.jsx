import { FaComments, FaRobot, FaTrash } from "react-icons/fa";

function Sidebar({ clearChat }) {
  const chats = [
    "Admission",
    "Hostel",
    "Library",
    "Exams",
    "Scholarship",
    "Placement",
    "Transport",
    "Attendance",
  ];

  return (
    <div className="w-72 bg-slate-900 border-r border-slate-700 flex flex-col">

      {/* Header */}
      <div className="p-5 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <FaRobot className="text-cyan-400 text-3xl" />
          <div>
            <h2 className="text-xl font-bold text-white">
              Student AI
            </h2>
            <p className="text-sm text-gray-400">
              Support Chatbot
            </p>
          </div>
        </div>
      </div>

      {/* Quick Topics */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-gray-300 font-semibold mb-4">
          Quick Topics
        </h3>

        {chats.map((chat, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 rounded-lg px-4 py-3 mb-3 cursor-pointer transition"
          >
            <FaComments className="text-cyan-400" />
            <span className="text-white">{chat}</span>
          </div>
        ))}
      </div>

      {/* Clear Chat */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={clearChat}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition"
        >
          <FaTrash />
          Clear Chat
        </button>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 py-3 border-t border-slate-700">
        IBM Internship Project <br />
        AI Student Support Chatbot
      </div>

    </div>
  );
}

export default Sidebar;