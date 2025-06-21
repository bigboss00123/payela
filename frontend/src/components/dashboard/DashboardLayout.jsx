import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Home,
  Wallet,
  ListChecks,
  Download,
  Puzzle,
  ShoppingCart,
  Settings,
  LifeBuoy,
  LogOut,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  PlusCircle,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarLink = ({ to, icon: Icon, children, currentPath, onClick }) => {
  const isActive = currentPath.startsWith(`/dashboard/${to}`);
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
        ${isActive 
          ? 'bg-gradient-to-r from-cyan-500 to-green-500 text-white shadow-lg font-medium' 
          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
        }`}
    >
      <Icon size={20} />
      <span>{children}</span>
    </Link>
  );
};

const DashboardLayout = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('payela-theme');
    return savedTheme ? JSON.parse(savedTheme) : true;
  }); 

  useEffect(() => {
    localStorage.setItem('payela-theme', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark_theme_class_placeholder');
      document.documentElement.classList.remove('light_theme_class_placeholder');
    } else {
      document.documentElement.classList.add('light_theme_class_placeholder');
      document.documentElement.classList.remove('dark_theme_class_placeholder');
    }
  }, [isDarkMode]);


  const showComingSoonToast = (featureName = "Esta funcionalidade") => {
    toast({
      title: `🚧 ${featureName} ainda não foi implementada`,
      description: "Mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
      duration: 4000,
      className: `${isDarkMode ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-slate-800 border-slate-200'}`,
    });
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  const navItems = [
    { to: 'home', icon: Home, label: 'Início' },
    { to: 'wallets', icon: Wallet, label: 'Minhas Carteiras' },
    { to: 'transactions', icon: ListChecks, label: 'Transações' },
    { to: 'withdrawals', icon: Download, label: 'Saques' },
    { to: 'integrations', icon: Puzzle, label: 'Integrações / API' },
    { to: 'checkout', icon: ShoppingCart, label: 'Checkout' },
    { to: 'settings', icon: Settings, label: 'Configurações' },
    { to: 'support', icon: LifeBuoy, label: 'Suporte' },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Payela</title>
        <meta name="description" content="Gerencie suas finanças e integrações com o Payela." />
      </Helmet>
      <div className={`flex h-screen font-sans ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'}`}>
        <aside className={`hidden lg:flex flex-col w-72 p-6 space-y-4 shadow-xl transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-r border-slate-700' : 'bg-white border-r border-slate-200'}`}>
          <Link to="/dashboard/home" className="text-3xl font-bold gradient-text mb-8 text-center py-2">
            Payela
          </Link>
          <nav className="flex-grow space-y-2">
            {navItems.map(item => (
              <SidebarLink key={item.to} to={item.to} icon={item.icon} currentPath={location.pathname}>
                {item.label}
              </SidebarLink>
            ))}
          </nav>
          <Button variant="ghost" onClick={() => showComingSoonToast("Sair")} className={`w-full justify-start py-3 transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-slate-700 hover:text-red-400' : 'text-slate-500 hover:bg-slate-200 hover:text-red-500'}`}>
            <LogOut size={20} className="mr-3" />
            Sair
          </Button>
        </aside>

        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside 
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`fixed inset-y-0 left-0 z-[60] flex flex-col w-72 p-6 space-y-4 shadow-xl lg:hidden transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-r border-slate-700' : 'bg-white border-r border-slate-200'}`}
            >
              <div className="flex justify-between items-center mb-8">
                <Link to="/dashboard/home" className="text-3xl font-bold gradient-text py-2" onClick={toggleSidebar}>
                  Payela
                </Link>
                <Button variant="ghost" size="icon" onClick={toggleSidebar} className={`${isDarkMode ? 'text-white hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-200'}`}>
                  <X size={24} />
                </Button>
              </div>
              <nav className="flex-grow space-y-2">
                {navItems.map(item => (
                  <SidebarLink key={item.to} to={item.to} icon={item.icon} currentPath={location.pathname} onClick={toggleSidebar}>
                    {item.label}
                  </SidebarLink>
                ))}
              </nav>
              <Button variant="ghost" onClick={() => { showComingSoonToast("Sair"); toggleSidebar(); }} className={`w-full justify-start py-3 transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-slate-700 hover:text-red-400' : 'text-slate-500 hover:bg-slate-200 hover:text-red-500'}`}>
                <LogOut size={20} className="mr-3" />
                Sair
              </Button>
            </motion.aside>
          )}
        </AnimatePresence>


        <div className="flex-1 flex flex-col overflow-hidden">
          <header className={`flex items-center justify-between p-4 h-20 shadow-lg transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-b border-slate-700' : 'bg-white border-b border-slate-200'}`}>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className={`lg:hidden mr-3 ${isDarkMode ? 'text-white hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-200'}`}>
                <Menu size={24} />
              </Button>
              <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                {navItems.find(item => location.pathname.includes(item.to))?.label || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-5">
              <Button onClick={() => showComingSoonToast("Nova Carteira ou Integração")} className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold hidden sm:flex items-center px-4 py-2 rounded-lg">
                <PlusCircle size={18} className="mr-2"/>
                Novo
              </Button>
              <button onClick={() => showComingSoonToast("Notificações")} className={`relative p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-200'}`}>
                <Bell size={22} className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-offset-1 ring-offset-current"></span>
              </button>
              <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-200'}`}>
                {isDarkMode ? <Sun size={22} className="text-yellow-400" /> : <Moon size={22} className="text-slate-600" />}
              </button>
              <button onClick={() => showComingSoonToast("Perfil do usuário")} className="flex items-center space-x-2 p-1 rounded-lg transition-colors group">
                <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-cyan-500 transition-all">
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" alt="Avatar do usuário" />
                  <AvatarFallback className={`${isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600'}`}>PN</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className={`font-semibold text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Nome Usuário</span>
                  <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Plano Pro</span>
                </div>
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 sm:p-8 scrollbar-thin">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Outlet context={{ showComingSoonToast, isDarkMode }} />
              </motion.div>
            </AnimatePresence>
            <div className={`mt-8 text-center text-xs p-4 rounded-md flex items-center justify-center ${isDarkMode ? 'text-slate-500 bg-slate-800/50' : 'text-slate-400 bg-slate-200/50'}`}>
              <ShieldCheck size={14} className="mr-2 text-green-500" />
              Conexão segura. Todos os dados são criptografados.
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;