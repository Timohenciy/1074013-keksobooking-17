'use strict';

(function () {
  var main = document.querySelector('main');
  var errorWindowTemplate = document.querySelector('#error').content.querySelector('.error');

  window.onErrorLoadShowPopup = function () {
    var errorWindow = errorWindowTemplate.cloneNode(true);
    var errorButton = errorWindow.querySelector('.error__button');

    var onEscDeleteElement = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === 27) {
        main.removeChild(errorWindow);
      }

      errorButton.removeEventListener('click', onClickDeleteElement);
      document.removeEventListener('keydown', onEscDeleteElement);
    };

    var onClickDeleteElement = function (evt) {
      evt.preventDefault();
      main.removeChild(errorWindow);

      document.removeEventListener('keydown', onEscDeleteElement);
      errorButton.removeEventListener('click', onClickDeleteElement);
    };

    main.appendChild(errorWindow);

    errorButton.addEventListener('click', onClickDeleteElement);
    document.addEventListener('keydown', onEscDeleteElement);
  };

})();
