
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TargetAudienceSection = ({ showComingSoonToast }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-bold gradient-text">Para Lojistas e E-commerce</h2>
              <p className="text-xl text-slate-300">
                Aumente suas vendas com pagamentos móveis instantâneos
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-400" size={24} />
                <span>Integração com Shopify, WooCommerce e sites próprios</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-400" size={24} />
                <span>Dashboard completo para gestão de vendas</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-400" size={24} />
                <span>Relatórios detalhados e analytics</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-400" size={24} />
                <span>Suporte 24/7 em português</span>
              </div>
            </div>

            <Button 
              onClick={showComingSoonToast}
              size="lg" 
              className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold px-8"
            >
              Começar como Lojista
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-bold gradient-text">Para Desenvolvedores</h2>
              <p className="text-xl text-slate-300">
                APIs poderosas e documentação clara para integração rápida
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-400" size={24} />
                <span>API RESTful com webhooks em tempo real</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-400" size={24} />
                <span>SDKs para Python, JavaScript, PHP e mais</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-400" size={24} />
                <span>Sandbox completo para testes</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-400" size={24} />
                <span>Documentação interativa e exemplos práticos</span>
              </div>
            </div>

            <Button 
              onClick={showComingSoonToast}
              variant="outline" 
              size="lg" 
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8"
            >
              <ExternalLink className="mr-2" size={20} />
              Ver Documentação
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
