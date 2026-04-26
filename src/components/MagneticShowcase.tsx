import { motion } from "framer-motion";

const steps = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
        <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
      </svg>
    ),
    title: "Visão 360º",
    text: "Acompanhe seu patrimônio evoluir. Nossos gráficos interativos te dão o controle absoluto sobre entradas e saídas de capital.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
    title: "Seu Assistente Pessoal",
    text: 'Basta digitar "Gastei 50 no Ifood" e a plataforma cataloga, subtrai do orçamento e organiza a categoria por você.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
      </svg>
    ),
    title: "Metas Inteligentes",
    text: "A evolução do cofrinho. Determine um objetivo financeiro e veja a barra de progresso encher mês a mês rumo ao seu sonho.",
  },
];

const MagneticShowcase = () => {
  return (
    <section className="relative z-20 bg-[#F9FAFB] rounded-t-[3rem] md:rounded-t-[5rem] -mt-12 md:-mt-24 pt-24 md:pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row relative">
        {/* Left Column: Scrollable Text Steps */}
        <div className="w-full md:w-1/2 py-[10vh] md:py-[30vh] flex flex-col gap-[30vh] md:gap-[50vh]">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0.3 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="text-4xl font-extrabold text-[#064E3B] mt-6">
                {step.title}
              </h3>
              <p className="text-lg text-slate-600 mt-4">{step.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Right Column: Sticky Visual */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 flex items-center justify-center">
          <div className="w-[300px] h-[600px] bg-white rounded-[2.5rem] border-8 border-slate-200 shadow-2xl relative overflow-hidden flex items-center justify-center">
            <motion.div
              key="placeholder"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-slate-400 text-lg font-medium"
            >
              Interface Visual
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MagneticShowcase;
