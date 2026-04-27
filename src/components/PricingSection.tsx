import { motion, type Variants } from "framer-motion";
import { Check, Shield } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const features = [
  "IA de Categorização Automática",
  "Sincronização em tempo real (App e PC)",
  "Dashboards de tendências e projeções",
  "Exportação de relatórios (CSV/PDF)",
];

export default function PricingSection() {
  return (
    <section className="relative z-40 bg-[#064E3B] rounded-t-[3rem] md:rounded-t-[5rem] -mt-12 md:-mt-16 pt-32 md:pt-40 pb-32 px-6 flex flex-col items-center overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-4xl flex flex-col items-center"
      >
        {/* Scarcity Badge */}
        <motion.div
          variants={itemVariants}
          className="text-xs uppercase tracking-[0.15em] font-semibold text-[#a7f3d0] border-b border-[#a7f3d0]/30 pb-2 mb-12 text-center"
        >
          LOTE DE LANÇAMENTO — 12 DE 50 VAGAS RESTANTES
        </motion.div>

        {/* Editorial Header */}
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-center">
            A hora de assumir
          </h2>
          <p className="text-5xl md:text-6xl font-playfair-italic text-[#FF6400] text-center mt-2">
            o controle.
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-[24px] w-full max-w-[440px] p-10 md:p-12 text-slate-900 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-[400ms]"
        >
          <p className="text-sm font-bold text-[#FF6400] uppercase tracking-widest mb-4">
            FinCare Starter
          </p>
          <p className="text-slate-400 line-through text-base mb-1">De R$ 14,90 por</p>
          <div className="flex items-end gap-1">
            <span className="text-2xl font-medium text-slate-900">R$</span>
            <span className="text-7xl font-light tracking-tight text-slate-900 leading-none">
              9,90
            </span>
            <span className="text-slate-500 font-normal pb-2">/mês</span>
          </div>
          <p className="text-slate-600 text-sm mt-6">
            O valor de um café para organizar a sua vida.
          </p>

          <div className="h-px w-full bg-slate-200 my-8" />

          <ul>
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-4 text-slate-700 hover:translate-x-1 hover:text-slate-900 transition-all duration-200 cursor-default mb-5"
              >
                <Check className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#064E3B" }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <button className="bg-[#FF6400] hover:bg-[#e65a00] text-white w-full py-5 rounded-xl font-semibold text-lg transition-all duration-300 relative overflow-hidden group mt-4">
            <span className="relative z-10">Garantir minha vaga agora</span>
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
          </button>
        </motion.div>

        {/* Guarantee Box */}
        <motion.div variants={itemVariants} className="mt-10 flex items-start gap-4 max-w-[440px]">
          <Shield className="text-[#a7f3d0] w-6 h-6 shrink-0 opacity-80 mt-1" />
          <p className="text-sm text-[#a7f3d0] leading-relaxed font-light opacity-90">
            <strong className="font-semibold text-white">Risco Zero.</strong> 7 dias de garantia
            incondicional. Se a plataforma não poupar horas do seu mês, cancele com um clique e
            receba 100% de volta.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
