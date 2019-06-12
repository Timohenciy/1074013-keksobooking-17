'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var mapPins = document.querySelector('.map__pins');

var MAP_WIDTH = map.clientWidth;
var MAP_HEIGHT_MIN = 130;
var MAP_HEIGHT_MAX = 630;

var offerType = [
  'palace',
  'flat',
  'bungalo',
  'house'
];

var getAvatar = function (quantity) {
  var avatar = 'img/avatars/user0' + quantity + '.png';
  return avatar;
};

var getRandomValue = function (inputValue) {
  var outputValue = Math.round(Math.random() * inputValue);
  return outputValue;
};

var getRandomHeight = function (min, max) {
  var outputValue = Math.round(min + Math.random() * (max - min));
  return outputValue;
};

var getAnnouncement = function (offer, x, yMin, yMax) {
  var NUMBER_OF_ANNOUNCEMENTS = 8;
  var announcements = [];

  for (var i = 0; i < NUMBER_OF_ANNOUNCEMENTS; i++) {
    var announcement = {};
    announcement.author = getAvatar(i);
    announcement.offer = offer[getRandomValue(offer.length - 1)];
    announcement.locationX = getRandomValue(x);
    announcement.locationY = getRandomHeight(yMin, yMax);
    announcements.push(announcement);
  }

  return announcements;
};

var createTemplate = function (array) {
  var pinsTemplates = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    var fragment = pinTemplate.cloneNode(true);
    fragment.style.left = (array[i].locationX - (fragment.clientWidth / 2)) + 'px';
    fragment.style.top = (array[i].locationY - fragment.clientHeight) + 'px';
    fragment.children[0].src = array[i].author;
    pinsTemplates.appendChild(fragment);
  }

  mapPins.appendChild(pinsTemplates);
};

createTemplate(getAnnouncement(offerType, MAP_WIDTH, MAP_HEIGHT_MIN, MAP_HEIGHT_MAX));
