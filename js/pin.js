'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  var getAvatar = function (quantity) {
    return 'img/avatars/user0' + quantity + '.png';
  };

  var getRandomHeight = function (min, max) {
    return Math.round(min + Math.random() * (max - min));
  };

  window.getAnnouncement = function (offer, x, yMin, yMax) {
    var NUMBER_OF_ANNOUNCEMENTS = 8;
    var announcements = [];

    for (var i = 1; i < NUMBER_OF_ANNOUNCEMENTS + 1; i++) {
      var announcement = {};

      announcement.author = getAvatar(i);
      announcement.offer = offer[window.getRandomValue(offer.length - 1)];
      announcement.locationX = window.getRandomValue(x);
      announcement.locationY = getRandomHeight(yMin, yMax);

      announcements.push(announcement);
    }

    return announcements;
  };

  window.createTemplate = function (array) {
    var pinsTemplates = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      var fragment = pinTemplate.cloneNode(true);
      var fragmentImage = fragment.querySelector('img');

      fragment.style.left = (array[i].locationX - (fragment.clientWidth / 2)) + 'px';
      fragment.style.top = (array[i].locationY - fragment.clientHeight) + 'px';
      fragmentImage.src = array[i].author;
      fragmentImage.alt = 'Заголовок объявления';

      pinsTemplates.appendChild(fragment);
    }

    mapPins.appendChild(pinsTemplates);
  };
})();
