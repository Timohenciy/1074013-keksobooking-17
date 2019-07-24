'use strict';

(function () {
  var featuresClasses = {
    'wifi': 'popup__feature--wifi',
    'dishwasher': 'popup__feature--dishwasher',
    'parking': 'popup__feature--parking',
    'washer': 'popup__feature--washer',
    'elevator': 'popup__feature--elevator',
    'conditioner': 'popup__feature--conditioner'
  };

  var houseTypeOptions = {
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

    // Я решил в функцию первым параметром передавать контейнер с фотографиями и удалять из него все элементы
    // т.к. в любом случае, если фоток будет больше одной, то нужно будет добавлять дополнительные DOM элементы,
    // а при таком варианте не нужно писать условия проверяющего сколько было передано фоток и нужно ли клонировать элементы
    // функция просто удаляет старые элементы и добавляет новые

    for (var i = 0; i < photosURL.length; i++) {
      var newImage = announcementPopupTemplate.querySelector('.popup__photo').cloneNode(true);
      newImage.src = photosURL[i];
      photosCollection.appendChild(newImage);
    }

    photosElements.appendChild(photosCollection);
  };

  var setFeatures = function (elementToChange, currentFeatures) {
    var featuresVariable = elementToChange.querySelector('.popup__features');
    var featuresCollection = document.createDocumentFragment();

    featuresVariable.innerHTML = '';

    currentFeatures.forEach(function (element) {
      var newFeature = document.createElement('li');
      newFeature.classList.add('popup__feature');
      newFeature.classList.add(featuresClasses[element]);
      featuresCollection.appendChild(newFeature);
    });

    featuresVariable.appendChild(featuresCollection);
  };

  // 8. Компонентный подход - Личный проект: пока все дома. Часть 2
  window.createAnnouncementPopup = function () {
    var newElement = announcementPopupTemplate.cloneNode(true);
    newElement.classList.add('hidden');

    map.insertBefore(newElement, mapFilters);
  };

  var updatePopup = function (dataForUpdate) {
    var popup = document.querySelector('.map__card');

    popup.querySelector('.popup__title').textContent = dataForUpdate.offer.title;
    popup.querySelector('.popup__text--address').textContent = dataForUpdate.offer.address;
    popup.querySelector('.popup__text--price').textContent = dataForUpdate.offer.price + '₽/ночь';
    popup.querySelector('.popup__type').textContent = houseTypeOptions[dataForUpdate.offer.type];
    popup.querySelector('.popup__text--capacity').textContent = dataForUpdate.offer.rooms + ' комнаты(а) для ' + dataForUpdate.offer.guests + ' гостей(я)';
    popup.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataForUpdate.offer.checkin + ', выезд до ' + dataForUpdate.offer.checkout;
    popup.querySelector('.popup__description').textContent = dataForUpdate.offer.description;
    popup.querySelector('.popup__avatar').textContent = dataForUpdate.author.avatar;

    setFeatures(popup, dataForUpdate.offer.features);
    setPhotos(popup, dataForUpdate.offer.photos);
  };

  window.showPopup = function (filteredData) {
    var createdAd = document.querySelector('.map__card');
    var closeButton = createdAd.querySelector('.popup__close');

    updatePopup(filteredData);
    createdAd.classList.remove('hidden');

    var onEscClosePopup = function () {
      createdAd.classList.add('hidden');

      document.removeEventListener('keydown', window.onEscClosePopup);
    };

    var onClickClosePopup = function () {
      createdAd.classList.add('hidden');

      closeButton.removeEventListener('click', onClickClosePopup);
    };

    document.addEventListener('keydown', onEscClosePopup);
    closeButton.addEventListener('click', onClickClosePopup);
  };
})();
