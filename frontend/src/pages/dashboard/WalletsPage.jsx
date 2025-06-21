import React, { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/users';
import { Helmet } from 'react-helmet';
import { PlusCircle, Search, Edit, Trash2, Eye, RefreshCw, DollarSign, Wallet as WalletIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';

const WalletCard = ({ wallet, onAction, isDarkMode }) => {
  const statusColorsLight = {
    Ativa: 'bg-green-100 text-green-700 border border-green-200',
    'Em verificação': 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    Pausada: 'bg-red-100 text-red-700 border border-red-200',
  };
  const statusColorsDark = {
    Ativa: 'bg-green-700/30 text-green-300 border border-green-600/50',
    'Em verificação': 'bg-yellow-700/30 text-yellow-300 border border-yellow-600/50',
    Pausada: 'bg-red-700/30 text-red-300 border border-red-600/50',
  };
  const statusColors = isDarkMode ? statusColorsDark : statusColorsLight;


  return (
    <motion.div 
      className={`rounded-xl shadow-xl p-6 transition-all duration-300 ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700/60' : 'bg-white hover:bg-slate-50'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, boxShadow: `0 10px 15px -3px ${isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}, 0 4px 6px -4px ${isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}`}}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{wallet.name}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{wallet.type}</p>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[wallet.status]}`}>
          {wallet.status}
        </span>
      </div>
      <div className={`text-3xl font-bold mb-5 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>{wallet.balance}</div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => onAction('view', wallet.id)} className={`rounded-md ${isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'}`}><Eye size={16} className="mr-1.5" /> Ver</Button>
        <Button variant="outline" size="sm" onClick={() => onAction('integrations', wallet.id)} className={`rounded-md ${isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'}`}><RefreshCw size={16} className="mr-1.5" /> Integrações</Button>
        <Button variant="outline" size="sm" onClick={() => onAction('withdraw', wallet.id)} className={`rounded-md ${isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'}`}><DollarSign size={16} className="mr-1.5" /> Sacar</Button>
        <div className="flex-grow"></div>
        <Button variant="ghost" size="icon" onClick={() => onAction('edit', wallet.id)} className={`rounded-md h-9 w-9 ${isDarkMode ? 'text-slate-400 hover:text-cyan-400 hover:bg-slate-700' : 'text-slate-500 hover:text-cyan-600 hover:bg-slate-100'}`}><Edit size={16} /></Button>
        <Button variant="ghost" size="icon" onClick={() => onAction('delete', wallet.id)} className={`rounded-md h-9 w-9 ${isDarkMode ? 'text-slate-400 hover:text-red-500 hover:bg-slate-700' : 'text-slate-500 hover:text-red-600 hover:bg-slate-100'}`}><Trash2 size={16} /></Button>
      </div>
    </motion.div>
  );
};

const WalletsPage = () => {
  const { showComingSoonToast, isDarkMode } = useOutletContext();

  const [wallets, setWallets] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWallet, setCurrentWallet] = useState(null);
  const [newWalletName, setNewWalletName] = useState('');
  const [newWalletType, setNewWalletType] = useState('Mpesa');

  const handleWalletAction = (action, walletId) => {
    showComingSoonToast(`Ação "${action}" na carteira ${walletId}`);
  };

  useEffect(() => {
    const fetchWallets = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        showComingSoonToast('Usuário não autenticado');
        return;
      }
      try {
        const response = await fetch('/api/wallets/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Erro ao buscar carteiras');
        }
        const data = await response.json();
        setWallets(data);
      } catch (error) {
        showComingSoonToast(error.message);
      }
    };
    fetchWallets();
  }, [showComingSoonToast]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentWallet(null);
    setNewWalletName('');
    setNewWalletType('Mpesa');
  };

  const createWalletOnBackend = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      showComingSoonToast('Usuário não autenticado');
      return null;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/wallets/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: '', type: 'Mpesa' }),
      });
      if (!response.ok) {
        throw new Error('Erro ao criar carteira');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      showComingSoonToast(error.message);
      return null;
    }
  };

  const updateWalletOnBackend = async (walletId, updatedData) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      showComingSoonToast('Usuário não autenticado');
      return false;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/wallets/${walletId}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar carteira');
      }
      return true;
    } catch (error) {
      showComingSoonToast(error.message);
      return false;
    }
  };

  const handleCreateWallet = async () => {
    if (!newWalletName.trim()) {
      showComingSoonToast('Por favor, insira o nome da carteira.');
      return;
    }
    if (!currentWallet) {
      showComingSoonToast('Nenhuma carteira selecionada para atualização.');
      return;
    }
    const success = await updateWalletOnBackend(currentWallet.id, {
      name: newWalletName,
      type: newWalletType,
    });
    if (success) {
      const updatedWallets = wallets.map(w => w.id === currentWallet.id ? { ...w, name: newWalletName, type: newWalletType } : w);
      setWallets(updatedWallets);
      closeModal();
    }
  };

  const handleNewWalletClick = async () => {
    const newWallet = await createWalletOnBackend();
    if (newWallet) {
      setWallets([...wallets, newWallet]);
      setCurrentWallet(newWallet);
      setNewWalletName(newWallet.name || '');
      setNewWalletType(newWallet.type || 'Mpesa');
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Minhas Carteiras - Dashboard Payela</title>
      </Helmet>
      <div className="font-sans">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Minhas Carteiras</h1>
          <Button onClick={handleNewWalletClick} className="mt-4 sm:mt-0 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold rounded-lg text-base py-2.5 px-5">
            <PlusCircle size={20} className="mr-2" />
            Criar Nova Carteira
          </Button>
        </div>

        <div className={`mb-6 p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="relative">
            <Search className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`} />
            <Input 
              type="search" 
              placeholder="Pesquisar carteiras por nome ou tipo..." 
              className={`pl-10 w-full ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-cyan-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:ring-cyan-500 focus:border-cyan-500'}`}
              onChange={(e) => showComingSoonToast(`Pesquisar por: ${e.target.value}`)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {wallets.map(wallet => (
            <WalletCard key={wallet.id} wallet={wallet} onAction={handleWalletAction} isDarkMode={isDarkMode} />
          ))}
        </div>
        {wallets.length === 0 && (
          <div className={`text-center py-12 rounded-lg shadow-md ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <WalletIcon size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>Nenhuma carteira encontrada</h3>
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Crie sua primeira carteira para começar a receber pagamentos.</p>
          </div>
        )}

        {isModalOpen && (
          <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`}>
            <div className={`bg-slate-900 rounded-lg shadow-lg p-6 w-full max-w-md mx-4`}>
              <h2 className={`text-xl font-semibold mb-4 text-white`}>Criar Nova Carteira</h2>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-white" htmlFor="walletName">Nome da Carteira</label>
                <Input
                  id="walletName"
                  type="text"
                  value={newWalletName}
                  onChange={(e) => setNewWalletName(e.target.value)}
                  placeholder="Digite o nome da carteira"
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-1 font-medium text-white" htmlFor="walletType">Tipo da Carteira</label>
                <select
                  id="walletType"
                  value={newWalletType}
                  onChange={(e) => setNewWalletType(e.target.value)}
                  className="w-full p-2 rounded border bg-slate-700 border-slate-600 text-white"
                >
                  <option value="Mpesa">Mpesa</option>
                  <option value="E-Mola">E-Mola</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={closeModal} className="text-white border-white">
                  Cancelar
                </Button>
                <Button onClick={handleCreateWallet} className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold">
                  Criar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WalletsPage;
