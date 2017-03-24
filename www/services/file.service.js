(function () {
  'use strict';

  angular.module('starter.services.file', [])

  .factory('FileService', function () {
    var images;
    var IMAGE_STORAGE_KEY = 'images';

    function getAllImages() {
      var img = window.localStorage.getItem(IMAGE_STORAGE_KEY);
      if (img) {
        images = JSON.parse(img);
      } else {
        images = [];
      }
      return images;
    }

    function removeImage(img) {
      var removed_image = img.substr(img.lastIndexOf('/') + 1);
      images.splice(images.indexOf(removed_image), 1);
      window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
    }
    
    function addImage(img) {
      images.push(img);
      window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
    }

    return {
      storeImage: addImage,
      images: getAllImages,
      removeImage: removeImage
    };
  });
})();
