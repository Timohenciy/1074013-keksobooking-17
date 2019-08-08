'use strict';

(function () {
  var main = document.querySelector('main');
  var errorWindowTemplate = document.querySelector('#error').content.querySelector('.error');

  var createErrorPopup = function () {
    var errorPopup = errorWindowTemplate.cloneNode(true);
    errorPopup.classList.add('hidden');

    main.appendChild(errorPopup);
  };

  var showErrorPopup = function () {
    var errorWindow = document.querySelector('.error');
    var errorButton = errorWindow.querySelector('.error__button');

    var onEscClosePopup = function (evt) {
      if (evt.keyCode === window.successWindow.escButtonCode) {
        errorWindow.classList.add('hidden');

        errorButton.removeEventListener('click', onClickClosePopup);
        document.removeEventListener('click', onClickClosePopup);
        document.removeEventListener('keydown', onEscClosePopup);
      }
    };

    var onClickClosePopup = function () {
      errorWindow.classList.add('hidden');

      errorButton.removeEventListener('click', onClickClosePopup);
      document.removeEventListener('click', onClickClosePopup);
      document.removeEventListener('keydown', onEscClosePopup);
    };

    errorWindow.classList.remove('hidden');

    errorButton.addEventListener('click', onClickClosePopup);
    document.addEventListener('click', onClickClosePopup);
    document.addEventListener('keydown', onEscClosePopup);
  };

  window.errorWindow = {
    createErrorPopup: createErrorPopup,
    onLoadErrorShowPopup: showErrorPopup
  };
})();
