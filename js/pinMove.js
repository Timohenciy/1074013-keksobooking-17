'use strict';

(function () {
  var MIN_HEIGHT = 130;
  var MAX_HEIGHT = 630;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var getElementCoords = function (element) {
    var elementCoords = element.getBoundingClientRect();

    return {
      top: elementCoords.top + pageYOffset,
      left: elementCoords.left + pageXOffset,
      right: elementCoords.right + pageXOffset,
      width: elementCoords.width,
      height: elementCoords.height
    };
  };

  var onMouseDownStartDrag = function (evtDown) {
    evtDown.preventDefault();

    var pinCoords = getElementCoords(mainPin);
    var mapCoords = getElementCoords(map);

    var shift = {
      x: evtDown.pageX - pinCoords.left,
      y: evtDown.pageY - pinCoords.top
    };

    var onMouseMoveDragPin = function (evtMove) {
      evtMove.preventDefault();

      var newCoords = {
        x: evtMove.pageX - shift.x - mapCoords.left,
        y: evtMove.pageY - shift.y
      };

      if (evtMove.pageY > MAX_HEIGHT) {
        mainPin.style.left = newCoords.x + 'px';
        mainPin.style.top = MAX_HEIGHT - pinCoords.height / 2 + 'px';
      } else if (evtMove.pageY < MIN_HEIGHT) {
        mainPin.style.left = newCoords.x + 'px';
        mainPin.style.top = MIN_HEIGHT - pinCoords.height / 2 + 'px';
      } else if (evtMove.pageX > mapCoords.right) {
        mainPin.style.left = mapCoords.right - mapCoords.left - pinCoords.width / 2 + 'px';
        mainPin.style.top = newCoords.y + 'px';
      } else if (evtMove.pageX < mapCoords.left) {
        mainPin.style.left = mapCoords.left - mapCoords.left - pinCoords.width / 2 + 'px';
        mainPin.style.top = newCoords.y + 'px';
      } else {
        mainPin.style.left = newCoords.x + 'px';
        mainPin.style.top = newCoords.y + 'px';
      }
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
