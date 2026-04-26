import { createFileRoute } from "@tanstack/react-router";
import ScrollExpandMedia from "@/components/ScrollExpandMedia";
import FeatureBridge from "@/components/FeatureBridge";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main>
      <ScrollExpandMedia title="Conheça o seu novo assistente" />
      <FeatureBridge />
    </main>
  );
}
