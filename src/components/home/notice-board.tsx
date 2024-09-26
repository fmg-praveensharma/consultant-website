// components/NoticeBoard.tsx
"use client";

import React, { useState } from "react";
import Modal from "../common/modal";

const messages = [
  "Welcome to our platform!",
  "Our new feature is live!",
  "Maintenance scheduled for tomorrow.",
];

export const NoticeBoard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-green-100 p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-semibold text-green-800 mb-2">
        Notice Board!
      </h2>
      <p className="mb-2">Namaste ji</p>
      <p>We hope this message finds you well!</p>
      {/* <button
        className="mt-4 text-blue-800 hover:underline"
        onClick={() => setIsModalOpen(true)}
      >
        Show more
      </button> */}
      <button
        className="mt-4 ml-2 px-3 py-1 bg-black text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsModalOpen(true)}
      >
        <i className="far fa-clock"></i> History
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-xl font-semibold mb-4">Company Messages</h3>
        <ul>
          {messages.map((message, index) => (
            <li key={index} className="mb-2">
              {message}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};
