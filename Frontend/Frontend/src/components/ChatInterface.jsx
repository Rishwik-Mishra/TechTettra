import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase setup (replace with your project values)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://gyxlljnsqyduuchkjbqd.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5eGxsam5zcXlkdXVjaGtqYnFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMzcwNDAsImV4cCI6MjA3MjcxMzA0MH0.sPPk9JiVpc8hEVjTXVB51_KZpLiH0wHeRs0pWcoJy6A";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ProjectChat({ projectId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch existing messages
  useEffect(() => {
    if (!projectId) return;

    async function loadMessages() {
      const { data, error } = await supabase
        .from("project_chats_with_user") // ✅ using the view with sender details
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: true });

      if (error) console.error("Error loading messages:", error);
      else setMessages(data);
    }

    loadMessages();

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`chat-${projectId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "project_chats",
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId]);

  // Send a new message
  async function sendMessage(e) {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { error } = await supabase.from("project_chats").insert([
      {
        project_id: projectId,
        user_id: "00000000-0000-0000-0000-000000000000", // placeholder until auth
        message: newMessage,
      },
    ]);

    if (error) {
      console.error("Error sending message:", error);
    } else {
      setNewMessage("");
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto p-4 border rounded">
      {/* Messages list */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="flex items-start gap-2 p-2 rounded bg-gray-100"
          >
            <img
              src={msg.sender_avatar || "https://placehold.co/40"}
              alt={msg.sender_name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">{msg.sender_name || "User"}</p>
              <p className="text-sm">{msg.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(msg.created_at).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input box */}
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
}
