"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useVapi from "../hooks/useVapi";
import { useAppContext } from "@/context/AppContext";

const CallControl = () => {
  const router = useRouter();
  const { selectedScenario, setConversation } = useAppContext();

  const handleCallEnd = (finalConversation: any) => {
    setConversation(finalConversation);
    router.push("/feedback");
  };

  const { toggleCall, isSessionActive } = useVapi({
    scenario: selectedScenario!,
    onCallEnd: handleCallEnd,
  });

  return (
    <button
      onClick={toggleCall}
      className={`px-6 py-3 font-semibold text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors ${
        isSessionActive
          ? "bg-red-500 hover:bg-red-700 focus:ring-red-400"
          : "bg-blue-500 hover:bg-blue-700 focus:ring-blue-400"
      }`}
    >
      {isSessionActive ? "End Call" : "Start Call"}
    </button>
  );
};

export default CallControl;
