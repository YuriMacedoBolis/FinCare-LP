import React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface TiltCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ title, icon, description }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        backgroundColor: "#064E3B",
      }}
      className="border border-white/10 p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 will-change-transform"
    >
      <div style={{ transform: "translateZ(40px)" }}>
        <div className="mb-6">{icon}</div>
        <h3 className="text-2xl font-extrabold text-white mb-4">{title}</h3>
        <p className="text-[#a7f3d0] leading-relaxed text-lg">{description}</p>
      </div>
    </motion.div>
  );
};

const cards: TiltCardProps[] = [
  {
    title: "Latência Zero",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF6400"
        strokeWidth="2"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    ),
    description:
      "A categorização da IA ocorre em milissegundos. Escreva a despesa e o sistema recalcula instantaneamente seus gráficos, garantindo uma experiência fluida.",
  },
  {
    title: "Arquitetura Supabase",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF6400"
        strokeWidth="2"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      </svg>
    ),
    description:
      "Rodamos sobre um banco de dados relacional de classe mundial. Sincronização instantânea que garante seu app sempre atualizado em qualquer dispositivo.",
  },
  {
    title: "Privacidade Nativa",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF6400"
        strokeWidth="2"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
    description:
      "Nossa IA analisa padrões matemáticos, nunca sua identidade. Seus dados são anônimos e encriptados de ponta a ponta em ambiente blindado.",
  },
  {
    title: "Fim do Trabalho Manual",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF6400"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    description:
      "Esqueça horas perdidas com planilhas. O tempo livre e a clareza mental que nossa IA te devolve valem exponencialmente mais do que o custo do serviço.",
  },
];

const TechEngine: React.FC = () => {
  return (
    <section
      className="relative z-30 bg-[#FF6400] rounded-t-[3rem] md:rounded-t-[5rem] -mt-12 md:-mt-24 pt-32 pb-32 px-6"
      style={{ perspective: "1200px" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight font-sans leading-[1.05]">
            A inteligência por trás
          </h2>
          <h2
            className="text-5xl md:text-6xl font-bold italic font-playfair-italic leading-[1.05] mt-2"
            style={{ color: "#064E3B" }}
          >
            do seu controle.
          </h2>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 max-w-5xl mx-auto"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 100, damping: 20 },
                },
              }}
            >
              <TiltCard {...card} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechEngine;
