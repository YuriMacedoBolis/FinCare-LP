import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Como a Inteligência Artificial funciona?",
    a: 'É como conversar com um amigo. Você manda um áudio ou texto no WhatsApp dizendo: "Gastei 45 reais num lanche no McDonald\'s". A nossa IA entende o valor, a loja, categoriza como "Alimentação" e envia direto para o seu dashboard em tempo real.',
  },
  {
    q: "Meus dados bancários estão seguros?",
    a: "A FinCare não pede, não guarda e não tem acesso às suas senhas do banco. Nós apenas organizamos as informações que você nos envia pelo WhatsApp.",
  },
  {
    q: "Como faço para cancelar minha assinatura?",
    a: 'Sem burocracia e sem pegadinhas. Você pode cancelar a qualquer momento diretamente no seu painel de usuário, clicando em "Minha Assinatura". Não há taxas de cancelamento.',
  },
  {
    q: "A IA funciona 24 horas por dia?",
    a: "Sim! Pode enviar os seus gastos de madrugada ou no fim de semana. O seu assistente está sempre online para registrar a transação.",
  },
];

export const Route = createFileRoute("/ajuda")({
  head: () => ({
    meta: [
      { title: "Central de Ajuda — FinCare Brasil" },
      { name: "description", content: "Perguntas frequentes sobre a FinCare e o seu assistente financeiro no WhatsApp." },
      { property: "og:title", content: "Central de Ajuda — FinCare Brasil" },
      { property: "og:description", content: "Perguntas frequentes sobre a FinCare e o seu assistente financeiro no WhatsApp." },
    ],
  }),
  component: AjudaPage,
});

function AjudaPage() {
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
            Como podemos <br />
            <span className="text-5xl md:text-[6rem] font-bold mt-1 leading-none text-[#0f172a]">
              Ajudar?
            </span>
          </h1>
        }
      >
        <div className="h-full w-full overflow-y-auto p-8 md:p-16">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-slate-900">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </ContainerScroll>

      <Footer />
    </main>
  );
}
