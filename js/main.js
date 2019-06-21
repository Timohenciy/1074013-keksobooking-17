'use strict';

var map = document.querySelector('.map');

/* var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); */

var mapPins = document.querySelector('.map__pins');

var submitFormSection = document.querySelector('.notice');
var submitForm = submitFormSection.querySelector('.ad-form');
var submitFormFields = submitFormSection.querySelectorAll('fieldset');

var addressInput = submitFormSection.querySelector('#address');

var mainPin = mapPins.querySelector('.map__pin--main');
var mainPinWidth = mainPin.offsetWidth;
var mainPinHeight = mainPin.offsetHeight;

var mainPinPositionX = mainPin.offsetLeft;
var mainPinPositionY = mainPin.offsetTop;

/* var MAP_WIDTH = map.clientWidth;
var MAP_HEIGHT_MIN = 130;
var MAP_HEIGHT_MAX = 630;

var offerType = [
  'palace',
  'flat',
  'bungalo',
  'house'
]; */

var setAttributeDisable = function (collection, attribute) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].setAttribute(attribute);
  }
};

var removeAttributeDisable = function (collection, attribute) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].removeAttribute(attribute);
  }
};

var setOpeningCoordinates = function (pinX, pinY) {
  addressInput.value = pinX + ', ' + pinY;
  return addressInput.value;
};

var getPinCoordinates = function (pinX, pinY, pinWidth, pinHeight) {
  addressInput.value = (pinX + Math.round(pinWidth / 2)) + ', ' + (pinY - Math.round(pinHeight / 2));
  return addressInput.value;
};

var onMouseUpGetCoordinates = function () {
  getPinCoordinates(mainPinPositionX, mainPinPositionY, mainPinWidth, mainPinHeight);
};

var onClickActivatePage = function () {
  removeAttributeDisable(submitFormFields, 'disabled');
  map.classList.remove('map--faded');
  submitForm.classList.remove('ad-form--disabled');
};

/* var getAvatar = function (quantity) {
  return 'img/avatars/user0' + quantity + '.png';
};

var getRandomValue = function (inputValue) {
  return Math.round(Math.random() * inputValue);
};

var getRandomHeight = function (min, max) {
  return Math.round(min + Math.random() * (max - min));
}; */

/* var getAnnouncement = function (offer, x, yMin, yMax) {
  var NUMBER_OF_ANNOUNCEMENTS = 8;
  var announcements = [];

  for (var i = 1; i < NUMBER_OF_ANNOUNCEMENTS + 1; i++) {
    var announcement = {};

    announcement.author = getAvatar(i);
    announcement.offer = offer[getRandomValue(offer.length - 1)];
    announcement.locationX = getRandomValue(x);
    announcement.locationY = getRandomHeight(yMin, yMax);

    announcements.push(announcement);
  }

  return announcements;
}; */

/* var createTemplate = function (array) {
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
}; */

mainPin.addEventListener('click', function () {
  onClickActivatePage(submitFormFields, 'disabled');
});

mainPin.addEventListener('mouseup', function () {
  onMouseUpGetCoordinates();
});

/* createTemplate(getAnnouncement(offerType, MAP_WIDTH, MAP_HEIGHT_MIN, MAP_HEIGHT_MAX)); */

setOpeningCoordinates(mainPinPositionX, mainPinPositionY);

setAttributeDisable(submitFormFields, 'disabled');

