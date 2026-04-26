import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type StepProps = {
  index: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  onActive: (i: number) => void;
};

const StepBlock = ({ index, icon, title, description, onActive }: StepProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.3 }}
      animate={{ opacity: inView ? 1 : 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="font-[Inter]"
    >
      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-4xl font-extrabold text-[#064E3B] mt-6">{title}</h3>
      <p className="text-slate-600 text-lg mt-4 max-w-md leading-relaxed">{description}</p>
    </motion.div>
  );
};

/* ---------------- Phone Interfaces ---------------- */

const PhoneShell = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute inset-0 bg-[#F4F6F5] overflow-hidden font-[Inter]">{children}</div>
);

const Interface1 = () => (
  <PhoneShell>
    <div className="bg-[#064E3B] text-white px-5 pt-8 pb-6">
      <p className="text-xs opacity-70">Olá, Marina</p>
      <p className="text-lg font-semibold mt-1">Sua jornada financeira</p>
    </div>
    <div className="px-4 -mt-4 space-y-3">
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold text-slate-800">Gráfico da sua conta</p>
          <span className="text-[10px] text-slate-400">Mês atual</span>
        </div>
        <div className="mt-3 h-20 relative">
          <svg viewBox="0 0 200 60" className="w-full h-full">
            <path d="M0 50 Q30 20 60 30 T120 15 T200 25" stroke="#FF6400" strokeWidth="2.5" fill="none" />
            <path d="M0 50 Q30 20 60 30 T120 15 T200 25 L200 60 L0 60 Z" fill="#FF640020" />
          </svg>
        </div>
        <button className="mt-2 text-xs text-[#FF6400] font-semibold">Ver gráfico →</button>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm relative">
        <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#FF6400] rounded-r" />
        <p className="text-sm font-semibold text-slate-800 pl-2">Visão 360º</p>
        <ul className="mt-3 space-y-2 pl-2">
          {["Patrimônio total", "Investimentos", "Reservas"].map((t, i) => (
            <li key={i} className="flex justify-between text-xs text-slate-600">
              <span>{t}</span>
              <span className="font-semibold text-slate-800">R$ {(12 - i * 3).toFixed(1)}k</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </PhoneShell>
);

const Interface2 = () => (
  <PhoneShell>
    <div className="bg-[#064E3B] text-white px-5 pt-8 pb-6">
      <p className="text-xs opacity-70">Abril 2026</p>
      <p className="text-lg font-semibold mt-1">Fluxo de Caixa</p>
    </div>
    <div className="px-4 -mt-4 space-y-3">
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex justify-between">
          <div>
            <p className="text-[10px] text-slate-400 uppercase">Entradas</p>
            <p className="text-sm font-bold text-emerald-600">+R$ 8.420</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase">Saídas</p>
            <p className="text-sm font-bold text-rose-500">-R$ 3.180</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
          <span className="text-xs text-slate-500">Total mensal</span>
          <span className="text-base font-extrabold text-[#064E3B]">R$ 5.240</span>
        </div>
        <button className="mt-3 w-full bg-[#FF6400] text-white text-xs font-semibold py-2 rounded-lg">
          Ver detalhado
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-semibold text-slate-700 mb-3">Últimas movimentações</p>
        {[
          { t: "Mercado Pago", d: "Hoje", v: "-R$ 89,90", c: "rose" },
          { t: "Salário", d: "Ontem", v: "+R$ 5.000", c: "emerald" },
          { t: "iFood", d: "23 abr", v: "-R$ 42,50", c: "rose" },
        ].map((m, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b last:border-0 border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">
                {m.t[0]}
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">{m.t}</p>
                <p className="text-[10px] text-slate-400">{m.d}</p>
              </div>
            </div>
            <span className={`text-xs font-bold text-${m.c}-600`}>{m.v}</span>
          </div>
        ))}
      </div>
    </div>
  </PhoneShell>
);

const Interface3 = () => (
  <PhoneShell>
    <div className="bg-white px-5 pt-8 pb-4 border-b border-slate-100 flex items-center justify-between">
      <div>
        <p className="text-[10px] text-slate-400">Online</p>
        <p className="text-base font-bold text-[#064E3B]">Chat FinCare</p>
      </div>
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF6400] to-[#FF8A3D] flex items-center justify-center text-white text-xs font-bold">
        M
      </div>
    </div>
    <div className="px-4 py-5 space-y-3">
      <div className="flex justify-end">
        <div className="bg-[#064E3B] text-white text-xs px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%]">
          FinCare, quanto eu gastei no Uber este mês?
          <p className="text-[9px] opacity-60 mt-1 text-right">14:32</p>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="bg-white shadow-sm text-xs px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%] text-slate-700">
          Gasto com Uber registrado.
          <span className="block mt-1 text-emerald-600 font-semibold">✓ Categoria Lazer atualizada.</span>
          <span className="block mt-1 text-base font-extrabold text-[#064E3B]">R$ 50,00</span>
          <p className="text-[9px] text-slate-400 mt-2">14:32</p>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="bg-white shadow-sm text-xs px-4 py-2 rounded-2xl rounded-tl-sm">
          <span className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-pulse" />
            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-pulse [animation-delay:120ms]" />
            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-pulse [animation-delay:240ms]" />
          </span>
        </div>
      </div>
    </div>
    <div className="absolute bottom-4 left-4 right-4 bg-white rounded-full shadow-sm flex items-center px-4 py-2">
      <input
        readOnly
        placeholder="Mensagem..."
        className="flex-1 text-xs outline-none bg-transparent"
      />
      <div className="w-7 h-7 rounded-full bg-[#FF6400] flex items-center justify-center text-white text-xs">
        →
      </div>
    </div>
  </PhoneShell>
);

const Interface4 = () => {
  const cats = [
    { t: "Delivery", s: "iFood, Rappi", v: 78, color: "bg-rose-500" },
    { t: "Lazer", s: "Uber, Cinema", v: 62, color: "bg-[#FF6400]" },
    { t: "Assinaturas", s: "Netflix, Spotify", v: 41, color: "bg-amber-500" },
    { t: "Mercado", s: "Compras semanais", v: 28, color: "bg-emerald-500" },
  ];
  return (
    <PhoneShell>
      <div className="bg-[#064E3B] text-white px-5 pt-8 pb-6">
        <p className="text-xs opacity-70">Análise IA</p>
        <p className="text-lg font-semibold mt-1">Categorias Vilãs</p>
      </div>
      <div className="px-4 -mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-700 mb-3">Onde seu dinheiro vai</p>
          <div className="space-y-4">
            {cats.map((c, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-700">
                      {c.t[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{c.t}</p>
                      <p className="text-[9px] text-slate-400">{c.s}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-700">{c.v}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneShell>
  );
};

/* ---------------- Main Component ---------------- */

const STEPS = [
  {
    title: "Visão 360º",
    description:
      "Acompanhe seu patrimônio evoluir. Nossos gráficos interativos te dão o controle absoluto sobre entradas e saídas de capital.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    ),
  },
  {
    title: "Fluxo de Caixa",
    description:
      "Controle em tempo real de suas despesas e receitas mensais. Visualize suas últimas movimentações e o saldo final previsto.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: "Seu Assistente Pessoal",
    description:
      'Basta digitar "Gastei 50 no Ifood" e a plataforma cataloga, subtrai do orçamento e organiza a categoria por você.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Categorias Vilãs",
    description:
      "A nossa IA deteta automaticamente quais os hábitos que estão a drenar a sua conta ao fim do mês.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
];

const MagneticShowcase = () => {
  const [active, setActive] = useState(0);

  const renderInterface = () => {
    switch (active) {
      case 0:
        return <Interface1 />;
      case 1:
        return <Interface2 />;
      case 2:
        return <Interface3 />;
      case 3:
        return <Interface4 />;
      default:
        return <Interface1 />;
    }
  };

  return (
    <section className="relative z-20 bg-[#F9FAFB] rounded-t-[3rem] md:rounded-t-[5rem] -mt-12 md:-mt-24 pt-24 md:pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row relative">
        {/* Left Column */}
        <div className="w-full md:w-1/2 py-[10vh] md:py-[30vh] flex flex-col gap-[30vh] md:gap-[50vh]">
          {STEPS.map((s, i) => (
            <StepBlock
              key={i}
              index={i}
              icon={s.icon}
              title={s.title}
              description={s.description}
              onActive={setActive}
            />
          ))}
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 flex items-center justify-center">
          <div className="w-[320px] h-[650px] bg-white rounded-[2.5rem] border-8 border-slate-200 shadow-2xl relative overflow-hidden flex items-center justify-center">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {renderInterface()}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MagneticShowcase;
