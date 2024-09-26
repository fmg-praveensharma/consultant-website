// components/FeedbackForm.tsx
"use client";

import React, { useState } from "react";

export const FeedbackForm: React.FC = () => {
  const [feedback, setFeedback] = useState("");

  const handleFeedbackSubmit = () => {
    console.log(feedback);
    setFeedback(""); // Clear the feedback input after submitting
  };

  return (
    <div className="bg-blue-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Feedback to the CEO office!</h2>
      <p className="mb-4">
        Please share your honest feedback to help us improve
      </p>
      <textarea
        className="w-full p-3 h-32 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type here..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button
        className="mt-4 px-6 py-2 bg-[#121E31] text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleFeedbackSubmit}
      >
        Send Feedback
      </button>
    </div>
  );
};
