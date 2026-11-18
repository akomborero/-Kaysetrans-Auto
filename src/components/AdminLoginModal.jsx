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

  const inputClass = 'w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/40 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-login-title"
        className="admin-modal-in relative w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sign in"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="border-b border-neutral-200 px-7 pb-6 pt-8">
          <div className="flex items-center gap-1.5 text-lg font-black italic tracking-tight text-neutral-950">
            <span>Kaysetrans</span><span className="not-italic font-extrabold">Auto</span>
          </div>
          <div className="mt-6 flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900 text-white">
            <Lock className="h-5 w-5" />
          </div>
          <h2 id="admin-login-title" className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950">
            Sign in to admin
          </h2>
          <p className="mt-1 text-sm text-neutral-500">Access the Kaysetrans Auto management portal.</p>
        </div>

        {errorMessage && (
          <div className="mx-7 mt-6 flex items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3.5 text-sm text-neutral-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 px-7 py-6">
          <div className="space-y-2">
            <label htmlFor="admin-email" className="block text-xs font-medium text-neutral-700">Email address</label>
            <div className="relative flex items-center">
              <Mail className="pointer-events-none absolute left-3.5 h-4 w-4 text-neutral-400" />
              <input
                id="admin-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="admin-password" className="block text-xs font-medium text-neutral-700">Password</label>
            <div className="relative flex items-center">
              <Lock className="pointer-events-none absolute left-3.5 h-4 w-4 text-neutral-400" />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <span>Signing in…</span>
            ) : (
              <><span>Sign in</span><ArrowRight className="h-4 w-4" /></>
            )}
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 border-t border-neutral-200 bg-neutral-50/60 px-7 py-4 text-[11px] font-medium text-neutral-500">
          <ShieldAlert className="h-3.5 w-3.5" />
          Authorized personnel only
        </div>
      </div>
    </div>
  );
}
