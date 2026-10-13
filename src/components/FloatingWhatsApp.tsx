import React, { useState } from 'react';
import { MessageCircle, X, Send, ShieldCheck, Clock } from 'lucide-react';
import { SiteSettings } from '../services/storage';

interface FloatingWhatsAppProps {
  settings: SiteSettings;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const sendWhatsApp = (text: string) => {
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${settings.phoneRaw}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const quickMessages = [
    {
      title: 'Quero assinar fibra óptica',
      text: 'Olá! Estou no site da Rocknet e gostaria de saber mais sobre a instalação dos planos de fibra óptica.',
    },
    {
      title: 'Verificar cobertura na minha rua',
      text: 'Olá! Gostaria de consultar se a fibra óptica da Rocknet já está disponível no meu endereço em Camilos.',
    },
    {
      title: 'Suporte Técnico Humanizado',
      text: 'Olá equipe Rocknet! Preciso de um auxílio técnico com a minha conexão de internet.',
    },
    {
      title: '2ª Via de Boleto / Chave PIX',
      text: 'Olá, gostaria de solicitar a 2ª via da minha fatura / chave PIX para pagamento.',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover Chat Card */}
      {isOpen && (
        <div className="mb-3 w-[90vw] sm:w-[360px] bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-neutral-900 rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-tight">Atendimento WhatsApp</h4>
                <p className="text-xs text-emerald-100 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Online agora · {settings.phoneDisplay}</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Fechar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body message preview */}
          <div className="p-4 bg-neutral-950/60 max-h-80 overflow-y-auto space-y-3 text-xs">
            <div className="bg-neutral-800/90 text-neutral-200 p-3 rounded-2xl rounded-tl-sm border border-neutral-700/50 shadow-sm leading-relaxed">
              <p className="font-medium text-white mb-1">Olá! Bem-vindo à Rocknet Fibra Óptica 👋</p>
              <p>Como nossa equipe de Camilos pode te ajudar hoje? Escolha um assunto rápido ou digite sua mensagem:</p>
            </div>

            {/* Quick choices */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-1">
                Atalhos Frequentes
              </p>
              {quickMessages.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => sendWhatsApp(item.text)}
                  className="w-full text-left p-2.5 rounded-xl bg-neutral-900/90 hover:bg-emerald-950/40 border border-neutral-800 hover:border-emerald-500/50 text-neutral-300 hover:text-white transition-all text-xs font-medium flex items-center justify-between group cursor-pointer"
                >
                  <span>{item.title}</span>
                  <Send className="w-3.5 h-3.5 text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Custom text sender */}
          <div className="p-3 bg-neutral-900 border-t border-neutral-800 flex gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customMsg.trim()) {
                  sendWhatsApp(customMsg);
                }
              }}
              placeholder="Digite sua mensagem direta..."
              className="flex-1 bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => {
                if (customMsg.trim()) {
                  sendWhatsApp(customMsg);
                } else {
                  sendWhatsApp('Olá! Vim pelo site da Rocknet e gostaria de tirar uma dúvida.');
                }
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-xl transition-all shadow-md shadow-emerald-700/30 cursor-pointer active:scale-95"
              title="Iniciar conversa no WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="px-3 py-2 bg-neutral-950 text-[10px] text-neutral-500 flex items-center justify-between border-t border-neutral-800/60">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Canal Oficial Rocknet
            </span>
            <span className="font-mono text-neutral-400">88 9 92675749</span>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold px-4 py-3.5 rounded-full shadow-xl shadow-emerald-500/25 hover:shadow-emerald-400/40 transition-all duration-200 cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-neutral-950"
        aria-label="Abrir conversa no WhatsApp da Rocknet"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-950 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-neutral-950"></span>
        </span>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 fill-neutral-950" />
          <span className="text-xs font-extrabold tracking-wide hidden sm:inline">
            Fale no WhatsApp · (88) 99267-5749
          </span>
          <span className="text-xs font-extrabold tracking-wide sm:hidden">
            WhatsApp
          </span>
        </div>
      </button>
    </div>
  );
};
