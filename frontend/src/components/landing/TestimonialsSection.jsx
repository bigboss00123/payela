
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
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
    <section className="py-20 bg-gradient-to-r from-blue-900/30 to-slate-800/30">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">O que dizem nossos clientes</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Empresas que confiam no Payela para seus pagamentos
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div variants={fadeInUp} className="glass-effect rounded-2xl p-8 space-y-6">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-current" size={20} />
              ))}
            </div>
            <p className="text-slate-300 italic">
              "Desde que integrei o Payela, aumentei minhas vendas em 40%! A facilidade de pagamento via Mpesa revolucionou meu negócio."
            </p>
            <div className="flex items-center space-x-4">
              <img  
                alt="Foto de Maria Santos, proprietária de loja online" 
                className="w-12 h-12 rounded-full"
                src="https://images.unsplash.com/photo-1681939282321-0f241f3c3b4e" />
              <div>
                <div className="font-semibold">Maria Santos</div>
                <div className="text-sm text-slate-400">Proprietária, Loja Maputo Online</div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="glass-effect rounded-2xl p-8 space-y-6">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-current" size={20} />
              ))}
            </div>
            <p className="text-slate-300 italic">
              "A API do Payela é incrivelmente simples de integrar. Em 2 horas já estava processando pagamentos reais. Documentação perfeita!"
            </p>
            <div className="flex items-center space-x-4">
              <img  
                alt="Foto de João Mucavel, desenvolvedor" 
                className="w-12 h-12 rounded-full"
                src="https://images.unsplash.com/photo-1617854818583-09e7f077a156" />
              <div>
                <div className="font-semibold">João Mucavel</div>
                <div className="text-sm text-slate-400">Desenvolvedor Full-Stack</div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="glass-effect rounded-2xl p-8 space-y-6">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-current" size={20} />
              ))}
            </div>
            <p className="text-slate-300 italic">
              "Finalmente uma solução de pagamentos feita para África! O suporte é excepcional e a plataforma nunca falha."
            </p>
            <div className="flex items-center space-x-4">
              <img  
                alt="Foto de Ana Chissano, CEO de startup" 
                className="w-12 h-12 rounded-full"
                src="https://images.unsplash.com/photo-1681939282321-0f241f3c3b4e" />
              <div>
                <div className="font-semibold">Ana Chissano</div>
                <div className="text-sm text-slate-400">CEO, TechMoz Startup</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
