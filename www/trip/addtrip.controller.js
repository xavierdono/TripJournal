(function () {
  'use strict';

  angular.module('starter.addtrip', [])

  .controller('AddTripCtrl', function ($scope, TripService, $cordovaDevice, $cordovaFile, $ionicPlatform, $ionicActionSheet, ImageService, FileService) {

    $scope.images = FileService.images();

    $scope.urlForImage = function (imageName) {
      var trueOrigin = cordova.file.dataDirectory + imageName;
      return trueOrigin;
    }

    $scope.addMedia = function () {
      $scope.hideSheet = $ionicActionSheet.show({
          buttons: [{
              text: 'Prendre une photo'
            }, {
              text: 'Photos sur le téléphone'
            }
          ],
          titleText: 'Ajouter une photo',
          cancelText: 'Annuler',
          buttonClicked: function (index) {
            $scope.addImage(index);
          }
        });
    }

    $scope.addImage = function (type) {
      $scope.hideSheet();
      ImageService.handleMediaDialog(type).then(function () {
        $scope.$apply();
      });
    }

    $scope.items = TripService.all();

    $scope.options = {
      loop: true,
      effect: 'fade',
      speed: 500,
    };
  });
})();
