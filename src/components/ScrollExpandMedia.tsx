'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  title?: string;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  title = 'Inteligência Financeira',
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  // Color interpolation: orange when inside white box, white when on orange bg
  const titleColorClass =
    scrollProgress > 0.15 ? 'text-white' : 'text-[#FF6400]';

  return (
    <div
      ref={sectionRef}
      className="transition-colors duration-700 ease-in-out overflow-x-hidden bg-[#FF6400]"
    >
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          {/* Solid orange background */}
          <div className="absolute inset-0 z-0 h-full bg-[#FF6400]" />

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              {/* Expanding white box */}
              <div
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl bg-[#F9FAFB] overflow-hidden"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 20px 60px rgba(0, 0, 0, 0.18)',
                }}
              >
                {/* Expanded content (2-column layout) */}
                <motion.div
                  className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-8 p-6 md:p-12 lg:p-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: mediaFullyExpanded ? 1 : 0 }}
                  transition={{ duration: 0.6, delay: mediaFullyExpanded ? 0.2 : 0 }}
                  style={{ pointerEvents: mediaFullyExpanded ? 'auto' : 'none' }}
                >
                  {/* Left column */}
                  <div className="flex-1 flex flex-col gap-5 text-left max-w-xl">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B192C] leading-tight">
                      Bem-vindo à Nova Era.
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                      A FinCare Brasil uniu a segurança do cofrinho clássico com
                      o poder da Inteligência Artificial. Registre gastos, crie
                      metas e converse com seu assistente financeiro 24/7.
                    </p>
                    <p className="text-base md:text-lg font-bold text-[#FF6400]">
                      Garanta uma das 50 vagas de Membro Fundador por apenas R$ 9,90.
                    </p>
                    <button
                      type="button"
                      className="self-start mt-2 inline-flex items-center justify-center bg-[#FF6400] hover:bg-[#e55a00] text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-[1.02]"
                    >
                      Garantir Minha Vaga
                    </button>
                  </div>

                  {/* Right column */}
                  <div className="flex-1 flex items-center justify-center">
                    <img
                      src="/porquinho_fincare.webp"
                      alt="Porquinho FinCare com óculos"
                      className="w-full max-w-[280px] md:max-w-[400px] h-auto object-contain drop-shadow-2xl"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Split title */}
              <motion.div
                className="flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col"
                animate={{ opacity: mediaFullyExpanded ? 0 : 1 }}
                transition={{ duration: 0.4 }}
                style={{ pointerEvents: mediaFullyExpanded ? 'none' : 'auto' }}
              >
                <h2
                  className={`text-4xl md:text-5xl lg:text-7xl font-bold transition-colors duration-300 ${titleColorClass}`}
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </h2>
                <h2
                  className={`text-4xl md:text-5xl lg:text-7xl font-bold text-center transition-colors duration-300 ${titleColorClass}`}
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </h2>
                {!mediaFullyExpanded && (
                  <p
                    className={`mt-6 text-sm md:text-base font-medium tracking-wide uppercase transition-colors duration-300 ${
                      scrollProgress > 0.15 ? 'text-white/80' : 'text-[#FF6400]/70'
                    }`}
                  >
                    Role para descobrir
                  </p>
                )}
              </motion.div>
            </div>

            <motion.section
              className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
