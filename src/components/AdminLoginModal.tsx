import React, { useState } from 'react';
import { Lock, X, Shield, ArrowRight, KeyRound, User, CheckCircle2 } from 'lucide-react';
import { authenticateAdmin, setAdminAuthenticated, getStoredAdminUsers, setCurrentAdminUser } from '../services/storage';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const users = getStoredAdminUsers();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const result = authenticateAdmin(username, password);
    if (result.success) {
      setErrorMessage(null);
      setPassword('');
      setUsername('');
      onSuccess();
    } else {
      setErrorMessage(result.error || 'Credenciais inválidas. Verifique usuário e senha.');
    }
  };

  const handleQuickDemoEnter = (selectedUsername?: string) => {
    const targetUser = selectedUsername 
      ? users.find(u => u.username === selectedUsername) 
      : users.find(u => u.role === 'master') || users[0];
    
    if (targetUser) {
      setAdminAuthenticated(true);
      setCurrentAdminUser(targetUser);
    } else {
      setAdminAuthenticated(true);
    }
    setErrorMessage(null);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            Acesso Restrito · Rocknet Admin
          </h3>
          <p className="text-xs text-neutral-400">
            Painel administrativo exclusivo para gestores e técnicos autorizados
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Usuário do Administrador
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="Ex: master ou admin"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Senha de Acesso
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="Digite a sua senha de acesso"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-950/40 border border-red-800/80 rounded-xl text-red-300 text-xs">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-cyan-400/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Entrar no Painel</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Quick accounts username autofill */}
          <div className="pt-2 border-t border-neutral-800 space-y-2">
            <p className="text-[11px] text-neutral-400 text-center font-medium">
              Selecionar usuário cadastrado:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {users.slice(0, 4).map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setUsername(u.username)}
                  className="py-2 px-2.5 bg-neutral-800/90 hover:bg-neutral-700/90 border border-neutral-700/60 rounded-xl text-xs text-neutral-200 flex items-center justify-between cursor-pointer transition-colors"
                  title={`Preencher usuário @${u.username}`}
                >
                  <span className="font-mono text-cyan-300 font-semibold truncate">@{u.username}</span>
                  <span className="text-[10px] text-neutral-400 px-1 py-0.5 bg-neutral-900 rounded uppercase">
                    {u.role === 'master' ? 'Mestre' : 'Admin'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </form>

        <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl text-[11px] text-center text-neutral-400 mt-4 leading-relaxed">
          <span className="text-cyan-400 font-semibold block mb-0.5">Dica de segurança:</span>
          Utilize suas credenciais autorizadas. Para criar novas contas ou redefinir acessos, utilize a gestão com o Usuário Mestre no painel.
        </div>

      </div>
    </div>
  );
};
