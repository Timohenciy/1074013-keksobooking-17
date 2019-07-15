'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilters = map.querySelectorAll('.map__filter');

  var submitFormSection = document.querySelector('.notice');
  var submitForm = submitFormSection.querySelector('.ad-form');
  var submitFormFields = submitFormSection.querySelectorAll('fieldset');

  var addressInput = submitFormSection.querySelector('#address');

  var mainPin = document.querySelector('.map__pin--main');

  var isAnnouncementsCreated = false;
  var pageIsActive = false;

  var setInitialStateOfPage = function () {
    addressInput.value = mainPin.offsetLeft + ', ' + mainPin.offsetTop;

    disableStatusSwitching(submitFormFields, true);
    disableStatusSwitching(mapFilters, true);
  };

  var disableStatusSwitching = function (collection, isDisabled) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].disabled = isDisabled;
    }
  };

  var setCoordinates = function (pinX, pinY, pinWidth) {
    addressInput.value = (pinX + Math.round(pinWidth / 2)) + ', ' + pinY;
  };

  var activatePage = function () {
    disableStatusSwitching(submitFormFields);
    disableStatusSwitching(mapFilters);
    map.classList.remove('map--faded');
    submitForm.classList.remove('ad-form--disabled');
  };

  var onMouseDownActivatePage = function (evt) {
    evt.preventDefault();

    if (pageIsActive === false) {
      activatePage();

      pageIsActive = true;
    }

    mainPin.addEventListener('mousemove', onMouseMoveCreateTemplate);
    mainPin.addEventListener('mouseup', onMouseUpSetPinCoords);
  };

  var onMouseMoveCreateTemplate = function (evt) {
    evt.preventDefault();

    if (isAnnouncementsCreated === false) {
      window.data.load(window.onSuccesRenderPins, window.onErrorShowPopup);

      isAnnouncementsCreated = true;
    }

    setCoordinates(mainPin.offsetLeft, mainPin.offsetTop, mainPin.offsetWidth);
  };

  var onMouseUpSetPinCoords = function (evt) {
    evt.preventDefault();

    setCoordinates(mainPin.offsetLeft, mainPin.offsetTop, mainPin.offsetWidth, mainPin.offsetHeight);
    mainPin.removeEventListener('mousemove', onMouseMoveCreateTemplate);
    mainPin.removeEventListener('mouseup', onMouseUpSetPinCoords);
  };

  setInitialStateOfPage();

  mainPin.addEventListener('mousedown', onMouseDownActivatePage);
})();
