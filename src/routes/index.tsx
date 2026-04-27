import { createFileRoute } from "@tanstack/react-router";
import ScrollExpandMedia from "@/components/ScrollExpandMedia";
import FeatureBridge from "@/components/FeatureBridge";
import MagneticShowcase from "@/components/MagneticShowcase";
import TechCarousel from "@/components/TechCarousel";
import AgentTestSection from "@/components/AgentTestSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import SmartNavbar from "@/components/SmartNavbar";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main>
      <SmartNavbar />
      <ScrollExpandMedia title="Conheça o seu novo assistente" />
      <FeatureBridge />
      <MagneticShowcase />
      <TechCarousel />
      <AgentTestSection />
      <PricingSection />
      <Footer />
    </main>
  );
}
