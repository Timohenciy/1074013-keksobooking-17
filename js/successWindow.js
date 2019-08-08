'use strict';

(function () {
  var ESC_BUTTON = 27;

  var main = document.querySelector('main');
  var successWindowTemplate = document.querySelector('#success').content.querySelector('.success');

  var createSuccessPopup = function () {
    var successPopup = successWindowTemplate.cloneNode(true);
    successPopup.classList.add('hidden');

    main.appendChild(successPopup);
  };

  var showSuccessPopup = function () {
    var successPopup = document.querySelector('.success');
    successPopup.classList.remove('hidden');

    var onEscClosePopup = function (evt) {
      if (evt.keyCode === ESC_BUTTON) {
        successPopup.classList.add('hidden');

        document.removeEventListener('keydown', onEscClosePopup);
        document.removeEventListener('click', onClickClosePopup);
      }
    };

    var onClickClosePopup = function () {
      successPopup.classList.add('hidden');

      document.removeEventListener('keydown', onEscClosePopup);
      document.removeEventListener('click', onClickClosePopup);
    };

    document.addEventListener('keydown', onEscClosePopup);
    document.addEventListener('click', onClickClosePopup);
  };

  window.successWindow = {
    createSuccessPopup: createSuccessPopup,
    showSuccessPopup: showSuccessPopup,
    escButtonCode: ESC_BUTTON
  };
})();
