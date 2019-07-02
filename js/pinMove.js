'use strict';

(function () {
  var map = document.querySelector('.map');
  var pin = map.querySelector('.map__pin--main');

  var onPinMouseDown = function (evtDown) {
    evtDown.preventDefault();

    var startingCoords = {
      x: evtDown.clientX,
      y: evtDown.clientY
    };

    var onPinMouseMove = function (evtMove) {
      evtMove.preventDefault();

      var shift = {
        x: startingCoords.x - evtMove.clientX,
        y: startingCoords.y - evtMove.clientY
      };

      startingCoords = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      var newCoords = {
        x: pin.offsetLeft - shift.x,
        y: pin.offsetTop - shift.y
      };

      var permissionHeight = {
        min: 130,
        max: 630
      };

      if (newCoords.y < permissionHeight.min) {
        newCoords.y = 130;
      } else if (newCoords.y > permissionHeight.max) {
        newCoords.y = 630;
      }

      pin.style.left = newCoords.x + 'px';
      pin.style.top = newCoords.y + 'px';
    };

    var onPinMouseUp = function (evtUp) {
      evtUp.preventDefault();

      pin.removeEventListener('mousemove', onPinMouseMove);
    };

    pin.addEventListener('mousemove', onPinMouseMove);
    pin.addEventListener('mouseup', onPinMouseUp);
  };

  pin.addEventListener('mousedown', onPinMouseDown);
})();
