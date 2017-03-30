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

    return {
      getImages: getImages,
      addImage: addImage,
      clearImages: clearImages
    };
  });
})();
