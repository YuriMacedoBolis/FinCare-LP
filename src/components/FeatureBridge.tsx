import React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  delay?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, delay = 0 }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative will-change-transform"
    >
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
};

const FeatureBridge: React.FC = () => {
  return (
    <section
      id="como-funciona"
      className="bg-[#FF6400] py-20 md:py-32 px-6 flex justify-center overflow-hidden scroll-mt-24"
      style={{ perspective: "1200px" }}
    >
      <div className="w-full max-w-5xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h2 className="text-white text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-sans leading-[1.05]">
            Deixe o trabalho pesado com a IA.
          </h2>
          <h2
            className="text-4xl sm:text-6xl md:text-7xl font-bold italic font-playfair-italic leading-[1.05] mt-2"
            style={{ color: "#064E3B" }}
          >
            Foque nos seus sonhos.
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mt-4 md:mt-6 text-sm md:text-lg">
            A FinCare Brasil elimina a fricção da organização financeira para
            que tenha tempo e clareza para construir o seu patrimônio.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-12 md:mt-20 max-w-5xl w-full"
          style={{ perspective: "1200px" }}
        >
          <TiltCard delay={0.15}>
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#fff7ed] text-[#FF6400] flex items-center justify-center mb-6 md:mb-8">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
                <path
                  d="M13 14l2 2 4-4"
                  stroke="#FF6400"
                  strokeWidth="2.5"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-3 md:mb-4">
              Chega de planilhas.
            </h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Você não é o contador da sua própria vida. A nossa Inteligência
              Artificial lê, categoriza e organiza cada centavo automaticamente.
            </p>
          </TiltCard>

          <TiltCard delay={0.3}>
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#ecfdf5] text-[#064E3B] flex items-center justify-center mb-6 md:mb-8">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
                <path d="M22 2l-8 8" stroke="#064E3B" strokeWidth="2"></path>
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-3 md:mb-4">
              A evolução do cofrinho.
            </h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Dinheiro poupado sem propósito perde valor. Defina metas
              inteligentes — desde uma viagem de fim de ano até a sua reserva
              de emergência.
            </p>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default FeatureBridge;
