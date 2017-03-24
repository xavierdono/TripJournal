(function () {
  'use strict';

  angular.module('starter.editday', [])

  .controller('EditDayCtrl', function ($scope, $stateParams, FileService, TripService) {
    $scope.tripId = $stateParams.tripId;
    $scope.dayId = $stateParams.dayId;

    $scope.images = FileService.images();

    $scope.trip = TripService.get($scope.tripId);
    $scope.day = TripService.getDay($scope.tripId, $scope.dayId);

    // Fix bug with <label>
    $scope.editDay = function (day) {
      var new_day = {
        id: $scope.dayId,
        title: day.title,
        date: day.date,
        dateShow: day.date.getDate() + '/' + day.date.getMonth() + '/' + day.date.getFullYear(),
        comment: day.comment,
        images: $scope.images
      };

      //TripService.editDay($scope.tripId, new_day);
      window.location.href = '#/tab/trip.show/' + $scope.tripId;
    }

    $scope.urlForImage = function (imageName) {
      // Charger les images par voyage ($scope.tripId)
      var trueOrigin = cordova.file.dataDirectory + '/' + $scope.tripId + '/' + imageName;
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
      // Sauvegarder les images par voyage ($scope.tripId)
      ImageService.handleMediaDialog(type, $scope.tripId);
    }

  });
})();
