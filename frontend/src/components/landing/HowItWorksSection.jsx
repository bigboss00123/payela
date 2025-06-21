
import React from 'react';
import { motion } from 'framer-motion';

const HowItWorksSection = () => {
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
    <section className="py-20 bg-gradient-to-r from-slate-800/50 to-blue-900/50">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Como Funciona</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Integre pagamentos móveis em 3 passos simples
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div variants={fadeInUp} className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              1
            </div>
            <h3 className="text-2xl font-bold">Crie sua conta</h3>
            <p className="text-slate-300">Registe-se gratuitamente e configure sua conta em menos de 5 minutos.</p>
            <img  
              alt="Interface de criação de conta Payela" 
              className="w-full max-w-xs mx-auto rounded-lg shadow-lg"
              src="https://images.unsplash.com/photo-1699736059098-ffea3debef5a" />
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              2
            </div>
            <h3 className="text-2xl font-bold">Integre ou gere link de pagamento</h3>
            <p className="text-slate-300">Use nossa API ou gere links de pagamento personalizados para sua loja.</p>
            <img  
              alt="Código de integração API Payela" 
              className="w-full max-w-xs mx-auto rounded-lg shadow-lg"
              src="https://images.unsplash.com/photo-1555949963-aa79dcee981c" />
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              3
            </div>
            <h3 className="text-2xl font-bold">Receba via Mpesa ou E-Mola</h3>
            <p className="text-slate-300">Seus clientes pagam instantaneamente e você recebe confirmação em tempo real.</p>
            <img  
              alt="Notificação de pagamento recebido" 
              className="w-full max-w-xs mx-auto rounded-lg shadow-lg"
              src="https://images.unsplash.com/photo-1625708974337-fb8fe9af5711" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
