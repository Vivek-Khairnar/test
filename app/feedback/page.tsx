"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import Feedback from "@/components/Feedback";

const FeedbackPage = () => {
  const router = useRouter();
  const { conversation, setSelectedScenario, setConversation } =
    useAppContext();

  useEffect(() => {
    // If no conversation exists, redirect to home
    if (!conversation || conversation.length === 0) {
      router.push("/");
    }
  }, [conversation, router]);

  const handleStartNew = () => {
    setSelectedScenario(null);
    setConversation([]);
    router.push("/");
  };

  if (!conversation || conversation.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl w-full px-6 py-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Session Feedback
        </h1>
        <Feedback conversation={conversation} />
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleStartNew}
            className="px-6 py-3 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Start New Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
