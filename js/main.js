'use strict';

var map = document.querySelector('.map');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var mapPins = document.querySelector('.map__pins');

var mapFilters = map.querySelectorAll('.map__filter');

var submitFormSection = document.querySelector('.notice');
var submitForm = submitFormSection.querySelector('.ad-form');
var submitFormFields = submitFormSection.querySelectorAll('fieldset');

var addressInput = submitFormSection.querySelector('#address');

var mainPin = mapPins.querySelector('.map__pin--main');

var MAP_WIDTH = map.clientWidth;
var MAP_HEIGHT_MIN = 130;
var MAP_HEIGHT_MAX = 630;

var offerType = [
  'palace',
  'flat',
  'bungalo',
  'house'
];

var disableStatusSwitching = function (collection, isDisabled) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].disabled = isDisabled;
  }
};

var startingInputCoordinates = function (pinX, pinY) {
  addressInput.value = pinX + ', ' + pinY;
};

var onMouseActionGetCoordinates = function (pinX, pinY, pinWidth, pinHeight) {
  addressInput.value = (pinX + Math.round(pinWidth / 2)) + ', ' + (pinY - Math.round(pinHeight));
};

var activatePage = function () {
  disableStatusSwitching(submitFormFields);
  disableStatusSwitching(mapFilters);
  map.classList.remove('map--faded');
  submitForm.classList.remove('ad-form--disabled');
};

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

var onMouseDownCreateTemplate = function (evt) {
  evt.preventDefault();
  createTemplate(getAnnouncement(offerType, MAP_WIDTH, MAP_HEIGHT_MIN, MAP_HEIGHT_MAX));

  mainPin.addEventListener('mousemove', onMouseMoveActivatePage);
  mainPin.addEventListener('mouseup', onMouseUpRemoveListeners);
};

var onMouseMoveActivatePage = function (evt) {
  evt.preventDefault();

  activatePage();
  onMouseActionGetCoordinates(mainPin.offsetLeft, mainPin.offsetTop, mainPin.offsetWidth, mainPin.offsetHeight);
};

var onMouseUpRemoveListeners = function (evt) {
  evt.preventDefault();

  onMouseActionGetCoordinates(mainPin.offsetLeft, mainPin.offsetTop, mainPin.offsetWidth, mainPin.offsetHeight);
  mainPin.removeEventListener('mousemove', onMouseMoveActivatePage);
  mainPin.removeEventListener('mouseup', onMouseUpRemoveListeners);
};

mainPin.addEventListener('mousedown', onMouseDownCreateTemplate);

startingInputCoordinates(mainPin.offsetLeft, mainPin.offsetTop);

disableStatusSwitching(submitFormFields, true);
disableStatusSwitching(mapFilters, true);
