
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  Code, 
  ArrowRight, 
  CheckCircle, 
  Smartphone, 
  CreditCard, 
  Users,
  Star,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import TargetAudienceSection from '@/components/landing/TargetAudienceSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

function LandingPage() {
  const { toast } = useToast();

  const showComingSoonToast = () => {
    toast({
      title: "🚧 Esta funcionalidade ainda não foi implementada",
      description: "Mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
      duration: 4000,
    });
  };

  return (
    <>
      <Helmet>
        <title>Payela - Pagamentos Móveis Instantâneos com Mpesa e E-Mola</title>
        <meta name="description" content="Aceite pagamentos com Mpesa e E-Mola em segundos. Payela é a forma mais rápida, segura e moderna de integrar pagamentos móveis em lojas online e sistemas." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <Header showComingSoonToast={showComingSoonToast} />
        <HeroSection showComingSoonToast={showComingSoonToast} />
        <BenefitsSection />
        <HowItWorksSection />
        <TargetAudienceSection showComingSoonToast={showComingSoonToast} />
        <TestimonialsSection />
        <CTASection showComingSoonToast={showComingSoonToast} />
        <Footer showComingSoonToast={showComingSoonToast} />
      </div>
    </>
  );
}

export default LandingPage;
