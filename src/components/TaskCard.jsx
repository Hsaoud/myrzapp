import { useState } from 'react';
import { Pencil, Trash2, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

export default function TaskCard({ task, index, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(!task.name);
  const [editName, setEditName] = useState(task.name);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleSaveName = () => {
    onUpdate({ ...task, name: editName.trim() || `Examen ${index + 1}` });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditName(task.name);
    setIsEditing(false);
  };

  const handleConformite = (value) => {
    onUpdate({ ...task, conformite: task.conformite === value ? null : value });
  };

  const handleArcToggle = () => {
    onUpdate({ ...task, arc: !task.arc });
  };

  const handleArcComment = (e) => {
    onUpdate({ ...task, arcComment: e.target.value });
  };

  const handleControle = (value) => {
    onUpdate({ ...task, controleConformite: task.controleConformite === value ? null : value });
  };

  const handleRcToggle = () => {
    onUpdate({ ...task, rc: !task.rc });
  };

  return (
    <div
      className="animate-fade-in-up rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]
                 shadow-lg shadow-black/20 overflow-hidden transition-all duration-200"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* ===== HEADER ===== */}
      <div className={`flex items-center gap-2 p-4 border-b transition-colors duration-300
                       ${task.conformite === 'C'
                         ? 'bg-green-500/10 border-green-500/20'
                         : task.conformite === 'NC'
                           ? 'bg-red-500/10 border-red-500/20'
                           : 'border-[var(--color-border)]'
                       }`}>
        {/* Index badge — tap to collapse/expand */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 
                     flex flex-col items-center justify-center
                     hover:bg-indigo-500/25 active:scale-90 transition-all cursor-pointer"
          aria-label={isCollapsed ? "Déplier" : "Replier"}
        >
          <span className="text-xs font-bold leading-none">{index + 1}</span>
          {isCollapsed
            ? <ChevronDown size={10} className="mt-0.5 opacity-70" />
            : <ChevronUp size={10} className="mt-0.5 opacity-70" />
          }
        </button>

        {/* Name / Edit */}
        {isEditing ? (
          <div className="flex-1 flex items-center gap-1.5">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              placeholder={`Examen ${index + 1}`}
              autoFocus
              className="flex-1 px-3 py-2 min-h-[44px] rounded-xl bg-[var(--color-bg)] border-2 border-indigo-500/50
                         text-white text-sm font-medium placeholder:text-[var(--color-text-muted)]
                         focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleSaveName}
              className="w-11 h-11 rounded-xl bg-green-500/15 text-green-400 flex items-center justify-center
                         hover:bg-green-500/25 active:scale-95 transition-all"
              aria-label="Confirmer"
            >
              <Check size={18} />
            </button>
            <button
              onClick={handleCancelEdit}
              className="w-11 h-11 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center
                         hover:bg-red-500/25 active:scale-95 transition-all"
              aria-label="Annuler"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex-1 text-left min-h-[44px] flex items-center gap-2"
            >
              <span className="text-sm font-semibold text-white truncate">
                {task.name || `Examen ${index + 1}`}
              </span>
            </button>
            {isCollapsed && (
              <>
                <button
                  onClick={() => handleConformite('C')}
                  className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                             active:scale-90 transition-all
                             ${task.conformite === 'C'
                               ? 'bg-green-500/25 text-green-400 border border-green-500/30'
                               : 'bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
                             }`}
                  aria-label="Conforme"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => handleConformite('NC')}
                  className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                             active:scale-90 transition-all
                             ${task.conformite === 'NC'
                               ? 'bg-red-500/25 text-red-400 border border-red-500/30'
                               : 'bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
                             }`}
                  aria-label="Non Conforme"
                >
                  <X size={16} />
                </button>
              </>
            )}
            <button
              onClick={() => { setEditName(task.name); setIsEditing(true); }}
              className="w-11 h-11 rounded-xl flex items-center justify-center
                         bg-[var(--color-bg)] border border-[var(--color-border)]
                         hover:bg-[var(--color-surface-hover)] active:scale-95 transition-all"
              aria-label="Éditer le nom"
            >
              <Pencil size={16} className="text-[var(--color-text-muted)]" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="w-11 h-11 rounded-xl flex items-center justify-center
                         bg-red-500/10 border border-red-500/20
                         hover:bg-red-500/20 active:scale-95 transition-all"
              aria-label="Supprimer"
            >
              <Trash2 size={16} className="text-red-400" />
            </button>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-11 h-11 rounded-xl flex items-center justify-center
                         bg-[var(--color-bg)] border border-[var(--color-border)]
                         hover:bg-[var(--color-surface-hover)] active:scale-95 transition-all"
              aria-label={isCollapsed ? "Déplier" : "Replier"}
            >
              {isCollapsed ? <ChevronDown size={16} className="text-[var(--color-text-muted)]" /> : <ChevronUp size={16} className="text-[var(--color-text-muted)]" />}
            </button>
          </>
        )}
      </div>

      {/* ===== BODY (collapsible) ===== */}
      {!isCollapsed && (
        <div className="p-4 space-y-4">
          {/* --- Conformité --- */}
          <Section label="Conformité">
            <div className="grid grid-cols-2 gap-2">
              <ToggleButton
                label="C"
                sublabel="Conforme"
                isActive={task.conformite === 'C'}
                activeColor="bg-green-500 text-white shadow-lg shadow-green-500/30"
                inactiveColor="bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                onClick={() => handleConformite('C')}
              />
              <ToggleButton
                label="NC"
                sublabel="Non Conforme"
                isActive={task.conformite === 'NC'}
                activeColor="bg-red-500 text-white shadow-lg shadow-red-500/30"
                inactiveColor="bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                onClick={() => handleConformite('NC')}
              />
            </div>
          </Section>

          {/* --- ARC --- */}
          <Section label="ARC — Action de remise en conformité">
            <button
              onClick={handleArcToggle}
              className={`w-full min-h-[48px] rounded-xl font-bold text-sm tracking-wide
                         flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]
                         ${task.arc
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-blue-500/30'
                }`}
            >
              <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                               ${task.arc ? 'border-white bg-white/20' : 'border-[var(--color-border)]'}`}>
                {task.arc && <Check size={12} />}
              </span>
              ARC
            </button>

            <textarea
              value={task.arcComment}
              onChange={handleArcComment}
              rows={3}
              placeholder="Décrivez l'action de remise en conformité...
(Utilisez la dictée vocale 🎤 de votre clavier)"
              className="w-full mt-2 px-4 py-3 rounded-xl bg-[var(--color-bg)] text-white text-sm
                         border-2 border-[var(--color-border-light)] border-dashed
                         placeholder:text-[var(--color-text-muted)] placeholder:text-xs
                         resize-y min-h-[80px]
                         focus:border-indigo-500 focus:border-solid transition-colors"
            />
          </Section>

          {/* --- Contrôle croisé --- */}
          <Section label="Contrôle croisé">
            <div className="grid grid-cols-2 gap-2">
              <ToggleButton
                label="CN"
                sublabel="Conforme"
                isActive={task.controleConformite === 'CN'}
                activeColor="bg-green-500 text-white shadow-lg shadow-green-500/30"
                inactiveColor="bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                onClick={() => handleControle('CN')}
              />
              <ToggleButton
                label="NC"
                sublabel="Non Conforme"
                isActive={task.controleConformite === 'NC'}
                activeColor="bg-red-500 text-white shadow-lg shadow-red-500/30"
                inactiveColor="bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                onClick={() => handleControle('NC')}
              />
            </div>

            <button
              onClick={handleRcToggle}
              className={`w-full mt-2 min-h-[48px] rounded-xl font-bold text-sm tracking-wide
                         flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]
                         ${task.rc
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                  : 'bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-amber-500/30'
                }`}
            >
              <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                               ${task.rc ? 'border-white bg-white/20' : 'border-[var(--color-border)]'}`}>
                {task.rc && <Check size={12} />}
              </span>
              RC — Remise en Conformité
            </button>
          </Section>
        </div>
      )}

      {/* Collapsed state indicator */}
      {isCollapsed && (
        <div className="px-4 py-2.5 flex items-center gap-2 flex-wrap">
          {task.conformite && (
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md
                             ${task.conformite === 'C' ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
              {task.conformite === 'C' ? 'Conforme' : 'Non Conforme'}
            </span>
          )}
          {task.arc && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-400">
              ARC
            </span>
          )}
          {task.controleConformite && (
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md
                             ${task.controleConformite === 'CN' ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
              Ctrl: {task.controleConformite}
            </span>
          )}
          {task.rc && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400">
              RC
            </span>
          )}
          {!task.conformite && !task.arc && !task.controleConformite && !task.rc && (
            <span className="text-[11px] text-[var(--color-text-muted)]">Aucune donnée</span>
          )}
        </div>
      )}
    </div>
  );
}

/* ===== Sub-components ===== */

function Section({ label, children }) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
        {label}
      </p>
      {children}
    </div>
  );
}

function ToggleButton({ label, sublabel, isActive, activeColor, inactiveColor, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`min-h-[52px] rounded-xl font-bold text-base flex flex-col items-center justify-center
                 transition-all duration-200 active:scale-95
                 ${isActive ? activeColor : `${inactiveColor} hover:bg-[var(--color-surface-hover)]`}`}
    >
      <span>{label}</span>
      <span className={`text-[10px] font-medium mt-0.5 ${isActive ? 'opacity-80' : 'opacity-60'}`}>
        {sublabel}
      </span>
    </button>
  );
}
