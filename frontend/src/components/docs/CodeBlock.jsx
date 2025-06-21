
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const CodeBlock = ({ codeString, language, title, isDarkMode }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    toast({
      title: "Copiado!",
      description: `${title || 'Código'} copiado para a área de transferência.`,
      className: `${isDarkMode ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-slate-800 border-slate-200'}`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedTheme = isDarkMode ? vscDarkPlus : coy;

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg my-4 border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
      {title && (
        <div className={`flex justify-between items-center px-4 py-2 ${isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
          <span className="font-semibold text-sm">{title}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className={`flex items-center text-xs ${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'}`}
          >
            {copied ? <Check size={14} className="mr-1 text-green-500" /> : <Copy size={14} className="mr-1" />}
            {copied ? 'Copiado' : 'Copiar'}
          </Button>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={selectedTheme}
        customStyle={{ 
          margin: 0, 
          padding: '1rem',
          fontSize: '0.875rem', 
          lineHeight: '1.5',
          backgroundColor: isDarkMode ? '#1E293B' : '#F8FAFC',
        }}
        showLineNumbers={false}
        wrapLines={true}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
