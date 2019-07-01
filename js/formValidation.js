'use strict';

(function () {
  var form = document.querySelector('.ad-form');

  var priceForNight = form.querySelector('#price');

  var houseType = form.querySelector('#type');

  var houseTypeMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var timeIn = form.querySelector('#timein');

  var timeOut = form.querySelector('#timeout');

  var onTypeChange = function (evt) {

    priceForNight.min = houseTypeMap[evt.target.value];
    priceForNight.placeholder = houseTypeMap[evt.target.value];

  };

  var onTimeChange = function (variableField, target) {
    variableField.selectedIndex = target.selectedIndex;
  };

  timeIn.addEventListener('change', function (evt) {
    onTimeChange(timeOut, evt.target);
  });
  timeOut.addEventListener('change', function (evt) {
    onTimeChange(timeIn, evt.target);
  });
  houseType.addEventListener('change', onTypeChange);
})();
