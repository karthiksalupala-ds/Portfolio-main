import React, { useState, useRef, useEffect } from 'react';
import {
  personalInfo,
  projects,
  technicalSkills,
  certificates,
  educationContent,
  socialLinks,
} from '../data/portfolioData';

// ── Build a rich system prompt from portfolioData ──────────────────────────────
const buildSystemPrompt = () => {
  const skillList = technicalSkills.categories
    .map(cat => `${cat.title}: ${cat.skills.map(s => s.name).join(', ')}`)
    .join('\n');

  const projectList = projects
    .map(p => `• ${p.title} — ${p.description} (Stack: ${p.techTags.join(', ')})`)
    .join('\n');

  const certList = certificates.featured
    .map(c => `• ${c.name} by ${c.issuer}`)
    .join('\n');

  const eduList = educationContent.categories
    .map(e => `• ${e.title} | ${e.description} | ${e.stats}`)
    .join('\n');

  return `You are "Ask Karthik", a friendly AI assistant representing ${personalInfo.name}'s portfolio.
Answer questions concisely and helpfully on behalf of Karthik. Speak in first person as Karthik.
Keep answers short — 2–4 sentences unless asked for more detail.
If asked something you don't know about Karthik, say so honestly.

== About Karthik ==
${personalInfo.summary}
Location: ${personalInfo.location}
Email: ${personalInfo.emails.primary}
GitHub: ${socialLinks.github}
LinkedIn: ${socialLinks.linkedin}

== Education ==
${eduList}

== Technical Skills ==
${skillList}

== Projects ==
${projectList}

== Certificates ==
${certList}

== Availability ==
Karthik is open to internship opportunities, freelance projects, and collaborations.
Contact him at ${personalInfo.emails.primary}.`;
};

const SUGGESTED_QUESTIONS = [
  'What projects have you built?',
  'What are your top skills?',
  'Are you available for freelance?',
  'Tell me about yourself',
];

// ── Chat message component ─────────────────────────────────────────────────────
const Message = ({ msg }) => (
  <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
    {msg.role === 'assistant' && (
      <div className="w-7 h-7 rounded-full bg-[#ff2a2a] flex items-center justify-center text-white text-xs font-black mr-2 shrink-0 mt-1">
        K
      </div>
    )}
    <div
      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-medium leading-relaxed ${
        msg.role === 'user'
          ? 'bg-[#ff2a2a] text-white rounded-tr-sm'
          : 'bg-white/10 text-white/90 rounded-tl-sm border border-white/10'
      }`}
    >
      {msg.content}
    </div>
  </div>
);

// ── Typing indicator ───────────────────────────────────────────────────────────
const TypingIndicator = () => (
  <div className="flex items-center gap-2 mb-3">
    <div className="w-7 h-7 rounded-full bg-[#ff2a2a] flex items-center justify-center text-white text-xs font-black shrink-0">
      K
    </div>
    <div className="bg-white/10 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
);

// ── Main AskKarthik component ──────────────────────────────────────────────────
const AskKarthik = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm Ask Karthik 👋 — an AI that knows everything about Karthik's work, skills, and projects. What would you like to know?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || isLoading) return;
    setInput('');

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: buildSystemPrompt() },
            ...newMessages.map(m => ({ role: m.role, content: m.content })),
          ],
        }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      const reply = data.reply || "I couldn't get a response. Please try again!";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      // Fallback: /api/chat not available (local dev without Vercel CLI)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `The AI chat is only active on the live site. In the meantime, reach Karthik directly at ${personalInfo.emails.primary} or visit ${socialLinks.github} 🚀`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating bubble button */}
      <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end gap-3 pointer-events-none">

        {/* Chat panel */}
        <div
          className={`transition-all duration-500 origin-bottom-right pointer-events-auto ${
            isOpen
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
          }`}
        >
          <div className="w-[340px] md:w-[380px] bg-[#0f0f0f] border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="bg-[#ff2a2a] px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-lg">
                  K
                </div>
                <div>
                  <p className="text-white font-black text-sm">Ask Karthik</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                    <span className="text-white/80 text-xs font-medium">AI · Always online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-1"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 scroll-smooth" style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}>
              {messages.map((msg, i) => (
                <Message key={i} msg={msg} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Suggested questions (show only if first message) */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 pb-3 flex flex-wrap gap-2 shrink-0">
                {SUGGESTED_QUESTIONS.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-[#ff2a2a]/20 hover:border-[#ff2a2a]/40 hover:text-white transition-all duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input area */}
            <div className="px-4 py-3 border-t border-white/10 flex items-center gap-2 shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about Karthik..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#ff2a2a]/50 transition-colors"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 rounded-full bg-[#ff2a2a] flex items-center justify-center text-white hover:bg-red-600 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                aria-label="Send"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bubble Button */}
        <button
          onClick={() => setIsOpen(true)}
          className={`w-14 h-14 rounded-full bg-[#ff2a2a] text-white shadow-[0_0_20px_rgba(255,42,42,0.4)] hover:shadow-[0_0_30px_rgba(255,42,42,0.6)] hover:scale-110 transition-all duration-300 flex items-center justify-center relative overflow-hidden group pointer-events-auto ${
            isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
          }`}
          aria-label="Open chat assistant"
        >
          {hasUnread && !isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <span className="w-2.5 h-2.5 bg-[#ff2a2a] rounded-full animate-ping absolute" />
              <span className="w-2.5 h-2.5 bg-[#ff2a2a] rounded-full relative" />
            </span>
          )}

          <div className={`transition-all duration-300 ${isOpen ? 'rotate-90 scale-75' : 'rotate-0 scale-100'}`}>
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </svg>
            )}
          </div>
        </button>
      </div>
    </>
  );
};

export default AskKarthik;
