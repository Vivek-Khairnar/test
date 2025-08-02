"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Vapi from "@vapi-ai/web";
import { useAppContext } from "@/context/AppContext";

const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;

// Create a single Vapi instance that will be shared across the application.
let vapiInstance: any = null;
const getVapiInstance = () => {
  if (!vapiInstance) {
    if (!publicKey) {
      throw new Error(
        "Vapi Public Key is not set. Please check your .env.local file and restart the server."
      );
    }
    vapiInstance = new Vapi(publicKey);
  }
  return vapiInstance;
};

interface Scenario {
  id: number;
  name: string;
  difficulty: string;
  prompt: string;
  character_name: string;
}

const useVapi = ({
  scenario,
  onCallEnd,
}: {
  scenario: Scenario;
  onCallEnd: (conversation: { role: string; text: string }[]) => void;
}) => {
  const { setConversation } = useAppContext();
  const [isSessionActive, setIsSessionActive] = useState(false);
  const conversationRef = useRef<{ role: string; text: string }[]>([]);
  const vapiRef = useRef<any>(null);

  useEffect(() => {
    const vapi = getVapiInstance();
    vapiRef.current = vapi;

    const onCallStart = () => setIsSessionActive(true);
    const onCallEndHandler = () => {
      onCallEnd(conversationRef.current);
      setIsSessionActive(false);
    };
    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setConversation((prev) => {
          const updated = [
            ...prev,
            {
              role: message.role as string,
              text: message.transcript as string,
            },
          ];
          conversationRef.current = updated;
          return updated;
        });
      }
    };
    const onError = (e: Error) => {
      console.error("Vapi error:", e);
      setIsSessionActive(false);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEndHandler);
    vapi.on("message", onMessage);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEndHandler);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
    };
  }, [onCallEnd, setConversation]);

  const toggleCall = async () => {
    try {
      if (isSessionActive) {
        await vapiRef.current.stop();
      } else {
        const assistant = {
          model: {
            provider: "openai",
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: `
                  IMPORTANT: You are a role-playing AI. Your single most important instruction is to stay in character for the entire conversation.

                  Your character is:
                  - Name: ${scenario.character_name}
                  - Role: A ${scenario.name} ${scenario.difficulty} customer/candidate.
                  - Situation: ${scenario.prompt}

                  When asked 'can you hear me?', respond naturally (e.g., 'Yes, I can hear you.').
                  When asked your name, say '${scenario.character_name}'.
                  Do not break character. Do not say you are an AI. You are ${scenario.character_name}.
                `,
              },
            ],
          },
          voice: {
            provider: "11labs",
            voiceId: "burt",
          },
          firstMessage: scenario.prompt,
        };
        await vapiRef.current.start(assistant);
      }
    } catch (err) {
      console.error("Error toggling Vapi session:", err);
    }
  };

  return { toggleCall, isSessionActive };
};

export default useVapi;
