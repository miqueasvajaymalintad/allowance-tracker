// OWNER: Aira
import View from './View.js';

class ExpenseListView extends View {
  _parentElement = document.querySelector('.expense-list');
  _errorMessage = 'No expenses yet. Add one above.';

  // Controller subscribes here. One listener handles every Edit and Delete button.
  addActionHandlers(editHandler, deleteHandler) {
    this._parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;

      const { action, id } = btn.dataset;
      if (action === 'edit') editHandler(id);
      if (action === 'delete') deleteHandler(id);
    });
  }

  _generateMarkup() {
    if (!this._data.length) return `<p class="empty">${this._errorMessage}</p>`;
    return `<ul>${this._data.map((e) => this._generateMarkupItem(e)).join('')}</ul>`;
  }

  _generateMarkupItem(expense) {
    return `
      <li class="expense">
        <div>
          <strong>${this._escape(expense.description)}</strong>
          <span>${this._escape(expense.category)} · ₱${expense.amount.toFixed(2)}</span>
        </div>
        <div>
          <button type="button" data-action="edit" data-id="${expense.id}">Edit</button>
          <button type="button" data-action="delete" data-id="${expense.id}">Delete</button>
        </div>
      </li>`;
  }
}

export default new ExpenseListView();
