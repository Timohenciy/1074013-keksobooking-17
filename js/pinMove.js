'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

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

      window.newCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      var permissionHeight = {
        min: 130,
        max: 630
      };

      if (window.newCoords.y < permissionHeight.min) {
        window.newCoords.y = 130;
      } else if (window.newCoords.y > permissionHeight.max) {
        window.newCoords.y = 630;
      }

      mainPin.style.left = window.newCoords.x + 'px';
      mainPin.style.top = window.newCoords.y + 'px';
    };

    var onMouseUpStopDrag = function (evtUp) {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', onMouseMoveDragPin);
    };

    document.addEventListener('mousemove', onMouseMoveDragPin);
    document.addEventListener('mouseup', onMouseUpStopDrag);
  };

  mainPin.addEventListener('mousedown', onMouseDownStartDrag);
})();
