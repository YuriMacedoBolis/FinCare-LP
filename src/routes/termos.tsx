import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso — FinCare Brasil" },
      { name: "description", content: "Termos e Condições de Uso da plataforma FinCare Brasil." },
      { property: "og:title", content: "Termos de Uso — FinCare Brasil" },
      { property: "og:description", content: "Termos e Condições de Uso da plataforma FinCare Brasil." },
    ],
  }),
  component: TermosPage,
});

function TermosPage() {
  const router = useRouter();
  return (
    <main>
      <div className="max-w-3xl mx-auto py-16 px-6 text-slate-700 space-y-6">
        <button
          onClick={() => (window.history.length > 1 ? router.history.back() : router.navigate({ to: "/" }))}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Termos e Condições de Uso - FinCare Brasil
        </h1>
        <p className="text-sm text-slate-500">Última atualização: 24/04/2026</p>

        <p>
          Bem-vindo à FinCare Brasil. Ao acessar e utilizar nossa plataforma, você concorda integralmente com os termos
          e condições descritos abaixo. Recomendamos a leitura atenta deste documento antes de utilizar nossos serviços.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 pt-4">1. Aceitação dos Termos</h2>
        <p>
          Ao criar uma conta na FinCare Brasil, você declara ter lido, compreendido e aceito todas as cláusulas destes
          Termos de Uso, bem como a nossa Política de Privacidade.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 pt-4">2. Descrição do Serviço</h2>
        <p>
          A FinCare Brasil oferece uma plataforma digital de gestão financeira pessoal, permitindo o registro de
          transações, definição de metas, acompanhamento de gastos e o uso de um assistente de inteligência artificial
          para apoio na organização financeira. O serviço é fornecido "no estado em que se encontra".
        </p>

        <h2 className="text-xl font-semibold text-slate-900 pt-4">3. Cadastro e Conta de Usuário</h2>
        <p>
          Para utilizar a plataforma, é necessário criar uma conta com informações verídicas e atualizadas. O usuário é
          o único responsável pela confidencialidade de sua senha e por todas as atividades realizadas em sua conta.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 pt-4">4. Assinaturas, Pagamentos e Reembolso</h2>
        <p>
          O acesso a recursos premium da FinCare Brasil é feito mediante assinatura (mensal ou anual).
        </p>
        <p>
          <strong>Direito de Arrependimento:</strong> Em conformidade com o Art. 49 do Código de Defesa do Consumidor
          (CDC), o usuário tem o direito de solicitar o cancelamento e o reembolso integral do valor pago em até 7
          (sete) dias corridos após a contratação inicial. Após o prazo de 7 dias, o cancelamento interrompe cobranças
          futuras, mas não gera reembolso proporcional dos meses já utilizados.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 pt-4">5. Limitação de Responsabilidade</h2>
        <p>
          A FinCare Brasil é uma ferramenta de tecnologia para apoio à gestão financeira e não constitui consultoria
          financeira, contábil, tributária ou de investimentos.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 pt-4">6. Contato</h2>
        <p>
          Em caso de dúvidas sobre estes Termos, entre em contato com nossa equipe pelo e-mail oficial:{" "}
          <a href="mailto:fincareti@gmail.com" className="text-[#FF6400] hover:underline">
            fincareti@gmail.com
          </a>
        </p>
      </div>
      <Footer />
    </main>
  );
}
