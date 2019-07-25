'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilters = map.querySelectorAll('.map__filter');

  var submitFormSection = document.querySelector('.notice');
  var submitForm = submitFormSection.querySelector('.ad-form');
  var submitFormFields = submitFormSection.querySelectorAll('fieldset');

  var addressInput = submitFormSection.querySelector('#address');

  var mainPin = document.querySelector('.map__pin--main');

  var successWindowTemplate = document.querySelector('#success').content.querySelector('.success');

  var Pin = {
    startCoordX: mainPin.offsetLeft,
    startCoordY: mainPin.offsetTop,
    height: mainPin.offsetHeight,
    width: mainPin.offsetWidth
  };

  var announcementsIsCreated = false;
  var pageIsActive = false;

  var setInitialStateOfPage = function () {
    addressInput.value = mainPin.offsetLeft + ', ' + mainPin.offsetTop;

    window.popup.createPopup(successWindowTemplate, document.body);

    disableStatusSwitching(submitFormFields, true);
    disableStatusSwitching(mapFilters, true);
  };

  var disableStatusSwitching = function (collection, isDisabled) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].disabled = isDisabled;
    }
  };

  var setAddressInputValue = function (pinX, pinY, pinWidth) {
    addressInput.value = (pinX + Math.round(pinWidth / 2)) + ', ' + pinY;
  };

  window.setInactiveStateOfPage = function () {

    // Вызывается после успешной отправки формы

    mainPin.style.left = Pin.startCoordX + 'px';
    mainPin.style.top = Pin.startCoordY + 'px';

    window.removeAnnoucements();

    // Только у этих полей значение сбрасываю, возможно нужно все инпуты сбрасывать

    submitForm.title.value = '';
    submitForm.price.value = '';
    submitForm.description.value = '';

    var succesMessage = document.querySelector('.success');

    window.popup.showPopup(succesMessage);
  };

  var setActiveStateOfPage = function () {
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
      setActiveStateOfPage();

      pageIsActive = true;
    }

    if (!announcementsIsCreated) {
      window.data.load(window.onSuccesDataLoadCreatePins, window.onErrorLoadShowPopup);
      window.createAnnouncementPopup(); // Всплывающее окно объявления создается один раз

      announcementsIsCreated = true;
    }

    mainPin.addEventListener('mousemove', onMouseMoveSetCoords);
    mainPin.addEventListener('mouseup', onMouseUpSetCoords);
    map.addEventListener('click', onPinClickShowPopup);
  };

  var onMouseMoveSetCoords = function (evt) {
    evt.preventDefault();

    setAddressInputValue(mainPin.offsetLeft, mainPin.offsetTop, Pin.width);
  };

  var onMouseUpSetCoords = function (evt) {
    evt.preventDefault();

    setAddressInputValue(mainPin.offsetLeft, mainPin.offsetTop, Pin.width);
    mainPin.removeEventListener('mousemove', onMouseMoveSetCoords);
    mainPin.removeEventListener('mouseup', onMouseUpSetCoords);
  };

  setInitialStateOfPage();

  mainPin.addEventListener('mousedown', onMouseDownActivatePage);
})();
