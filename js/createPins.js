'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  window.createPins = function (array) {
    var pinsCollection = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      var fragment = pinTemplate.cloneNode(true);
      var fragmentImage = fragment.querySelector('img');

      fragment.style.left = (array[i].location.x - (fragment.clientWidth / 2)) + 'px';
      fragment.style.top = (array[i].location.y - fragment.clientHeight) + 'px';
      fragmentImage.src = array[i].author.avatar;
      fragmentImage.alt = array[i].offer.title;

      pinsCollection.appendChild(fragment);
    }

    mapPins.appendChild(pinsCollection);
  };
})();
