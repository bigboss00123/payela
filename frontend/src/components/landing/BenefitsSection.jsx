
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Code } from 'lucide-react';

const BenefitsSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div variants={fadeInUp} className="text-center space-y-4 glass-effect rounded-2xl p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full flex items-center justify-center mx-auto">
              <Zap className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold">Checkout Instantâneo</h3>
            <p className="text-slate-300">Processamento de pagamentos em tempo real com confirmação imediata via Mpesa e E-Mola.</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center space-y-4 glass-effect rounded-2xl p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
              <Shield className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold">Segurança de nível bancário</h3>
            <p className="text-slate-300">Criptografia avançada e conformidade com padrões internacionais de segurança financeira.</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center space-y-4 glass-effect rounded-2xl p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
              <Code className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold">Fácil para desenvolvedores</h3>
            <p className="text-slate-300">API RESTful simples, documentação completa e SDKs para múltiplas linguagens de programação.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
