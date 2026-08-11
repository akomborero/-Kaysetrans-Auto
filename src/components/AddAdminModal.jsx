import { useState } from 'react';
import { X, ShieldPlus, User, Mail, Lock, Check } from 'lucide-react';

export default function AddAdminModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDone(true);
    setTimeout(() => {
      setIsDone(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
      <div 
        className="relative w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-3xl p-8 md:p-10 shadow-2xl text-white shadow-red-600/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 bg-red-600/10 text-red-500 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldPlus className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black italic uppercase tracking-tight">
            ADD NEW ADMIN
          </h2>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Grant system management permissions
          </p>
        </div>

        {isDone ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <p className="text-sm font-black italic uppercase">Admin Account Created!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">
                USERNAME
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-4 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  required
                  placeholder="admin_user"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-xs font-semibold text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">
                EMAIL
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  required
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-xs font-semibold text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">
                PASSWORD
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-4 h-4 text-neutral-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-xs font-semibold text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg cursor-pointer mt-4"
            >
              CREATE ADMIN
            </button>
          </form>
        )}
      </div>
    </div>
  );
}