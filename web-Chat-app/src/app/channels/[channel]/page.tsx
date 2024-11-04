"use client";

import React, { useEffect, useState } from "react";

const ChatPage: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/chat");
    setSocket(ws);

    ws.onmessage = (event: MessageEvent) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && socket) {
      socket.send(message);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="border p-4 h-60 overflow-y-auto mb-4 text-gray-800">
          {messages.map((msg, index) => (
            <div key={index} className="py-1 border-b">
              {msg}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-black mb-2"
        />
        <button
          onClick={sendMessage}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-200 hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
