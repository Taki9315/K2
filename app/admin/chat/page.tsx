"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, Star } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockUsers } from "@/lib/admin-mock-data";

interface Message {
  id: string;
  sender: "admin" | "user";
  text: string;
  time: string;
}

const mockConversations: Record<string, Message[]> = {
  "2": [
    { id: "m1", sender: "user", text: "Hi, I'd like to discuss my lending options.", time: "10:30 AM" },
    { id: "m2", sender: "admin", text: "Of course, Mike! Let me pull up your profile.", time: "10:32 AM" },
  ],
  "3": [
    { id: "m1", sender: "user", text: "Can I get an update on my loan application?", time: "9:00 AM" },
    { id: "m2", sender: "admin", text: "Sure Emily, your application is currently under review.", time: "9:05 AM" },
  ],
};

export default function ChatPage() {
  const searchParams = useSearchParams();

  const preferredUsers = useMemo(() => mockUsers.filter((u) => u.preferred), []);
  const [selectedUser, setSelectedUser] = useState(preferredUsers[0]?.id || "");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const userId = searchParams?.get("userId") || preferredUsers[0]?.id || "";
    setSelectedUser(userId);
    setMessages(mockConversations[userId] || []);
  }, [searchParams, preferredUsers]);

  const handleSelectUser = (userId: string) => {
    setSelectedUser(userId);
    setMessages(mockConversations[userId] || []);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const msg: Message = { id: Date.now().toString(), sender: "admin", text: input, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  const currentUser = mockUsers.find((u) => u.id === selectedUser);

  return (
    <div>
      <PageHeader title="Chat" description="Communicate with preferred borrowers, lenders & networks" />
      <div className="mt-4 grid gap-4 lg:grid-cols-[280px_1fr] h-[calc(100vh-220px)]">
        {/* Contact list */}
        <div className="rounded-2xl border border-border bg-card overflow-y-auto">
          <div className="p-3 border-b border-border">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preferred Users</p>
          </div>
          {preferredUsers.map((u) => (
            <button
              key={u.id}
              onClick={() => handleSelectUser(u.id)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary ${selectedUser === u.id ? "bg-primary/5 border-l-2 border-primary" : ""}`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                {u.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{u.name}</p>
                <p className="text-xs text-muted-foreground capitalize flex items-center gap-1">
                  <Star className="h-3 w-3 fill-primary text-primary" /> {u.role}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Chat area */}
        <div className="flex flex-col rounded-2xl border border-border bg-card">
          {currentUser && (
            <div className="flex items-center gap-3 border-b border-border px-5 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-green text-primary-foreground font-bold text-sm">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
              </div>
            </div>
          )}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === "admin" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${m.sender === "admin" ? "gradient-green text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  <p>{m.text}</p>
                  <p className={`mt-1 text-[10px] ${m.sender === "admin" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border p-4 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="bg-secondary"
            />
            <Button onClick={handleSend} className="gradient-green text-primary-foreground shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
