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
  className?: string;
  centered?: boolean;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  delay = 0,
  className = "",
  centered = false,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
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
        backgroundImage: "linear-gradient(160deg, #FFFFFF 0%, #F8FAFC 100%)",
        boxShadow:
          "0 40px 80px -20px rgba(15, 23, 42, 0.15), 0 20px 40px -20px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.04)",
      }}
      className={`group rounded-3xl p-12 md:p-16 relative will-change-transform border border-slate-100 ${className}`}
    >
      <div
        style={{ transform: "translateZ(40px)" }}
        className={centered ? "flex flex-col items-center text-center" : ""}
      >
        {children}
      </div>
    </motion.div>
  );
};

const iconWrapperBase =
  "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 ease-out group-hover:-rotate-[5deg] group-hover:scale-105";

const FeatureBridge: React.FC = () => {
  return (
    <section
      className="bg-white rounded-t-[3rem] md:rounded-t-[5rem] -mt-12 md:-mt-24 pt-24 md:pt-32 pb-20 px-6 z-10 relative"
      style={{ perspective: "1200px" }}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl"
        >
          <h2 className="text-slate-900 text-5xl md:text-6xl font-extrabold tracking-tight font-sans leading-[1.05]">
            Deixe o trabalho pesado com a IA.
          </h2>
          <h2
            className="text-5xl md:text-6xl font-medium italic font-playfair-italic leading-[1.1] mt-3"
            style={{ color: "#FF6400", fontFamily: "'Playfair Display', serif" }}
          >
            Foque nos seus sonhos.
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto mt-8 text-lg leading-relaxed">
            A FinCare Brasil elimina a fricção da organização financeira para
            que tenha tempo e clareza para construir o seu patrimônio.
          </p>
        </motion.div>

        <div
          className="grid md:grid-cols-2 gap-10 mt-20 max-w-5xl w-full mx-auto"
          style={{ perspective: "1200px" }}
        >
          <TiltCard delay={0.15}>
            <div
              className={`${iconWrapperBase} bg-[#fff7ed] text-[#FF6400]`}
            >
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
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Chega de planilhas.
            </h3>
            <p className="text-slate-500 leading-relaxed text-base">
              Você não é o contador da sua própria vida. A nossa Inteligência
              Artificial lê, categoriza e organiza cada centavo automaticamente.
            </p>
          </TiltCard>

          <TiltCard delay={0.3}>
            <div
              className={`${iconWrapperBase} bg-[#ecfdf5] text-[#064E3B]`}
            >
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
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                <circle cx="12" cy="12" r="4"></circle>
              </svg>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Clareza instantânea.
            </h3>
            <p className="text-slate-500 leading-relaxed text-base">
              Visualize seu patrimônio em tempo real, com insights gerados pela
              IA que transformam dados em decisões inteligentes.
            </p>
          </TiltCard>

          <TiltCard
            delay={0.45}
            centered
            className="md:col-span-2 md:w-2/3 md:mx-auto"
          >
            <div
              className={`${iconWrapperBase} bg-[#ecfdf5] text-[#064E3B]`}
            >
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
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">
              A evolução do cofrinho.
            </h3>
            <p className="text-slate-500 leading-relaxed text-base max-w-md">
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
