// CONTROLLER: the only layer that talks to both model and views.
// It never builds HTML itself.

import * as model from './model.js';
import subjectFormView from './views/subjectFormView.js';
import subjectListView from './views/subjectListView.js';
import gwaSummaryView from './views/gwaSummaryView.js';

const renderAll = function () {
  subjectListView.render(model.state.subjects);
  gwaSummaryView.render({ gwa: model.getGwa(), totalUnits: model.getTotalUnits() });
};

const controlAddSubject = function (data) {
  // Validation lives here; the error is rendered through the view.
  if (!data.name) return subjectFormView.renderError('Subject name is required.');
  if (!Number.isInteger(data.units) || data.units <= 0)
    return subjectFormView.renderError('Units must be a whole number above 0.');
  if (data.grade < 1 || data.grade > 5)
    return subjectFormView.renderError('Grade must be between 1.0 and 5.0.');

  model.addSubject(data);
  subjectFormView.clearForm();
  renderAll();
};

const controlDeleteSubject = function (id) {
  model.deleteSubject(id);
  renderAll();
};

const init = function () {
  model.loadState();
  renderAll();
  subjectFormView.addHandlerAdd(controlAddSubject);
  subjectListView.addHandlerDelete(controlDeleteSubject);
};

init();
