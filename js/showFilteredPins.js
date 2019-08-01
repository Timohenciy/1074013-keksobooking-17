'use strict';

(function () {
  var announcementsData = '';
  var MAX_PINS_TO_SHOW = 5;

  var houseType = document.querySelector('#housing-type');
  var housePrice = document.querySelector('#housing-price');
  var houseRooms = document.querySelector('#housing-rooms');
  var houseGuests = document.querySelector('#housing-guests');

  var wifi = document.querySelector('#filter-wifi');

  var mapPins = document.querySelector('.map__pins');

  var priceMap = {
    'low': function (element) {
      return element.offer.price <= 10000;
    },
    'middle': function (element) {
      return element.offer.price > 10000 && element.offer.price <= 50000;
    },
    'high': function (element) {
      return element.offer.price > 50000;
    }
  };

  var roomsMap = {
    '1': function (element) {
      return element.offer.rooms === 1;
    },
    '2': function (element) {
      return element.offer.rooms === 2;
    },
    '3': function (element) {
      return element.offer.rooms === 3;
    }
  };

  var guestsMap = {
    '0': function (element) {
      return element.offer.guests === 0;
    },
    '1': function (element) {
      return element.offer.guests === 1;
    },
    '2': function (element) {
      return element.offer.guests === 2;
    }
  };

  window.onSuccesDataLoadCreatePins = function (data) {
    announcementsData = data;
    console.log(data);

    window.renderPins(announcementsData);
  };

  var getFilteredData = function (announcements) {
    var filteredData;

    if (houseType.value !== 'any') {
      filteredData = announcements.filter(function (element) {
        return element.offer.type === houseType.value;
      });
    }
    if (housePrice.value !== 'any') {
      filteredData = filteredData.filter(priceMap[housePrice.value]);
    }
    if (houseRooms.value !== 'any') {
      filteredData = filteredData.filter(roomsMap[houseRooms.value]);
    }
    if (houseGuests.value !== 'any') {
      filteredData = filteredData.filter(guestsMap[houseGuests.value]);
    }
    return filteredData;
  };

  var updateAnnouncements = function () {

    var filteredData = getFilteredData(announcementsData);

    window.renderPins(filteredData.slice(0, MAX_PINS_TO_SHOW));

    window.showAnnouncementPopup = function (locationToCampare) {

      // Функция колбэк, вызывается при клике по пину на карте,
      // параметром принимает данные объекта - location, для поиска в массиве filteredData похожих данных,
      // если все ок, то показывает popup. Используется в модуле 'main'

      var announcementToShow = filteredData.find(function (element) {
        return element.location.x === locationToCampare;
      });

      if (announcementToShow) {
        window.showAdPopup(announcementToShow);
      }
    };

  };

  window.removeAnnoucements = function () {

    var pinsCollection = mapPins.querySelectorAll('[type = "button"]');
    Array.from(pinsCollection).forEach(function (element) {
      element.remove();
    });

  };

  var onHouseTypeChange = function () {

    window.removeAnnoucements();
    updateAnnouncements();

  };

  houseType.addEventListener('change', onHouseTypeChange);
  housePrice.addEventListener('change', onHouseTypeChange);
  houseRooms.addEventListener('change', onHouseTypeChange);
  houseGuests.addEventListener('change', onHouseTypeChange);

  wifi.addEventListener('change', function () {
    console.log('test');
  });

})();
