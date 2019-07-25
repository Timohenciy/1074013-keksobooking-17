'use strict';

(function () {
  var announcementsData = '';
  var MAX_PINS_TO_SHOW = 5;

  var houseType = document.querySelector('#housing-type');
  var mapPins = document.querySelector('.map__pins');

  window.onSuccesDataLoadCreatePins = function (data) {
    announcementsData = data;

    updateAnnouncements();
  };

  var updateAnnouncements = function () {
    var filteredData = announcementsData.filter(function (element) {
      return element.offer.type === houseType.value;
    }).slice(0, MAX_PINS_TO_SHOW);

    window.renderPins(filteredData);

    window.showAnnouncementPopup = function (locationToCampare) {

      // Функция колбэк, вызывается при клике по пину на карте,
      // параметром принимает данные объекта - location, для поиска в массиве filteredData похожих данных,
      // если все ок, то показывает popup. Используется в модуле 'main'

      var adToShow = filteredData.find(function (element) {
        return element.location.x === locationToCampare;
      });

      if (adToShow) {
        window.showPopup(adToShow);
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
})();
