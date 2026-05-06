import { CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function StatsBar({ stats }) {
  const { total, conforme, nonConforme, pending } = stats;

  if (total === 0) return null;

  const conformePercent = total > 0 ? Math.round((conforme / total) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-3">
      <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4 animate-fade-in">
        {/* Progress bar */}
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
            Progression
          </span>
          <span className="text-sm font-bold text-white">
            {conformePercent}%
          </span>
        </div>
        <div className="w-full h-2 bg-[var(--color-border)] rounded-full overflow-hidden mb-3">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${total > 0 ? ((conforme + nonConforme) / total) * 100 : 0}%`,
              background: nonConforme > 0
                ? `linear-gradient(90deg, var(--color-green) ${(conforme / (conforme + nonConforme)) * 100}%, var(--color-red) ${(conforme / (conforme + nonConforme)) * 100}%)`
                : 'var(--color-green)',
            }}
          />
        </div>

        {/* Stat pills */}
        <div className="flex gap-2 flex-wrap">
          <StatPill
            icon={<CheckCircle2 size={14} />}
            label="Conforme"
            value={conforme}
            color="text-green-400"
            bg="bg-green-500/10"
          />
          <StatPill
            icon={<XCircle size={14} />}
            label="Non conforme"
            value={nonConforme}
            color="text-red-400"
            bg="bg-red-500/10"
          />
          <StatPill
            icon={<Clock size={14} />}
            label="En attente"
            value={pending}
            color="text-amber-400"
            bg="bg-amber-500/10"
          />
        </div>
      </div>
    </div>
  );
}

function StatPill({ icon, label, value, color, bg }) {
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${bg}`}>
      <span className={color}>{icon}</span>
      <span className={`text-xs font-medium ${color}`}>
        {value} {label}
      </span>
    </div>
  );
}
