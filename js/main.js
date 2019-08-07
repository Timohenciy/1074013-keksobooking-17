'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters');

  var submitForm = document.querySelector('.ad-form');
  var submitFormFields = submitForm.querySelectorAll('fieldset');
  var features = submitForm.querySelectorAll('.feature__checkbox');

  var mainPin = document.querySelector('.map__pin--main');

  var Pin = {
    startCoordX: mainPin.offsetLeft,
    startCoordY: mainPin.offsetTop,
    height: mainPin.offsetHeight,
    width: mainPin.offsetWidth
  };

  var Form = {
    // Первоначальные значения полей формы
    houseType: submitForm.type.selectedIndex,
    timeIn: submitForm.timein.selectedIndex,
    timeOut: submitForm.timeout.selectedIndex,
    rooms: submitForm.rooms.selectedIndex,
    capacity: submitForm.capacity.selectedIndex
  };

  var announcementsIsCreated = false;
  var pageIsActive = false;

  var formFieldsDisableStatusSwitching = function (collection, disable) {

    Array.from(collection).forEach(function (element) {
      if (disable) {
        element.setAttribute('disabled', '');
      } else {
        element.removeAttribute('disabled');
      }
    });
  };

  var setAddressInputValue = function (pinX, pinY, pinWidth) {
    submitForm.address.value = (pinX + Math.round(pinWidth / 2)) + ', ' + pinY;
  };

  var resetFormState = function () {

    submitForm.classList.add('ad-form--disabled');

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

    formFieldsDisableStatusSwitching(submitFormFields, true);
  };

  var resetMapState = function () {

    map.classList.add('map--faded');

    mainPin.style.left = Pin.startCoordX + 'px';
    mainPin.style.top = Pin.startCoordY + 'px';

    window.showFilteredPins.removeAnnouncements();

    formFieldsDisableStatusSwitching(mapFilters, true);
  };

  var setInitialStateOfPage = function () {

    submitForm.address.value = mainPin.offsetLeft + ', ' + mainPin.offsetTop;

    window.successPopup.createSuccessPopup();
    window.errorPopup.createErrorPopup();

    formFieldsDisableStatusSwitching(submitFormFields, true);
    formFieldsDisableStatusSwitching(mapFilters, true);
  };

  window.setInactiveStateOfPage = function () {

    announcementsIsCreated = false;
    pageIsActive = false;

    resetFormState();
    resetMapState();

    window.successPopup.showSuccessPopup();
  };

  var setActiveStateOfPage = function () {
    map.classList.remove('map--faded');
    submitForm.classList.remove('ad-form--disabled');

    formFieldsDisableStatusSwitching(submitFormFields);
    formFieldsDisableStatusSwitching(mapFilters);
    formFieldsDisableStatusSwitching(features);
  };

  var onPinClickShowPopup = function (evt) {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }

    if (evt.target.parentElement.type === 'button') {

      window.showAnnouncementPopup(evt.target.parentElement.offsetLeft);
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
      window.data.load(window.showFilteredPins.onSuccesDataLoadCreatePins, window.errorPopup.onLoadErrorShowPopup);
      window.announcementPopup.createAnnouncementPopup(); // Всплывающее окно объявления создается один раз

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
