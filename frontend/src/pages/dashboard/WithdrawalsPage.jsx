import React from 'react';
import { Helmet } from 'react-helmet';
import { DollarSign, List, ArrowUpDown, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';

const withdrawalsHistory = [
  { id: 'WD001', date: '2025-06-18', amount: 'MZN 5.000,00', status: 'Enviado', destination: 'BCI - **** 1234' },
  { id: 'WD002', date: '2025-06-15', amount: 'MZN 10.200,00', status: 'Processando', destination: 'Standard Bank - **** 5678' },
  { id: 'WD003', date: '2025-06-10', amount: 'MZN 2.300,00', status: 'Enviado', destination: 'Millennium BIM - **** 9012' },
];

const statusColorsLight = {
  Enviado: 'bg-green-100 text-green-700 border border-green-200',
  Processando: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  Falhou: 'bg-red-100 text-red-700 border border-red-200',
};
const statusColorsDark = {
  Enviado: 'bg-green-700/30 text-green-300 border border-green-600/50',
  Processando: 'bg-yellow-700/30 text-yellow-300 border border-yellow-600/50',
  Falhou: 'bg-red-700/30 text-red-300 border border-red-600/50',
};


const WithdrawalsPage = () => {
  const { showComingSoonToast, isDarkMode } = useOutletContext();
  const statusColors = isDarkMode ? statusColorsDark : statusColorsLight;

  const handleWithdraw = (e) => {
    e.preventDefault();
    showComingSoonToast("Solicitar saque");
  };
  
  const handleSort = (column) => {
    showComingSoonToast(`Ordenar histórico de saques por ${column}`);
  };

  return (
    <>
      <Helmet>
        <title>Saques - Dashboard Payela</title>
      </Helmet>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-sans">
        <motion.div 
          className={`lg:col-span-1 p-6 rounded-xl shadow-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Solicitar Saque</h2>
          <form onSubmit={handleWithdraw} className="space-y-6">
            <div>
              <Label htmlFor="wallet" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Escolher Carteira</Label>
              <select 
                id="wallet" 
                className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'}`}
              >
                <option>Loja Zamba (MZN 55.230,75)</option>
                <option>Freelancer Mussa (MZN 12.800,00)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="amount" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Valor do Saque (MZN)</Label>
              <Input 
                type="number" 
                id="amount" 
                placeholder="Ex: 5000.00" 
                className={`mt-1 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-cyan-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:ring-cyan-500 focus:border-cyan-500'}`}
              />
            </div>
            <div>
              <Label htmlFor="destination" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Número ou Conta Bancária de Destino</Label>
              <Input 
                type="text" 
                id="destination" 
                placeholder="Ex: Millennium BIM - 123456789" 
                className={`mt-1 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-cyan-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:ring-cyan-500 focus:border-cyan-500'}`}
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold py-3 text-base rounded-lg">
              <DollarSign size={18} className="mr-2" /> Solicitar Saque
            </Button>
          </form>
        </motion.div>

        <motion.div 
          className={`lg:col-span-2 p-6 rounded-xl shadow-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Histórico de Saques</h2>
            <Button variant="outline" size="sm" onClick={() => showComingSoonToast("Atualizar histórico")} className={`mt-3 sm:mt-0 rounded-md ${isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'}`}>
              <RefreshCw size={15} className="mr-2" /> Atualizar Histórico
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y ${isDarkMode ? 'divide-slate-700' : 'divide-slate-200'}">
              <thead className={`${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                <tr>
                  {['Data', 'Valor', 'Destino', 'Status'].map((header) => (
                    <th key={header} scope="col" className={`px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>
                       <button onClick={() => handleSort(header)} className="flex items-center group">
                        {header} <ArrowUpDown size={14} className={`ml-1.5 opacity-70 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`} />
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-slate-700' : 'divide-slate-200'}`}>
                {withdrawalsHistory.map((withdrawal, index) => (
                  <motion.tr 
                    key={withdrawal.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`${isDarkMode ? 'hover:bg-slate-700/40' : 'hover:bg-slate-50/70'} transition-colors`}
                  >
                    <td className={`px-4 py-3.5 whitespace-nowrap text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{withdrawal.date}</td>
                    <td className={`px-4 py-3.5 whitespace-nowrap text-sm font-medium ${isDarkMode ? 'text-slate-100' : 'text-slate-700'}`}>{withdrawal.amount}</td>
                    <td className={`px-4 py-3.5 whitespace-nowrap text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{withdrawal.destination}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-sm">
                      <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[withdrawal.status]}`}>
                        {withdrawal.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {withdrawalsHistory.length === 0 && (
            <div className={`text-center py-12 mt-6 rounded-lg shadow-md ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-100'}`}>
              <DollarSign size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>Nenhum saque realizado</h3>
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Seu histórico de saques aparecerá aqui.</p>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default WithdrawalsPage;