import { createFileRoute } from "@tanstack/react-router";
import ScrollExpandMedia from "@/components/ScrollExpandMedia";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main>
      <ScrollExpandMedia title="Conheça o seu novo assistente">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Sua jornada financeira começa aqui
          </h3>
          <p className="text-lg text-white/90">
            Continue rolando para conhecer todas as funcionalidades da FinCare Brasil.
          </p>
        </div>
      </ScrollExpandMedia>
    </main>
  );
}
