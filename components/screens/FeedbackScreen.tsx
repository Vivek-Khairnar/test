"use client";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import Feedback from "@/components/Feedback";

const FeedbackScreen = () => {
  const { conversation, setShowFeedback } = useAppContext();

  const handleStartNewCall = () => {
    setShowFeedback(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Feedback conversation={conversation} />
      <button
        onClick={handleStartNewCall}
        className="mt-8 px-4 py-2 font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
      >
        Start New Call
      </button>
    </div>
  );
};

export default FeedbackScreen;
