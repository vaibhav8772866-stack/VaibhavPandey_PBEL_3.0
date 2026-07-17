import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

function ChatPage() {
  const defaultMessages = [
    {
      sender: "bot",
      text: "👋 Hello! Welcome to AI Student Support Services.\n\nYou can ask me about:\n• Admission\n• Hostel\n• Library\n• Exams\n• Scholarship\n• Placement\n• Attendance\n• Transport",
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

  return (
    <div className="h-screen flex bg-slate-950 text-white overflow-hidden">
      <Sidebar clearChat={clearChat} />

      <div className="flex flex-col flex-1">
        <Navbar clearChat={clearChat} />

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