import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

function ChatPage() {
  const defaultMessages = [
    {
      sender: "bot",
      text:
        "👋 Hello! Welcome to AI Student Support Services.\n\nYou can ask me about:\n• Admission\n• Hostel\n• Library\n• Exams\n• Scholarship\n• Placement\n• Attendance\n• Transport",
    },
  ];

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : defaultMessages;
  });

  const [typing, setTyping] = useState(false);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const clearChat = () => {
    localStorage.removeItem("chatHistory");
    setMessages(defaultMessages);
  };

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("AI Student Support Chatbot", 20, 20);

    doc.setFontSize(12);

    let y = 35;

    messages.forEach((msg) => {
      const line = `${msg.sender.toUpperCase()} : ${msg.text}`;

      const split = doc.splitTextToSize(line, 170);

      doc.text(split, 20, y);

      y += split.length * 8;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("Chat_History.pdf");
  };

  return (
    <div className="h-screen flex bg-slate-950 text-white overflow-hidden">
      <Sidebar clearChat={clearChat} />

      <div className="flex flex-col flex-1">
        <Navbar clearChat={clearChat} />

        <div className="flex justify-end p-3 bg-slate-900">
          <button
            onClick={exportPDF}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold"
          >
            Export Chat PDF
          </button>
        </div>

        <ChatWindow
          messages={messages}
          typing={typing}
        />

        <ChatInput
          setMessages={setMessages}
          setTyping={setTyping}
        />
      </div>
    </div>
  );
}

export default ChatPage;