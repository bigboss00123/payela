
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Key,
  Terminal,
  FileJson,
  ChevronRight,
  ChevronDown,
  Package,
  Server,
  AlertTriangle,
  Moon,
  Sun,
  Copy,
  Check,
  Menu,
  X,
  Github,
  Book,
  Code,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import CodeBlock from '@/components/docs/CodeBlock';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const ApiDocsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('payela-theme');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');
  
  const sectionsRef = useRef({});

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" } 
    );

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sectionsRef.current).forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [sectionsRef.current]);


  const toggleTheme = () => setIsDarkMode(prev => !prev);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const showComingSoonToast = (feature) => {
    toast({
      title: `🚧 ${feature || 'Funcionalidade'} em breve!`,
      description: "Estamos trabalhando para trazer isso para você o mais rápido possível.",
      className: `${isDarkMode ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-slate-800 border-slate-200'}`,
    });
  };

  const NavLink = ({ id, children, icon }) => (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(id);
        if (isSidebarOpen) toggleSidebar();
      }}
      className={`flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
        ${activeSection === id
          ? (isDarkMode ? 'bg-cyan-600 text-white' : 'bg-cyan-500 text-white')
          : (isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')
        }`}
    >
      {icon && React.createElement(icon, { size: 18, className: "flex-shrink-0" })}
      <span>{children}</span>
    </a>
  );

  const sections = [
    { id: 'introduction', title: 'Introdução', icon: BookOpen },
    { id: 'authentication', title: 'Autenticação', icon: Key },
    { id: 'c2b-payment', title: 'Pagamento C2B', icon: Layers },
    { id: 'b2c-payment', title: 'Pagamento B2C', icon: Layers },
    { id: 'webhooks', title: 'Webhooks', icon: Server },
    { id: 'error-codes', title: 'Códigos de Erro', icon: AlertTriangle },
    { id: 'sandbox', title: 'Ambiente Sandbox', icon: Package },
    { id: 'sdk', title: 'SDKs (Opcional)', icon: Code }
  ];

  const authCode = `Authorization: Bearer SUA_API_KEY`;
  const c2bRequestCode = JSON.stringify({ CustomerMSISDN: "258841234567", Amount: "150.00" }, null, 2);
  const c2bResponseCode = JSON.stringify({ status: "success", message: "Pagamento iniciado com sucesso.", transaction_id: "TXN123ABC" }, null, 2);
  const b2cRequestCode = JSON.stringify({ CustomerMSISDN: "258841234567", Amount: "100.00", Reason: "Cashout dropshipping" }, null, 2);
  const b2cResponseCode = JSON.stringify({ status: "success", message: "Pagamento enviado", transaction_id: "B2C0001" }, null, 2);
  const webhookPayloadCode = JSON.stringify({ transaction_id: "TXN123ABC", status: "completed", amount: "150.00", msisdn: "258841234567" }, null, 2);

  const SectionWrapper = ({ id, title, children }) => (
    <section id={id} ref={el => sectionsRef.current[id] = el} className="py-10 scroll-mt-20">
      <h2 className={`text-3xl font-bold mb-6 border-b pb-3 ${isDarkMode ? 'border-slate-700 text-white' : 'border-slate-200 text-slate-800'}`}>{title}</h2>
      {children}
    </section>
  );

  return (
    <>
      <Helmet>
        <title>Documentação da API - Payela</title>
        <meta name="description" content="Documentação técnica da API Payela para integração de pagamentos M-Pesa e Emola." />
      </Helmet>
      <div className={`flex min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-300' : 'bg-white text-slate-700'}`}>
        {/* Mobile Header */}
        <header className={`sticky top-0 z-40 lg:hidden flex items-center justify-between px-4 py-3 border-b ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <Link to="/" className="text-2xl font-bold gradient-text">Payela Docs</Link>
          <div className="flex items-center">
            <button onClick={toggleTheme} className={`p-2 rounded-full mr-2 ${isDarkMode ? 'text-yellow-400 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200'}`}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={toggleSidebar} className={`p-2 rounded-full ${isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200'}`}>
              {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </header>

        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`fixed inset-0 z-50 lg:hidden ${isDarkMode ? 'bg-slate-800/80 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'}`}
              onClick={toggleSidebar}
            />
          )}
        </AnimatePresence>

        <aside className={`fixed inset-y-0 left-0 z-[51] transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                           lg:translate-x-0 lg:sticky lg:top-0 h-screen w-72 flex-shrink-0 border-r p-6 flex flex-col space-y-4 
                           transition-transform duration-300 ease-in-out scrollbar-thin
                           ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold gradient-text">Payela Docs</Link>
            <button onClick={toggleTheme} className={`hidden lg:block p-2 rounded-full ${isDarkMode ? 'text-yellow-400 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200'}`}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <nav className="flex-grow space-y-1.5 pt-4">
            {sections.map(section => (
              <NavLink key={section.id} id={section.id} icon={section.icon}>
                {section.title}
              </NavLink>
            ))}
          </nav>
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button variant="outline" onClick={() => navigate('/dashboard/integrations')} className={`w-full ${isDarkMode ? 'border-slate-600 hover:bg-slate-700' : 'hover:bg-slate-100'}`}>
              <Key size={16} className="mr-2"/> Obter Chave API
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto scrollbar-thin">
          <SectionWrapper id="introduction" title="Documentação da API Payela">
            <p className="text-lg mb-4">
              Integre pagamentos via M-Pesa e Emola facilmente com a Payela. Nossa API RESTful oferece suporte robusto para transações C2B (Cliente para Empresa), B2C (Empresa para Cliente), consulta de status e muito mais.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
              <Button onClick={() => document.getElementById('authentication')?.scrollIntoView({ behavior: 'smooth' })} className={`w-full text-base py-6 ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-100 hover:bg-slate-200'}`}><Book size={18} className="mr-2"/>Guia Rápido</Button>
              <Button onClick={() => navigate('/dashboard/integrations')} className={`w-full text-base py-6 ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-100 hover:bg-slate-200'}`}><Key size={18} className="mr-2"/>Obter Chave de API</Button>
              <Button onClick={() => document.getElementById('sandbox')?.scrollIntoView({ behavior: 'smooth' })} className={`w-full text-base py-6 ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-100 hover:bg-slate-200'}`}><Package size={18} className="mr-2"/>Ambiente Sandbox</Button>
            </div>
            <p>Com esta documentação, você poderá configurar e testar suas integrações rapidamente.</p>
          </SectionWrapper>

          <SectionWrapper id="authentication" title="Autenticação">
            <p className="mb-4">Todas as requisições à API Payela devem ser autenticadas usando uma Bearer Token no cabeçalho <code className={`px-1.5 py-0.5 rounded font-mono text-sm ${isDarkMode ? 'bg-slate-700 text-cyan-400' : 'bg-slate-200 text-cyan-700'}`}>Authorization</code>.</p>
            <CodeBlock codeString={authCode} language="http" title="Exemplo de Cabeçalho de Autenticação" isDarkMode={isDarkMode} />
            <p className="mt-4 mb-2"><strong>Onde obter sua chave de API:</strong></p>
            <p className="mb-2">Você pode encontrar suas chaves de API (Live e Test) no seu painel de usuário, na seção <Link to="/dashboard/integrations" className="text-cyan-500 hover:underline">Integrações / API &gt; Minhas Chaves</Link>.</p>
            <div className={`mt-4 p-4 rounded-md border-l-4 ${isDarkMode ? 'bg-yellow-900/30 border-yellow-500 text-yellow-300' : 'bg-yellow-50 border-yellow-400 text-yellow-700'}`}>
              <div className="flex items-center">
                <AlertTriangle size={20} className="mr-2 flex-shrink-0" />
                <span className="font-semibold">Importante:</span>
              </div>
              <p className="mt-1 text-sm">As chaves de API para o ambiente Sandbox (teste) e Produção (live) são diferentes. Certifique-se de usar a chave correta para cada ambiente.</p>
            </div>
          </SectionWrapper>

          <SectionWrapper id="c2b-payment" title="Pagamento C2B (Cliente para Empresa)">
            <p className="mb-4">Este endpoint é usado quando um cliente envia dinheiro para sua empresa, como em um checkout de vendas online.</p>
            <h3 className={`text-xl font-semibold my-3 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>Endpoint</h3>
            <CodeBlock codeString="POST /api/c2b-payment" language="bash" title="Endpoint C2B" isDarkMode={isDarkMode} />
            
            <h3 className={`text-xl font-semibold mt-6 mb-3 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>Parâmetros no Body (JSON)</h3>
            <div className="overflow-x-auto rounded-md border dark:border-slate-700">
              <table className="min-w-full text-sm">
                <thead className={`${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                  <tr>
                    <th className="p-3 text-left font-semibold">Campo</th>
                    <th className="p-3 text-left font-semibold">Tipo</th>
                    <th className="p-3 text-left font-semibold">Obrigatório</th>
                    <th className="p-3 text-left font-semibold">Exemplo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`${isDarkMode ? 'border-b border-slate-700' : 'border-b border-slate-200'}`}>
                    <td className="p-3">CustomerMSISDN</td><td className="p-3">string</td><td className="p-3">✅</td><td className="p-3">258841234567</td>
                  </tr>
                  <tr className={`${isDarkMode ? 'border-b border-slate-700' : 'border-b border-slate-200'}`}>
                    <td className="p-3">Amount</td><td className="p-3">float</td><td className="p-3">✅</td><td className="p-3">150.00</td>
                  </tr>
                  <tr className={`${isDarkMode ? 'border-b border-slate-700' : 'border-b border-slate-200'}`}>
                    <td className="p-3">TransactionReference</td><td className="p-3">string</td><td className="p-3">❌ (auto)</td><td className="p-3">TXN123ABC</td>
                  </tr>
                  <tr>
                    <td className="p-3">ServiceProviderCode</td><td className="p-3">string</td><td className="p-3">❌</td><td className="p-3">171717</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className={`text-xl font-semibold mt-6 mb-3 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>Exemplo de Requisição</h3>
            <CodeBlock codeString={c2bRequestCode} language="json" title="Requisição C2B" isDarkMode={isDarkMode} />
            
            <h3 className={`text-xl font-semibold mt-6 mb-3 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>Exemplo de Resposta</h3>
            <CodeBlock codeString={c2bResponseCode} language="json" title="Resposta C2B" isDarkMode={isDarkMode} />
          </SectionWrapper>

          <SectionWrapper id="b2c-payment" title="Pagamento B2C (Empresa para Cliente)">
            <p className="mb-4">Use este endpoint para enviar dinheiro da sua empresa para um cliente, como em casos de reembolsos, prêmios ou cashouts.</p>
            <h3 className={`text-xl font-semibold my-3 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>Endpoint</h3>
            <CodeBlock codeString="POST /api/b2c-payment" language="bash" title="Endpoint B2C" isDarkMode={isDarkMode} />
            
            <h3 className={`text-xl font-semibold mt-6 mb-3 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>Parâmetros no Body (JSON)</h3>
             <div className="overflow-x-auto rounded-md border dark:border-slate-700">
              <table className="min-w-full text-sm">
                <thead className={`${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                  <tr>
                    <th className="p-3 text-left font-semibold">Campo</th>
                    <th className="p-3 text-left font-semibold">Tipo</th>
                    <th className="p-3 text-left font-semibold">Obrigatório</th>
                    <th className="p-3 text-left font-semibold">Exemplo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`${isDarkMode ? 'border-b border-slate-700' : 'border-b border-slate-200'}`}>
                    <td className="p-3">CustomerMSISDN</td><td className="p-3">string</td><td className="p-3">✅</td><td className="p-3">258841234567</td>
                  </tr>
                  <tr className={`${isDarkMode ? 'border-b border-slate-700' : 'border-b border-slate-200'}`}>
                    <td className="p-3">Amount</td><td className="p-3">float</td><td className="p-3">✅</td><td className="p-3">100.00</td>
                  </tr>
                  <tr className={`${isDarkMode ? 'border-b border-slate-700' : 'border-b border-slate-200'}`}>
                    <td className="p-3">TransactionReference</td><td className="p-3">string</td><td className="p-3">❌ (auto)</td><td className="p-3">B2C0001</td>
                  </tr>
                   <tr>
                    <td className="p-3">Reason</td><td className="p-3">string</td><td className="p-3">❌</td><td className="p-3">Cashout Venda</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className={`text-xl font-semibold mt-6 mb-3 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>Exemplo de Requisição</h3>
            <CodeBlock codeString={b2cRequestCode} language="json" title="Requisição B2C" isDarkMode={isDarkMode} />
            
            <h3 className={`text-xl font-semibold mt-6 mb-3 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>Exemplo de Resposta</h3>
            <CodeBlock codeString={b2cResponseCode} language="json" title="Resposta B2C" isDarkMode={isDarkMode} />
          </SectionWrapper>

          <SectionWrapper id="webhooks" title="Webhooks (Notificações)">
            <Collapsible defaultOpen>
              <CollapsibleTrigger className={`w-full flex justify-between items-center text-2xl font-semibold py-2 rounded-md ${isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-slate-100/50'}`}>
                <span>Detalhes sobre Webhooks</span>
                <ChevronDown className="h-6 w-6 transition-transform data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4 data-[state=open]:animate-slideDownAndFade data-[state=closed]:animate-slideUpAndFade">
                <p className="mb-4">Configure uma URL de Webhook no seu painel de usuário para receber notificações em tempo real sobre o status das suas transações. Isso é crucial para manter seus sistemas sincronizados com o Payela.</p>
                <p className="mb-4">Enviaremos um POST request para sua URL configurada sempre que o estado de uma transação mudar (ex: de pendente para concluída ou falha).</p>
                <h3 className={`text-xl font-semibold mt-6 mb-3 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>Exemplo de Payload do Webhook</h3>
                <CodeBlock codeString={webhookPayloadCode} language="json" title="Payload do Webhook" isDarkMode={isDarkMode} />
                <p className="mt-4">Certifique-se de que sua URL de webhook possa processar requisições POST e responda com um status <code className={`px-1.5 py-0.5 rounded font-mono text-sm ${isDarkMode ? 'bg-slate-700 text-cyan-400' : 'bg-slate-200 text-cyan-700'}`}>200 OK</code> para confirmar o recebimento.</p>
              </CollapsibleContent>
            </Collapsible>
          </SectionWrapper>

          <SectionWrapper id="error-codes" title="Códigos de Erro">
            <Collapsible>
              <CollapsibleTrigger className={`w-full flex justify-between items-center text-2xl font-semibold py-2 rounded-md ${isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-slate-100/50'}`}>
                <span>Lista de Códigos de Erro Comuns</span>
                <ChevronDown className="h-6 w-6 transition-transform data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4 data-[state=open]:animate-slideDownAndFade data-[state=closed]:animate-slideUpAndFade">
                <p className="mb-4">A API Payela utiliza códigos de status HTTP padrão para indicar o sucesso ou falha de uma requisição. Aqui estão alguns dos códigos de erro mais comuns:</p>
                 <div className="overflow-x-auto rounded-md border dark:border-slate-700">
                  <table className="min-w-full text-sm">
                    <thead className={`${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                      <tr>
                        <th className="p-3 text-left font-semibold">Código HTTP</th>
                        <th className="p-3 text-left font-semibold">Descrição</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={`${isDarkMode ? 'border-b border-slate-700' : 'border-b border-slate-200'}`}>
                        <td className="p-3">400 Bad Request</td><td className="p-3">Parâmetros inválidos na requisição. Verifique o corpo da sua requisição.</td>
                      </tr>
                      <tr className={`${isDarkMode ? 'border-b border-slate-700' : 'border-b border-slate-200'}`}>
                        <td className="p-3">401 Unauthorized</td><td className="p-3">Chave de API inválida ou não fornecida. Verifique seu cabeçalho <code className={`px-1 py-0.5 rounded text-xs ${isDarkMode ? 'bg-slate-600 text-cyan-300':'bg-slate-200 text-cyan-600'}`}>Authorization</code>.</td>
                      </tr>
                      <tr className={`${isDarkMode ? 'border-b border-slate-700' : 'border-b border-slate-200'}`}>
                        <td className="p-3">403 Forbidden</td><td className="p-3">Acesso negado. A chave de API pode não ter permissão para a operação solicitada.</td>
                      </tr>
                       <tr>
                        <td className="p-3">500 Internal Server Error</td><td className="p-3">Erro interno no servidor Payela. Por favor, tente novamente mais tarde. Se persistir, contate o suporte.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">As respostas de erro geralmente incluem um corpo JSON com mais detalhes sobre o problema.</p>
              </CollapsibleContent>
            </Collapsible>
          </SectionWrapper>

          <SectionWrapper id="sandbox" title="Ambiente Sandbox">
            <p className="mb-4">Oferecemos um ambiente Sandbox para que você possa testar sua integração de forma segura e sem custos, sem afetar transações reais.</p>
            <p className="mb-2"><strong>URL do Sandbox:</strong> <a href="https://sandbox.payela.co.mz" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline">https://sandbox.payela.co.mz</a></p>
            <p className="mb-2">Utilize suas chaves de API de <strong>teste</strong> (disponíveis no seu painel) ao interagir com o ambiente Sandbox.</p>
            <p>Todas as funcionalidades da API estão disponíveis no Sandbox, permitindo um teste completo da sua integração antes de ir para produção.</p>
          </SectionWrapper>

          <SectionWrapper id="sdk" title="SDKs (Opcional)">
            <p className="mb-4">Para facilitar ainda mais a integração, estamos desenvolvendo SDKs para as linguagens mais populares. Fique atento aos lançamentos!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-lg border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center mb-3">
                  <img  alt="Python logo" class="h-8 w-8 mr-3" src="https://images.unsplash.com/photo-1690683789978-3cf73960d650" />
                  <h4 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Python SDK</h4>
                </div>
                <p className="text-sm mb-3">Integração simplificada para seus projetos Python.</p>
                <CodeBlock codeString="pip install payela" language="bash" title="Instalação (Em Breve)" isDarkMode={isDarkMode} />
                <Button variant="outline" size="sm" onClick={() => showComingSoonToast("SDK Python")} className={`mt-3 w-full ${isDarkMode ? 'border-slate-600 hover:bg-slate-700' : 'border-slate-300 hover:bg-slate-100'}`}><Github size={14} className="mr-2"/>Ver no GitHub (Em Breve)</Button>
              </div>
              <div className={`p-6 rounded-lg border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center mb-3">
                 <img  alt="JavaScript logo" class="h-8 w-8 mr-3" src="https://images.unsplash.com/photo-1551033406-611cf9a28f67" />
                  <h4 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>JavaScript SDK</h4>
                </div>
                <p className="text-sm mb-3">Para suas aplicações frontend e Node.js.</p>
                <CodeBlock codeString="npm install payela-sdk" language="bash" title="Instalação (Em Breve)" isDarkMode={isDarkMode} />
                <Button variant="outline" size="sm" onClick={() => showComingSoonToast("SDK JavaScript")} className={`mt-3 w-full ${isDarkMode ? 'border-slate-600 hover:bg-slate-700' : 'border-slate-300 hover:bg-slate-100'}`}><Github size={14} className="mr-2"/>Ver no GitHub (Em Breve)</Button>
              </div>
            </div>
            <p className="mt-6 text-sm">Vídeos curtos demonstrando a integração com os SDKs estarão disponíveis em breve em nosso canal.</p>
          </SectionWrapper>

        </main>
      </div>
    </>
  );
};

export default ApiDocsPage;
