"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { supabase } from "@/lib/supabaseClient";

const Home = () => {
  const router = useRouter();
  const { setSelectedScenario } = useAppContext();
  const [scenarios, setScenarios] = React.useState<any[]>([]);
  const [localSelectedScenario, setLocalSelectedScenario] =
    React.useState<any>(null);

  React.useEffect(() => {
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
    if (localSelectedScenario) {
      setSelectedScenario(localSelectedScenario);
      router.push("/call");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
          AI Practice Tool
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Select a scenario to start practicing
        </p>

        <div className="mb-8">
          <label
            htmlFor="scenario"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Choose Scenario
          </label>
          <select
            id="scenario"
            name="scenario"
            value={localSelectedScenario?.id || ""}
            onChange={(e) => {
              const scenario = scenarios.find(
                (s) => s.id === parseInt(e.target.value)
              );
              setLocalSelectedScenario(scenario);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {scenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {scenario.name} - {scenario.difficulty}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleStartCall}
          disabled={!localSelectedScenario}
          className="w-full px-4 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Start Practice Session
        </button>
      </div>
    </div>
  );
};

export default Home;
