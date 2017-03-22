(function () {
  'use strict';

  angular.module('starter.services.image', [])

  .factory('ImageService', function ($cordovaCamera, FileService, $q, $cordovaFile) {

    function makeid() {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    function optionsForType(type) {
      var source;
      switch (type) {
      case 0:
        source = Camera.PictureSourceType.CAMERA;
        break;
      case 1:
        source = Camera.PictureSourceType.SAVEDPHOTOALBUM;
        break;
      }
      return {
        destinationType: Camera.DestinationType.NATIVE_URI,
        sourceType: source,
        allowEdit: false,
        quality: 100,
        encodingType: Camera.EncodingType.PNG,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
      };
    }

    function saveMedia(type) {
      return $q(function (resolve, reject) {
        var options = optionsForType(type);

        $cordovaCamera.getPicture(options).then(function (imageUrl) {
          var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
          var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
          var newName = makeid() + name;

          // Fix when PHOTOLIBRARY
          if (name.indexOf('?') != -1) {
            name = name.substr(0, name.lastIndexOf('?'));
            newName = makeid() + name;
          }

          $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
          .then(function (info) {
            FileService.storeImage(newName);
            resolve();
          }, function (e) {
            reject();
          });
        });
      });
    }
    return {
      handleMediaDialog: saveMedia
    };
  });
})();
