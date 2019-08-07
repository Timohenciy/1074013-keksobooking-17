'use strict';

(function () {
  var FeaturesClasses = {
    'wifi': 'popup__feature--wifi',
    'dishwasher': 'popup__feature--dishwasher',
    'parking': 'popup__feature--parking',
    'washer': 'popup__feature--washer',
    'elevator': 'popup__feature--elevator',
    'conditioner': 'popup__feature--conditioner'
  };

  var HouseTypeOptions = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters-container');

  var announcementPopupTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var setPhotos = function (elementToChange, photosURL) {
    var photosElements = elementToChange.querySelector('.popup__photos');
    var photosCollection = document.createDocumentFragment();

    photosElements.innerHTML = '';

    Array.from(photosURL).forEach(function (element) {
      var newImage = announcementPopupTemplate.querySelector('.popup__photo').cloneNode(true);
      newImage.src = element;
      photosCollection.appendChild(newImage);
    });

    photosElements.appendChild(photosCollection);
  };

  var setFeatures = function (elementToChange, currentFeatures) {
    var featuresVariable = elementToChange.querySelector('.popup__features');
    var featuresCollection = document.createDocumentFragment();

    featuresVariable.innerHTML = '';

    currentFeatures.forEach(function (element) {
      var newFeature = document.createElement('li');
      newFeature.classList.add('popup__feature');
      newFeature.classList.add(FeaturesClasses[element]);
      featuresCollection.appendChild(newFeature);
    });

    featuresVariable.appendChild(featuresCollection);
  };

  var updatePopup = function (dataForUpdate) {
    var popup = document.querySelector('.map__card');

    popup.querySelector('.popup__title').textContent = dataForUpdate.offer.title;
    popup.querySelector('.popup__text--address').textContent = dataForUpdate.offer.address;
    popup.querySelector('.popup__text--price').textContent = dataForUpdate.offer.price + '₽/ночь';
    popup.querySelector('.popup__type').textContent = HouseTypeOptions[dataForUpdate.offer.type];
    popup.querySelector('.popup__text--capacity').textContent = dataForUpdate.offer.rooms + ' комнаты(а) для ' + dataForUpdate.offer.guests + ' гостей(я)';
    popup.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataForUpdate.offer.checkin + ', выезд до ' + dataForUpdate.offer.checkout;
    popup.querySelector('.popup__description').textContent = dataForUpdate.offer.description;
    popup.querySelector('.popup__avatar').textContent = dataForUpdate.author.avatar;

    setFeatures(popup, dataForUpdate.offer.features);
    setPhotos(popup, dataForUpdate.offer.photos);
  };

  window.announcementPopup = {
    createAnnouncementPopup: function () {
      var newElement = announcementPopupTemplate.cloneNode(true);
      newElement.classList.add('hidden');

      map.insertBefore(newElement, mapFilters);
    },
    showAdPopup: function (filteredData) {
      var adPopup = document.querySelector('.map__card');
      var closeButton = adPopup.querySelector('.popup__close');

      updatePopup(filteredData);
      adPopup.classList.remove('hidden');

      var onEscClosePopup = function (evt) {
        if (evt.keyCode === window.ESC_BUTTON) {
          adPopup.classList.add('hidden');
        }
        document.removeEventListener('keydown', window.onEscClosePopup);
      };

      var onClickClosePopup = function () {
        adPopup.classList.add('hidden');

        closeButton.removeEventListener('click', onClickClosePopup);
      };

      document.addEventListener('keydown', onEscClosePopup);
      closeButton.addEventListener('click', onClickClosePopup);
    }
  };
})();
