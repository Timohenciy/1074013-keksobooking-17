'use strict';

(function () {
  var form = document.querySelector('.ad-form');

  var priceForNight = form.querySelector('#price');

  var houseType = form.querySelector('#type');
  var bungalo = houseType.querySelector('[value = "bungalo"]');
  var flat = houseType.querySelector('[value = "flat"]');
  var house = houseType.querySelector('[value = "house"]');
  var palace = houseType.querySelector('[value = "palace"]');

  var timeIn = form.querySelector('#timein');
  var timeInTwelve = timeIn.querySelector('[value = "12:00"]');
  var timeInThirteen = timeIn.querySelector('[value = "13:00"]');
  var timeInFourteen = timeIn.querySelector('[value = "14:00"]');

  var timeOut = form.querySelector('#timeout');
  var timeOutTwelve = timeOut.querySelector('[value = "12:00"]');
  var timeOutThirteen = timeOut.querySelector('[value = "13:00"]');
  var timeOutFourteen = timeOut.querySelector('[value = "14:00"]');

  var onTypeChange = function (evt) {
    evt.preventDefault();

    if (bungalo.selected) {
      priceForNight.min = '0';
      priceForNight.placeholder = '0';
    } else if (flat.selected) {
      priceForNight.min = '1000';
      priceForNight.placeholder = '1000';
    } else if (house.selected) {
      priceForNight.min = '5000';
      priceForNight.placeholder = '5000';
    } else if (palace.selected) {
      priceForNight.min = '10000';
      priceForNight.placeholder = '10000';
    }
  };

  var onTimeInChange = function (evt) {
    evt.preventDefault();

    if (timeInTwelve.selected) {
      timeOutTwelve.selected = true;
    } else if (timeInThirteen.selected) {
      timeOutThirteen.selected = true;
    } else if (timeInFourteen.selected) {
      timeOutFourteen.selected = true;
    }
  };

  var onTimeOutChange = function (evt) {
    evt.preventDefault();

    if (timeOutTwelve.selected) {
      timeInTwelve.selected = true;
    } else if (timeOutThirteen.selected) {
      timeInThirteen.selected = true;
    } else if (timeOutFourteen.selected) {
      timeInFourteen.selected = true;
    }
  };

  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);
  houseType.addEventListener('change', onTypeChange);
})();
