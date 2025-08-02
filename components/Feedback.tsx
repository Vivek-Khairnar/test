"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Feedback = ({
  conversation,
}: {
  conversation: { role: string; text: string }[];
}) => {
  const data = {
    labels: conversation.map((_, i) => `Turn ${i + 1}`),
    datasets: [
      {
        label: "Sentiment Score",
        data: conversation.map(() => Math.random() * 10 - 5), // Dummy data
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl p-4">
      <h2 className="text-2xl font-bold mb-4">Call Feedback</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Conversation Transcript</h3>
        <div className="h-64 overflow-y-auto border p-4 rounded-lg">
          {conversation.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 ${
                msg.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  msg.role === "user" ? "bg-blue-200" : "bg-gray-200"
                }`}
              >
                <strong>{msg.role}:</strong> {msg.text}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Sentiment Analysis</h3>
        <Line data={data} />
      </div>
    </div>
  );
};

export default Feedback;
