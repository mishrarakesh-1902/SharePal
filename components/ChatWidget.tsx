"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send, Bot, Sparkles } from "lucide-react";

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "bot" | "user"; text: string }[]>([
    {
      sender: "bot",
      text: "👋 Hi there! Welcome to SharePal Bangalore. Looking to rent a PS5, VR headset, or camera gear? How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const quickReplies = [
    "What is the delivery time?",
    "Is deposit required?",
    "Can I extend my PS5 rental?",
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg = text.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");

    setTimeout(() => {
      let botResponse =
        "Thanks for reaching out! Our Bangalore team provides same-day doorstep delivery with sanitization and zero security deposit on KYC verification.";

      if (userMsg.toLowerCase().includes("delivery")) {
        botResponse =
          "We deliver between 5PM and 11PM for Bangalore orders, and pickup between 9AM and 1PM with zero turnaround charges.";
      } else if (userMsg.toLowerCase().includes("deposit")) {
        botResponse =
          "We offer Zero Security Deposit on all standard rentals with a quick 2-minute digital KYC verification!";
      } else if (userMsg.toLowerCase().includes("extend")) {
        botResponse =
          "Yes! You can extend your rental anytime before scheduled pickup with discounted long-term rental rates.";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat Popup Panel */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl border border-slate-200 bg-white shadow-2xl animate-in slide-in-from-bottom-5 duration-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-[#3d0b5e] to-[#2563eb] p-4 text-white">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-[#8ee600]">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold">SharePal Support</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-green-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8ee600] animate-pulse" />
                  <span>Online • Instant assistance</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-white/80 hover:bg-white/10 hover:text-white transition"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3 bg-slate-50/50 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#3d0b5e] text-white rounded-br-none"
                      : "bg-white text-slate-800 shadow-sm border border-slate-100 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="p-2 border-t border-slate-100 bg-white flex flex-wrap gap-1.5">
            {quickReplies.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2 border-t border-slate-100 p-3 bg-white"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3d0b5e] text-white transition hover:bg-[#30064c] active:scale-95"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Open Customer Chat Support"
      >
        {/* Overlapping double bubble icon matching SharePal screenshots */}
        <div className="absolute -left-0.5 -bottom-0.5 flex h-11 w-11 items-center justify-center rounded-full bg-[#8ee600] shadow-md transition-transform group-hover:scale-105">
          <MessageSquare className="h-5 w-5 text-slate-950 fill-current" />
        </div>
        <div className="absolute -right-0.5 -top-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#2563eb] shadow-md transition-transform group-hover:scale-105">
          <div className="flex space-x-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce" />
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce [animation-delay:0.2s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
          </div>
        </div>
      </button>
    </div>
  );
};
