import { createFileRoute } from "@tanstack/react-router";
import FinCareHero from "@/components/FinCareHero";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main>
      <FinCareHero>
        <div className="max-w-4xl mx-auto text-center text-white py-20 px-6">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Sua jornada financeira começa aqui
          </h3>
          <p className="text-lg text-white/90">
            Continue rolando para conhecer todas as funcionalidades da FinCare Brasil.
          </p>
        </div>
      </FinCareHero>
    </main>
  );
}
