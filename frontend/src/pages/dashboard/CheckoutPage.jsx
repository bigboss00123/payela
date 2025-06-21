import React from 'react';
import { Helmet } from 'react-helmet';
import { Link2, PlusCircle, Edit, Trash2, BarChart, Eye, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';

const checkoutLinks = [
  { id: 'LNK001', name: 'Produto X - Promoção', link: 'payela.co/p/xpromo', accesses: 152, collected: 'MZN 15.200,00', status: 'Ativo' },
  { id: 'LNK002', name: 'Serviço Y - Mensal', link: 'payela.co/s/ymensal', accesses: 88, collected: 'MZN 44.000,00', status: 'Ativo' },
  { id: 'LNK003', name: 'Ebook Z - Lançamento', link: 'payela.co/e/zlanc', accesses: 305, collected: 'MZN 30.500,00', status: 'Inativo' },
];

const statusColorsLight = {
  Ativo: 'bg-green-100 text-green-700',
  Inativo: 'bg-slate-100 text-slate-700',
};
const statusColorsDark = {
  Ativo: 'bg-green-700 text-green-100',
  Inativo: 'bg-slate-700 text-slate-100',
};


const CheckoutPage = () => {
  const { showComingSoonToast, isDarkMode } = useOutletContext();
  const statusColors = isDarkMode ? statusColorsDark : statusColorsLight;

  const handleCreateLink = (e) => {
    e.preventDefault();
    showComingSoonToast("Gerar novo link de pagamento");
  };

  const handleLinkAction = (action, linkId) => {
    showComingSoonToast(`Ação "${action}" no link ${linkId}`);
  };

  return (
    <>
      <Helmet>
        <title>Checkout Personalizado - Dashboard Payela</title>
      </Helmet>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-sans">
        <motion.div 
          className={`lg:col-span-1 p-6 rounded-xl shadow-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Gerar Novo Link</h2>
          <form onSubmit={handleCreateLink} className="space-y-6">
            <div>
              <Label htmlFor="productName" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Nome do Produto/Serviço</Label>
              <Input type="text" id="productName" placeholder="Ex: Consultoria Premium" className={`mt-1 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-cyan-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:ring-cyan-500 focus:border-cyan-500'}`} />
            </div>
            <div>
              <Label htmlFor="price" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Preço (MZN)</Label>
              <Input type="number" id="price" placeholder="Ex: 2500.00" className={`mt-1 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-cyan-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:ring-cyan-500 focus:border-cyan-500'}`} />
            </div>
            <div className="space-y-3">
              <Label className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Métodos de Pagamento</Label>
              <div className="flex items-center space-x-3">
                <Checkbox id="mpesa" defaultChecked className={`${isDarkMode ? 'border-slate-500 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500' : 'border-slate-400 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600'}`} />
                <Label htmlFor="mpesa" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} font-normal`}>Mpesa</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="emola" defaultChecked className={`${isDarkMode ? 'border-slate-500 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500' : 'border-slate-400 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600'}`} />
                <Label htmlFor="emola" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} font-normal`}>E-Mola</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="expiration" className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Expiração do Link (opcional)</Label>
              <Input type="datetime-local" id="expiration" className={`mt-1 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-cyan-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:ring-cyan-500 focus:border-cyan-500'}`} />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold py-3 text-base rounded-lg">
              <PlusCircle size={20} className="mr-2" /> Criar Link
            </Button>
          </form>
        </motion.div>

        <motion.div 
          className={`lg:col-span-2 p-6 rounded-xl shadow-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Links de Checkout</h2>
          <div className="space-y-4">
            {checkoutLinks.map((link, index) => (
              <motion.div 
                key={link.id} 
                className={`p-4 rounded-lg border transition-shadow hover:shadow-md ${isDarkMode ? 'bg-slate-800/60 border-slate-700 hover:border-slate-600' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                initial={{ opacity: 0, y:10 }} animate={{ opacity: 1, y:0 }} transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                  <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>{link.name}</h3>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[link.status]} mt-1 sm:mt-0`}>
                    {link.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <Link2 size={15} className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                  <a href="#" onClick={(e) => {e.preventDefault(); showComingSoonToast(`Abrir link ${link.link}`)}} className={`text-sm hover:underline ${isDarkMode ? 'text-slate-300 hover:text-cyan-300' : 'text-slate-600 hover:text-cyan-500'}`}>{link.link}</a>
                  <Button variant="ghost" size="icon" onClick={() => { navigator.clipboard.writeText(link.link); showComingSoonToast("Link copiado!"); }} className={`h-7 w-7 ${isDarkMode ? 'text-slate-400 hover:text-cyan-300' : 'text-slate-500 hover:text-cyan-500'}`}>
                    <Copy size={15} />
                  </Button>
                </div>
                <div className={`grid grid-cols-2 gap-3 text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  <p>Acessos: <span className={`${isDarkMode ? 'text-white' : 'text-slate-700'} font-medium`}>{link.accesses}</span></p>
                  <p>Arrecadado: <span className={`${isDarkMode ? 'text-white' : 'text-slate-700'} font-medium`}>{link.collected}</span></p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleLinkAction('view', link.id)} className={`rounded-md ${isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'}`}><Eye size={16} className="mr-1.5" /> Ver</Button>
                  <Button variant="outline" size="sm" onClick={() => handleLinkAction('stats', link.id)} className={`rounded-md ${isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'}`}><BarChart size={16} className="mr-1.5" /> Estatísticas</Button>
                  <Button variant="ghost" size="icon" onClick={() => handleLinkAction('edit', link.id)} className={`rounded-md ${isDarkMode ? 'text-slate-400 hover:text-cyan-400 hover:bg-slate-700' : 'text-slate-500 hover:text-cyan-600 hover:bg-slate-100'}`}><Edit size={16} /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleLinkAction('delete', link.id)} className={`rounded-md ${isDarkMode ? 'text-slate-400 hover:text-red-500 hover:bg-slate-700' : 'text-slate-500 hover:text-red-600 hover:bg-slate-100'}`}><Trash2 size={16} /></Button>
                </div>
              </motion.div>
            ))}
             {checkoutLinks.length === 0 && (
              <div className={`text-center py-12 rounded-lg ${isDarkMode ? 'bg-slate-800/60' : 'bg-slate-100'}`}>
                <Link2 size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>Nenhum link de checkout criado</h3>
                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Crie links de pagamento personalizados.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CheckoutPage;