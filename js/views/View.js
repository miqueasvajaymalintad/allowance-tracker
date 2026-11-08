// BASE VIEW: every view extends this. Never imports the model.

export default class View {
  _parentElement;
  _data;
  _errorMessage = 'Something went wrong.';

  render(data) {
    this._data = data;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', this._generateMarkup());
  }

  renderError(message = this._errorMessage) {
    this._clear();
    this._parentElement.insertAdjacentHTML(
      'afterbegin',
      `<p class="error">${this._escape(message)}</p>`
    );
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _escape(text) {
    return String(text)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  }

  _generateMarkup() {
    throw new Error('Child views must implement _generateMarkup()');
  }
}