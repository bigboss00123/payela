import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Phone, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';

const countryCodes = [
  { code: '+258', name: 'Moçambique', flag: '🇲🇿' },
  { code: '+55', name: 'Brasil', flag: '🇧🇷' },
  { code: '+27', name: 'África do Sul', flag: '🇿🇦' },
  { code: '+244', name: 'Angola', flag: '🇦🇴' },
  { code: '+351', name: 'Portugal', flag: '🇵🇹' },
];

const PasswordStrengthIndicator = ({ password }) => {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
  if (password.match(/[^a-zA-Z0-9]/)) strength++;

  const strengthText = ["Muito Fraca", "Fraca", "Média", "Forte", "Muito Forte"];
  const strengthColor = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-green-500"];

  return (
    <div className="w-full h-2 bg-slate-300 dark:bg-slate-600 rounded-full mt-1 overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-300 ${strength > 0 ? strengthColor[strength-1] : 'bg-transparent'}`} 
        style={{ width: `${(strength / 4) * 100}%` }}
      ></div>
    </div>
  );
};


const SignUpPage = () => {
  const { isDarkMode } = useOutletContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    countryCode: '+258',
    whatsappNumber: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Erro", description: "As senhas não coincidem.", variant: "destructive", className: `${isDarkMode ? 'bg-red-700 text-white border-red-600' : 'bg-red-100 text-red-700 border-red-200'}` });
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 6 || !formData.password.match(/[0-9]/)) {
      toast({ title: "Erro", description: "A senha deve ter no mínimo 6 caracteres e incluir pelo menos 1 número.", variant: "destructive", className: `${isDarkMode ? 'bg-red-700 text-white border-red-600' : 'bg-red-100 text-red-700 border-red-200'}` });
      setIsLoading(false);
      return;
    }
    if (!formData.termsAccepted) {
      toast({ title: "Erro", description: "Você deve aceitar os Termos de Serviço.", variant: "destructive", className: `${isDarkMode ? 'bg-red-700 text-white border-red-600' : 'bg-red-100 text-red-700 border-red-200'}` });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/users/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          country_code: formData.countryCode,
          whatsapp_number: formData.whatsappNumber,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        }),
      });
      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Cadastro realizado com sucesso! Você será redirecionado para o login.",
          className: `${isDarkMode ? 'bg-green-700 text-white border-green-600' : 'bg-green-100 text-green-700 border-green-200'}`,
          duration: 5000,
        });
        setIsLoading(false);
        navigate('/auth/login');
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
      <Helmet><title>Criar Conta - Payela</title></Helmet>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className={`text-3xl font-bold text-center mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Crie sua Conta</h1>
        <p className={`text-center mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Rápido, fácil e seguro.</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className={labelBaseClass}>Nome</Label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                <Input type="text" name="firstName" id="firstName" placeholder="Seu nome" value={formData.firstName} onChange={handleChange} required className={`${inputBaseClass} pl-10`} />
              </div>
            </div>
            <div>
              <Label htmlFor="lastName" className={labelBaseClass}>Sobrenome</Label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                <Input type="text" name="lastName" id="lastName" placeholder="Seu sobrenome" value={formData.lastName} onChange={handleChange} required className={`${inputBaseClass} pl-10`} />
              </div>
            </div>
          </div>

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
            <Label htmlFor="password" className={labelBaseClass}>Senha</Label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              <Input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Mínimo 6 caracteres, 1 número" value={formData.password} onChange={handleChange} required className={`${inputBaseClass} pl-10`} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'}`}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <PasswordStrengthIndicator password={formData.password} />
          </div>

          <div>
            <Label htmlFor="confirmPassword" className={labelBaseClass}>Confirmar Senha</Label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              <Input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" id="confirmPassword" placeholder="Repita sua senha" value={formData.confirmPassword} onChange={handleChange} required className={`${inputBaseClass} pl-10`} />
               <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'}`}>
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
             {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">As senhas não coincidem.</p>
            )}
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="termsAccepted" name="termsAccepted" checked={formData.termsAccepted} onCheckedChange={(checked) => setFormData(prev => ({...prev, termsAccepted: checked}))} className={`${isDarkMode ? 'border-slate-500 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500' : 'border-slate-400 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600'}`} />
            <Label htmlFor="termsAccepted" className={`font-normal ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Eu aceito os <Link to="#" onClick={(e) => {e.preventDefault(); toast({title: "🚧 Em breve!", description:"Página de Termos de Serviço."})}} className="font-medium text-cyan-500 hover:underline">Termos de Serviço</Link>
            </Label>
          </div>

          <Button type="submit" disabled={isLoading} className={`w-full font-semibold py-3 text-base rounded-lg bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white transition-all duration-300 ease-in-out ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Criar Conta'}
          </Button>
        </form>

        <p className={`text-center text-sm mt-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Já tem uma conta? <Link to="/auth/login" className="font-medium text-cyan-500 hover:underline">Fazer login</Link>
        </p>
      </motion.div>
    </>
  );
};

export default SignUpPage;
