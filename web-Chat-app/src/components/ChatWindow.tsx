"use client";

import React, { useEffect, useState } from "react";
import socket from "./socket";

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const handleMessage = (message: string) => {
      console.log("Received message:", message);
      setMessages((prev) => [...prev, message]);
    };

    socket.on("receive_message", handleMessage);

    return () => {
      console.log("Cleaning up socket listener...");
      socket.off("receive_message", handleMessage);
    };
  }, []);

  return (
    <div className="border border-gray-300 text-white p-4 h-60 overflow-y-auto">
      {messages.map((msg, index) => (
        <div key={index} className="border-b py-2">
          {msg}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
