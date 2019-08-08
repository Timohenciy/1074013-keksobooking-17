'use strict';

(function () {
  var GET_ADDRESS = 'https://js.dump.academy/keksobooking/data';
  var POST_ADDRESS = 'https://js.dump.academy/keksobooking';
  var SUCCESS_CODE = 200;

  var createXHRObject = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    return xhr;
  };

  var loadData = function (onLoad, onError) {
    var xhr = createXHRObject(onLoad, onError);

    xhr.open('GET', GET_ADDRESS);
    xhr.send();
  };

  var saveData = function (data, onLoad, onError) {
    var xhr = createXHRObject(onLoad, onError);

    xhr.open('POST', POST_ADDRESS);
    xhr.send(data);
  };

  window.data = {
    load: loadData,
    save: saveData
  };
})();
