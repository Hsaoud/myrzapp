import { X, Trash2, Eye, Calendar, ClipboardList, ChevronRight } from 'lucide-react';
import { formatDate, getStats } from '../utils/helpers';

export default function HistoryDrawer({ isOpen, onClose, history, onDelete, onView }) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md
                    bg-[var(--color-bg)] border-l border-[var(--color-border)]
                    shadow-2xl shadow-black/50 transform transition-transform duration-300 ease-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 
                            flex items-center justify-center">
              <ClipboardList size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Historique</h2>
              <p className="text-[11px] text-[var(--color-text-muted)]">
                {history.length} tableau{history.length !== 1 ? 'x' : ''} archivé{history.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-xl flex items-center justify-center
                       bg-[var(--color-surface)] border border-[var(--color-border)]
                       hover:bg-[var(--color-surface-hover)] active:scale-95 transition-all"
            aria-label="Fermer"
          >
            <X size={20} className="text-[var(--color-text-muted)]" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="overflow-y-auto h-[calc(100%-68px)] p-4 space-y-3">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]
                              flex items-center justify-center mb-4">
                <ClipboardList size={28} className="text-[var(--color-text-muted)]" />
              </div>
              <p className="text-sm text-[var(--color-text-muted)] font-medium">
                Aucun tableau archivé
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1 opacity-60">
                Les tableaux archivés apparaîtront ici
              </p>
            </div>
          ) : (
            history.map((entry, idx) => {
              const stats = getStats(entry.tasks);
              return (
                <div
                  key={entry.id}
                  className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]
                             p-4 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  {/* Date */}
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={14} className="text-indigo-400" />
                    <span className="text-xs font-semibold text-indigo-400">
                      {formatDate(entry.createdAt)}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-[var(--color-bg)] text-[var(--color-text-muted)]">
                      {stats.total} tâche{stats.total !== 1 ? 's' : ''}
                    </span>
                    {stats.conforme > 0 && (
                      <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-green-500/10 text-green-400">
                        {stats.conforme} C
                      </span>
                    )}
                    {stats.nonConforme > 0 && (
                      <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-red-500/10 text-red-400">
                        {stats.nonConforme} NC
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => onView(entry)}
                      className="flex-1 min-h-[44px] rounded-xl text-sm font-semibold
                                 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20
                                 hover:bg-indigo-500/20 active:scale-[0.98] transition-all
                                 flex items-center justify-center gap-2"
                    >
                      <Eye size={16} />
                      Consulter
                      <ChevronRight size={14} className="opacity-60" />
                    </button>
                    <button
                      onClick={() => onDelete(entry.id)}
                      className="w-12 h-12 rounded-xl flex items-center justify-center
                                 bg-red-500/10 border border-red-500/20
                                 hover:bg-red-500/20 active:scale-95 transition-all"
                      aria-label="Supprimer l'archive"
                    >
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
