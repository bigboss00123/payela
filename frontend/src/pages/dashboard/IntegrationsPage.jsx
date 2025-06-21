import React from 'react';
import { Helmet } from 'react-helmet';
import { Key, Copy, RefreshCcw, Link, ExternalLink, Server, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useOutletContext } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const IntegrationsPage = () => {
  const { showComingSoonToast, isDarkMode } = useOutletContext();
  const { toast } = useToast();
  const apiKey = "payela_sk_live_xxxxxxxxxxxxxxxxxxxxxxxx";

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast({ 
      title: "Chave API copiada!", 
      description: "A chave API foi copiada para a área de transferência.",
      className: `${isDarkMode ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-slate-800 border-slate-200'}`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Integrações / API - Dashboard Payela</title>
      </Helmet>
      <div className="space-y-10 font-sans">
        <motion.section
          initial={{ opacity: 0, y:20 }} animate={{ opacity: 1, y:0 }} transition={{ duration: 0.3 }}
        >
          <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Integrações e API</h1>
          
          <div className={`p-6 rounded-xl shadow-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>Chave da API (Live)</h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
              <Input type="text" readOnly value={apiKey} className={`flex-grow ${isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-300 focus:ring-cyan-500 focus:border-cyan-500' : 'bg-slate-100 border-slate-300 text-slate-600 focus:ring-cyan-500 focus:border-cyan-500'}`} />
              <div className="flex space-x-2">
                <Button variant="outline" onClick={copyApiKey} className={`w-full sm:w-auto rounded-md ${isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'}`}><Copy size={16} className="mr-2" /> Copiar</Button>
                <Button variant="outline" onClick={() => showComingSoonToast("Gerar nova chave API")} className={`w-full sm:w-auto rounded-md ${isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'}`}><RefreshCcw size={16} className="mr-2" /> Gerar Nova</Button>
              </div>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Use esta chave para autenticar suas requisições à API Payela. Mantenha-a segura!</p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y:20 }} animate={{ opacity: 1, y:0 }} transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className={`p-6 rounded-xl shadow-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>Documentação da API</h2>
            <p className={`mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Acesse nossa documentação completa para aprender como integrar o Payela em sua plataforma, com exemplos de código e guias detalhados.
            </p>
            <Button onClick={() => showComingSoonToast("Acessar documentação")} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg text-base py-2.5 px-5">
              <ExternalLink size={18} className="mr-2" /> Ver Documentação
            </Button>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y:20 }} animate={{ opacity: 1, y:0 }} transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className={`p-6 rounded-xl shadow-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>Status da API</h2>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`${isDarkMode ? 'text-green-400' : 'text-green-600'} font-medium`}>Online</span>
              <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>- Todos os sistemas operacionais.</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => showComingSoonToast("Ver página de status")} className={`rounded-md ${isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'}`}>
              <Server size={16} className="mr-2" /> Página de Status
            </Button>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y:20 }} animate={{ opacity: 1, y:0 }} transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className={`p-6 rounded-xl shadow-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>Webhook URL</h2>
            <form onSubmit={(e) => { e.preventDefault(); showComingSoonToast("Salvar URL do Webhook"); }} className="space-y-4">
              <div>
                <Label htmlFor="webhookUrl" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>URL para Notificações de Eventos</Label>
                <Input 
                  type="url" 
                  id="webhookUrl" 
                  placeholder="https://seu-site.com/webhook-payela" 
                  className={`mt-1 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-cyan-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:ring-cyan-500 focus:border-cyan-500'}`}
                />
                <p className={`text-xs mt-1.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Enviaremos eventos de transação para esta URL (ex: pagamento confirmado, falha no pagamento).
                </p>
              </div>
              <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold rounded-lg text-base py-2.5 px-5">
                <Link size={18} className="mr-2" /> Salvar URL do Webhook
              </Button>
            </form>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y:20 }} animate={{ opacity: 1, y:0 }} transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className={`p-6 rounded-xl border-l-4 ${isDarkMode ? 'bg-slate-800 border-yellow-500' : 'bg-yellow-50 border-yellow-400'}`}>
            <div className="flex items-start">
              <AlertCircle className={`mr-3 mt-0.5 h-6 w-6 flex-shrink-0 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
              <div>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>Modo de Teste (Sandbox)</h3>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-yellow-400/80' : 'text-yellow-600'}`}>
                  Para testar sua integração sem processar pagamentos reais, use as chaves de API de teste e o ambiente sandbox.
                  <button onClick={() => showComingSoonToast("Acessar ambiente Sandbox")} className="ml-1 underline font-medium hover:text-yellow-500 transition-colors">Saiba mais</button>.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default IntegrationsPage;