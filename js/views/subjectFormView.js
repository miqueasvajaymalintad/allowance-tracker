// OWNER: Aira
import View from './View.js';

class SubjectFormView extends View {
  _parentElement = document.querySelector('.subject-form');
  _errorElement = document.querySelector('.form-error');

  // The controller subscribes to this; the view never calls the model.
  addHandlerAdd(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      const name = this._parentElement.elements.name.value.trim();
      const units = Number(this._parentElement.elements.units.value);
      const grade = Number(this._parentElement.elements.grade.value);
      handler({ name, units, grade });
    });
  }

  renderError(message) {
    this._errorElement.textContent = message;
  }

  clearForm() {
    this._parentElement.reset();
    this.renderError('');
  }

  // TODO (Aira): add more field-level feedback if you want.
}

export default new SubjectFormView();
