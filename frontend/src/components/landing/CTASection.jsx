
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = ({ showComingSoonToast }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 to-blue-900">
      <div className="container mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-5xl lg:text-6xl font-bold">
            Pronto para modernizar seus{' '}
            <span className="gradient-text">pagamentos?</span>
          </h2>
          
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Junte-se a centenas de empresas que já confiam no Payela para processar seus pagamentos móveis.
          </p>

          <Button 
            onClick={showComingSoonToast}
            size="lg" 
            className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-bold px-12 py-6 text-xl pulse-glow"
          >
            Começar com Payela
            <ArrowRight className="ml-3" size={24} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
