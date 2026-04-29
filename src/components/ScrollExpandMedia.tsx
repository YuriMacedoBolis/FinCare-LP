'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  title?: string;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  title = 'Conheça o seu novo assistente',
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
        // Softer scroll: smaller delta + unpin earlier (at 0.55 instead of 1.0)
        // to cut "dead time" after WOW content is fully revealed.
        const scrollDelta = e.deltaY * 0.00035;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 0.55) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.4) {
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
        const scrollFactor = deltaY < 0 ? 0.0055 : 0.0035;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 0.55) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.4) {
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

  // Remap progress so the mask/box finishes expanding at 0.35 of total scroll,
  // then stays static through 1.0 to give the user time to read the WOW content.
  const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
  const expandProgress = clamp(scrollProgress / 0.35); // 0 -> 1 across [0, 0.35]
  // Initial title fades 0.30 -> 0.35
  const titleFadeProgress = clamp((scrollProgress - 0.3) / 0.05); // 0 -> 1
  const titleOpacity = 1 - titleFadeProgress;
  // WOW content fades in more gradually: 0.35 -> 0.55
  const wowProgress = clamp((scrollProgress - 0.35) / 0.2); // 0 -> 1

  const mediaWidth = 300 + expandProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + expandProgress * (isMobileState ? 200 : 400);
  const textTranslateX = expandProgress * (isMobileState ? 180 : 150);

  const firstLine = 'Conheça o seu';
  const secondLine = 'novo assistente';

  // Color interpolation: dark green when inside white box, white once box has expanded past midpoint
  const titleColorClass =
    expandProgress > 0.5 ? 'text-white' : 'text-[#064E3B]';

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
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#F9FAFB] overflow-hidden"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 20px 60px rgba(0, 0, 0, 0.18)',
                  transition: 'width 0.7s cubic-bezier(0.22, 1, 0.36, 1), height 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {/* Expanded content (2-column layout) — driven by wowProgress (0.35 -> 0.45) */}
                <motion.div
                  className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 p-4 md:p-12 lg:p-16 overflow-y-auto"
                  style={{
                    opacity: wowProgress,
                    transform: `translateY(${(1 - wowProgress) * 50}px)`,
                    transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                    pointerEvents: wowProgress > 0.9 ? 'auto' : 'none',
                  }}
                >
                  {/* Left column */}
                  <div className="flex-1 flex flex-col gap-2 md:gap-5 text-left max-w-xl px-2 md:px-0">
                    <h2 className="text-lg md:text-4xl lg:text-5xl font-bold text-[#0B192C] leading-tight">
                      Bem-vindo à Nova Era.
                    </h2>
                    <p className="text-xs md:text-lg text-slate-600 leading-relaxed">
                      A FinCare Brasil uniu a segurança do cofrinho clássico com
                      o poder da Inteligência Artificial. Registre gastos, crie
                      metas e converse com seu assistente financeiro 24/7.
                    </p>
                    <p className="text-xs md:text-lg font-bold text-[#FF6400]">
                      Garanta uma das 50 vagas de Membro Fundador por apenas R$ 9,90.
                    </p>
                    <button
                      type="button"
                      className="self-start mt-1 md:mt-2 inline-flex items-center justify-center bg-[#FF6400] hover:bg-[#e55a00] text-white font-semibold px-4 py-2.5 md:px-8 md:py-4 rounded-xl text-xs md:text-base shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-[1.02]"
                    >
                      Garantir Minha Vaga
                    </button>
                  </div>

                  {/* Right column */}
                  <div className="flex-1 flex items-center justify-center min-h-0">
                    <img
                      src="/porquinho_fincare.webp"
                      alt="Porquinho FinCare com óculos"
                      className="object-contain w-full max-h-[110px] md:max-h-[400px] lg:max-h-[500px] drop-shadow-2xl"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Split title — fades out 0.30 -> 0.35 */}
              <motion.div
                className="flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col"
                style={{
                  opacity: titleOpacity,
                  transform: `translateY(${-titleFadeProgress * 50}px)`,
                  transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                  pointerEvents: titleOpacity < 0.05 ? 'none' : 'auto',
                }}
              >
                <h2
                  className={`text-2xl md:text-5xl lg:text-6xl font-bold ${titleColorClass}`}
                  style={{ transform: `translateX(-${textTranslateX}vw)`, transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), color 0.7s ease-in-out' }}
                >
                  {firstLine}
                </h2>
                <h2
                  className={`text-2xl md:text-5xl lg:text-6xl font-playfair-italic text-center ${titleColorClass}`}
                  style={{ transform: `translateX(${textTranslateX}vw)`, transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), color 0.7s ease-in-out' }}
                >
                  {secondLine}
                </h2>
                {titleOpacity > 0.05 && (
                  <p
                    className={`mt-4 md:mt-6 text-xs md:text-base font-medium tracking-wide uppercase transition-colors duration-300 ${
                      expandProgress > 0.5 ? 'text-white/80' : 'text-[#064E3B]/70'
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
