import { createFileRoute } from "@tanstack/react-router";
import FinCareHero from "@/components/FinCareHero";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main>
      <FinCareHero />
    </main>
  );
}
