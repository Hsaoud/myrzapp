import { ClipboardCheck, Menu, Archive } from 'lucide-react';

export default function Header({ onOpenHistory, onArchive, taskCount }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0f1117]/80 border-b border-[var(--color-border)]">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <ClipboardCheck size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white leading-tight">
              MyRZ
            </h1>
            <p className="text-[11px] text-[var(--color-text-muted)] leading-tight">
              Relevés de conformité
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {taskCount > 0 && (
            <button
              onClick={onArchive}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold
                         bg-indigo-500/10 text-indigo-400 border border-indigo-500/20
                         hover:bg-indigo-500/20 active:scale-95 transition-all min-h-[44px]"
              aria-label="Archiver le tableau"
            >
              <Archive size={16} />
              <span className="hidden min-[360px]:inline">Archiver</span>
            </button>
          )}
          <button
            onClick={onOpenHistory}
            className="w-11 h-11 rounded-xl flex items-center justify-center
                       bg-[var(--color-surface)] border border-[var(--color-border)]
                       hover:bg-[var(--color-surface-hover)] active:scale-95 transition-all"
            aria-label="Historique"
          >
            <Menu size={20} className="text-[var(--color-text-muted)]" />
          </button>
        </div>
      </div>
    </header>
  );
}
