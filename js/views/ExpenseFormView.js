import View from './View.js';

class ExpenseFormView extends View {
  _parentElement = document.querySelector('.expense-form');
  _errorElement = document.querySelector('.form-error');
  _button = this._parentElement.querySelector('button');

  // Controller subscribes here. The view only reports what the user typed.
  addSubmitHandler(handler) {
    this._parentElement.addEventListener('submit', (e) => {
      e.preventDefault();
      handler(Object.fromEntries(new FormData(this._parentElement)));
    });
  }

  // Override: the error goes in the error box, so the form is not erased.
  renderError(message) {
    this._errorElement.innerHTML = `<p class="error">${this._escape(message)}</p>`;
  }

  clearError() {
    this._errorElement.innerHTML = '';
  }

  // Fills the form when the user clicks Edit.
  fill(expense) {
    this._parentElement.elements.description.value = expense.description;
    this._parentElement.elements.amount.value = expense.amount;
    this._parentElement.elements.category.value = expense.category;
    this._button.textContent = 'Save changes';
    this.clearError();