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
    <main className="bg-white">
      <div className="max-w-6xl mx-auto pt-10 px-6">
        <button
          onClick={() => (window.history.length > 1 ? router.history.back() : router.navigate({ to: "/" }))}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
      </div>

      <ContainerScroll
        titleComponent={
          <h1 className="text-4xl md:text-6xl font-semibold text-slate-900 leading-tight">
            A tecnologia a favor do seu <br />
            <span className="text-5xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-b from-[#064E3B] to-[#10B981] bg-clip-text text-transparent">
              Tempo
            </span>
          </h1>
        }
      >
        <div className="h-full w-full overflow-y-auto p-8 md:p-16">
          <article className="prose prose-slate max-w-3xl mx-auto prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg">
            <p>
              A FinCare nasceu de uma frustração muito comum: por que cuidar do próprio dinheiro precisa ser tão chato e complicado? Entre planilhas confusas e aplicativos de banco que mais parecem painéis de avião, a maioria das pessoas simplesmente desiste de anotar seus gastos.
            </p>
            <p>
              Nós percebemos que o problema não era a falta de disciplina, mas sim a ferramenta errada. Se você já passa o dia no WhatsApp, por que não fazer a sua gestão financeira por lá?
            </p>
            <p>
              Foi assim que criamos a FinCare. Unimos a simplicidade de uma mensagem de texto com o poder da Inteligência Artificial. Nossa missão é ser a sua <strong>"babá financeira"</strong>: silenciosa, eficiente e que faz o trabalho pesado de categorizar e organizar tudo, para que você tenha clareza absoluta sobre o seu futuro.
            </p>
          </article>
        </div>
      </ContainerScroll>

      <Footer />
    </main>
  );
}
