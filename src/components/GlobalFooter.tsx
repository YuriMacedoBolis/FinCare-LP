import { Link } from "@tanstack/react-router";

export default function GlobalFooter() {
  return (
    <footer className="bg-slate-50 text-slate-500 text-sm py-8 flex flex-col items-center justify-center gap-2 border-t border-slate-200">
      <div className="flex gap-6">
        <Link to="/termos" className="hover:text-slate-900 transition-colors">
          Termos de Uso
        </Link>
        <Link to="/privacidade" className="hover:text-slate-900 transition-colors">
          Política de Privacidade
        </Link>
      </div>
      <p>© 2026 FinCare Brasil. Todos os direitos reservados.</p>
    </footer>
  );
}
