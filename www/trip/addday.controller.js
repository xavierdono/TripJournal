(function () {
  'use strict';

  angular.module('starter.addday', [])

  .controller('AddDayCtrl', function ($scope, $stateParams, $cordovaDevice, $cordovaFile, $ionicPlatform, $ionicActionSheet, ImageService, FileService, TripService) {
    $scope.tripId = $stateParams.tripId;
    $scope.images = FileService.images();

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

    // Fix bug with <label>
    $scope.addDay = function (day) {
      var new_day = {
            title: day.title,
            date: day.date,
            dateShow: day.date.getDate() + '/' + day.date.getMonth() + '/' + day.date.getFullYear(),
            comment: day.comment,
            images: $scope.images
      };      

      TripService.addDay($scope.tripId, new_day);
      window.location.href = '#/tab/trip.show/' + $scope.tripId;
    }

    $scope.closeTrip = function () {
      // Modal confirmation
      console.log("closeTrip");
    }

    $scope.urlForImage = function (imageName) {
      var trueOrigin = cordova.file.dataDirectory + imageName;
      return trueOrigin;
    }

    $scope.addImage = function (type) {
      $scope.hideSheet();
      ImageService.handleMediaDialog(type).then(function () {
        console.log("addImage");
      }).catch (function (error) {
        alert(error);
      });
    }
  });
})();
