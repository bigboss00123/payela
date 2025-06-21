import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ showComingSoonToast }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDocsNavigation = () => {
    navigate('/developers/docs');
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const isLoggedIn = !!localStorage.getItem('accessToken');

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 glass-effect font-sans"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold gradient-text">
            Payela
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-cyan-400 transition-colors">Início</Link>
            <button onClick={showComingSoonToast} className="text-white hover:text-cyan-400 transition-colors">Soluções</button>
            <button onClick={showComingSoonToast} className="text-white hover:text-cyan-400 transition-colors">Para Lojas</button>
            <button onClick={handleDocsNavigation} className="text-white hover:text-cyan-400 transition-colors">Para Desenvolvedores</button>
            <button onClick={showComingSoonToast} className="text-white hover:text-cyan-400 transition-colors">Preços</button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link to="/auth/login">
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    Entrar
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold px-6 pulse-glow">
                    Criar Conta
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button onClick={() => navigate('/dashboard')} className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold px-6">
                  Dashboard
                </Button>
                <Button onClick={() => {localStorage.removeItem('accessToken'); localStorage.removeItem('refreshToken'); navigate('/auth/login');}} variant="outline" className="text-white border-white ml-2 px-4">
                  Sair
                </Button>
              </>
            )}
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-white/10"
          >
            <div className="flex flex-col space-y-4 pt-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-cyan-400 transition-colors text-left">Início</Link>
              <button onClick={() => {showComingSoonToast(); setIsMenuOpen(false);}} className="text-white hover:text-cyan-400 transition-colors text-left">Soluções</button>
              <button onClick={() => {showComingSoonToast(); setIsMenuOpen(false);}} className="text-white hover:text-cyan-400 transition-colors text-left">Para Lojas</button>
              <button onClick={handleDocsNavigation} className="text-white hover:text-cyan-400 transition-colors text-left">Para Desenvolvedores</button>
              <button onClick={() => {showComingSoonToast(); setIsMenuOpen(false);}} className="text-white hover:text-cyan-400 transition-colors text-left">Preços</button>
              <div className="flex flex-col space-y-2 pt-4">
                {!isLoggedIn ? (
                  <>
                    <Link to="/auth/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full text-white hover:bg-white/10 justify-start">
                        Entrar
                      </Button>
                    </Link>
                    <Link to="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold">
                        Criar Conta
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button onClick={() => {navigate('/dashboard'); setIsMenuOpen(false);}} className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold">
                    Dashboard
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
