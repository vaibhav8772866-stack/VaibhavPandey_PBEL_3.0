import {
  FaComments,
  FaRobot,
  FaTrash,
  FaGraduationCap,
  FaUniversity,
  FaBook,
  FaBus,
  FaMoneyCheckAlt,
  FaClipboardCheck,
} from "react-icons/fa";

function Sidebar({ clearChat }) {
  const chats = [
    { name: "Admission", icon: <FaUniversity /> },
    { name: "Hostel", icon: <FaGraduationCap /> },
    { name: "Library", icon: <FaBook /> },
    { name: "Exams", icon: <FaClipboardCheck /> },
    { name: "Scholarship", icon: <FaMoneyCheckAlt /> },
    { name: "Placement", icon: <FaComments /> },
    { name: "Transport", icon: <FaBus /> },
    { name: "Attendance", icon: <FaClipboardCheck /> },
  ];

  return (
    <div className="w-72 bg-[#161616] border-r border-gray-800 flex flex-col">

      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="bg-[#0f62fe] p-3 rounded-full">
            <FaRobot className="text-white text-2xl" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              IBM Student AI
            </h2>

            <p className="text-gray-400 text-sm">
              Support Assistant
            </p>
          </div>
        </div>
      </div>

      {/* Quick Topics */}
      <div className="flex-1 overflow-y-auto p-5">
        <h3 className="text-blue-400 font-semibold mb-4 uppercase tracking-wide">
          Quick Topics
        </h3>

        {chats.map((chat, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-[#262626] hover:bg-[#0f62fe] text-white rounded-lg px-4 py-3 mb-3 cursor-pointer transition-all duration-300"
          >
            <span className="text-lg">{chat.icon}</span>
            <span>{chat.name}</span>
          </div>
        ))}
      </div>

      {/* Footer Buttons */}
      <div className="p-5 border-t border-gray-800">
        <button
          onClick={clearChat}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition"
        >
          <FaTrash />
          Clear Chat
        </button>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 p-4 text-center">
        <p className="text-white font-semibold">
          IBM Internship Project
        </p>

        <p className="text-xs text-gray-400 mt-1">
          AI Student Support Chatbot
        </p>

        <p className="text-xs text-blue-400 mt-2">
          Version 1.0
        </p>
      </div>
    </div>
  );
}

export default Sidebar;