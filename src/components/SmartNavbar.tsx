import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function SmartNavbar() {
  const [visible, setVisible] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

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

  // Close mobile menu when navbar hides
  useEffect(() => {
    if (!visible) setIsOpen(false);
  }, [visible]);

  const navLinks = [
    { href: "#como-funciona", label: "Como Funciona" },
    { href: "#tecnologia", label: "Tecnologia" },
    { href: "#teste-ia", label: "Teste a IA" },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center items-start pointer-events-none px-4">
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
              borderRadius: "28px",
              transition: { type: "spring", stiffness: 200, damping: 20 },
            }}
            exit={{ opacity: 0, y: -20, width: "40px", borderRadius: "50px", transition: { duration: 0.3 } }}
            style={{ maxWidth: "900px" }}
            className="pointer-events-auto bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-6 py-3 overflow-hidden"
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

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="text-slate-600 font-medium text-sm hover:text-[#064E3B] transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="#entrar"
                  className="text-slate-900 font-semibold text-sm mr-3 hidden md:block hover:text-[#064E3B] transition-colors"
                >
                  Entrar
                </a>
                <a
                  href="#precos"
                  className="bg-[#064E3B] hover:bg-[#04382a] text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all hover:-translate-y-0.5 whitespace-nowrap"
                >
                  Assinar Agora
                </a>

                {/* Mobile hamburger */}
                <button
                  type="button"
                  aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                  aria-expanded={isOpen}
                  onClick={() => setIsOpen((v) => !v)}
                  className="block md:hidden w-9 h-9 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center text-[#064E3B] hover:bg-white transition-colors"
                >
                  {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            {/* Mobile dropdown */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key="mobile-menu"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="block md:hidden overflow-hidden"
                >
                  <div className="flex flex-col gap-1 pt-4 mt-3 border-t border-slate-200/60">
                    {navLinks.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        onClick={() => setIsOpen(false)}
                        className="text-slate-700 font-medium text-sm py-2.5 px-2 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        {l.label}
                      </a>
                    ))}
                    <a
                      href="#entrar"
                      onClick={() => setIsOpen(false)}
                      className="text-[#064E3B] font-semibold text-sm py-2.5 px-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      Entrar
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
