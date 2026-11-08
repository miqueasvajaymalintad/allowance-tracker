// OWNER: Miqueas
import View from './View.js';

class GwaSummaryView extends View {
  _parentElement = document.querySelector('.gwa-summary');

  _generateMarkup() {
    const { gwa, totalUnits } = this._data;
    return `
      <p>Your GWA</p>
      <p class="gwa-value">${gwa.toFixed(3)}</p>
      <p>Total units: ${totalUnits}</p>`;
  }
}

export default new GwaSummaryView();
