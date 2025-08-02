"use client";
import React from "react";
import CallControl from "@/components/CallControl";

const CallScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Call in Progress...</h2>
      <p className="text-lg text-gray-600 mb-8">
        The AI is acting out the scenario.
      </p>
      <CallControl />
    </div>
  );
};

export default CallScreen;
