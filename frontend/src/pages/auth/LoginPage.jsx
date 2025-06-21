import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Phone, Eye, EyeOff, Loader2 } from 'lucide-react';
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

const LoginPage = () => {
  const { isDarkMode } = useOutletContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    countryCode: '+258',
    whatsappNumber: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/users/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whatsapp_number: formData.whatsappNumber,
          password: formData.password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        toast({
          title: "Sucesso",
          description: "Login realizado com sucesso! Redirecionando para o dashboard.",
          className: `${isDarkMode ? 'bg-green-700 text-white border-green-600' : 'bg-green-100 text-green-700 border-green-200'}`,
          duration: 5000,
        });
        setIsLoading(false);
        navigate('/dashboard');
      } else {
        const data = await response.json();
        toast({
          title: "Erro",
          description: JSON.stringify(data),
          variant: "destructive",
          className: `${isDarkMode ? 'bg-red-700 text-white border-red-600' : 'bg-red-100 text-red-700 border-red-200'}`,
        });
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao conectar com o servidor.",
        variant: "destructive",
        className: `${isDarkMode ? 'bg-red-700 text-white border-red-600' : 'bg-red-100 text-red-700 border-red-200'}`,
      });
      setIsLoading(false);
    }
  };

  const inputBaseClass = `w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${isDarkMode ? 'bg-slate-700 border-slate-600 placeholder:text-slate-400 focus-visible:ring-cyan-500 focus-visible:ring-offset-slate-900' : 'bg-slate-50 border-slate-300 placeholder:text-slate-400 focus-visible:ring-cyan-500 focus-visible:ring-offset-slate-100'}`;
  const labelBaseClass = `block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`;

  return (
    <>
      <Helmet><title>Login - Payela</title></Helmet>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className={`text-3xl font-bold text-center mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Bem-vindo de Volta!</h1>
        <p className={`text-center mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Acesse sua conta Payela.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className={labelBaseClass}>Senha</Label>
              <Link to="/auth/forgot-password" className={`text-xs font-medium hover:underline ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>Esqueceu a senha?</Link>
            </div>
            <div className="relative mt-1">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              <Input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Sua senha" value={formData.password} onChange={handleChange} required className={`${inputBaseClass} pl-10`} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'}`}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className={`w-full font-semibold py-3 text-base rounded-lg bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white transition-all duration-300 ease-in-out ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Entrar'}
          </Button>
        </form>

        <p className={`text-center text-sm mt-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Não tem uma conta? <Link to="/auth/signup" className="font-medium text-cyan-500 hover:underline">Criar conta agora</Link>
        </p>
      </motion.div>
    </>
  );
};

export default LoginPage;
