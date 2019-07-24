'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilters = map.querySelectorAll('.map__filter');

  var submitFormSection = document.querySelector('.notice');
  var submitForm = submitFormSection.querySelector('.ad-form');
  var submitFormFields = submitFormSection.querySelectorAll('fieldset');

  var addressInput = submitFormSection.querySelector('#address');

  var mainPin = document.querySelector('.map__pin--main');

  var announcementsIsCreated = false;
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
    map.classList.remove('map--faded');
    submitForm.classList.remove('ad-form--disabled');

    disableStatusSwitching(submitFormFields);
    disableStatusSwitching(mapFilters);
  };

  // 8. Компонентный подход - Личный проект: подробности. Часть 2
  var onPinClickShowPopup = function (evt) { // Вешается на строке 69
    evt.preventDefault();

    if (evt.target.parentElement.type === 'button') {
      window.showAnnouncementPopup(evt.target.parentElement.offsetLeft); // Создается в модуле showFilteredPins
      evt.target.parentElement.classList.add('map__pin--active');
    }

  };

  var onMouseDownActivatePage = function (evt) {
    evt.preventDefault();

    if (!pageIsActive) {
      activatePage();

      pageIsActive = true;
    }

    if (!announcementsIsCreated) {
      window.data.load(window.onSuccesDataLoadCreatePins, window.onErrorShowPopup);
      window.createAnnouncementPopup(); // Всплывающее окно объявления создается один раз

      announcementsIsCreated = true;
    }

    mainPin.addEventListener('mousemove', onMouseMoveSetCoords);
    mainPin.addEventListener('mouseup', onMouseUpSetCoords);
    map.addEventListener('click', onPinClickShowPopup);
  };

  var onMouseMoveSetCoords = function (evt) {
    evt.preventDefault();

    setCoordinates(mainPin.offsetLeft, mainPin.offsetTop, mainPin.offsetWidth);
  };

  var onMouseUpSetCoords = function (evt) {
    evt.preventDefault();

    setCoordinates(mainPin.offsetLeft, mainPin.offsetTop, mainPin.offsetWidth, mainPin.offsetHeight);
    mainPin.removeEventListener('mousemove', onMouseMoveSetCoords);
    mainPin.removeEventListener('mouseup', onMouseUpSetCoords);
  };

  setInitialStateOfPage();

  mainPin.addEventListener('mousedown', onMouseDownActivatePage);
})();
