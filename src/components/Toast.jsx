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

  const iconStyle = isError
    ? 'bg-neutral-900 text-white'
    : isSuccess
    ? 'bg-neutral-100 text-neutral-900'
    : 'bg-neutral-100 text-neutral-600';

  return (
    <div className="admin-toast fixed bottom-6 right-6 z-[60] w-full max-w-sm px-2">
      <div className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-[0_18px_45px_-18px_rgba(0,0,0,0.35)]">
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconStyle}`}>
          {isError && <AlertCircle className="h-4 w-4" />}
          {isSuccess && <CheckCircle2 className="h-4 w-4" />}
          {!isError && !isSuccess && <Info className="h-4 w-4" />}
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-neutral-950">
            {isError ? 'Error' : isSuccess ? 'Success' : 'Notice'}
          </p>
          <p className="mt-1 text-sm leading-snug text-neutral-600">{message}</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
