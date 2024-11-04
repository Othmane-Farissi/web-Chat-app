"use client";

import React, { useState } from "react";
import socket from "./socket";

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      socket.emit("send_message", message);
      setMessage("");
    } else {
      console.warn("Attempted to send an empty message.");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
