'use strict';

(function () {

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var permissibleMovementValues = {
    minHeight: 130,
    maxHeight: 630,
    maxWidth: mainPin.offsetParent.clientWidth - mainPin.offsetWidth / 2,
    minWidth: 0 - mainPin.offsetWidth / 2
  };

  var onMouseDownStartDrag = function (evtDown) {
    evtDown.preventDefault();

    var startingCoords = {
      x: evtDown.clientX,
      y: evtDown.clientY
    };

    var onMouseMoveDragPin = function (evtMove) {
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
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (newCoords.y < permissibleMovementValues.minHeight) {
        newCoords.y = permissibleMovementValues.minHeight;
      }

      if (newCoords.y > permissibleMovementValues.maxHeight) {
        newCoords.y = permissibleMovementValues.maxHeight;
      }

      if (newCoords.x < permissibleMovementValues.minWidth) {
        newCoords.x = permissibleMovementValues.minWidth;
      }

      if (newCoords.x > permissibleMovementValues.maxWidth) {
        newCoords.x = permissibleMovementValues.maxWidth;
      }

      mainPin.style.left = newCoords.x + 'px';
      mainPin.style.top = newCoords.y + 'px';
    };

    var onMouseUpStopDrag = function (evtUp) {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', onMouseMoveDragPin);
      document.removeEventListener('mouseup', onMouseUpStopDrag);
    };

    document.addEventListener('mousemove', onMouseMoveDragPin);
    document.addEventListener('mouseup', onMouseUpStopDrag);
  };

  mainPin.addEventListener('mousedown', onMouseDownStartDrag);
})();
