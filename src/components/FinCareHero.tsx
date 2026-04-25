'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface FinCareHeroProps {
  children?: ReactNode;
}

const FinCareHero = ({ children }: FinCareHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring for natural motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.4,
  });

  // Box expansion: 0 -> 0.5 grows from 350x450 to fullscreen
  const boxWidth = useTransform(smoothProgress, [0, 0.5], ['350px', '100vw']);
  const boxHeight = useTransform(smoothProgress, [0, 0.5], ['450px', '100vh']);
  const boxRadius = useTransform(smoothProgress, [0, 0.5], ['24px', '0px']);

  // Wow content reveal: 0.5 -> 0.65
  const contentOpacity = useTransform(smoothProgress, [0.5, 0.65], [0, 1]);
  const contentY = useTransform(smoothProgress, [0.5, 0.65], [40, 0]);

  // Hint scroll fades early
  const hintOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  return (
    <>
      <div
        ref={containerRef}
        className="h-[200vh] relative bg-[#FF6400] w-full"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Layer 1 — Background text (white) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none px-6 text-center">
            <h1 className="font-inter font-extrabold text-5xl md:text-7xl text-white leading-tight tracking-tight">
              Conheça o seu
            </h1>
            <h1 className="font-playfair-italic font-bold text-6xl md:text-8xl text-white leading-tight mt-2">
              novo assistente
            </h1>
            <motion.p
              style={{ opacity: hintOpacity }}
              className="mt-8 text-sm md:text-base font-medium tracking-[0.3em] uppercase text-white/80"
            >
              Role para descobrir
            </motion.p>
          </div>

          {/* Layer 2 — Expanding white box (the mask) */}
          <motion.div
            style={{
              width: boxWidth,
              height: boxHeight,
              borderRadius: boxRadius,
            }}
            className="absolute z-10 bg-[#F9FAFB] flex items-center justify-center overflow-hidden shadow-2xl"
          >
            {/* Layer 3 — Front text (dark green), perfectly aligned with Layer 1 */}
            <div className="absolute w-[100vw] h-[100vh] flex flex-col items-center justify-center pointer-events-none px-6 text-center">
              <h1 className="font-inter font-extrabold text-5xl md:text-7xl text-[#064E3B] leading-tight tracking-tight">
                Conheça o seu
              </h1>
              <h1 className="font-playfair-italic font-bold text-6xl md:text-8xl text-[#064E3B] leading-tight mt-2">
                novo assistente
              </h1>
            </div>

            {/* Layer 4 — Wow content (mascot + CTA) */}
            <motion.div
              style={{ opacity: contentOpacity, y: contentY }}
              className="relative z-20 w-full max-w-6xl px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
            >
              {/* Left: copy + CTA */}
              <div className="flex-1 flex flex-col gap-5 text-center md:text-left max-w-xl">
                <h2 className="font-inter text-3xl md:text-5xl font-extrabold text-[#064E3B] leading-tight">
                  Bem-vindo à <span className="font-playfair-italic font-bold">Nova Era</span>
                </h2>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                  A FinCare Brasil uniu a segurança do cofrinho clássico com o
                  poder da Inteligência Artificial. Registre gastos, crie metas
                  e converse com seu assistente financeiro 24/7.
                </p>
                <p className="text-base md:text-lg font-bold text-[#FF6400]">
                  Garanta uma das 50 vagas de Membro Fundador por apenas R$ 9,90.
                </p>
                <button
                  type="button"
                  className="self-center md:self-start mt-2 inline-flex items-center justify-center bg-[#FF6400] hover:bg-[#e55a00] text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  Garantir Minha Vaga
                </button>
              </div>

              {/* Right: floating mascot */}
              <div className="flex-1 flex items-center justify-center">
                <motion.img
                  src="/porquinho_fincare.webp"
                  alt="Porquinho FinCare com óculos"
                  className="w-full max-w-[280px] md:max-w-[400px] h-auto object-contain drop-shadow-2xl"
                  animate={{ y: [0, -14, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {children && <section className="bg-[#FF6400]">{children}</section>}
    </>
  );
};

export default FinCareHero;
