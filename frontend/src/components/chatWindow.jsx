import { useEffect, useRef } from "react";

function ChatWindow({ messages = [], typing = false }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 px-6 py-6">
      <div className="max-w-4xl mx-auto space-y-5">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-lg ${
                msg.sender === "user"
                  ? "bg-cyan-500 text-white rounded-br-sm"
                  : "bg-slate-800 text-white rounded-bl-sm"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">
                  {msg.sender === "user" ? "👤" : "🤖"}
                </span>

                <span className="text-xs font-semibold opacity-80">
                  {msg.sender === "user"
                    ? "You"
                    : "Student AI Assistant"}
                </span>
              </div>

              <p className="whitespace-pre-wrap leading-7 text-[15px]">
                {msg.text}
              </p>

              <p className="text-[10px] opacity-60 mt-3 text-right">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="bg-slate-800 rounded-2xl rounded-bl-sm px-5 py-3">
              <div className="flex items-center gap-2 mb-2">
                <span>🤖</span>
                <span className="text-xs text-gray-300">
                  Student AI Assistant
                </span>
              </div>

              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-300"></div>
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