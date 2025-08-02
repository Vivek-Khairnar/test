"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAppContext } from "@/context/AppContext";

interface Scenario {
  id: number;
  name: string;
  difficulty: string;
  prompt: string;
}

const StartScreen = () => {
  const { setSelectedScenario, setIsSessionActive } = useAppContext();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [localSelectedScenario, setLocalSelectedScenario] =
    useState<Scenario | null>(null);

  useEffect(() => {
    const fetchScenarios = async () => {
      const { data, error } = await supabase.from("scenarios").select("*");
      if (error) {
        console.error("Error fetching scenarios:", error);
      } else {
        setScenarios(data);
        if (data.length > 0) {
          setLocalSelectedScenario(data[0]);
        }
      }
    };
    fetchScenarios();
  }, []);

  const handleStartCall = () => {
    setSelectedScenario(localSelectedScenario);
    setIsSessionActive(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">AI Practice Tool</h1>
      <p className="text-lg text-gray-600 mb-8">
        Select a scenario, then start the call.
      </p>

      <div className="flex gap-4 mb-8">
        <div>
          <label
            htmlFor="scenario"
            className="block text-sm font-medium text-gray-700"
          >
            Scenario
          </label>
          <select
            id="scenario"
            name="scenario"
            value={localSelectedScenario?.id || ""}
            onChange={(e) => {
              const scenario =
                scenarios.find((s) => s.id === parseInt(e.target.value)) ||
                null;
              setLocalSelectedScenario(scenario);
            }}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {scenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {scenario.name} - {scenario.difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleStartCall}
        disabled={!localSelectedScenario}
        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:bg-gray-400"
      >
        Start Call
      </button>
    </div>
  );
};

export default StartScreen;
