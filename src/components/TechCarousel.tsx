import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

// @ts-ignore - swiper css side-effect imports lack type declarations
import "swiper/css";
// @ts-ignore - swiper css side-effect imports lack type declarations
import "swiper/css/effect-coverflow";
// @ts-ignore - swiper css side-effect imports lack type declarations
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

  const rotateX = useTransform(ySpring, [-10, 10], ["8deg", "-8deg"]);
  const rotateY = useTransform(xSpring, [-10, 10], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - (rect.left + rect.width / 2)) / 40;
    const py = (e.clientY - (rect.top + rect.height / 2)) / 40;
    x.set(px);
    y.set(py);
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
      className="w-full h-[420px] md:h-[480px] rounded-[2rem] p-7 md:p-10 border border-white/10 shadow-2xl flex flex-col justify-center will-change-transform"
    >
      <motion.div style={{ transform: "translateZ(40px)" }}>
        <div className="mb-6">{icon}</div>
        <h3 className="text-xl md:text-2xl font-extrabold text-white mb-3 md:mb-4">{title}</h3>
        <p className="text-[#a7f3d0] leading-relaxed text-base md:text-lg">{description}</p>
      </motion.div>
    </motion.div>
  );
};

const cardData: CardData[] = [
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
      "Esqueça horas perdidas com planilhas. O tempo livre e a clareza mental que nossa IA te devolve valem mais do que o custo.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Sincronização Cloud",
    description:
      "Comece a analisar no computador e termine de registrar no celular. Seus dados fluem com você, em tempo real, em qualquer lugar.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
  },
  {
    title: "Previsão Inteligente",
    description:
      "A IA não apenas lê o passado, ela prevê o seu futuro. Receba alertas de tendências de gastos antes do mês fechar no vermelho.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <path d="M2 12h4l3-9 5 18 3-9h5" />
      </svg>
    ),
  },
  {
    title: "Exportação Livre",
    description:
      "O seu dinheiro e os seus dados são seus. Exporte relatórios completos em CSV ou PDF com um clique, sem fidelidade ou travas.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
  {
    title: "Design Premium",
    description:
      "Uma interface limpa, sem anúncios e sem distrações bancárias. Desenhada para focar apenas no que importa: o seu crescimento patrimonial.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF6400" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

type SwiperWithLoopedSlidesProps = React.ComponentProps<typeof Swiper> & {
  loopedSlides?: number;
};

const SwiperWithLoopedSlides = Swiper as React.ComponentType<SwiperWithLoopedSlidesProps>;

const TechCarousel: React.FC = () => {
  const carouselData = cardData;


  return (
    <section
      id="tecnologia"
      className="relative z-30 bg-[#FF6400] rounded-t-[3rem] md:rounded-t-[5rem] -mt-12 md:-mt-24 pt-32 pb-32 overflow-hidden scroll-mt-24"
    >
      <style>{`
        .tech-carousel,
        .tech-carousel .swiper,
        .tech-carousel .swiper-wrapper,
        .tech-carousel .swiper-slide {
          background: transparent !important;
        }
        .tech-carousel .swiper {
          padding: 60px 0 80px;
          overflow: visible;
        }
        .tech-carousel .swiper-slide {
          width: 380px;
          max-width: 85vw;
          opacity: 0.15 !important;
          filter: blur(2.5px);
          transition: opacity 0.3s ease, filter 0.3s ease;
        }
        .tech-carousel .swiper-slide-active {
          opacity: 1 !important;
          filter: blur(0px) !important;
        }
        .tech-carousel .tilt-perspective {
          perspective: 1500px;
        }
        .tech-carousel .swiper-pagination {
          margin-top: 24px;
          position: relative;
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
          className="text-white text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.05]"
        >
          A inteligência por trás
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl font-bold italic font-serif leading-[1.05] mt-2"
          style={{ color: "#064E3B" }}
        >
          do seu controle.
        </motion.h2>
      </div>

      <div className="tech-carousel">
        <SwiperWithLoopedSlides
          modules={[EffectCoverflow, Pagination, Autoplay]}
          effect={"coverflow"}
          grabCursor
          centeredSlides
          slidesPerView={"auto"}
          loop={false}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          speed={1200}
          coverflowEffect={{
            rotate: 0,
            stretch: -80,
            depth: 300,
            modifier: 1,
            slideShadows: false,
            scale: 0.85,
          }}
          pagination={{ clickable: true }}
        >
          {carouselData.map((card, i) => (
            <SwiperSlide key={`${card.title}-${i}`}>
              <div className="tilt-perspective">
                <TiltCard {...card} />
              </div>
            </SwiperSlide>
          ))}
        </SwiperWithLoopedSlides>
      </div>
    </section>
  );
};

export default TechCarousel;
