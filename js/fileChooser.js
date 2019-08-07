'use strict';

(function () {
  var POSIBLE_PIC_TYPES = ['jpg', 'gif', 'jpeg', 'png'];
  var adForm = document.querySelector('.ad-form');
  var avatarImage = adForm.querySelector('[alt = "Аватар пользователя"]');
  var houseImage = adForm.querySelector('.ad-form__photo');
  var photoContainer = adForm.querySelector('.ad-form__photo-container');

  var createNewHouseImage = function () {
    var newImage = document.createElement('img');
    newImage.alt = 'Фотография жилья';
    newImage.width = '40';
    newImage.heaight = '44';
    return newImage;
  };

  var onInputChangeDownloadImage = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    if (file) {
      var fileMatch = POSIBLE_PIC_TYPES.some(function (element) {
        return fileName.endsWith(element);
      });

      if (fileMatch) {
        var reader = new FileReader();

        if (evt.target.classList.contains('ad-form-header__input')) {

          reader.addEventListener('load', function () {
            avatarImage.src = reader.result;
          });
        }

        if (evt.target.classList.contains('ad-form__input')) {

          if (!houseImage.children[0]) {
            var createdImage = createNewHouseImage();
            houseImage.appendChild(createdImage);

            reader.addEventListener('load', function () {
              createdImage.src = reader.result;
            });
          } else {
            var newHouseImage = houseImage.cloneNode(true);

            reader.addEventListener('load', function () {
              newHouseImage.children[0].src = reader.result;
            });
            photoContainer.appendChild(newHouseImage);
          }
        }
        reader.readAsDataURL(file);
      }
    }
  };

  adForm.avatar.addEventListener('change', onInputChangeDownloadImage);
  adForm.images.addEventListener('change', onInputChangeDownloadImage);
})();
