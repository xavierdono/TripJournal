(function () {
  'use strict';

  angular.module('starter.services.file', [])

  .factory('FileService', function () {
    var images = [];

    function clearImages() {
      images = [];
    }
    
    function getImages() {
      return images;
    }
    
    function addImage(img) {
      images.push(img);
    }
    
    function removeImage(img) {
      var removed_image = img.substr(img.lastIndexOf('/') + 1);
      images.splice(images.indexOf(removed_image), 1);
    }    

    return {
      getImages: getImages,
      addImage: addImage,
      clearImages: clearImages,
      removeImage: removeImage
    };
  });
})();
