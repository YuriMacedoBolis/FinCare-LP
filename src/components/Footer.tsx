import { Link } from "@tanstack/react-router";

export default function Footer() {
  const productLinks: { label: string; href: string }[] = [
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Segurança & IA", href: "#tecnologia" },
    { label: "Preços", href: "#precos" },
  ];
  const companyLinks: { label: string; to: string }[] = [
    { label: "Nossa História", to: "/sobre" },
    { label: "Central de Ajuda", to: "/ajuda" },
    { label: "Contato", to: "/contato" },
  ];
  const supportLinks = ["fincareti@gmail.com", "Instagram"];

  return (
    <footer className="bg-[#031f17] text-white px-6 pt-24 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Column 1 — Brand */}
          <div className="lg:col-span-2">
            <p className="font-serif italic text-3xl font-semibold text-[#FF6400] mb-4">
              FinCare.
            </p>
            <p className="text-slate-400 font-light leading-relaxed max-w-sm">
              Inteligência financeira desenhada para quem valoriza o tempo e a clareza.
            </p>
          </div>

          {/* Column 2 — Produto */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-widest mb-6">PRODUTO</h3>
            <div className="flex flex-col gap-4">
              {productLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-400 text-sm hover:text-[#a7f3d0] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3 — Empresa */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-widest mb-6">EMPRESA</h3>
            <div className="flex flex-col gap-4">
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-slate-400 text-sm hover:text-[#a7f3d0] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4 — Suporte */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-widest mb-6">SUPORTE</h3>
            <div className="flex flex-col gap-4">
              {supportLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-slate-400 text-sm hover:text-[#a7f3d0] transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom — Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
          <p className="text-sm text-slate-500">
            © 2026 FinCare Brasil. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link to="/termos" className="text-sm text-slate-500 hover:text-white transition-colors">
              Termos de Serviço
            </Link>
            <Link to="/privacidade" className="text-sm text-slate-500 hover:text-white transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
