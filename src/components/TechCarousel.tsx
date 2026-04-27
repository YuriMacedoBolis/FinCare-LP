import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

// @ts-expect-error - swiper css side-effect imports lack type declarations
import "swiper/css";
// @ts-expect-error - swiper css side-effect imports lack type declarations
import "swiper/css/effect-coverflow";
// @ts-expect-error - swiper css side-effect imports lack type declarations
import "swiper/css/pagination";

interface CardData {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const TiltCard: React.FC<CardData> = ({ title, description, icon }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    // Subtle: divide further to dampen
    x.set(px / 2);
    y.set(py / 2);
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
      className="w-full h-[480px] rounded-[2rem] p-10 border border-white/10 shadow-2xl flex flex-col justify-center will-change-transform"
    >
      <motion.div style={{ transform: "translateZ(40px)" }}>
        <div className="mb-6">{icon}</div>
        <h3 className="text-2xl font-extrabold text-white mb-4">{title}</h3>
        <p className="text-[#a7f3d0] leading-relaxed text-lg">{description}</p>
      </motion.div>
    </motion.div>
  );
};

const cards: CardData[] = [
  {
    title: "Latência Zero",
    description:
      "A categorização da IA ocorre em milissegundos. Escreva a despesa e o sistema recalcula instantaneamente seus gráficos.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Arquitetura Supabase",
    description:
      "Rodamos sobre um banco de dados relacional de classe mundial. Sincronização instantânea que garante seu app sempre atualizado.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    title: "Privacidade Nativa",
    description:
      "Nossa IA analisa padrões matemáticos, nunca sua identidade. Seus dados são anônimos e encriptados de ponta a ponta.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Fim do Trabalho Manual",
    description:
      "Esqueça horas perdidas com planilhas. O tempo livre e a clareza mental que nossa IA te devolve valem exponencialmente mais do que o custo.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const TechCarousel: React.FC = () => {
  return (
    <section
      className="relative z-30 bg-[#FF6400] rounded-t-[3rem] md:rounded-t-[5rem] -mt-12 md:-mt-24 pt-32 pb-32 overflow-hidden"
      style={{ perspective: "2500px" }}
    >
      <style>{`
        .tech-carousel .swiper,
        .tech-carousel .swiper-wrapper,
        .tech-carousel .swiper-slide {
          background: transparent !important;
        }
        .tech-carousel .swiper {
          padding: 40px 0 60px;
          overflow: visible;
        }
        .tech-carousel .swiper-slide {
          width: 380px;
          max-width: 85vw;
          transition: opacity 0.3s ease;
          opacity: 0.2;
        }
        .tech-carousel .swiper-slide-active {
          opacity: 1;
        }
        .tech-carousel .swiper-pagination-bullet {
          background: #ffffff;
          opacity: 0.4;
        }
        .tech-carousel .swiper-pagination-bullet-active {
          background: #064E3B;
          opacity: 1;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-white text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]"
        >
          A inteligência por trás
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-6xl font-bold italic font-serif leading-[1.05] mt-2"
          style={{ color: "#064E3B" }}
        >
          do seu controle.
        </motion.h2>
      </div>

      <div className="tech-carousel">
        <Swiper
          modules={[EffectCoverflow, Pagination, Autoplay]}
          effect={"coverflow"}
          grabCursor
          centeredSlides
          slidesPerView={"auto"}
          loop
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 0,
            stretch: -50,
            depth: 250,
            modifier: 1,
            slideShadows: false,
            scale: 0.85,
          }}
          pagination={{ clickable: true }}
        >
          {cards.map((card) => (
            <SwiperSlide key={card.title}>
              <TiltCard {...card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TechCarousel;
