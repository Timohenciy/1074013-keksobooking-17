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
    this.Element.photos.innerHTML = '';

    for (var i = 0; i < photosURL.length; i++) {
      var newImage = announcementPopupTemplate.querySelector('.popup__photo').cloneNode(true);
      newImage.src = photosURL[i];
      photosCollection.appendChild(newImage);
    }
    return photosCollection;
  };

  Announcement.prototype.setFeatures = function (currentFeatures) {
    this.Element.features.innerHTML = '';
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

    this.Element = {
      title: this.newElement.querySelector('.popup__title'),
      address: this.newElement.querySelector('.popup__text--address'),
      price: this.newElement.querySelector('.popup__text--price'),
      houseType: this.newElement.querySelector('.popup__type'),
      guestsCapacity: this.newElement.querySelector('.popup__text--capacity'),
      checkingTime: this.newElement.querySelector('.popup__text--time'),
      features: this.newElement.querySelector('.popup__features'),
      description: this.newElement.querySelector('.popup__description'),
      photos: this.newElement.querySelector('.popup__photos'),
      avatar: this.newElement.querySelector('.popup__avatar')
    };

    this.Element.title.textContent = this.adData.offer.title;
    this.Element.address.textContent = this.adData.offer.address;
    this.Element.price.textContent = this.adData.offer.price + '₽/ночь';
    this.Element.houseType.textContent = houseTypeOptions[this.adData.offer.type];
    this.Element.guestsCapacity.textContent = this.adData.offer.rooms + ' комнаты(а) для ' + this.adData.offer.guests + ' гостей(я)';
    this.Element.checkingTime.textContent = 'Заезд после ' + this.adData.offer.checkin + ', выезд до ' + this.adData.offer.checkout;
    this.Element.description.textContent = this.adData.offer.description;
    this.Element.avatar.textContent = this.adData.author.avatar;

    this.Element.features.appendChild(this.setFeatures(this.adData.offer.features));
    this.Element.photos.appendChild(this.setPhotos(this.adData.offer.photos));
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
