"use client";

import React, { useState } from "react";
import Link from "next/link";

const HomePage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [channel, setChannel] = useState("general");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
          Welcome to the Chat Room
        </h1>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Enter your name:
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="channel"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Choose a channel:
            </label>
            <select
              id="channel"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              className="w-full px-4 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="general">General</option>
              <option value="random">Random</option>
            </select>
          </div>
          <div className="text-center mt-6">
            <Link
              href={`/channels/${channel}?username=${username}`}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Join {channel.charAt(0).toUpperCase() + channel.slice(1)} Channel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
