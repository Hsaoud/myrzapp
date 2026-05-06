/**
 * Generate a unique ID for tasks and tables.
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

/**
 * Create a blank task object.
 */
export function createBlankTask() {
  return {
    id: generateId(),
    name: '',
    conformite: null,       // 'C' | 'NC' | null
    arc: false,             // toggle ARC
    arcComment: '',         // textarea content
    controleConformite: null, // 'CN' | 'NC' | null
    rc: false,              // toggle RC
  };
}

/**
 * Format a date for display.
 */
export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Count stats from a tasks array.
 */
export function getStats(tasks) {
  const total = tasks.length;
  const conforme = tasks.filter(t => t.conformite === 'C').length;
  const nonConforme = tasks.filter(t => t.conformite === 'NC').length;
  const pending = total - conforme - nonConforme;
  return { total, conforme, nonConforme, pending };
}
