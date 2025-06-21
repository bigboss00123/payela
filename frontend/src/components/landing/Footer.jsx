import React from 'react';
import { Users, Smartphone, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = ({ showComingSoonToast }) => {
  const navigate = useNavigate();

  const handleDocsNavigation = () => {
    navigate('/developers/docs');
  };

  return (
    <footer className="bg-slate-900 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="text-3xl font-bold gradient-text">Payela</div>
            <p className="text-slate-400">
              Tecnologia Moçambicana para o futuro digital da África.
            </p>
            <div className="flex space-x-4">
              <button onClick={showComingSoonToast} className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Users size={24} />
              </button>
              <button onClick={showComingSoonToast} className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Smartphone size={24} />
              </button>
              <button onClick={showComingSoonToast} className="text-slate-400 hover:text-cyan-400 transition-colors">
                <ExternalLink size={24} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-lg font-semibold text-white">Produto</span>
            <div className="space-y-2">
              <button onClick={showComingSoonToast} className="block text-slate-400 hover:text-white transition-colors">API</button>
              <button onClick={handleDocsNavigation} className="block text-slate-400 hover:text-white transition-colors">Documentação</button>
              <button onClick={showComingSoonToast} className="block text-slate-400 hover:text-white transition-colors">Preços</button>
              <button onClick={showComingSoonToast} className="block text-slate-400 hover:text-white transition-colors">Status</button>
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-lg font-semibold text-white">Empresa</span>
            <div className="space-y-2">
              <button onClick={showComingSoonToast} className="block text-slate-400 hover:text-white transition-colors">Sobre</button>
              <button onClick={showComingSoonToast} className="block text-slate-400 hover:text-white transition-colors">Blog</button>
              <button onClick={showComingSoonToast} className="block text-slate-400 hover:text-white transition-colors">Carreiras</button>
              <button onClick={showComingSoonToast} className="block text-slate-400 hover:text-white transition-colors">Imprensa</button>
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-lg font-semibold text-white">Suporte</span>
            <div className="space-y-2">
              <button onClick={showComingSoonToast} className="block text-slate-400 hover:text-white transition-colors">Ajuda</button>
              <button onClick={showComingSoonToast} className="block text-slate-400 hover:text-white transition-colors">Contato</button>
              <button onClick={showComingSoonToast} className="block text-slate-400 hover:text-white transition-colors">Termos</button>
              <button onClick={showComingSoonToast} className="block text-slate-400 hover:text-white transition-colors">Política</button>
            </div>
          </div>
        </div>

        <div className="section-divider my-8"></div>

        <div className="text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Payela. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;