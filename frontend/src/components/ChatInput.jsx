import { useState } from "react";
import API from "../services/api";
import { FaPaperPlane, FaMicrophone } from "react-icons/fa";

function ChatInput({ setMessages, setTyping }) {
  const [message, setMessage] = useState("");

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setMessage(text);
    };

    recognition.onerror = () => {
      alert("Voice recognition failed.");
    };
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const currentMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: currentMessage,
      },
    ]);

    setMessage("");
    setTyping(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const response = await API.post("/chat", {
  message: currentMessage,
    });

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: response.data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Unable to connect to the Flask server.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="bg-slate-900 border-t border-slate-700 p-4">
      <div className="max-w-4xl mx-auto flex gap-3">
        <input
          type="text"
          value={message}
          placeholder="Ask anything about your college..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          className="flex-1 bg-slate-800 text-white border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
        />

        <button
          onClick={startListening}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-xl transition"
          title="Voice Input"
        >
          <FaMicrophone />
        </button>

        <button
          onClick={handleSend}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl transition"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;