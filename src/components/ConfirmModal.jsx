import { AlertTriangle } from 'lucide-react';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmLabel = 'Confirmer', danger = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]
                      shadow-2xl shadow-black/50 animate-scale-in overflow-hidden">
        <div className="p-5">
          {/* Icon */}
          {danger && (
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 flex items-center justify-center mb-4">
              <AlertTriangle size={24} className="text-red-400" />
            </div>
          )}

          <h3 className="text-lg font-bold text-white mb-1.5">{title}</h3>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 p-4 pt-0">
          <button
            onClick={onCancel}
            className="flex-1 min-h-[48px] rounded-xl text-sm font-semibold
                       bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)]
                       hover:bg-[var(--color-surface-hover)] active:scale-[0.98] transition-all"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 min-h-[48px] rounded-xl text-sm font-bold
                       active:scale-[0.98] transition-all
                       ${danger
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/25 hover:bg-red-600'
                : 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-600'
              }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
