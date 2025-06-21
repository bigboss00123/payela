import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Key, Lock, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';

const countryCodes = [
  { code: '+258', name: 'Moçambique', flag: '🇲🇿' },
  { code: '+55', name: 'Brasil', flag: '🇧🇷' },
  { code: '+27', name: 'África do Sul', flag: '🇿🇦' },
];

const ForgotPasswordPage = () => {
  const { isDarkMode } = useOutletContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Enter WhatsApp, 2: Enter Code & New Password
  const [formData, setFormData] = useState({
    countryCode: '+258',
    whatsappNumber: '',
    verificationCode: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Código Enviado (Simulado)",
        description: "Um código de verificação foi enviado para o seu WhatsApp (simulação).",
        className: `${isDarkMode ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-slate-800 border-slate-200'}`,
      });
      setIsLoading(false);
      setStep(2);
    }, 2000);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast({ title: "Erro", description: "As novas senhas não coincidem.", variant: "destructive", className: `${isDarkMode ? 'bg-red-700 text-white border-red-600' : 'bg-red-100 text-red-700 border-red-200'}` });
      setIsLoading(false);
      return;
    }
    setTimeout(() => {
      toast({
        title: "Senha Redefinida (Simulado)",
        description: "Sua senha foi redefinida com sucesso (simulação). Faça login com sua nova senha.",
        className: `${isDarkMode ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-slate-800 border-slate-200'}`,
      });
      setIsLoading(false);
      navigate('/auth/login');
    }, 2000);
  };
  
  const inputBaseClass = `w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${isDarkMode ? 'bg-slate-700 border-slate-600 placeholder:text-slate-400 focus-visible:ring-cyan-500 focus-visible:ring-offset-slate-900' : 'bg-slate-50 border-slate-300 placeholder:text-slate-400 focus-visible:ring-cyan-500 focus-visible:ring-offset-slate-100'}`;
  const labelBaseClass = `block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`;

  return (
    <>
      <Helmet><title>Recuperar Senha - Payela</title></Helmet>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Link to="/auth/login" className={`inline-flex items-center text-sm mb-6 group ${isDarkMode ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-600 hover:text-cyan-600'}`}>
          <ArrowLeft size={16} className="mr-1 transition-transform group-hover:-translate-x-1" />
          Voltar para Login
        </Link>
        <h1 className={`text-3xl font-bold text-center mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Recuperar Senha</h1>
        <p className={`text-center mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {step === 1 ? "Insira seu número do WhatsApp para receber o código." : "Insira o código e defina sua nova senha."}
        </p>
        
        {step === 1 && (
          <form onSubmit={handleSendCode} className="space-y-6">
            <div>
              <Label htmlFor="whatsappNumber" className={labelBaseClass}>Número de WhatsApp</Label>
              <div className="flex">
                <div className="relative">
                  <select name="countryCode" value={formData.countryCode} onChange={handleChange} className={`${inputBaseClass} appearance-none rounded-r-none pr-8 pl-3`}>
                    {countryCodes.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                  </select>
                  <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} style={{left: 'calc(100% - 24px)'}}/>
                </div>
                <Input type="tel" name="whatsappNumber" id="whatsappNumber" placeholder="Seu número" value={formData.whatsappNumber} onChange={handleChange} required className={`${inputBaseClass} rounded-l-none flex-1`} />
              </div>
            </div>
            <Button type="submit" disabled={isLoading} className={`w-full font-semibold py-3 text-base rounded-lg bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white transition-all duration-300 ease-in-out ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Enviar Código'}
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <Label htmlFor="verificationCode" className={labelBaseClass}>Código de Verificação</Label>
              <div className="relative">
                <Key className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                <Input type="text" name="verificationCode" id="verificationCode" placeholder="Código de 6 dígitos" maxLength={6} value={formData.verificationCode} onChange={handleChange} required className={`${inputBaseClass} pl-10 tracking-[0.3em] text-center`} />
              </div>
            </div>
            <div>
              <Label htmlFor="newPassword" className={labelBaseClass}>Nova Senha</Label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                <Input type="password" name="newPassword" id="newPassword" placeholder="Mínimo 6 caracteres" value={formData.newPassword} onChange={handleChange} required className={`${inputBaseClass} pl-10`} />
              </div>
            </div>
            <div>
              <Label htmlFor="confirmNewPassword" className={labelBaseClass}>Confirmar Nova Senha</Label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                <Input type="password" name="confirmNewPassword" id="confirmNewPassword" placeholder="Repita a nova senha" value={formData.confirmNewPassword} onChange={handleChange} required className={`${inputBaseClass} pl-10`} />
              </div>
            </div>
            <Button type="submit" disabled={isLoading} className={`w-full font-semibold py-3 text-base rounded-lg bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white transition-all duration-300 ease-in-out ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Redefinir Senha'}
            </Button>
          </form>
        )}
      </motion.div>
    </>
  );
};

export default ForgotPasswordPage;