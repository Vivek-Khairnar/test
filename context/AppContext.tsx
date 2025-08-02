"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface Scenario {
  id: number;
  name: string;
  difficulty: string;
  prompt: string;
}

interface AppContextType {
  selectedScenario: Scenario | null;
  setSelectedScenario: React.Dispatch<React.SetStateAction<Scenario | null>>;
  conversation: { role: string; text: string }[];
  setConversation: React.Dispatch<
    React.SetStateAction<{ role: string; text: string }[]>
  >;
  isSessionActive: boolean;
  setIsSessionActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(
    null
  );
  const [conversation, setConversation] = useState<
    { role: string; text: string }[]
  >([]);
  const [isSessionActive, setIsSessionActive] = useState(false);

  const value = {
    selectedScenario,
    setSelectedScenario,
    conversation,
    setConversation,
    isSessionActive,
    setIsSessionActive,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
