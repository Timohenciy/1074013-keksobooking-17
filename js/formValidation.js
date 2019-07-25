'use strict';

(function () {
  var houseTypeMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var form = document.querySelector('.ad-form');
  var submitButton = form.querySelector('.ad-form__submit');

  var address = form.querySelector('#address');

  var priceForNight = form.querySelector('#price');
  var houseType = form.querySelector('#type');

  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

  var guestsCapacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');

  var onTypeChange = function (evt) {
    priceForNight.min = houseTypeMap[evt.target.value];
    priceForNight.placeholder = houseTypeMap[evt.target.value];
  };

  var onTimeChange = function (evt) {
    if (evt.target === timeIn) {
      timeOut.selectedIndex = evt.target.selectedIndex;
    }
    if (evt.target === timeOut) {
      timeIn.selectedIndex = evt.target.selectedIndex;
    }
  };

  // 8. Компонентный подход - Личный проект: доверяй, но проверяй. Часть 2

  var onClickCheckValidity = function () {
    guestsCapacity.setCustomValidity('');

    if (roomNumber.selectedIndex === 0 && guestsCapacity.selectedIndex !== 2) {
      guestsCapacity.setCustomValidity('Выберите другое значение, 1 комната для 1 гостя');
    }
    if (roomNumber.selectedIndex === 1 && guestsCapacity.selectedIndex === 0 || roomNumber.selectedIndex === 1 && guestsCapacity.selectedIndex === 3) {
      guestsCapacity.setCustomValidity('Выберите другое значение, 2 комнаты для 1 или 2 гостей');
    }
    if (roomNumber.selectedIndex === 2 && guestsCapacity.selectedIndex === 3) {
      guestsCapacity.setCustomValidity('Выберите другое значение, 3 комнаты для 1, 2 или 3 гостей');
    }
    if (roomNumber.selectedIndex === 3 && guestsCapacity.selectedIndex !== 3) {
      guestsCapacity.setCustomValidity('Выберите другое значение, это количество комнат не для гостей');
    }
  };

  var onSubmitSendFormData = function (evt) {
    evt.preventDefault();
    var dataToSend = new FormData(form);
    dataToSend.append('address', address.value);

    window.data.save(dataToSend, window.setInactiveStateOfPage, window.onErrorLoadShowPopup);
  };

  timeIn.addEventListener('change', onTimeChange);
  timeOut.addEventListener('change', onTimeChange);

  houseType.addEventListener('change', onTypeChange);

  submitButton.addEventListener('click', onClickCheckValidity);

  form.addEventListener('submit', onSubmitSendFormData);
})();
