'use strict';

(function () {
  var map = document.querySelector('.map');

  var mapFilters = map.querySelectorAll('.map__filter');

  var submitFormSection = document.querySelector('.notice');
  var submitForm = submitFormSection.querySelector('.ad-form');
  var submitFormFields = submitFormSection.querySelectorAll('fieldset');

  var addressInput = submitFormSection.querySelector('#address');

  var mainPin = document.querySelector('.map__pin--main');

  var MAP_WIDTH = map.clientWidth;
  var MAP_HEIGHT_MIN = 130;
  var MAP_HEIGHT_MAX = 630;

  var isTemplateCreated = false;
  var pageIsActive = false;

  var offerType = [
    'palace',
    'flat',
    'bungalo',
    'house'
  ];

  var disableStatusSwitching = function (collection, isDisabled) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].disabled = isDisabled;
    }
  };

  var startingInputCoordinates = function (pinX, pinY) {
    addressInput.value = pinX + ', ' + pinY;
  };

  var onMouseActionGetCoordinates = function (pinX, pinY, pinWidth) {
    addressInput.value = (pinX + Math.round(pinWidth / 2)) + ', ' + pinY;
  };

  var activatePage = function () {
    disableStatusSwitching(submitFormFields);
    disableStatusSwitching(mapFilters);
    map.classList.remove('map--faded');
    submitForm.classList.remove('ad-form--disabled');
  };

  var onMouseDownCreateTemplate = function (evt) {
    evt.preventDefault();

    if (pageIsActive === false) {
      activatePage();

      pageIsActive = true;
    }

    mainPin.addEventListener('mousemove', onMouseMoveActivatePage);
    mainPin.addEventListener('mouseup', onMouseUpRemoveListeners);
  };

  var onMouseMoveActivatePage = function (evt) {
    evt.preventDefault();

    if (isTemplateCreated === false) {
      window.createTemplate(window.getAnnouncement(offerType, MAP_WIDTH, MAP_HEIGHT_MIN, MAP_HEIGHT_MAX));

      isTemplateCreated = true;
    }

    onMouseActionGetCoordinates(mainPin.offsetLeft, mainPin.offsetTop, mainPin.offsetWidth);
  };

  var onMouseUpRemoveListeners = function (evt) {
    evt.preventDefault();

    onMouseActionGetCoordinates(mainPin.offsetLeft, mainPin.offsetTop, mainPin.offsetWidth, mainPin.offsetHeight);
    mainPin.removeEventListener('mousemove', onMouseMoveActivatePage);
    mainPin.removeEventListener('mouseup', onMouseUpRemoveListeners);
  };

  mainPin.addEventListener('mousedown', onMouseDownCreateTemplate);

  startingInputCoordinates(mainPin.offsetLeft, mainPin.offsetTop);

  disableStatusSwitching(submitFormFields, true);
  disableStatusSwitching(mapFilters, true);

})();
