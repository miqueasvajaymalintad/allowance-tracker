// OWNER: Kenneth
import View from './View.js';

class SubjectListView extends View {
  _parentElement = document.querySelector('.subject-list');

  addHandlerDelete(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn-delete');
      if (!btn) return;
      handler(Number(btn.dataset.id));
    });
  }

  // TODO (Kenneth): addHandlerEdit(handler) + edit buttons in the markup

  _generateMarkup() {
    if (this._data.length === 0) return '<p>No subjects yet. Add one above.</p>';
    return `<ul>${this._data.map(this._generateItem).join('')}</ul>`;
  }

  _generateItem({ id, name, units, grade }) {
    return `
      <li>
        <span>${name} - ${units} units - grade ${grade.toFixed(2)}</span>
        <button class="btn-delete" data-id="${id}">Delete</button>
      </li>`;
  }
}

export default new SubjectListView();
