import { useEffect } from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'error', onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const isError = type === 'error';
  const isSuccess = type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm w-full p-2">
      <div
        className={`p-4 rounded-2xl border shadow-2xl flex items-start gap-3 transition-all bg-white ${
          isError
            ? 'border-red-200 text-red-900'
            : isSuccess
            ? 'border-emerald-200 text-emerald-900'
            : 'border-neutral-200 text-neutral-900'
        }`}
      >
        <div className="shrink-0 mt-0.5">
          {isError && <AlertCircle className="w-5 h-5 text-red-500" />}
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
          {!isError && !isSuccess && <Info className="w-5 h-5 text-neutral-500" />}
        </div>

        <div className="grow space-y-0.5">
          <h4 className="text-xs font-black uppercase tracking-wider">
            {isError ? 'Error' : isSuccess ? 'Success' : 'Notice'}
          </h4>
          <p className="text-xs font-medium text-neutral-600 leading-snug">
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="shrink-0 p-1 text-neutral-400 hover:text-black rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}