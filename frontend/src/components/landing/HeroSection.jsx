import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, CreditCard, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ showComingSoonToast }) => {
  const navigate = useNavigate();

  const handleDocsNavigation = () => {
    navigate('/developers/docs');
  };

  return (
    <section className="pt-32 pb-20 hero-bg">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Aceite pagamentos com{' '}
              <span className="gradient-text">Mpesa e E-Mola</span>{' '}
              em segundos.
            </h1>
            
            <p className="text-xl text-slate-300 leading-relaxed">
              Payela é a forma mais rápida, segura e moderna de integrar pagamentos móveis em lojas online e sistemas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={showComingSoonToast}
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold px-8 py-4 text-lg pulse-glow"
              >
                Comece agora
                <ArrowRight className="ml-2" size={20} />
              </Button>
              
              <Button 
                onClick={handleDocsNavigation}
                variant="outline" 
                size="lg" 
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-4 text-lg"
              >
                <Code className="mr-2" size={20} />
                Ver Documentação da API
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="floating-animation">
              <img   
                alt="Smartphone mostrando interface de pagamento Mpesa" 
                className="w-full max-w-md mx-auto drop-shadow-2xl"
                  src="https://images.unsplash.com/photo-1626682561863-fdbb965de0dc" />
            </div>
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 glass-effect rounded-full p-4"
            >
              <CreditCard className="text-cyan-400" size={24} />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 glass-effect rounded-full p-4"
            >
              <Shield className="text-green-400" size={24} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;