import { useState } from 'react';
import { X, Lock, Mail, Eye, EyeOff, ShieldAlert, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://smart-ar-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.detail || 'Invalid email or password');
      }

      // Store JWT token
      const token = data.access_token || data.token;
      if (token) {
        localStorage.setItem('adminToken', token);
        localStorage.setItem('token', token);
      }

      // Build user payload directly using input email if backend omits it
      const userData = {
        email: data.user?.email || data.email || email,
        name: data.user?.name || data.name || email.split('@')[0],
        ...data.user,
      };

      // Store in both keys for compatibility
      localStorage.setItem('adminUser', JSON.stringify(userData));
      localStorage.setItem('user', JSON.stringify(userData));

      if (onSuccess) {
        onSuccess(userData);
      }

      // Notify application of auth change
      window.dispatchEvent(new Event('authChange'));

      setEmail('');
      setPassword('');
      onClose();
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-md bg-white border border-neutral-100 rounded-3xl p-8 md:p-10 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 bg-neutral-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black italic uppercase tracking-tight text-black">
            ADMIN LOGIN
          </h2>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Kaysetrans Auto Management Portal
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-600 text-xs font-bold">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">
              EMAIL ADDRESS
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 w-4 h-4 text-neutral-400" />
              <input
                type="email"
                required
                placeholder="admin@kaysetrans.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-11 pr-4 py-3 text-xs font-bold text-black focus:outline-none focus:border-black focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">
              PASSWORD
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 w-4 h-4 text-neutral-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-11 pr-11 py-3 text-xs font-bold text-black focus:outline-none focus:border-black focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-neutral-400 hover:text-black cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span>AUTHENTICATING...</span>
            ) : (
              <>
                <span>SIGN IN</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">
          <ShieldAlert className="w-3.5 h-3.5 text-neutral-400" />
          <span>AUTHORIZED PERSONNEL ONLY</span>
        </div>
      </div>
    </div>
  );
}