import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, AlertTriangle, CheckSquare, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOutletContext } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, iconColor, trend, period }) => {
  const { isDarkMode } = useOutletContext();
  return (
    <motion.div 
      className={`p-6 rounded-xl shadow-xl transition-all duration-300 ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700/60' : 'bg-white hover:bg-slate-50'}`}
      whileHover={{ y: -6, boxShadow: `0 12px 20px -4px ${isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}` }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{title}</p>
        <Icon className={`w-7 h-7 ${iconColor}`} />
      </div>
      <h3 className={`text-4xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{value}</h3>
      {trend && (
        <p className={`text-xs ${trend.startsWith('+') ? (isDarkMode ? 'text-green-400' : 'text-green-600') : (isDarkMode ? 'text-red-400' : 'text-red-600')}`}>
          {trend} <span className={`${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{period}</span>
        </p>
      )}
      {!trend && period && (
         <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{period}</p>
      )}
    </motion.div>
  );
};

const DashboardHomePage = () => {
  const { showComingSoonToast, isDarkMode } = useOutletContext();

  const chartData = [
    { day: 'Seg', volume: Math.floor(Math.random() * 800) + 300 },
    { day: 'Ter', volume: Math.floor(Math.random() * 800) + 300 },
    { day: 'Qua', volume: Math.floor(Math.random() * 800) + 300 },
    { day: 'Qui', volume: Math.floor(Math.random() * 800) + 300 },
    { day: 'Sex', volume: Math.floor(Math.random() * 800) + 300 },
    { day: 'Sáb', volume: Math.floor(Math.random() * 800) + 300 },
    { day: 'Dom', volume: Math.floor(Math.random() * 800) + 300 },
  ];
  const maxVolume = Math.max(...chartData.map(d => d.volume), 1); // Avoid division by zero

  return (
    <>
      <Helmet>
        <title>Início - Dashboard Payela</title>
      </Helmet>
      <div className="space-y-10 font-sans">
        <section>
          <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Resumo Geral</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard title="Saldo Total Disponível" value="MZN 125.780,50" icon={DollarSign} iconColor={isDarkMode ? "text-green-400" : "text-green-500"} trend="+5.2%" period="último mês" />
            <StatCard title="Total Recebido Hoje" value="MZN 15.320,00" icon={TrendingUp} iconColor={isDarkMode ? "text-cyan-400" : "text-cyan-500"} trend="+12%" period="vs ontem" />
            <StatCard title="Transações Pendentes" value="3" icon={AlertTriangle} iconColor={isDarkMode ? "text-yellow-400" : "text-yellow-500"} period="Aguardando confirmação" />
            <StatCard title="Última Transação" value="MZN 2.500,00" icon={CheckSquare} iconColor={isDarkMode ? "text-purple-400" : "text-purple-500"} period="Hoje às 10:35 AM" />
          </div>
        </section>

        <section>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Volume de Transações</h2>
            <div className="flex space-x-2 mt-3 sm:mt-0">
              <Button variant="outline" size="sm" onClick={() => showComingSoonToast("Filtro 7 dias")} className={`rounded-md ${isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'}`}>7 Dias</Button>
              <Button variant="outline" size="sm" onClick={() => showComingSoonToast("Filtro 30 dias")} className={`rounded-md ${isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'}`}>30 Dias</Button>
              <Button variant="outline" size="sm" onClick={() => showComingSoonToast("Filtro por carteira")} className={`rounded-md ${isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'}`}>Por Carteira</Button>
            </div>
          </div>
          <div className={`p-6 rounded-xl shadow-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="flex items-end h-72 space-x-2 sm:space-x-3">
              {chartData.map((data, index) => (
                <motion.div 
                  key={index}
                  className="flex-1 flex flex-col items-center group relative"
                  initial={{ height: '0%', opacity: 0 }}
                  animate={{ height: `${Math.max(5, (data.volume / maxVolume) * 100)}%`, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.08, type: "spring", stiffness: 150, damping: 20 }}
                >
                  <div className={`w-full rounded-t-md bg-gradient-to-t chart-bar ${isDarkMode ? 'from-cyan-500 to-green-600 hover:from-cyan-400 hover:to-green-500' : 'from-cyan-400 to-green-500 hover:from-cyan-300 hover:to-green-400'}`}>
                    <div className={`absolute -top-7 left-1/2 transform -translate-x-1/2 text-xs px-2 py-1 rounded shadow-md whitespace-nowrap ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-700'} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                      {data.volume.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <span className={`mt-2 text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{data.day}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center items-center mt-6">
                <BarChart2 className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Volume de transações nos últimos 7 dias</span>
            </div>
          </div>
        </section>
        
        <section>
            <h2 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Ações Rápidas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button onClick={() => showComingSoonToast("Nova Transação")} className={`w-full py-6 text-lg rounded-lg transition-colors ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600/80 text-slate-100' : 'bg-slate-200 hover:bg-slate-300/80 text-slate-700'}`}>Criar Nova Transação</Button>
                <Button onClick={() => showComingSoonToast("Ver Relatórios")} className={`w-full py-6 text-lg rounded-lg transition-colors ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600/80 text-slate-100' : 'bg-slate-200 hover:bg-slate-300/80 text-slate-700'}`}>Ver Relatórios Completos</Button>
                <Button onClick={() => showComingSoonToast("Contactar Suporte")} className={`w-full py-6 text-lg rounded-lg transition-colors ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600/80 text-slate-100' : 'bg-slate-200 hover:bg-slate-300/80 text-slate-700'}`}>Contactar Suporte</Button>
            </div>
        </section>
      </div>
    </>
  );
};

export default DashboardHomePage;