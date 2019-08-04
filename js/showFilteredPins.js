'use strict';

(function () {
  var announcementsData = '';
  var MAX_PINS_TO_SHOW = 5;
  var timeoutDelay = 500;
  var updateTimer = 0;

  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersSelects = mapFilters.querySelectorAll('.map__filter');
  var mapFiltersCheckboxes = mapFilters.querySelectorAll('.map__checkbox');

  var mapPins = document.querySelector('.map__pins');

  var functionsForMapFilters = {
    'housing-type': {
      'palace': function (element) {
        return element.offer.type === 'palace';
      },
      'flat': function (element) {
        return element.offer.type === 'flat';
      },
      'house': function (element) {
        return element.offer.type === 'house';
      },
      'bungalo': function (element) {
        return element.offer.type === 'bungalo';
      }
    },
    'housing-price': {
      'low': function (element) {
        return element.offer.price <= 10000;
      },
      'middle': function (element) {
        return element.offer.price > 10000 && element.offer.price <= 50000;
      },
      'high': function (element) {
        return element.offer.price > 50000;
      }
    },
    'housing-rooms': {
      '1': function (element) {
        return element.offer.rooms === 1;
      },
      '2': function (element) {
        return element.offer.rooms === 2;
      },
      '3': function (element) {
        return element.offer.rooms === 3;
      }
    },
    'housing-guests': {
      '0': function (element) {
        return element.offer.guests === 0;
      },
      '1': function (element) {
        return element.offer.guests === 1;
      },
      '2': function (element) {
        return element.offer.guests === 2;
      }
    }
  };

  var debounce = function (func, timeout) {
    if (updateTimer) {
      clearTimeout(updateTimer);
    }
    updateTimer = setTimeout(func, timeout);
  };

  window.onSuccesDataLoadCreatePins = function (data) {
    announcementsData = data;

    window.showAnnouncementPopup = function (locationToCampare) {

      // Функция колбэк, вызывается при клике по пину на карте,
      // параметром принимает данные объекта - location, для поиска в массиве похожих данных,
      // если все ок, то показывает popup. Используется в модуле 'main'

      var announcementToShow = announcementsData.find(function (element) {
        return element.location.x === locationToCampare;
      });

      if (announcementToShow) {
        window.showAdPopup(announcementToShow);
      }
    };

    window.renderPins(announcementsData);
  };

  var onCheckboxClickUpdate = function (evt) {
    if (!evt.target.control.checked) {
      evt.target.control.setAttribute('checked', '');
    } else {
      evt.target.control.removeAttribute('checked');
    }
    window.removeAnnoucements();
    debounce(updateAnnouncements, timeoutDelay);
  };

  var onMapFilterChangeUpdatePins = function () {

    window.removeAnnoucements();
    debounce(updateAnnouncements, timeoutDelay);
  };

  window.removeAnnoucements = function () {

    var pinsCollection = mapPins.querySelectorAll('[type = "button"]');
    Array.from(pinsCollection).forEach(function (element) {
      element.remove();
    });
  };

  var updateAnnouncements = function () {

    var filteredData = getFilteredData(announcementsData);

    window.renderPins(filteredData.slice(0, MAX_PINS_TO_SHOW));
  };

  var getFilteredData = function (announcements) {
    var filteredData = announcements;

    Array.from(mapFiltersSelects).forEach(function (element) {
      if (element.value !== 'any') {

        filteredData = filteredData.filter(functionsForMapFilters[element.name][element.value]);

      }
    });

    Array.from(mapFiltersCheckboxes).forEach(function (element) {
      if (element.checked) {
        filteredData = filteredData.filter(function (elem) {
          return elem.offer.features.includes(element.value);
        });
      }
    });

    return filteredData;
  };

  mapFilters['housing-type'].addEventListener('change', onMapFilterChangeUpdatePins);
  mapFilters['housing-price'].addEventListener('change', onMapFilterChangeUpdatePins);
  mapFilters['housing-rooms'].addEventListener('change', onMapFilterChangeUpdatePins);
  mapFilters['housing-guests'].addEventListener('change', onMapFilterChangeUpdatePins);

  mapFilters['housing-features'].addEventListener('click', onCheckboxClickUpdate);

})();
