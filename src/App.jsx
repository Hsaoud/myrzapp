import { useState, useCallback } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { createBlankTask, generateId, getStats } from './utils/helpers';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import TaskCard from './components/TaskCard';
import HistoryDrawer from './components/HistoryDrawer';
import ConfirmModal from './components/ConfirmModal';
import ArchiveViewer from './components/ArchiveViewer';

export default function App() {
  // ===== Persisted State =====
  const [tasks, setTasks] = useLocalStorage('myrz_tasks', []);
  const [history, setHistory] = useLocalStorage('myrz_history', []);

  // ===== UI State =====
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [viewingArchive, setViewingArchive] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false });

  // ===== Task CRUD =====
  const addTask = useCallback(() => {
    setTasks((prev) => [...prev, createBlankTask()]);
  }, [setTasks]);

  const updateTask = useCallback((updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  }, [setTasks]);

  const deleteTask = useCallback((taskId) => {
    setConfirmModal({
      isOpen: true,
      title: 'Supprimer cette tâche ?',
      message: 'Cette action est irréversible. La tâche et toutes ses données seront définitivement supprimées.',
      danger: true,
      confirmLabel: 'Supprimer',
      onConfirm: () => {
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
        setConfirmModal({ isOpen: false });
      },
    });
  }, [setTasks]);

  // ===== Archive =====
  const archiveTable = useCallback(() => {
    if (tasks.length === 0) return;
    setConfirmModal({
      isOpen: true,
      title: 'Archiver ce tableau ?',
      message: 'Le tableau actuel sera sauvegardé dans l\'historique et un nouveau tableau vierge sera créé.',
      confirmLabel: 'Archiver',
      onConfirm: () => {
        const archiveEntry = {
          id: generateId(),
          createdAt: new Date().toISOString(),
          tasks: [...tasks],
        };
        setHistory((prev) => [archiveEntry, ...prev]);
        setTasks([]);
        setConfirmModal({ isOpen: false });
      },
    });
  }, [tasks, setHistory, setTasks]);

  const deleteArchive = useCallback((archiveId) => {
    setConfirmModal({
      isOpen: true,
      title: 'Supprimer cette archive ?',
      message: 'Cette archive sera définitivement supprimée de l\'historique.',
      danger: true,
      confirmLabel: 'Supprimer',
      onConfirm: () => {
        setHistory((prev) => prev.filter((h) => h.id !== archiveId));
        setConfirmModal({ isOpen: false });
      },
    });
  }, [setHistory]);

  const viewArchive = useCallback((entry) => {
    setViewingArchive(entry);
    setIsHistoryOpen(false);
  }, []);

  // ===== Stats =====
  const stats = getStats(tasks);

  // ===== Archive Viewer =====
  if (viewingArchive) {
    return (
      <ArchiveViewer
        entry={viewingArchive}
        onClose={() => setViewingArchive(null)}
      />
    );
  }

  // ===== Main Render =====
  return (
    <div className="min-h-[100dvh] bg-[var(--color-bg)] pb-28">
      <Header
        onOpenHistory={() => setIsHistoryOpen(true)}
        onArchive={archiveTable}
        taskCount={tasks.length}
      />

      <StatsBar stats={stats} />

      {/* Task List */}
      <main className="max-w-2xl mx-auto px-4 space-y-4">
        {tasks.length === 0 ? (
          <EmptyState onAdd={addTask} />
        ) : (
          tasks.map((task, idx) => (
            <TaskCard
              key={task.id}
              task={task}
              index={idx}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </main>

      {/* Floating Add Button */}
      {tasks.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 p-4 
                        bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/95 to-transparent">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={addTask}
              className="w-full min-h-[56px] rounded-2xl font-bold text-base
                         bg-gradient-to-r from-indigo-500 to-purple-600 text-white
                         shadow-xl shadow-indigo-500/25
                         hover:shadow-2xl hover:shadow-indigo-500/40
                         active:scale-[0.98] transition-all duration-200
                         flex items-center justify-center gap-2"
            >
              <Plus size={22} strokeWidth={2.5} />
              Ajouter une tâche
            </button>
          </div>
        </div>
      )}

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onDelete={deleteArchive}
        onView={viewArchive}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmLabel={confirmModal.confirmLabel}
        danger={confirmModal.danger}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ isOpen: false })}
      />
    </div>
  );
}

/* ===== Empty State ===== */
function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 
                      border border-indigo-500/20 flex items-center justify-center mb-5">
        <Sparkles size={36} className="text-indigo-400" />
      </div>
      <h2 className="text-lg font-bold text-white mb-2">
        Nouveau contrôle
      </h2>
      <p className="text-sm text-[var(--color-text-muted)] max-w-xs mb-6 leading-relaxed">
        Commencez par ajouter votre première tâche d'examen pour démarrer un relevé de conformité.
      </p>
      <button
        onClick={onAdd}
        className="min-h-[56px] px-8 rounded-2xl font-bold text-base
                   bg-gradient-to-r from-indigo-500 to-purple-600 text-white
                   shadow-xl shadow-indigo-500/25
                   hover:shadow-2xl hover:shadow-indigo-500/40
                   active:scale-[0.98] transition-all duration-200
                   flex items-center justify-center gap-2"
      >
        <Plus size={22} strokeWidth={2.5} />
        Ajouter une tâche
      </button>
    </div>
  );
}
