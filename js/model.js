// MODEL: holds all data and rules. Never touches the DOM, never imports a view.

const STORAGE_KEY = 'allowance-tracker';

export const state = {
  allowance: 0,
  expenses: [],
  editingId: null,
};

// ---------- localStorage ----------
const persist = () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ allowance: state.allowance, expenses: state.expenses })
  );
};

export const loadState = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!stored) return;
    state.allowance = Number(stored.allowance) || 0;
    state.expenses = Array.isArray(stored.expenses) ? stored.expenses : [];
  } catch {
    state.allowance = 0;
    state.expenses = [];
  }
};

// ---------- validation (returns an error message, or null if OK) ----------
export const validateExpense = ({ description, amount }) => {
  if (!description || !description.trim()) return 'Description is required.';
  if (String(amount).trim() === '' || !Number.isFinite(Number(amount)) || Number(amount) <= 0)
    return 'Amount must be a number greater than 0.';
  return null;
};

export const validateAllowance = (value) => {
  if (String(value).trim() === '' || !Number.isFinite(Number(value)) || Number(value) < 0)
    return 'Allowance must be a number, 0 or higher.';
  return null;
};

// ---------- allowance ----------
export const setAllowance = (value) => {
  state.allowance = Number(value);
  persist();
};

// ---------- expenses: add, edit, delete ----------
const clean = ({ description, amount, category }) => ({
  description: description.trim(),
  amount: Number(amount),
  category,
});

export const addExpense = (data) => {
  state.expenses.push({ id: Date.now().toString(), ...clean(data) });
  persist();
};

export const startEditing = (id) => {
  const expense = state.expenses.find((e) => e.id === id);
  state.editingId = expense ? id : null;
  return expense;
};

export const updateExpense = (id, data) => {
  const index = state.expenses.findIndex((e) => e.id === id);
  if (index === -1) return;
  state.expenses[index] = { id, ...clean(data) };
  state.editingId = null;
  persist();
};

export const deleteExpense = (id) => {
  state.expenses = state.expenses.filter((e) => e.id !== id);
  if (state.editingId === id) state.editingId = null;
  persist();
};

// ---------- derived value: recomputes on every change ----------
export const calculateBalance = () => {
  const totalSpent = state.expenses.reduce((sum, e) => sum + e.amount, 0);
  return {
    allowance: state.allowance,
    totalSpent,
    balance: state.allowance - totalSpent,
  };
};