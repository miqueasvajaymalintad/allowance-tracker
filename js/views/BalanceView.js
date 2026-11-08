import View from './View.js';

class BalanceView extends View {
  _parentElement = document.querySelector('.balance');

  // Controller subscribes here. The view only reports the typed allowance.
  addAllowanceHandler(handler) {
    this._parentElement.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target.closest('.allowance-form');
      if (!form) return;
      handler(form.elements.allowance.value);
    });
  }

  // Override: show the error inside the balance box without erasing the form.
  renderError(message) {
    const box = this._parentElement.querySelector('.balance-error');
    if (box) box.innerHTML = `<p class="error">${this._escape(message)}</p>`;
  }

  _generateMarkup() {
    const { allowance, totalSpent, balance } = this._data;
    return `
      <form class="allowance-form" novalidate>
        <label>
          Allowance (₱)
          <input type="number" name="allowance" step="0.01" value="${allowance}" />
        </label>
        <button type="submit">Set allowance</button>
      </form>
      <div class="balance-error"></div>
      <p>Total spent: <strong>₱${totalSpent.toFixed(2)}</strong></p>
      <p class="balance-amount ${balance < 0 ? 'negative' : ''}">
        Balance: <strong>₱${balance.toFixed(2)}</strong>
      </p>`;
  }
}

export default new BalanceView();