'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const FinCareHero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.5,
  });

  // Box expands from 350px → 100vw/100vh during the first 40% of scroll
  const boxWidth = useTransform(smooth, [0, 0.4], ['350px', '100vw']);
  const boxHeight = useTransform(smooth, [0, 0.4], ['400px', '100vh']);
  const boxRadius = useTransform(smooth, [0, 0.4], ['24px', '0px']);

  // Content (pig + CTA) only fades in between 40%–50% scroll
  const contentOpacity = useTransform(smooth, [0.4, 0.5], [0, 1]);
  const contentY = useTransform(smooth, [0.4, 0.5], [30, 0]);

  // Hide the masked title once content is visible
  const titleOpacity = useTransform(smooth, [0.4, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="h-[200vh] bg-[#FF6400] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* CAMADA 1: TEXTO DE FUNDO (BRANCO) */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0"
        >
          <h1 className="text-white font-sans text-5xl md:text-7xl font-extrabold leading-tight">
            Conheça o seu
          </h1>
          <h1 className="text-white font-serif text-6xl md:text-8xl italic font-bold leading-tight">
            novo assistente
          </h1>
        </motion.div>

        {/* CAMADA 2: A CAIXA BRANCA QUE EXPANDE */}
        <motion.div
          style={{
            width: boxWidth,
            height: boxHeight,
            borderRadius: boxRadius,
            boxShadow: '0px 20px 60px rgba(0, 0, 0, 0.18)',
          }}
          className="absolute z-10 bg-[#F9FAFB] overflow-hidden flex items-center justify-center"
        >
          {/* CAMADA 3: O MESMO TEXTO, MAS VERDE ESCURO E FIXO NO CENTRO DA TELA */}
          <motion.div
            style={{ opacity: titleOpacity }}
            className="absolute w-screen h-screen flex flex-col items-center justify-center pointer-events-none"
          >
            <h1 className="text-[#064E3B] font-sans text-5xl md:text-7xl font-extrabold leading-tight">
              Conheça o seu
            </h1>
            <h1 className="text-[#064E3B] font-serif text-6xl md:text-8xl italic font-bold leading-tight">
              novo assistente
            </h1>
          </motion.div>

          {/* CAMADA 4: O CONTEÚDO 'UAU' (PORQUINHO E CTA) */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="relative z-20 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-10"
          >
            {/* Coluna Esquerda */}
            <div className="flex-1 flex flex-col gap-5 text-left max-w-xl">
              <h2 className="font-serif italic text-3xl md:text-5xl font-bold text-[#064E3B] leading-tight">
                Bem-vindo à Nova Era.
              </h2>
              <p className="font-sans text-base md:text-lg text-slate-700 leading-relaxed">
                A FinCare Brasil uniu a segurança do cofrinho clássico com o
                poder da Inteligência Artificial. Registre gastos, crie metas e
                converse com seu assistente financeiro 24/7.
              </p>
              <p className="font-sans text-base md:text-lg font-bold text-[#FF6400]">
                Garanta uma das 50 vagas de Membro Fundador por apenas R$ 9,90.
              </p>
              <button
                type="button"
                className="self-start mt-2 inline-flex items-center justify-center bg-[#FF6400] hover:bg-[#e55a00] text-white font-sans font-semibold px-8 py-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-[1.02]"
              >
                Garantir Minha Vaga
              </button>
            </div>

            {/* Coluna Direita - Porquinho flutuante */}
            <div className="flex-1 flex items-center justify-center">
              <motion.img
                src="/porquinho_fincare.webp"
                alt="Porquinho FinCare com óculos"
                className="w-full max-w-[280px] md:max-w-[420px] h-auto object-contain drop-shadow-2xl"
                animate={{ y: [-10, 10, -10] }}
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
  );
};

export default FinCareHero;
