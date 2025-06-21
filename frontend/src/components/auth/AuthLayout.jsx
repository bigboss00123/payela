import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthLayout = () => {
  const location = useLocation(); // Correctly use useLocation hook
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

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <>
      <Helmet>
        <title>Autenticação - Payela</title>
        <meta name="description" content="Acesse sua conta ou crie uma nova no Payela." />
      </Helmet>
      <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 font-sans ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'}`}>
        <div className="absolute top-6 right-6">
          <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-yellow-400' : 'hover:bg-slate-200 text-slate-600'}`}
            aria-label="Alternar tema"
          >
            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>
        <Link to="/" className="mb-8 text-4xl font-bold gradient-text">
          Payela
        </Link>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname} // Use location.pathname from the hook
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`w-full max-w-md p-8 rounded-xl shadow-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
          >
            <Outlet context={{ isDarkMode }} />
          </motion.div>
        </AnimatePresence>
        <p className={`mt-8 text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          &copy; {new Date().getFullYear()} Payela. Todos os direitos reservados.
        </p>
      </div>
    </>
  );
};

export default AuthLayout;