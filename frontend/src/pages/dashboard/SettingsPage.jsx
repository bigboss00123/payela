import React from 'react';
import { Helmet } from 'react-helmet';
import { User, Lock, Bell, Settings2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';

const SettingsCard = ({ title, icon: Icon, children, isDarkMode, delay = 0 }) => (
  <motion.div 
    className={`p-6 rounded-xl shadow-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
    initial={{ opacity: 0, y:20 }} 
    animate={{ opacity: 1, y:0 }} 
    transition={{ duration: 0.4, delay }}
  >
    <div className="flex items-center mb-6">
      <Icon className={`mr-3 h-7 w-7 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
      <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const SettingsPage = () => {
  const { showComingSoonToast, isDarkMode } = useOutletContext();

  const handleSubmit = (e, section) => {
    e.preventDefault();
    showComingSoonToast(`Salvar configurações de ${section}`);
  };

  return (
    <>
      <Helmet>
        <title>Configurações - Dashboard Payela</title>
      </Helmet>
      <div className="space-y-10 font-sans">
        <motion.h1 
          className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        >
          Configurações da Conta
        </motion.h1>

        <SettingsCard title="Dados Pessoais" icon={User} isDarkMode={isDarkMode} delay={0.1}>
          <form onSubmit={(e) => handleSubmit(e, "Dados Pessoais")} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Nome Completo</Label>
                <Input type="text" id="fullName" defaultValue="Nome do Usuário Exemplo" className={`mt-1 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white focus:ring-cyan-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 focus:ring-cyan-500 focus:border-cyan-500'}`} />
              </div>
              <div>
                <Label htmlFor="email" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Email</Label>
                <Input type="email" id="email" defaultValue="usuario@exemplo.com" className={`mt-1 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white focus:ring-cyan-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 focus:ring-cyan-500 focus:border-cyan-500'}`} />
              </div>
            </div>
            <div>
              <Label htmlFor="phone" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Telefone</Label>
              <Input type="tel" id="phone" defaultValue="+258 84 123 4567" className={`mt-1 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white focus:ring-cyan-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 focus:ring-cyan-500 focus:border-cyan-500'}`} />
            </div>
            <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold rounded-lg text-base py-2.5 px-5"><Save size={18} className="mr-2" /> Salvar Dados</Button>
          </form>
        </SettingsCard>

        <SettingsCard title="Segurança" icon={Lock} isDarkMode={isDarkMode} delay={0.2}>
          <form onSubmit={(e) => handleSubmit(e, "Segurança")} className="space-y-6">
            <div>
              <Label htmlFor="currentPassword" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Senha Atual</Label>
              <Input type="password" id="currentPassword" placeholder="********" className={`mt-1 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white focus:ring-cyan-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 focus:ring-cyan-500 focus:border-cyan-500'}`} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="newPassword" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Nova Senha</Label>
                <Input type="password" id="newPassword" placeholder="********" className={`mt-1 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white focus:ring-cyan-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 focus:ring-cyan-500 focus:border-cyan-500'}`} />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Confirmar Nova Senha</Label>
                <Input type="password" id="confirmPassword" placeholder="********" className={`mt-1 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white focus:ring-cyan-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 focus:ring-cyan-500 focus:border-cyan-500'}`} />
              </div>
            </div>
            <div className="flex items-center space-x-3 pt-2">
              <Checkbox id="2fa" className={`${isDarkMode ? 'border-slate-500 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500' : 'border-slate-400 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600'}`} />
              <Label htmlFor="2fa" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} font-normal`}>Ativar Autenticação de Dois Fatores (2FA)</Label>
            </div>
            <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold rounded-lg text-base py-2.5 px-5"><Save size={18} className="mr-2" /> Salvar Segurança</Button>
          </form>
        </SettingsCard>

        <SettingsCard title="Notificações" icon={Bell} isDarkMode={isDarkMode} delay={0.3}>
          <form onSubmit={(e) => handleSubmit(e, "Notificações")} className="space-y-5">
            <div className="flex items-center space-x-3">
              <Checkbox id="emailNotifications" defaultChecked className={`${isDarkMode ? 'border-slate-500 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500' : 'border-slate-400 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600'}`} />
              <Label htmlFor="emailNotifications" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} font-normal`}>Receber notificações por email sobre transações e alertas</Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox id="whatsappNotifications" className={`${isDarkMode ? 'border-slate-500 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500' : 'border-slate-400 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600'}`} />
              <Label htmlFor="whatsappNotifications" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} font-normal`}>Receber notificações por WhatsApp (requer verificação)</Label>
            </div>
             <div className="flex items-center space-x-3">
              <Checkbox id="newsletterNotifications" className={`${isDarkMode ? 'border-slate-500 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500' : 'border-slate-400 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600'}`} />
              <Label htmlFor="newsletterNotifications" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} font-normal`}>Inscrever-se na newsletter Payela para novidades e dicas</Label>
            </div>
            <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold rounded-lg text-base py-2.5 px-5 mt-2"><Save size={18} className="mr-2" /> Salvar Notificações</Button>
          </form>
        </SettingsCard>

        <SettingsCard title="Preferências" icon={Settings2} isDarkMode={isDarkMode} delay={0.4}>
          <form onSubmit={(e) => handleSubmit(e, "Preferências")} className="space-y-6">
            <div>
              <Label htmlFor="currency" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Moeda Padrão</Label>
              <select id="currency" defaultValue="MZN" className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-300'}`}>
                <option value="MZN">Metical Moçambicano (MZN)</option>
                <option value="USD">Dólar Americano (USD)</option>
                <option value="ZAR">Rand Sul-Africano (ZAR)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="language" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Idioma</Label>
              <select id="language" defaultValue="pt" className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-300'}`}>
                <option value="pt">Português</option>
                <option value="en">English</option>
              </select>
            </div>
            <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold rounded-lg text-base py-2.5 px-5"><Save size={18} className="mr-2" /> Salvar Preferências</Button>
          </form>
        </SettingsCard>
      </div>
    </>
  );
};

export default SettingsPage;