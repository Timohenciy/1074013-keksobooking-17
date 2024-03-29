'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  var createPin = function (pin) {
    var fragment = pinTemplate.cloneNode(true);
    var fragmentImage = fragment.querySelector('img');

    fragment.style.left = (pin.location.x - (fragment.clientWidth / 2)) + 'px';
    fragment.style.top = (pin.location.y - fragment.clientHeight) + 'px';
    fragmentImage.src = pin.author.avatar;
    fragmentImage.alt = pin.offer.title;

    return fragment;
  };

  window.renderPins = function (pinsData) {
    var pinsCollection = document.createDocumentFragment();

    pinsData.forEach(function (element) {
      if (element.offer) {
        var newPin = createPin(element);

        pinsCollection.appendChild(newPin);
      }
    });

    mapPins.appendChild(pinsCollection);
  };

})();
