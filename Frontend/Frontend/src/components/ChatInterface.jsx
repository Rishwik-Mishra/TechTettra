import React, { useState } from "react";

// Google Gemini API setup
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "your-gemini-key";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
  "AIzaSyAGDyZlqjkgDD_zw_cvhaWnsaDUC3bzNQ";

export default function ProjectChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(null);
  const [summary, setSummary] = useState("");

  const AI_COWORKERS = [
    { name: "Alice", avatar: "https://placehold.co/40x40?text=A", personality: "friendly, helpful, concise" },
    { name: "Bob", avatar: "https://placehold.co/40x40?text=B", personality: "analytical, detailed, slightly humorous" },
  ];

  // Call Gemini API for AI responses
  async function getAIResponse(prompt, personality) {
    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: [
            {
              author: "system",
              content: [
                {
                  type: "text",
                  text: `You are an AI coworker with personality: ${personality}. Reply naturally and conversationally.`
                },
              ],
            },
            {
              author: "user",
              content: [{ type: "text", text: prompt }]
            }
          ],
          temperature: 0.7 + Math.random() * 0.3, // add variation
          candidate_count: 1,
          max_output_tokens: 150,
        }),
      });
      const data = await response.json();
      console.log("AI Response raw data:", data); // debug
      return data?.candidates?.[0]?.content?.[0]?.text || "Sorry, I didn't understand.";
    } catch (err) {
      console.error("Error fetching AI response:", err);
      return "Error generating response.";
    }
  }

  // Summarize entire chat
  async function summarizeChat() {
    if (messages.length === 0) return;

    const chatText = messages.map((msg) => `${msg.sender}: ${msg.message}`).join("\n");

    setTyping("Summarizer");

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: [
            {
              author: "system",
              content: [
                {
                  type: "text",
                  text: "You are an AI assistant. Summarize the following chat concisely, highlighting key points from each participant."
                }
              ]
            },
            {
              author: "user",
              content: [{ type: "text", text: chatText }]
            }
          ],
          temperature: 0.5,
          candidate_count: 1,
          max_output_tokens: 200,
        }),
      });
      const data = await response.json();
      console.log("Summary raw data:", data); // debug
      const summaryText = data?.candidates?.[0]?.content?.[0]?.text || "Could not generate summary.";
      setTyping(null);
      setSummary(summaryText);
    } catch (err) {
      console.error("Error generating summary:", err);
      setTyping(null);
      setSummary("Error generating summary.");
    }
  }

  // Send user message and trigger AI coworker responses
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages((prev) => [...prev, { id: Date.now(), sender: "You", message: newMessage }]);
    const messageToSend = newMessage;
    setNewMessage("");

    for (const coworker of AI_COWORKERS) {
      setTyping(coworker.name);
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000)); // simulate thinking

      const aiText = await getAIResponse(messageToSend, coworker.personality);
      setTyping(null);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), sender: coworker.name, avatar: coworker.avatar, message: aiText },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto p-4 border rounded">
      <h1 className="text-xl font-bold mb-4 text-center">Proj Chat</h1>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 p-2 rounded ${
              msg.sender === "You" ? "bg-blue-100 justify-end" : "bg-gray-100"
            }`}
          >
            {msg.sender !== "You" && msg.avatar && (
              <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full" />
            )}
            <div className="max-w-xs">
              <p className="text-sm font-semibold text-black">{msg.sender}</p>
              <p className="text-sm text-black">{msg.message}</p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="flex items-start gap-2 p-2 rounded bg-gray-100">
            <img
              src={
                typing === "Summarizer"
                  ? "https://placehold.co/40x40?text=S"
                  : AI_COWORKERS.find((a) => a.name === typing)?.avatar
              }
              alt={typing}
              className="w-8 h-8 rounded-full"
            />
            <div className="max-w-xs">
              <p className="text-sm font-semibold text-black">{typing}</p>
              <p className="text-sm text-black italic">typing...</p>
            </div>
          </div>
        )}
      </div>

      {/* Input box */}
      <form onSubmit={sendMessage} className="flex gap-2 mb-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded text-black"
          placeholder="Type a message..."
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Send
        </button>
      </form>

      {/* Summarize button */}
      <button
        onClick={summarizeChat}
        className="mb-2 px-4 py-2 bg-green-600 text-white rounded w-full"
      >
        Summarize Chat
      </button>

      {/* Display summary */}
      {summary && (
        <div className="p-2 border rounded bg-yellow-100 text-black">
          <h2 className="font-semibold mb-1">Chat Summary:</h2>
          <p className="text-sm">{summary}</p>
        </div>
      )}
    </div>
  );
}
