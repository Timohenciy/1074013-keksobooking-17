'use strict';

(function () {
  var GET_ADDRESS = 'https://js.dump.academy/keksobooking/data';
  var POST_ADDRESS = 'https://js.dump.academy/keksobooking';
  var SUCCESS_CODE = 200;
  window.data = {
    load: function (onLoad, onError) {
      window.xhr = new XMLHttpRequest();
      window.xhr.responseType = 'json';

      window.xhr.addEventListener('load', function () {
        if (window.xhr.status === SUCCESS_CODE) {
          onLoad(window.xhr.response);
        } else {
          onError();
        }
      });

      window.xhr.open('GET', GET_ADDRESS);
      window.xhr.send();
    },
    save: function (data, onLoad, onError) {
      window.xhr = new XMLHttpRequest();
      window.xhr.responseType = 'json';

      window.xhr.addEventListener('load', function () {
        if (window.xhr.status === SUCCESS_CODE) {
          onLoad();
        } else {
          onError();
        }
      });

      window.xhr.open('POST', POST_ADDRESS);
      window.xhr.send(data);
    }
  };
})();
