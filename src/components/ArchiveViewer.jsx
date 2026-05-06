import { ArrowLeft, Calendar } from 'lucide-react';
import TaskCard from './TaskCard';
import StatsBar from './StatsBar';
import { formatDate, getStats } from '../utils/helpers';

export default function ArchiveViewer({ entry, onClose }) {
  const stats = getStats(entry.tasks);

  return (
    <div className="min-h-[100dvh] bg-[var(--color-bg)]">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0f1117]/80 border-b border-[var(--color-border)]">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-xl flex items-center justify-center
                       bg-[var(--color-surface)] border border-[var(--color-border)]
                       hover:bg-[var(--color-surface-hover)] active:scale-95 transition-all"
            aria-label="Retour"
          >
            <ArrowLeft size={20} className="text-[var(--color-text-muted)]" />
          </button>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-white">Archive</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Calendar size={11} className="text-indigo-400" />
              <span className="text-[11px] text-indigo-400 font-medium">
                {formatDate(entry.createdAt)}
              </span>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]
                           text-xs font-semibold text-[var(--color-text-muted)]">
            Lecture seule
          </span>
        </div>
      </header>

      {/* Stats */}
      <StatsBar stats={stats} />

      {/* Tasks (read-only) */}
      <div className="max-w-2xl mx-auto px-4 pb-8 space-y-4">
        {entry.tasks.map((task, idx) => (
          <TaskCard
            key={task.id}
            task={task}
            index={idx}
            onUpdate={() => {}}
            onDelete={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
