"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import CallControl from "@/components/CallControl";

const CallPage = () => {
  const router = useRouter();
  const { selectedScenario } = useAppContext();

  useEffect(() => {
    // If no scenario is selected, redirect to home
    if (!selectedScenario) {
      router.push("/");
    }
  }, [selectedScenario, router]);

  if (!selectedScenario) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-2xl w-full px-6 py-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Practice Session
        </h1>
        <p className="text-lg text-gray-600 mb-4 text-center">
          {selectedScenario.name} - {selectedScenario.difficulty}
        </p>
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-center">
            <CallControl />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallPage;
