'use strict';

(function () {
  var main = document.querySelector('main');
  var errorWindowTemplate = document.querySelector('#error').content.querySelector('.error');

  window.createErrorPopup = function () {
    var errorWindowClone = errorWindowTemplate.cloneNode(true);
    errorWindowClone.classList.add('hidden');

    main.appendChild(errorWindowClone);
  };

  window.onLoadErrorShowPopup = function () {
    var errorWindow = document.querySelector('.error');
    var errorButton = errorWindow.querySelector('.error__button');

    var onEscClosePopup = function (evt) {

      if (evt.keyCode === 27) {
        errorWindow.classList.add('hidden');
      }

      errorButton.removeEventListener('click', onClickClosePopup);
      document.removeEventListener('click', onClickClosePopup);
      document.removeEventListener('keydown', onEscClosePopup);
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

})();
