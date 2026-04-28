import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SmartNavbar() {
  const [visible, setVisible] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 600) {
        setVisible(y < lastY);
      } else {
        setVisible(false);
      }
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center items-center pointer-events-none px-4">
      <AnimatePresence>
        {visible && (
          <motion.nav
            layout
            key="navbar"
            initial={{ opacity: 0, y: -20, width: "40px", borderRadius: "50px" }}
            animate={{
              opacity: 1,
              y: 0,
              width: "100%",
              borderRadius: "50px",
              transition: { type: "spring", stiffness: 200, damping: 20 },
            }}
            exit={{ opacity: 0, y: -20, width: "40px", borderRadius: "50px", transition: { duration: 0.3 } }}
            style={{ maxWidth: "900px" }}
            className="pointer-events-auto bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-6 py-3 flex items-center justify-between overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.25, duration: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="flex items-center justify-between w-full gap-6"
            >
              <a href="#" className="font-serif italic text-xl font-bold text-[#FF6400] whitespace-nowrap">
                FinCare.
              </a>

              <div className="hidden md:flex items-center gap-8">
                <a href="#como-funciona" className="text-slate-600 font-medium text-sm hover:text-[#064E3B] transition-colors">
                  Como Funciona
                </a>
                <a href="#tecnologia" className="text-slate-600 font-medium text-sm hover:text-[#064E3B] transition-colors">
                  Tecnologia
                </a>
                <a href="#teste-ia" className="text-slate-600 font-medium text-sm hover:text-[#064E3B] transition-colors">
                  Teste a IA
                </a>
              </div>

              <div className="flex items-center">
                <a href="#entrar" className="text-slate-900 font-semibold text-sm mr-6 hidden md:block hover:text-[#064E3B] transition-colors">
                  Entrar
                </a>
                <a
                  href="#precos"
                  className="bg-[#064E3B] hover:bg-[#04382a] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 whitespace-nowrap"
                >
                  Assinar Agora
                </a>
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
