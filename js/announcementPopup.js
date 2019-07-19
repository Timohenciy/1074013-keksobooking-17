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

  var Announcement = function (newAdData) {
    this.adData = newAdData;
  };

  Announcement.prototype.setPhotos = function (photosURL) {
    var photosCollection = document.createDocumentFragment();
    this.popupPhotos.innerHTML = '';

    for (var i = 0; i < photosURL.length; i++) {
      var newImage = announcementPopupTemplate.querySelector('.popup__photo').cloneNode(true);
      newImage.src = photosURL[i];
      photosCollection.appendChild(newImage);
    }
    return photosCollection;
  };

  Announcement.prototype.setFeatures = function (currentFeatures) {
    this.popupFeatures.innerHTML = '';
    var featuresCollection = document.createDocumentFragment();

    currentFeatures.forEach(function (element) {
      var newFeature = document.createElement('li');

      newFeature.classList.add('popup__feature');
      newFeature.classList.add(featuresClasses[element]);
      featuresCollection.appendChild(newFeature);
    });

    return featuresCollection;
  };

  Announcement.prototype.createNewAd = function () {
    this.newElement = announcementPopupTemplate.cloneNode(true);

    this.popupPhotos = this.newElement.querySelector('.popup__photos');
    this.popupFeatures = this.newElement.querySelector('.popup__features');
    this.popupWifi = this.popupFeatures.querySelector('.popup__feature--wifi');

    this.newElement.querySelector('.popup__title').textContent = this.adData.offer.title;
    this.newElement.querySelector('.popup__text--address').textContent = this.adData.offer.Address;
    this.newElement.querySelector('.popup__text--price').textContent = this.adData.offer.price + '₽/ночь';
    this.newElement.querySelector('.popup__type').textContent = houseTypeOptions[this.adData.offer.type];
    this.newElement.querySelector('.popup__text--capacity').textContent = this.adData.offer.rooms + ' комнаты(а) для ' + this.adData.offer.guests + ' гостей(я)';
    this.newElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + this.adData.offer.checkin + ', выезд до ' + this.adData.offer.checkout;
    this.popupFeatures.appendChild(this.setFeatures(this.adData.offer.features));
    this.newElement.querySelector('.popup__description').textContent = this.adData.offer.description;
    this.popupPhotos.appendChild(this.setPhotos(this.adData.offer.photos));
    this.newElement.querySelector('.popup__avatar').textContent = this.adData.author.avatar;
  };

  Announcement.prototype.renderNewAd = function () {
    map.insertBefore(this.newElement, mapFilters);
  };

  window.createAnnouncement = function (data) {
    var newAd = new Announcement(data[0]);
    newAd.createNewAd();
    newAd.renderNewAd();
  };

})();
