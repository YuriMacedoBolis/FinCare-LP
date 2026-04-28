import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Check, Shield, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { externalSupabase } from "@/integrations/external-supabase/client";
import { toast } from "sonner";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const features = [
  "IA de Categorização Automática",
  "Sincronização em tempo real (App e PC)",
  "Dashboards de tendências e projeções",
  "Exportação de relatórios (CSV/PDF)",
];

export default function PricingSection() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
      value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    }
    setPhone(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    setSubmitting(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    // 1) Cria a conta no auth do Supabase externo
    const { data: signUpData, error: signUpError } = await externalSupabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: cleanName,
          phone: cleanPhone,
        },
      },
    });

    if (signUpError) {
      console.error("Erro no signup:", signUpError);
      const msg = signUpError.message?.toLowerCase().includes("already")
        ? "Este e-mail já está cadastrado. Faça login para continuar."
        : "Não foi possível criar sua conta. Tente novamente.";
      toast.error(msg);
      setSubmitting(false);
      return;
    }

    const userId = signUpData.user?.id;

    // 2) Atualiza/garante a row em profiles (a row pode ser criada por trigger no signup;
    //    upsert garante que os campos do formulário fiquem preenchidos)
    if (userId) {
      const { error: profileError } = await externalSupabase
        .from("profiles")
        .upsert(
          {
            id: userId,
            full_name: cleanName,
            email: cleanEmail,
            phone: cleanPhone,
            subscription_status: "pending",
          },
          { onConflict: "id" },
        );

      if (profileError) {
        console.error("Erro ao salvar profile:", profileError);
        // Não bloqueia o checkout — usuário já foi criado no auth
        toast.warning("Conta criada, mas houve um problema ao salvar dados extras.");
      }
    }

    // 3) Redireciona para o Mercado Pago
    window.location.href =
      "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=f5569c713e1c4b61b80c5a7fecb0833f";
  };

  const modalContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };

  const modalItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <section id="precos" className="relative z-40 bg-[#064E3B] rounded-t-[3rem] md:rounded-t-[5rem] -mt-12 md:-mt-16 pt-32 md:pt-40 pb-32 px-6 flex flex-col items-center overflow-hidden scroll-mt-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-4xl flex flex-col items-center"
      >
        {/* Scarcity Badge */}
        <motion.div
          variants={itemVariants}
          className="text-xs uppercase tracking-[0.15em] font-semibold text-[#a7f3d0] border-b border-[#a7f3d0]/30 pb-2 mb-12 text-center"
        >
          LOTE DE LANÇAMENTO — 12 DE 50 VAGAS RESTANTES
        </motion.div>

        {/* Editorial Header */}
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-center">
            A hora de assumir
          </h2>
          <p className="text-5xl md:text-6xl font-playfair-italic text-[#FF6400] text-center mt-2">
            o controle.
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-[24px] w-full max-w-[440px] p-10 md:p-12 text-slate-900 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-[400ms]"
        >
          <p className="text-sm font-bold text-[#FF6400] uppercase tracking-widest mb-4">
            FinCare Starter
          </p>
          <p className="text-slate-400 line-through text-base mb-1">De R$ 14,90 por</p>
          <div className="flex items-end gap-1">
            <span className="text-2xl font-medium text-slate-900">R$</span>
            <span className="text-7xl font-light tracking-tight text-slate-900 leading-none">
              9,90
            </span>
            <span className="text-slate-500 font-normal pb-2">/mês</span>
          </div>
          <p className="text-slate-600 text-sm mt-6">
            O valor de um café para organizar a sua vida.
          </p>

          <div className="h-px w-full bg-slate-200 my-8" />

          <ul>
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-4 text-slate-700 hover:translate-x-1 hover:text-slate-900 transition-all duration-200 cursor-default mb-5"
              >
                <Check className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#064E3B" }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="bg-[#FF6400] hover:bg-[#e65a00] text-white w-full py-5 rounded-xl font-semibold text-lg transition-all duration-300 relative overflow-hidden group mt-4">
                <span className="relative z-10">Garantir minha vaga agora</span>
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white rounded-[32px] border-0 p-8 sm:p-10 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.3)] font-sans">
              <motion.div
                variants={modalContainerVariants}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={modalItemVariants}>
                  <DialogHeader className="space-y-2 text-left mb-6">
                    <DialogTitle className="text-3xl font-bold text-slate-900 tracking-tight">
                      Complete seu cadastro
                    </DialogTitle>
                    <DialogDescription className="text-base text-slate-500 leading-relaxed">
                      Preencha seus dados para prosseguir ao pagamento seguro.
                    </DialogDescription>
                  </DialogHeader>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div variants={modalItemVariants} className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                      Nome Completo
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-14 rounded-2xl bg-slate-50 border border-slate-200 px-4 text-base text-slate-900 shadow-none transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#FF6400] focus-visible:bg-white"
                    />
                  </motion.div>

                  <motion.div variants={modalItemVariants} className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 rounded-2xl bg-slate-50 border border-slate-200 px-4 text-base text-slate-900 shadow-none transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#FF6400] focus-visible:bg-white"
                    />
                  </motion.div>

                  <motion.div variants={modalItemVariants} className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                      WhatsApp
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      inputMode="numeric"
                      placeholder="(00) 00000-0000"
                      value={phone}
                      onChange={handlePhoneChange}
                      maxLength={15}
                      className="h-14 rounded-2xl bg-slate-50 border border-slate-200 px-4 text-base text-slate-900 shadow-none transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#FF6400] focus-visible:bg-white"
                    />
                  </motion.div>

                  <motion.div variants={modalItemVariants} className="pt-2">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full h-16 rounded-2xl bg-[#FF6400] hover:bg-[#e65a00] text-white font-semibold text-base tracking-tight shadow-[0_10px_25px_-5px_rgba(255,100,0,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_30px_-5px_rgba(255,100,0,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Processando..." : "Ir para Pagamento Seguro"}
                    </Button>
                  </motion.div>

                  <motion.div
                    variants={modalItemVariants}
                    className="flex items-center justify-center gap-2 pt-2 text-xs text-slate-400"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Checkout Seguro • Mercado Pago</span>
                  </motion.div>
                </form>
              </motion.div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Guarantee Box */}
        <motion.div variants={itemVariants} className="mt-10 flex items-start gap-4 max-w-[440px]">
          <Shield className="text-[#a7f3d0] w-6 h-6 shrink-0 opacity-80 mt-1" />
          <p className="text-sm text-[#a7f3d0] leading-relaxed font-light opacity-90">
            <strong className="font-semibold text-white">Risco Zero.</strong> 7 dias de garantia
            incondicional. Se a plataforma não poupar horas do seu mês, cancele com um clique e
            receba 100% de volta.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
