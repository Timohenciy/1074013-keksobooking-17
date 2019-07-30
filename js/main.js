'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilters = map.querySelectorAll('.map__filter');

  var main = document.querySelector('main');

  var submitFormSection = document.querySelector('.notice');
  var submitForm = submitFormSection.querySelector('.ad-form');
  var submitFormFields = submitFormSection.querySelectorAll('fieldset');
  var features = submitForm.querySelectorAll('.feature__checkbox');

  var addressInput = submitFormSection.querySelector('#address');

  var mainPin = document.querySelector('.map__pin--main');

  var successWindowTemplate = document.querySelector('#success').content.querySelector('.success');

  var Pin = {
    startCoordX: mainPin.offsetLeft,
    startCoordY: mainPin.offsetTop,
    height: mainPin.offsetHeight,
    width: mainPin.offsetWidth
  };

  var Form = {
    houseType: submitForm.type.selectedIndex,
    timeIn: submitForm.timein.selectedIndex,
    timeOut: submitForm.timeout.selectedIndex,
    rooms: submitForm.rooms.selectedIndex,
    capacity: submitForm.capacity.selectedIndex
  };

  var announcementsIsCreated = false;
  var pageIsActive = false;

  var formFieldsDisableStatusSwitching = function (collection, isDisabled) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].disabled = isDisabled;
    }
  };

  var setAddressInputValue = function (pinX, pinY, pinWidth) {
    addressInput.value = (pinX + Math.round(pinWidth / 2)) + ', ' + pinY;
  };

  var resetFormState = function () {
    submitForm.title.value = '';
    submitForm.price.value = '';
    submitForm.description.value = '';

    submitForm.type.selectedIndex = Form.houseType;
    submitForm.timein.selectedIndex = Form.timeIn;
    submitForm.timeout.selectedIndex = Form.timeOut;
    submitForm.rooms.selectedIndex = Form.rooms;
    submitForm.capacity.selectedIndex = Form.capacity;

    setAddressInputValue(mainPin.offsetLeft, mainPin.offsetTop, Pin.width);

    Array.from(features).forEach(function (element) {
      if (element.checked) {
        element.checked = false;
      }
    });
  };

  var setInitialStateOfPage = function () {

    // Вызывается один раз после загрузки страницы

    addressInput.value = mainPin.offsetLeft + ', ' + mainPin.offsetTop;

    window.popup.createPopup(successWindowTemplate, main);
    window.createErrorPopup();

    formFieldsDisableStatusSwitching(submitFormFields, true);
    formFieldsDisableStatusSwitching(mapFilters, true);
  };

  window.setInactiveStateOfPage = function () {

    // Вызывается после успешной отправки формы или нажатия reset

    var succesMessage = document.querySelector('.success');

    mainPin.style.left = Pin.startCoordX + 'px';
    mainPin.style.top = Pin.startCoordY + 'px';

    window.removeAnnoucements();

    resetFormState();

    window.popup.showPopup(succesMessage);
  };

  var setActiveStateOfPage = function () {
    map.classList.remove('map--faded');
    submitForm.classList.remove('ad-form--disabled');

    formFieldsDisableStatusSwitching(submitFormFields);
    formFieldsDisableStatusSwitching(mapFilters);
    formFieldsDisableStatusSwitching(features);
  };

  // 8. Компонентный подход - Личный проект: подробности. Часть 2

  var onPinClickShowPopup = function (evt) { // Вешается на строке 69
    evt.preventDefault();

    if (evt.target.parentElement.type === 'button') {
      window.showAnnouncementPopup(evt.target.parentElement.offsetLeft); // Создается в модуле showFilteredPins
      evt.target.parentElement.classList.add('map__pin--active');
    }

  };

  var onPinMouseDownActivatePage = function (evt) {
    evt.preventDefault();

    if (!pageIsActive) {
      setActiveStateOfPage();

      pageIsActive = true;
    }

    if (!announcementsIsCreated) {
      window.data.load(window.onSuccesDataLoadCreatePins, window.onLoadErrorShowPopup);
      window.createAnnouncementPopup(); // Всплывающее окно объявления создается один раз

      announcementsIsCreated = true;
    }

    mainPin.addEventListener('mousemove', onPinMoveSetAddressValue);
    mainPin.addEventListener('mouseup', onPinMouseUpSetCoords);
    map.addEventListener('click', onPinClickShowPopup);
  };

  var onPinMoveSetAddressValue = function (evt) {
    evt.preventDefault();

    setAddressInputValue(mainPin.offsetLeft, mainPin.offsetTop, Pin.width);
  };

  var onPinMouseUpSetCoords = function (evt) {
    evt.preventDefault();

    setAddressInputValue(mainPin.offsetLeft, mainPin.offsetTop, Pin.width);
    mainPin.removeEventListener('mousemove', onPinMoveSetAddressValue);
    mainPin.removeEventListener('mouseup', onPinMouseUpSetCoords);
  };

  setInitialStateOfPage();

  mainPin.addEventListener('mousedown', onPinMouseDownActivatePage);
})();
