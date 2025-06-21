import React from 'react';
import { Helmet } from 'react-helmet';
import { Filter, ArrowUpDown, Download, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';

const transactionsData = [
  { id: 'TXN732823', wallet: 'Loja Zamba (Mpesa)', amount: 'MZN 1.250,00', dateTime: '2025-06-20 10:35', type: 'Entrada', status: 'Sucesso' },
  { id: 'TXN583921', wallet: 'Freelancer Mussa (E-Mola)', amount: 'MZN 800,50', dateTime: '2025-06-20 09:12', type: 'Entrada', status: 'Pendente' },
  { id: 'TXN921038', wallet: 'Loja Zamba (Mpesa)', amount: 'MZN 3.500,00', dateTime: '2025-06-19 15:45', type: 'Saída', status: 'Sucesso' },
  { id: 'TXN103823', wallet: 'Serviços Online (Mpesa)', amount: 'MZN 500,00', dateTime: '2025-06-19 11:20', type: 'Entrada', status: 'Falha' },
  { id: 'TXN483920', wallet: 'Consultoria Digital (E-Mola)', amount: 'MZN 10.200,00', dateTime: '2025-06-18 18:00', type: 'Entrada', status: 'Sucesso' },
];

const statusColorsLight = {
  Sucesso: 'bg-green-100 text-green-700 border border-green-200',
  Pendente: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  Falha: 'bg-red-100 text-red-700 border border-red-200',
};
const statusColorsDark = {
  Sucesso: 'bg-green-700/30 text-green-300 border border-green-600/50',
  Pendente: 'bg-yellow-700/30 text-yellow-300 border border-yellow-600/50',
  Falha: 'bg-red-700/30 text-red-300 border border-red-600/50',
};


const TransactionsPage = () => {
  const { showComingSoonToast, isDarkMode } = useOutletContext();
  const statusColors = isDarkMode ? statusColorsDark : statusColorsLight;

  const handleSort = (column) => {
    showComingSoonToast(`Ordenar por ${column}`);
  };

  return (
    <>
      <Helmet>
        <title>Transações - Dashboard Payela</title>
      </Helmet>
      <div className="font-sans">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Histórico de Transações</h1>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <Button variant="outline" onClick={() => showComingSoonToast("Filtros avançados")} className={`rounded-md ${isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'}`}>
              <Filter size={16} className="mr-2" /> Filtros
            </Button>
            <Button variant="outline" onClick={() => showComingSoonToast("Exportar transações")} className={`rounded-md ${isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'}`}>
              <Download size={16} className="mr-2" /> Exportar
            </Button>
          </div>
        </div>

        <div className={`mb-6 p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
          <Input 
            type="search" 
            placeholder="Pesquisar por ID, carteira, valor..." 
            className={`w-full ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-cyan-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:ring-cyan-500 focus:border-cyan-500'}`}
            onChange={(e) => showComingSoonToast(`Pesquisar transações: ${e.target.value}`)}
          />
        </div>

        <div className={`shadow-xl rounded-lg overflow-x-auto ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
          <table className="min-w-full divide-y ${isDarkMode ? 'divide-slate-700' : 'divide-slate-200'}">
            <thead className={`${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
              <tr>
                {['ID da Transação', 'Carteira', 'Valor', 'Data/Hora', 'Tipo', 'Status'].map((header) => (
                  <th key={header} scope="col" className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>
                    <button onClick={() => handleSort(header)} className="flex items-center group">
                      {header} <ArrowUpDown size={14} className={`ml-1.5 opacity-70 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`} />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-slate-700' : 'divide-slate-200'}`}>
              {transactionsData.map((transaction, index) => (
                <motion.tr 
                  key={transaction.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`${isDarkMode ? 'hover:bg-slate-700/40' : 'hover:bg-slate-50/70'} transition-colors`}
                >
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>{transaction.id}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{transaction.wallet}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDarkMode ? 'text-slate-100' : 'text-slate-700'}`}>{transaction.amount}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{transaction.dateTime}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{transaction.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[transaction.status]}`}>
                      {transaction.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {transactionsData.length === 0 && (
           <div className={`text-center py-12 mt-6 rounded-lg shadow-md ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <ListChecks size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>Nenhuma transação encontrada</h3>
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Seu histórico de transações aparecerá aqui.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionsPage;