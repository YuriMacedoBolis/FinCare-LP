import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import GlobalFooter from "@/components/GlobalFooter";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — FinCare Brasil" },
      { name: "description", content: "Como o FinCare Brasil coleta, usa e protege seus dados conforme a LGPD." },
      { property: "og:title", content: "Política de Privacidade — FinCare Brasil" },
      { property: "og:description", content: "Como o FinCare Brasil coleta, usa e protege seus dados conforme a LGPD." },
    ],
  }),
  component: PrivacidadePage,
});

function PrivacidadePage() {
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
          Política de Privacidade - FinCare Brasil
        </h1>

        <p>
          A sua privacidade é nossa prioridade. Esta Política de Privacidade descreve como o FinCare Brasil coleta, usa,
          armazena e protege seus dados pessoais e financeiros, em estrita conformidade com a Lei Geral de Proteção de
          Dados Pessoais (LGPD - Lei nº 13.709/2018).
        </p>

        <h2 className="text-xl font-semibold text-slate-900 pt-4">1. Dados Coletados</h2>
        <p>
          Coletamos apenas os dados estritamente necessários para o funcionamento da plataforma:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Dados Cadastrais:</strong> Nome e endereço de e-mail (para criação de conta e recuperação de acesso).
          </li>
          <li>
            <strong>Dados Financeiros:</strong> Valores, descrições, categorias e datas das transações inseridas
            manualmente por você.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-slate-900 pt-4">2. Como Usamos seus Dados</h2>
        <p>
          Seus dados são utilizados exclusivamente para fornecer o serviço de gestão financeira, gerar relatórios
          individuais, processar pagamentos de assinaturas e enviar comunicações técnicas.{" "}
          <strong>Importante:</strong> O FinCare Brasil NUNCA vende, aluga ou compartilha seus dados pessoais ou
          financeiros com terceiros para fins publicitários.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 pt-4">3. Armazenamento e Segurança</h2>
        <p>
          Seus dados são armazenados de forma segura em infraestrutura de nuvem confiável. Utilizamos criptografia de
          ponta a ponta e aplicamos regras de segurança rígidas no banco de dados (Row Level Security - RLS) para
          garantir que as suas informações financeiras sejam acessíveis única e exclusivamente por você.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 pt-4">4. Seus Direitos (LGPD)</h2>
        <p>
          Você tem o controle total sobre seus dados. A qualquer momento, você pode solicitar acesso aos dados, corrigir
          informações ou solicitar a exclusão definitiva da sua conta e histórico financeiro.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 pt-4">5. Contato</h2>
        <p>
          Para exercer seus direitos ou tirar dúvidas, entre em contato através do e-mail:{" "}
          <a href="mailto:fincareti@gmail.com" className="text-[#FF6400] hover:underline">
            fincareti@gmail.com
          </a>
        </p>
      </div>
      <GlobalFooter />
    </main>
  );
}
