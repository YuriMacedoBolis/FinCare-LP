import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Mail, MessageCircle, Clock } from "lucide-react";
import Footer from "@/components/Footer";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — FinCare Brasil" },
      { name: "description", content: "Fale com a equipe FinCare por e-mail ou WhatsApp." },
      { property: "og:title", content: "Contato — FinCare Brasil" },
      { property: "og:description", content: "Fale com a equipe FinCare por e-mail ou WhatsApp." },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const router = useRouter();
  return (
    <main>
      <div className="min-h-screen bg-[#FF6400]">
        <div className="max-w-6xl mx-auto pt-10 px-6 bg-transparent">
          <button
            onClick={() => (window.history.length > 1 ? router.history.back() : router.navigate({ to: "/" }))}
            className="inline-flex items-center gap-2 text-sm text-white hover:text-slate-200 opacity-90 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>
        </div>

      <ContainerScroll
        titleComponent={
          <h1 className="text-4xl md:text-6xl font-semibold text-white leading-tight">
            Fale com a equipe <br />
            <span className="text-5xl md:text-[6rem] font-bold mt-1 leading-none text-[#0f172a]">
              FinCare
            </span>
          </h1>
        }
      >
        <div className="h-full w-full overflow-y-auto p-8 md:p-16">
          <div className="max-w-2xl mx-auto">
            <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-10 text-center">
              Estamos aqui para garantir que a sua experiência seja impecável. Escolha o melhor canal para falar conosco:
            </p>

            <div className="grid gap-4">
              <a
                href="mailto:fincareti@gmail.com"
                className="group flex items-center gap-5 p-6 rounded-2xl border border-slate-200 hover:border-[#064E3B] hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#064E3B]/10 flex items-center justify-center text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">E-mail</p>
                  <p className="text-base md:text-lg font-semibold text-slate-900">fincareti@gmail.com</p>
                </div>
              </a>

              <a
                href="https://wa.me/5561999072806"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-6 rounded-2xl border border-slate-200 hover:border-[#064E3B] hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#064E3B]/10 flex items-center justify-center text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">WhatsApp</p>
                  <p className="text-base md:text-lg font-semibold text-slate-900">+55 (61) 99907-2806</p>
                </div>
              </a>

              <div className="flex items-center gap-5 p-6 rounded-2xl bg-slate-50">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#064E3B]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Horário</p>
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                    Segunda a Sexta, das 09h às 18h. Respondemos a todos os e-mails em até 24 horas úteis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>
      </div>

      <Footer />
    </main>
  );
}
