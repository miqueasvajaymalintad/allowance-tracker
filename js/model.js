// MODEL: holds all data. Never touches the DOM, never imports a view.

export const state = {
  subjects: [], // { id, name, units, grade }
};

const STORAGE_KEY = 'gwa-calculator-state';

const saveState = function () {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.subjects));
};

export const loadState = function () {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) state.subjects = JSON.parse(stored);
};

export const addSubject = function ({ name, units, grade }) {
  state.subjects.push({ id: Date.now(), name, units, grade });
  saveState();
};

export const deleteSubject = function (id) {
  state.subjects = state.subjects.filter(subject => subject.id !== id);
  saveState();
};

// TODO (Kenneth): export const updateSubject = function (id, changes) { ... }

export const getTotalUnits = function () {
  return state.subjects.reduce((sum, { units }) => sum + units, 0);
};

// GWA = sum(grade * units) / sum(units)
export const getGwa = function () {
  const totalUnits = getTotalUnits();
  if (totalUnits === 0) return 0;
  const weighted = state.subjects.reduce((sum, { grade, units }) => sum + grade * units, 0);
  return weighted / totalUnits;
};
