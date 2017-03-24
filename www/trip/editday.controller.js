(function () {
  'use strict';

  angular.module('starter.editday', [])

  .controller('EditDayCtrl', function ($scope, $stateParams, FileService, TripService, $ionicActionSheet, $ionicModal) {
    $scope.tripId = $stateParams.tripId;
    $scope.dayId = $stateParams.dayId;

    $scope.images = FileService.images();

    $scope.trip = TripService.get($scope.tripId);
    $scope.day = TripService.getDay($scope.tripId, $scope.dayId);

    // Charge la modal
    $ionicModal.fromTemplateUrl('templates/image.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Affiche la modal
    $scope.showMedia = function (image) {
      $scope.img = image;
      $scope.modal.show();
    }

    // Fonction modal
    $scope.deleteImage = function () {
      FileService.removeImage($scope.img); // Retirer l'image de la collection "images"
      ImageService.deleteMedia($scope.img, $scope.tripId); // Supprimer l'image du répertoire
      
      $scope.img = null;
      $scope.modal.hide();
    }
    
    // Fonction modal
    $scope.setDefaultImage = function (response) {
      if (response === true) {
        TripService.setDefaultImage($scope.tripId, $scope.img);
      }

      $scope.img = null;
      $scope.modal.hide();
    }

    // Fix bug with <label>
    $scope.editDay = function (day) {
      var edited_day = {
        id: $scope.dayId,
        title: day.title,
        date: day.date,
        dateShow: day.date.getDate() + '/' + (((day.date.getMonth() + 1) < 10 ? '0' : '') + (day.date.getMonth() + 1))  + '/' + day.date.getFullYear(),
        comment: day.comment,
        images: $scope.images
      };

      TripService.editDay($scope.tripId, edited_day);
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
