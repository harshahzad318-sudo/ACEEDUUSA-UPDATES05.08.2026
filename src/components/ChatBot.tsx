"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

const KNOWLEDGE = {
  subjects: "We offer tutoring in Math, English, Reading, Writing, Science, Biology, Chemistry, Physics, Homework Help, and Study Skills.",
  pricing: "Online private lessons start at $45/hour, group lessons at $25/hour. In-home private lessons start at $65/hour. Monthly packages offer 11-16% savings. Family discount: 15% off for 2+ siblings.",
  curriculum: "We cover Common Core, AP, IB, IGCSE, A Levels, SAT, ACT, GED, IELTS, and TOEFL curricula.",
  tutors: "All our tutors hold at minimum a bachelor's degree with many having master's and doctoral degrees. They undergo rigorous background checks and ongoing professional development.",
  online: "Online sessions use our interactive platform with video conferencing, shared whiteboard, and real-time collaboration. Available nationwide.",
  home: "In-home tutoring is available in major metropolitan areas across 18+ states. Our tutors come to your home at your preferred schedule.",
  support: "We offer specialized learning support for ADHD, Dyslexia, Study Skills, and Homework Help with evidence-based approaches.",
  assessment: "We offer a FREE academic assessment to evaluate your child's needs and match them with the perfect tutor. Book at aceeducation.us/book-assessment.",
  contact: "Phone: +1 (332) 293-6270 | Email: info@aceeducation.us | Telegram: @ACEeducationUSA",
  schedule: "Lessons available mornings, afternoons, and evenings. Weekdays and weekends. Flexible scheduling to fit your family's needs.",
  states: "We serve families in California, Texas, New York, Florida, Illinois, Virginia, Washington, Georgia, Colorado, Arizona, Nevada, New Jersey, Massachusetts, Pennsylvania, Ohio, Michigan, North Carolina, and South Carolina.",
};

function getResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("price") || lower.includes("cost") || lower.includes("fee") || lower.includes("rate")) return KNOWLEDGE.pricing;
  if (lower.includes("subject") || lower.includes("math") || lower.includes("english") || lower.includes("science")) return KNOWLEDGE.subjects;
  if (lower.includes("curriculum") || lower.includes("common core") || lower.includes("ap ") || lower.includes("ib ")) return KNOWLEDGE.curriculum;
  if (lower.includes("tutor") || lower.includes("teacher") || lower.includes("instructor")) return KNOWLEDGE.tutors;
  if (lower.includes("online") || lower.includes("virtual") || lower.includes("remote")) return KNOWLEDGE.online;
  if (lower.includes("home") || lower.includes("in-person") || lower.includes("face to face")) return KNOWLEDGE.home;
  if (lower.includes("adhd") || lower.includes("dyslexia") || lower.includes("learning support") || lower.includes("special")) return KNOWLEDGE.support;
  if (lower.includes("assess") || lower.includes("trial") || lower.includes("free")) return KNOWLEDGE.assessment;
  if (lower.includes("contact") || lower.includes("phone") || lower.includes("email") || lower.includes("reach")) return KNOWLEDGE.contact;
  if (lower.includes("schedule") || lower.includes("time") || lower.includes("available") || lower.includes("when")) return KNOWLEDGE.schedule;
  if (lower.includes("state") || lower.includes("location") || lower.includes("where") || lower.includes("area")) return KNOWLEDGE.states;
  return "Thank you for your interest in ACE Education! I'd love to help you find the right tutoring solution. Could you tell me more about what you're looking for? You can ask about our subjects, pricing, tutors, curriculum, or schedule. Or I can connect you with our admissions team — just share your name and email!";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    { role: "bot", text: "Hi! 👋 I'm ACE's admissions assistant. I can help you learn about our tutoring programs, pricing, curriculum, and more. What would you like to know?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getResponse(userMsg) }]);
    }, 600);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-navy rounded-full flex items-center justify-center shadow-2xl shadow-navy/30 hover:scale-110 transition-transform"
        aria-label="Chat with us"
        style={{ animation: "pulse-gold 2s infinite" }}
      >
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-gold" />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl shadow-navy/20 border border-gray-100 flex flex-col overflow-hidden" style={{ height: "500px" }}>
          {/* Header */}
          <div className="bg-navy text-white px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-gold" />
            </div>
            <div>
              <div className="font-semibold text-sm">ACE Admissions Assistant</div>
              <div className="text-xs text-white/60 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" /> Online
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-navy/10 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5 text-navy" />
                  </div>
                )}
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-navy text-white rounded-br-md"
                    : "bg-bg-light text-gray-700 rounded-bl-md"
                }`}>
                  {m.text}
                </div>
                {m.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-3.5 h-3.5 text-gold-dark" />
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 px-4 py-3">
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 bg-bg-light border-0 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
              />
              <button type="submit" className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center hover:bg-navy-light transition-colors">
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
