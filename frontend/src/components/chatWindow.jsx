import { useEffect, useRef } from "react";
import { FaRobot, FaUserGraduate } from "react-icons/fa";

function ChatWindow({ messages = [], typing = false }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f4f4] px-8 py-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-xl shadow-md px-5 py-4 ${
                msg.sender === "user"
                  ? "bg-[#0f62fe] text-white"
                  : "bg-white text-gray-800 border border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">

                {msg.sender === "user" ? (
                  <FaUserGraduate className="text-lg" />
                ) : (
                  <FaRobot className="text-lg text-[#0f62fe]" />
                )}

                <span className="font-semibold text-sm">
                  {msg.sender === "user"
                    ? "Student"
                    : "IBM AI Assistant"}
                </span>
              </div>

              <p className="whitespace-pre-wrap leading-7">
                {msg.text}
              </p>

              <div className="text-right text-xs mt-4 opacity-70">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">

            <div className="bg-white border border-gray-300 rounded-xl px-5 py-4 shadow">

              <div className="flex items-center gap-2 mb-3">
                <FaRobot className="text-[#0f62fe]" />
                <span className="font-semibold text-sm">
                  IBM AI Assistant
                </span>
              </div>

              <div className="flex gap-2">

                <span className="w-3 h-3 rounded-full bg-blue-600 animate-bounce"></span>

                <span className="w-3 h-3 rounded-full bg-blue-600 animate-bounce delay-150"></span>

                <span className="w-3 h-3 rounded-full bg-blue-600 animate-bounce delay-300"></span>

              </div>

            </div>

          </div>
        )}

        <div ref={bottomRef}></div>

      </div>
    </div>
  );
}

export default ChatWindow;