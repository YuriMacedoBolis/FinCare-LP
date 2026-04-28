import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Nossa História — FinCare Brasil" },
      { name: "description", content: "A história por trás da FinCare: a tecnologia a favor do seu tempo." },
      { property: "og:title", content: "Nossa História — FinCare Brasil" },
      { property: "og:description", content: "A história por trás da FinCare: a tecnologia a favor do seu tempo." },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
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
            A tecnologia a favor do seu <br />
            <span className="text-5xl md:text-[6rem] font-bold mt-1 leading-none text-[#0f172a]">
              Tempo
            </span>
          </h1>
        }
      >
        <div className="h-full w-full overflow-y-auto">
          <div className="max-w-3xl mx-auto py-8 px-4 space-y-12">
            {/* Section 1: The Pain */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">O fim das planilhas chatas.</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                A FinCare nasceu de uma frustração muito comum: por que cuidar do próprio dinheiro precisa ser tão complicado? Entre planilhas confusas e aplicativos de banco que mais parecem painéis de avião, a maioria das pessoas simplesmente desiste de anotar seus gastos.
              </p>
            </div>

            {/* Section 2: The Insight (Quote Block) */}
            <div className="bg-orange-50/80 border-l-4 border-[#FF6400] p-8 rounded-r-2xl shadow-sm my-10">
              <p className="text-2xl font-medium text-slate-800 italic leading-snug">
                "Nós percebemos que o problema não era a falta de disciplina, mas sim a ferramenta errada. Se você já passa o dia no WhatsApp, por que não fazer a sua gestão financeira por lá?"
              </p>
            </div>

            {/* Section 3: The Solution */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">A sua nova babá financeira.</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Foi assim que criamos a FinCare. Unimos a simplicidade absoluta de uma mensagem de texto com o poder da Inteligência Artificial. Nossa missão é ser silenciosa, eficiente e fazer o trabalho pesado de categorizar e organizar tudo, para que você tenha clareza absoluta sobre o seu futuro.
              </p>
            </div>
          </div>
        </div>
      </ContainerScroll>

      <Footer />
    </main>
  );
}
