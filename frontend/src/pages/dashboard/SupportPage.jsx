import React from 'react';
import { Helmet } from 'react-helmet';
import { MessageSquare, HelpCircle, BookOpen, PhoneCall, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';

const faqItems = [
  {
    question: "Como criar uma nova carteira?",
    answer: "Vá para a seção 'Minhas Carteiras' e clique em 'Criar Nova Carteira'. Preencha os dados solicitados e sua carteira será criada instantaneamente."
  },
  {
    question: "Como integrar o checkout no meu site?",
    answer: "Na seção 'Integrações / API', você encontrará sua chave de API e links para a documentação completa com guias de integração para diversas plataformas e linguagens."
  },
  {
    question: "Como solicitar um saque dos meus fundos?",
    answer: "Acesse a página 'Saques', escolha a carteira de origem, informe o valor desejado e os dados da conta bancária de destino. O processamento geralmente leva algumas horas úteis."
  },
  {
    question: "Quais são as taxas de transação do Payela?",
    answer: "As taxas de transação variam conforme o seu plano e o volume de pagamentos processados. Consulte nossa página de 'Preços' para detalhes ou entre em contato para um plano personalizado."
  },
  {
    question: "O Payela é seguro para transações financeiras?",
    answer: "Sim, a segurança é nossa prioridade máxima. Utilizamos criptografia de ponta, seguimos os padrões PCI DSS e implementamos múltiplas camadas de proteção para garantir a segurança dos seus dados e transações."
  }
];

const SupportPage = () => {
  const { showComingSoonToast, isDarkMode } = useOutletContext();

  const handleSendMessage = (e) => {
    e.preventDefault();
    showComingSoonToast("Enviar mensagem de suporte");
  };

  return (
    <>
      <Helmet>
        <title>Suporte - Dashboard Payela</title>
      </Helmet>
      <div className="space-y-10 font-sans">
        <motion.h1 
          className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        >
          Central de Ajuda e Suporte
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div 
            className={`lg:col-span-2 p-6 rounded-xl shadow-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
          >
            <div className="flex items-center mb-6">
              <MessageSquare className={`mr-3 h-7 w-7 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Envie sua Dúvida</h2>
            </div>
            <form onSubmit={handleSendMessage} className="space-y-5">
              <div>
                <Label htmlFor="subject" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Assunto</Label>
                <Input type="text" id="subject" placeholder="Ex: Dúvida sobre integração API" className={`mt-1 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-cyan-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 focus:ring-cyan-500 focus:border-cyan-500'}`} />
              </div>
              <div>
                <Label htmlFor="message" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Sua Mensagem</Label>
                <Textarea id="message" rows={5} placeholder="Descreva sua dúvida ou problema em detalhes..." className={`mt-1 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-cyan-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 focus:ring-cyan-500 focus:border-cyan-500'}`} />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold py-3 text-base rounded-lg">
                <Send size={18} className="mr-2" /> Enviar Mensagem
              </Button>
            </form>
            <p className={`text-center mt-5 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Ou inicie um chat com nosso <button onClick={() => showComingSoonToast("Chatbot")} className="text-cyan-500 hover:underline font-medium">Chatbot Inteligente</button>.</p>
          </motion.div>

          <motion.div 
            className={`lg:col-span-3 p-6 rounded-xl shadow-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex items-center mb-6">
              <BookOpen className={`mr-3 h-7 w-7 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Base de Conhecimento (FAQ)</h2>
            </div>
            <div className="space-y-3 max-h-[28rem] overflow-y-auto pr-2 scrollbar-thin">
              {faqItems.map((item, index) => (
                <details key={index} className={`group rounded-lg border ${isDarkMode ? 'border-slate-700 hover:border-slate-600' : 'border-slate-200 hover:border-slate-300'}`}>
                  <summary className={`flex justify-between items-center font-medium cursor-pointer p-4 list-none transition-colors ${isDarkMode ? 'text-slate-200 hover:bg-slate-700/70' : 'text-slate-700 hover:bg-slate-100'} rounded-t-lg group-open:rounded-b-none group-open:bg-slate-700/70 group-open:text-cyan-400`}>
                    {item.question}
                    <HelpCircle className="h-5 w-5 transition-transform duration-300 group-open:rotate-180 group-open:text-cyan-400" />
                  </summary>
                  <p className={`p-4 text-sm leading-relaxed ${isDarkMode ? 'text-slate-300 bg-slate-700/50' : 'text-slate-600 bg-slate-50'} rounded-b-lg`}>
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
            <Button variant="outline" onClick={() => showComingSoonToast("Ver todos os tópicos da FAQ")} className={`w-full mt-6 rounded-lg ${isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'}`}>
              Ver Todos os Tópicos
            </Button>
          </motion.div>
        </div>

        <motion.div 
          className={`p-6 rounded-xl shadow-xl text-center ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}
        >
          <PhoneCall className={`mx-auto mb-3 h-8 w-8 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Contato Urgente</h3>
          <p className={`mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Para problemas críticos que exigem atenção imediata, entre em contato com nossa equipe técnica.</p>
          <Button onClick={() => showComingSoonToast("Ligar para suporte técnico")} className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold rounded-lg text-base py-2.5 px-5">
            Ligar para Suporte Técnico
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default SupportPage;