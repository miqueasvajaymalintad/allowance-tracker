// BASE VIEW: every view extends this. Never imports the model.

export default class View {
  _parentElement;
  _data;

  render(data) {
    this._data = data;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', this._generateMarkup());
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _generateMarkup() {
    throw new Error('Child views must implement _generateMarkup()');
  }
}
