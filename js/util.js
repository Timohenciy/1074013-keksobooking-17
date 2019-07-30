'use strict';

(function () {
  window.popup = {
    createPopup: function (elementToBeCloned, appendTo) {
      var newPopupElement = elementToBeCloned.cloneNode(true);
      newPopupElement.classList.add('hidden');

      appendTo.appendChild(newPopupElement);
    },
    showPopup: function (element) {
      element.classList.remove('hidden');

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          element.classList.add('hidden');
        }
      });

      document.addEventListener('click', function (evt) {
        evt.preventDefault();
        element.classList.add('hidden');
      });

    },
    hidePopup: function (element) {
      element.classList.add('hidden');
    }
  };
})();
