'use strict';

(function () {
  var PIC_TYPE = ['jpg', 'gif', 'jpeg', 'png'];
  var adForm = document.querySelector('.ad-form');
  var avatarImage = adForm.querySelector('[alt = "Аватар пользователя"]');
  var houseImage = adForm.querySelector('.ad-form__photo');

  /* var setFileChooserImage = function () {

  };
 */
  adForm.avatar.addEventListener('change', function () {
    var avatarFile = adForm.avatar.files[0];
    var avatarFileName = avatarFile.name.toLowerCase();

    if (avatarFile) {
      var matches = PIC_TYPE.some(function (element) {
        return avatarFileName.endsWith(element);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          avatarImage.src = reader.result;
        });
        reader.readAsDataURL(avatarFile);
      }
    }
  });

  var createNewHouseImage = function () {
    var file = adForm.images.files[0];
    var fileName = file.name.toLowerCase();

    if (file) {
      var matches = PIC_TYPE.some(function (element) {
        return fileName.endsWith(element);
      });

      if (matches) {
        var newImage = avatarImage.cloneNode();

        var reader = new FileReader();

        reader.addEventListener('load', function () {
          newImage.src = reader.result;
        });
        reader.readAsDataURL(file);

        newImage.alt = 'Фотография жилья';

        houseImage.appendChild(newImage);
      }
    }
  };

  adForm.images.addEventListener('change', function () {
    if ()
  });
})();
