'use strict';

(function () {
  var announcementsData = '';
  var houseType = document.querySelector('#housing-type');

  var mapPins = document.querySelector('.map__pins');

  window.onSuccesDataLoadCreatePins = function (data) {
    announcementsData = data;

    updateAnnouncements();
  };

  var updateAnnouncements = function () {
    var filteredData = announcementsData.filter(function (element) {
      return element.offer.type === houseType.value;
    }).slice(0, 5);

    window.createPins(filteredData);
  };

  var removeOldAnnoucements = function () {
    var pinsCollection = mapPins.querySelectorAll('[type = "button"]');
    Array.from(pinsCollection).forEach(function (element) {
      element.remove();
    });
  };

  var onHouseTypeChange = function () {
    removeOldAnnoucements();
    updateAnnouncements();
  };

  houseType.addEventListener('change', onHouseTypeChange);
})();
