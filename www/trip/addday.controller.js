(function () {
  'use strict';

  angular.module('starter.addday', [])

  .controller('AddDayCtrl', function ($scope, $stateParams, $cordovaDevice, $cordovaFile, $ionicPlatform, $ionicActionSheet, ImageService, FileService, TripService, $ionicModal, $ionicPopup) {
    $scope.tripId = $stateParams.tripId;
    $scope.images = FileService.images();

    $ionicModal.fromTemplateUrl('templates/image.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.showMedia = function (image) {
      $scope.img = image;
      $scope.modal.show();
    }

    $scope.setDefaultImage = function (response) {
      if (response === true) {
        TripService.setDefaultImage($scope.tripId, $scope.img);
      }

      $scope.img = null;
      $scope.modal.hide();
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
      var confirmPopup = $ionicPopup.confirm({
          title: 'Attention',
          template: 'Etes-vous sur de cloturer ce voyage ?',
          cancelText: 'Non',
          okText: 'Oui'
        });

      confirmPopup.then(function (res) {
        if (res) {
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
    }

    $scope.urlForImage = function (imageName) {
      // TODO : Charger les images par voyage ($scope.tripId)
      var trueOrigin = cordova.file.dataDirectory + imageName;
      return trueOrigin;
    }

    $scope.addImage = function (type) {
      $scope.hideSheet();
      // TODO : Sauvegarder les images par voyage ($scope.tripId)
      ImageService.handleMediaDialog(type);
    }
  });
})();
