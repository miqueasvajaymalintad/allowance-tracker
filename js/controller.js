// CONTROLLER: connects the model and the views. Builds no HTML, touches no DOM.

import * as model from './model.js';
import expenseFormView from './views/ExpenseFormView.js';
import expenseListView from './views/ExpenseListView.js';
import balanceView from './views/BalanceView.js';

// Re-render everything that depends on the state.
const refresh = () => {
  expenseListView.render(model.state.expenses);
  balanceView.render(model.calculateBalance());
};

const controlAllowance = (value) => {
  const error = model.validateAllowance(value);
  if (error) return balanceView.renderError(error);

  model.setAllowance(value);
  refresh();
};

const controlSubmitExpense = (data) => {
  const error = model.validateExpense(data);
  if (error) return expenseFormView.renderError(error);

  if (model.state.editingId) model.updateExpense(model.state.editingId, data);
  else model.addExpense(data);

  expenseFormView.clearError();
  expenseFormView.reset();
  refresh();
};

const controlEdit = (id) => {
  const expense = model.startEditing(id);
  if (expense) expenseFormView.fill(expense);
};

const controlDelete = (id) => {
  const wasEditing = model.state.editingId === id;
  model.deleteExpense(id);
  if (wasEditing) expenseFormView.reset();
  refresh();
};

const init = () => {
  model.loadState();
  refresh();
  balanceView.addAllowanceHandler(controlAllowance);
  expenseFormView.addSubmitHandler(controlSubmitExpense);
  expenseListView.addActionHandlers(controlEdit, controlDelete);
};

init();