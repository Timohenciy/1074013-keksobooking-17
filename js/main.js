'use strict';

var map = document.querySelector('.map');

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
  return 'img/avatars/user0' + quantity + '.png';
};

var getRandomValue = function (inputValue) {
  return Math.round(Math.random() * inputValue);
};

var getRandomHeight = function (min, max) {
  return Math.round(min + Math.random() * (max - min));
};

var getAnnouncement = function (offer, x, yMin, yMax) {
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
};

var createTemplate = function (array) {
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

/* createTemplate(getAnnouncement(offerType, MAP_WIDTH, MAP_HEIGHT_MIN, MAP_HEIGHT_MAX)); */

var submitFormSection = document.querySelector('.notice');
var submitForm = submitFormSection.querySelector('.ad-form');
var submitFormFields = submitFormSection.querySelectorAll('fieldset');

var mainPin = mapPins.querySelector('.map__pin--main');
var mainPinImage = mainPin.querySelector('img');

var mainPinPositionX = mainPin.style.left.split('').splice(0, 3).join('');
var mainPinPositionY = mainPin.style.top.split('').splice(0, 3).join('');

var addressForm = submitFormSection.querySelector('#address');
addressForm.value = mainPinPositionX + ', ' + mainPinPositionY;

mainPin.addEventListener('click', function () {
  onPinClickRemoveAttribute(submitFormFields);
  submitForm.classList.remove('ad-form--disabled');
});

mainPin.addEventListener('mouseup', function () {
  onPinMouseUp();
});

var onPinMouseUp = function () {
  addressForm.value = (+mainPinPositionX + (+mainPinImage.width / 2)) + ', ' + (+mainPinPositionY - (+mainPinImage.height));
};

var onPinClickRemoveAttribute = function (collection) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].removeAttribute('disabled');
  }

  map.classList.remove('map--faded');
};

for (var i = 0; i < submitFormFields.length; i++) {
  submitFormFields[i].setAttribute('disabled', '');
}
