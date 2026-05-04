import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useScroll } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowDownLeft,
  ArrowUpRight,
  Pencil,
  Trash2,
  FileText,
  Plus,
  MessageCircle,
  BarChart3,
  User,
  ArrowLeft,
  Eye,
  LogOut,
  Send,
  Flame,
} from "lucide-react";

/* ---------------- Step block (left column) ---------------- */

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
      data-feature-id={`feature${index + 1}`}
      data-scroll-detect
      initial={{ opacity: 0.3 }}
      animate={{ opacity: inView ? 1 : 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="font-[Inter] text-left"
    >
      <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-3 md:mb-6">
        {icon}
      </div>
      <h3 className="text-2xl md:text-4xl font-extrabold text-[#064E3B] leading-tight">{title}</h3>
      <p className="text-slate-600 text-sm md:text-lg mt-2 md:mt-4 max-w-md leading-relaxed">{description}</p>
    </motion.div>
  );
};

/* ---------------- Phone shell + shared chrome ---------------- */

const PhoneHeader = ({ name = "Teste" }: { name?: string }) => (
  <div className="flex items-start justify-between px-5 pt-6 pb-4">
    <div>
      <p className="text-[11px] text-slate-500">Bem-vindo de volta</p>
      <p className="text-base font-extrabold text-[#064E3B]">
        Olá, {name} <span className="ml-0.5">👋</span>
      </p>
    </div>
    <div className="flex items-center gap-3 text-slate-500">
      <Eye className="w-4 h-4" />
      <LogOut className="w-4 h-4" />
    </div>
  </div>
);

const PhoneNav = ({ active }: { active: "relatorio" | "adicionar" | "chat" | "analise" | "perfil" }) => {
  const items: { key: typeof active; label: string; icon: React.ReactNode }[] = [
    { key: "relatorio", label: "Relatório", icon: <FileText className="w-4 h-4" /> },
    { key: "adicionar", label: "Adicionar", icon: <Plus className="w-4 h-4" /> },
    { key: "chat", label: "", icon: <MessageCircle className="w-5 h-5 text-white" /> },
    { key: "analise", label: "Análise", icon: <BarChart3 className="w-4 h-4" /> },
    { key: "perfil", label: "Perfil", icon: <User className="w-4 h-4" /> },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-3 pt-2 pb-3 flex items-end justify-between">
      {items.map((it) => {
        const isCenter = it.key === "chat";
        const isActive = it.key === active;
        if (isCenter) {
          return (
            <div key={it.key} className="-mt-6 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#FF6400] shadow-lg flex items-center justify-center">
                {it.icon}
              </div>
            </div>
          );
        }
        return (
          <div
            key={it.key}
            className={`flex flex-col items-center gap-0.5 ${
              isActive ? "text-[#FF6400]" : "text-slate-500"
            }`}
          >
            {it.icon}
            <span className="text-[10px] font-medium">{it.label}</span>
          </div>
        );
      })}
    </div>
  );
};

const PhoneShell = ({
  children,
  bg = "bg-[#F4EFEA]",
}: {
  children: React.ReactNode;
  bg?: string;
}) => (
  <div className={`absolute inset-0 ${bg} overflow-hidden font-[Inter] flex flex-col`}>
    {children}
  </div>
);

/* ---------------- Donut chart helper ---------------- */

type Slice = { value: number; color: string; label: string };

const Donut = ({ slices, size = 130, stroke = 22 }: { slices: Slice[]; size?: number; stroke?: number }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = slices.reduce((a, b) => a + b.value, 0);
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {slices.map((s, i) => {
          const len = (s.value / total) * circumference;
          const dasharray = `${len} ${circumference - len}`;
          const el = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={dasharray}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return el;
        })}
      </g>
    </svg>
  );
};

/* ---------------- Interface 1: Dashboard ---------------- */

const Interface1 = () => {
  const slices: Slice[] = [
    { value: 35, color: "#7C6AE8", label: "Compras" },
    { value: 12, color: "#21B07A", label: "Lazer" },
    { value: 18, color: "#FF6400", label: "Alimentação" },
    { value: 25, color: "#E94B4B", label: "Transporte" },
    { value: 10, color: "#A56BD4", label: "Saúde" },
  ];
  return (
    <PhoneShell>
      <PhoneHeader />
      <div className="flex-1 overflow-hidden px-4 space-y-3 pb-24">
        {/* Saldo */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFE3D1] flex items-center justify-center">
            <Wallet className="w-5 h-5 text-[#FF6400]" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500">Saldo do Mês</p>
            <p className="text-base font-extrabold text-[#FF6400]">R$ 2.140,50</p>
          </div>
        </div>
        {/* Receitas */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#DDF2E4] flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500">Receitas</p>
            <p className="text-base font-extrabold text-emerald-600">R$ 3.000,00</p>
          </div>
        </div>
        {/* Despesas */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFE3D1] flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-[#FF6400]" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500">Despesas</p>
            <p className="text-base font-extrabold text-[#FF6400]">R$ 859,50</p>
          </div>
        </div>
        {/* Donut */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-sm font-bold text-[#064E3B] mb-2">Despesas por Categoria</p>
          <div className="flex items-center justify-center py-2">
            <Donut slices={slices} />
          </div>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2">
            {slices.map((s, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-[10px] text-slate-600">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PhoneNav active="relatorio" />
    </PhoneShell>
  );
};

/* ---------------- Interface 2: Análise ---------------- */

const Interface2 = () => {
  const months = [
    { m: "nov", r: 0, d: 0 },
    { m: "dez", r: 0, d: 0 },
    { m: "jan", r: 0, d: 0 },
    { m: "fev", r: 0, d: 0 },
    { m: "mar", r: 0, d: 0 },
    { m: "abr", r: 3000, d: 859 },
  ];
  const max = 3000;
  return (
    <PhoneShell>
      <div className="px-5 pt-6 pb-4 flex items-center gap-2">
        <ArrowLeft className="w-4 h-4 text-[#064E3B]" />
        <p className="text-base font-extrabold text-[#064E3B]">Análise</p>
      </div>
      <div className="flex-1 overflow-hidden px-4 space-y-3 pb-24">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-sm font-bold text-[#064E3B] mb-3">Evolução Financeira</p>
          <div className="bg-slate-100 rounded-full p-1 flex text-[11px] font-semibold mb-3">
            <div className="flex-1 text-center py-1 text-slate-500">Semanal</div>
            <div className="flex-1 text-center py-1 rounded-full bg-[#FF6400] text-white">Mensal</div>
          </div>
          <div className="relative h-28">
            <div className="absolute inset-0 flex flex-col justify-between text-[8px] text-slate-400">
              <span>3k</span>
              <span>2k</span>
              <span>2k</span>
              <span>750</span>
              <span>0</span>
            </div>
            <div className="absolute left-5 right-0 top-0 bottom-4 flex items-end justify-between">
              {months.map((mo, i) => (
                <div key={i} className="flex items-end gap-0.5 h-full">
                  <div
                    className="w-1.5 bg-emerald-400 rounded-sm"
                    style={{ height: `${(mo.r / max) * 100}%` }}
                  />
                  <div
                    className="w-1.5 bg-[#FF6400] rounded-sm"
                    style={{ height: `${(mo.d / max) * 100}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="absolute left-5 right-0 bottom-0 flex justify-between text-[8px] text-slate-500">
              {months.map((mo, i) => (
                <span key={i}>{mo.m}</span>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-2 text-[10px]">
            <span className="flex items-center gap-1 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Receitas
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-[#FF6400]" /> Despesas
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 shadow-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#FF6400]" />
            <p className="text-xs font-bold text-[#064E3B]">Comparativo Mensal</p>
          </div>
          <p className="text-xl font-extrabold text-[#064E3B] mt-1">R$ 859,50</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Sem dados do mês anterior para comparação.</p>
        </div>

        <div className="bg-white rounded-2xl p-3.5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-[#FF6400]" />
            <p className="text-xs font-bold text-[#064E3B]">Categorias Vilãs</p>
          </div>
          {[
            { p: "1º", t: "Compras", v: "R$ 430,50" },
            { p: "2º", t: "Transporte", v: "R$ 200,00" },
            { p: "3º", t: "Alimentação", v: "R$ 129,00" },
          ].map((c, i) => (
            <div key={i} className="flex justify-between items-center py-1 text-[11px]">
              <span className="flex gap-2">
                <span className="text-slate-400 font-semibold">{c.p}</span>
                <span className="text-slate-700 font-semibold">{c.t}</span>
              </span>
              <span className="font-bold text-[#064E3B]">{c.v}</span>
            </div>
          ))}
        </div>
      </div>
      <PhoneNav active="analise" />
    </PhoneShell>
  );
};

/* ---------------- Interface 3: Metas ---------------- */

const Interface3 = () => {
  const tx = [
    { t: "Recebimento de salário de freelance", d: "26/04", v: "+R$ 700,00", in: true },
    { t: "Parcela do celular", d: "26/04", v: "-R$ 350,00", in: false },
    { t: "Venda de artigos", d: "26/04", v: "-R$ 50,00", in: false },
    { t: "Freelance: recebimento de pagamento", d: "26/04", v: "+R$ 300,00", in: true },
    { t: "Bebida", d: "26/04", v: "-R$ 50,00", in: false },
  ];
  return (
    <PhoneShell>
      <PhoneHeader />
      <div className="flex-1 overflow-hidden px-4 space-y-3 pb-24">
        <div className="bg-white rounded-2xl p-3.5 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-bold text-[#064E3B]">Últimas Transações</p>
            <span className="text-[10px] bg-slate-100 text-slate-600 rounded-full px-2 py-0.5">Ver Tudo</span>
          </div>
          {tx.map((t, i) => (
            <div key={i} className="flex items-center gap-2 py-1.5 border-b last:border-0 border-slate-100">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center ${
                  t.in ? "bg-emerald-100" : "bg-orange-100"
                }`}
              >
                {t.in ? (
                  <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6400]" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-semibold text-slate-800 leading-tight">{t.t}</p>
                <p className="text-[9px] text-slate-400">{t.d}</p>
              </div>
              <span className={`text-[11px] font-bold ${t.in ? "text-emerald-600" : "text-[#FF6400]"}`}>
                {t.v}
              </span>
              <Pencil className="w-3 h-3 text-slate-400" />
              <Trash2 className="w-3 h-3 text-rose-400" />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-3.5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-bold text-[#064E3B]">Minhas Metas</p>
            <span className="text-[10px] text-[#FF6400] font-semibold">+ Nova Meta</span>
          </div>
          {[
            { t: "Parcela do Carro", v: "R$ 0,00 / R$ 475,00", p: 0 },
            { t: "Viagem para Paris", v: "R$ 0,00 / R$ 500,00", p: 0 },
          ].map((g, i) => (
            <div key={i} className="py-2">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-semibold text-slate-800">{g.t}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">{g.v}</span>
                  <Pencil className="w-3 h-3 text-slate-400" />
                  <Trash2 className="w-3 h-3 text-rose-400" />
                </div>
              </div>
              <div className="h-1 mt-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#FF6400]" style={{ width: `${g.p}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <PhoneNav active="relatorio" />
    </PhoneShell>
  );
};

/* ---------------- Interface 4: Chat ---------------- */

const Interface4 = () => (
  <PhoneShell bg="bg-[#F4EFEA]">
    <div className="px-5 pt-6 pb-3 flex items-center justify-between border-b border-black/5">
      <div className="flex items-center gap-2">
        <ArrowLeft className="w-4 h-4 text-[#064E3B]" />
        <div>
          <p className="text-sm font-extrabold text-[#064E3B]">Assistente FinCare Brasil</p>
          <p className="text-[10px] text-slate-500">Online</p>
        </div>
      </div>
      <Trash2 className="w-4 h-4 text-[#064E3B]" />
    </div>
    <div className="flex-1 overflow-hidden px-3 py-3 space-y-2">
      <div className="flex">
        <div className="bg-white text-[10px] text-slate-700 px-3 py-2 rounded-2xl rounded-tl-sm max-w-[80%] shadow-sm">
          Olá! Sou o Assistente FinCare Brasil. Como posso ajudar com suas finanças hoje?
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-[#FF6400] text-white text-[10px] px-3 py-2 rounded-2xl rounded-tr-sm max-w-[80%] font-medium">
          paguei a parcela do meu celular, foi 350 reais
        </div>
      </div>
      <div className="flex">
        <div className="bg-white text-[10px] text-slate-700 px-3 py-2 rounded-2xl rounded-tl-sm max-w-[85%] shadow-sm leading-relaxed">
          <p className="font-semibold mb-1">Feito!</p>
          <p className="mb-1">Aqui está o resumo:</p>
          <p>💸 Tipo: saída,</p>
          <p>🏷️ Categoria: Compras,</p>
          <p>📝 Descrição: Parcela do celular,</p>
          <p>💰 Valor: R$ 350,00</p>
          <p>📅 Data: 26/04/2026.</p>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-[#FF6400] text-white text-[10px] px-3 py-2 rounded-2xl rounded-tr-sm max-w-[80%] font-medium">
          recebi dinheiro do meu freelance, 700 reais
        </div>
      </div>
    </div>
    <div className="px-3 pb-4 pt-2 flex items-center gap-2">
      <div className="flex-1 bg-white rounded-full px-3 py-2 text-[10px] text-slate-400 shadow-sm">
        Digite sua mensagem...
      </div>
      <div className="w-8 h-8 rounded-lg bg-[#FF6400] flex items-center justify-center shadow">
        <Send className="w-3.5 h-3.5 text-white" />
      </div>
    </div>
  </PhoneShell>
);

/* ---------------- Steps definition ---------------- */

const STEPS = [
  {
    title: "Visão 360º",
    description:
      "Tenha clareza absoluta sobre o seu dinheiro. Acompanhe o seu saldo, receitas e despesas com gráficos dinâmicos em tempo real.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    ),
  },
  {
    title: "Análise Inteligente",
    description:
      "Descubra para onde o seu dinheiro está indo. A nossa inteligência identifica as Categorias Vilãs que mais consomem o seu orçamento.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Metas de Vida",
    description:
      "Transforme sonhos em planos concretos. Crie metas financeiras, como uma viagem ou um carro novo, e acompanhe o seu progresso.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "O seu Assistente Pessoal",
    description:
      "Esqueça os formulários complexos. Registe os seus gastos enviando uma simples mensagem para o seu assistente inteligente.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

/* ---------------- Mobile Pinned Scrollytelling ---------------- */

const MOBILE_FEATURES = [
  {
    title: "Visão 360º do seu dinheiro",
    description:
      "Acompanhe saldo, receitas e despesas em tempo real, com gráficos claros direto no seu bolso.",
    interfaceIndex: 0,
  },
  {
    title: "Análise Inteligente",
    description:
      "Descubra suas Categorias Vilãs e entenda exatamente para onde o seu dinheiro está indo todo mês.",
    interfaceIndex: 1,
  },
  {
    title: "Converse com sua IA",
    description:
      "Esqueça formulários. Mande uma mensagem como 'paguei 350 no celular' e pronto: tudo organizado.",
    interfaceIndex: 3,
  },
];

const MobileScrollytelling = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (p) => {
      // Divide [0,1] into 3 equal segments
      const idx = Math.min(MOBILE_FEATURES.length - 1, Math.floor(p * MOBILE_FEATURES.length));
      setActiveIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const current = MOBILE_FEATURES[activeIndex];

  const renderInterface = (i: number) => {
    switch (i) {
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
    <section ref={wrapperRef} className="relative w-full h-[300vh] bg-[#F9FAFB]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start overflow-hidden px-6 pt-6 pb-8">
        {/* Phone */}
        <div className="w-[240px] h-[460px] bg-[#F4EFEA] rounded-[2rem] border-[8px] border-white shadow-2xl relative overflow-hidden flex flex-col shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.interfaceIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {renderInterface(current.interfaceIndex)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fixed-height text container — prevents layout jump */}
        <div className="h-40 mt-6 w-full max-w-md flex items-start justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h3 className="text-xl font-extrabold text-[#064E3B] leading-tight">
                {current.title}
              </h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                {current.description}
              </p>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {MOBILE_FEATURES.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-6 bg-[#FF6400]" : "w-1.5 bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Main ---------------- */

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
    <>
      {/* Mobile: pinned scrollytelling */}
      <div className="block md:hidden">
        <MobileScrollytelling />
      </div>

      {/* Desktop: side-by-side sticky scroll layout */}
      <section className="hidden md:block relative z-20 bg-[#F9FAFB] rounded-t-[5rem] -mt-24 pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-row gap-16 py-24 px-6">
          {/* Left Column — scrolling text blocks */}
          <div className="w-1/2 flex flex-col gap-32 py-[20vh]">
            {STEPS.map((s, i) => (
              <div key={i} className="h-[50vh] flex flex-col justify-center">
                <StepBlock
                  index={i}
                  icon={s.icon}
                  title={s.title}
                  description={s.description}
                  onActive={setActive}
                />
              </div>
            ))}
          </div>

          {/* Right Column — sticky iPhone mockup */}
          <div className="w-1/2 relative">
            <div className="sticky top-24 h-[80vh] flex items-center justify-center">
              <div className="w-[320px] h-[640px] bg-gray-900 rounded-[3rem] p-2 border-[8px] border-gray-800 shadow-2xl relative">
                <div className="bg-white h-full w-full rounded-[2.5rem] overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      {renderInterface()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MagneticShowcase;
