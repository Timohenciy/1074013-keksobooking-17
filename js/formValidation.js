'use strict';

(function () {
  var HouseTypeMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var RoomsMap = {
    '1 комната': 0,
    '2 комнаты': 1,
    '3 комнаты': 2,
    '100 комнат': 3
  };

  var GuestsMap = {
    'Для 3 гостей': 0,
    'Для 2 гостей': 1,
    'Для 1 гостя': 2,
    'Не для гостей': 3
  };

  var form = document.querySelector('.ad-form');
  var submitButton = form.querySelector('.ad-form__submit');
  var resetButton = form.querySelector('.ad-form__reset');

  var address = form.querySelector('#address');

  var priceForNight = form.querySelector('#price');
  var houseType = form.querySelector('#type');

  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

  var guestsCapacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');

  var onTypeChange = function () {
    priceForNight.min = HouseTypeMap[houseType.value];
    priceForNight.placeholder = HouseTypeMap[houseType.value];
  };

  var onTimeChange = function (evt) {
    if (evt.target === timeIn) {
      timeOut.selectedIndex = evt.target.selectedIndex;
    }
    if (evt.target === timeOut) {
      timeIn.selectedIndex = evt.target.selectedIndex;
    }
  };

  var onClickCheckValidity = function () {
    guestsCapacity.setCustomValidity('');

    if (roomNumber.selectedIndex === RoomsMap['1 комната'] && guestsCapacity.selectedIndex !== GuestsMap['Для 1 гостя']) {
      guestsCapacity.setCustomValidity('Выберите другое значение, 1 комната для 1 гостя');
    }
    if (roomNumber.selectedIndex === RoomsMap['2 комнаты'] && guestsCapacity.selectedIndex === GuestsMap['Для 3 гостей'] ||
        roomNumber.selectedIndex === RoomsMap['2 комнаты'] && guestsCapacity.selectedIndex === GuestsMap['Не для гостей']) {

      guestsCapacity.setCustomValidity('Выберите другое значение, 2 комнаты для 1 или 2 гостей');
    }
    if (roomNumber.selectedIndex === RoomsMap['3 комнаты'] && guestsCapacity.selectedIndex === GuestsMap['Не для гостей']) {
      guestsCapacity.setCustomValidity('Выберите другое значение, 3 комнаты для 1, 2 или 3 гостей');
    }
    if (roomNumber.selectedIndex === RoomsMap['100 комнат'] && guestsCapacity.selectedIndex !== GuestsMap['Не для гостей']) {
      guestsCapacity.setCustomValidity('Выберите другое значение, это количество комнат не для гостей');
    }
  };

  var onSubmitSendFormData = function (evt) {
    evt.preventDefault();

    var dataToSend = new FormData(form);
    dataToSend.append('address', address.value);

    window.data.save(dataToSend, window.setInactiveStateOfPage, window.errorPopup.onLoadErrorShowPopup);
  };

  timeIn.addEventListener('change', onTimeChange);
  timeOut.addEventListener('change', onTimeChange);

  houseType.addEventListener('change', onTypeChange);

  submitButton.addEventListener('click', onClickCheckValidity);
  resetButton.addEventListener('click', window.setInactiveStateOfPage);

  form.addEventListener('submit', onSubmitSendFormData);
})();
