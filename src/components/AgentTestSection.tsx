'use client';
import React, { useEffect, useRef, useState, FormEvent } from 'react';
import { Send } from 'lucide-react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

type Message = {
  role: 'user' | 'ai';
  text: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    role: 'ai',
    text:
      "Olá! Sou a IA da FinCare. Quer ver como eu categorizo despesas? Tente digitar algo como: 'Gastei 45 no ifood hoje'",
  },
];

export default function AgentTestSection() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://n8n-self.duckdns.org/webhook/AgnteTestDrive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.text();
      let aiText = data;

      try {
        const parsed = JSON.parse(data);
        if (parsed.reply) {
          aiText = parsed.reply;
        }
      } catch {
        // Plain text response — keep aiText as is.
      }

      setMessages((prev) => [...prev, { role: 'ai', text: aiText }]);
    } catch {
      // Erro silencioso — exibimos mensagem amigável ao usuário abaixo.
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: 'Ops! Nosso agente teve um pequeno soluço de conexão. Tente novamente em alguns segundos. 🧡',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="teste-ia" className="bg-white scroll-mt-24">
      <ContainerScroll
        titleComponent={
          <>
            <h2 className="text-2xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Não acredite em nós. <br />
              <span className="font-serif italic text-[#FF6400]">Teste você mesmo.</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-lg max-w-xl mx-auto mt-4 px-4 md:px-0">
              Simule um gasto no chat abaixo e veja como a nossa IA processa e categoriza a
              informação em milissegundos.
            </p>
          </>
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF6400] to-[#ff8a3d] flex items-center justify-center text-white font-semibold text-sm">
              F
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-900">FinCare Assistant</span>
              <span className="text-xs text-slate-500">IA financeira</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-xs text-slate-600">online</span>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-3 bg-slate-50">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] md:max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-[#FF6400] text-white rounded-br-sm'
                    : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-800 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-4 md:px-5 py-3 border-t border-slate-200 bg-white shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite uma despesa..."
            className="flex-1 h-11 px-4 rounded-full bg-slate-100 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6400]/40"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="h-11 w-11 shrink-0 rounded-full bg-[#FF6400] text-white flex items-center justify-center hover:bg-[#e85a00] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Enviar mensagem"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </ContainerScroll>
    </section>
  );
}
