(function () {
  'use strict';

  angular.module('starter.editday', [])

  .controller('EditDayCtrl', function ($scope, $stateParams, FileService, ImageService, TripService, $ionicActionSheet, $ionicModal) {
    $scope.trip = {};
    $scope.day = {};
    $scope.images = {};

    $scope.tripId = $stateParams.tripId;
    $scope.dayId = $stateParams.dayId;

    TripService.getImages($scope.tripId, $scope.dayId).then(function (images) {
      $scope.images = images;
    });

    TripService.getTrip($scope.tripId).then(function (trip) {
      $scope.trip = trip;
    });

    TripService.getDay($scope.tripId, $scope.dayId).then(function (day) {
      var d = Date.parse(day.date);
      $scope.day = day;
      $scope.day.date = new Date(d);
    });

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
    };

    // Fonction modal
    $scope.deleteImage = function () {
      TripService.removeImage($scope.img, $scope.tripId, $scope.img); // Retirer l'image de la collection "images"
      ImageService.deleteMedia($scope.img, $scope.tripId); // Supprimer l'image du répertoire

      $scope.img = null;
      $scope.modal.hide();
    };

    // Fonction modal
    $scope.setDefaultImage = function (response) {
      if (response === true) {
        TripService.setDefaultImage($scope.tripId, $scope.img);
      }

      $scope.img = null;
      $scope.modal.hide();
    };

    // Fix bug with <label>
    $scope.editDay = function (day) {
      var edited_day = {
        id: $scope.dayId,
        title: day.title,
        date: day.date,
        dateShow: day.date.getDate() + '/' + (((day.date.getMonth() + 1) < 10 ? '0' : '') + (day.date.getMonth() + 1)) + '/' + day.date.getFullYear(),
        comment: day.comment
      };

      // TODO : Ajout des images manquantes
      TripService.editDay($scope.tripId, edited_day);      
      window.location.href = '#/tab/trip.show/0/' + $scope.tripId;
    };

    $scope.urlForImage = function (imageName) {
      // Charger les images par voyage ($scope.tripId)
      var trueOrigin = cordova.file.dataDirectory + $scope.tripId + '/' + imageName;
      return trueOrigin;
    };

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
    };

    $scope.addImage = function (type) {
      $scope.hideSheet();
      // Sauvegarder les images par voyage ($scope.tripId)
      ImageService.handleMediaDialog(type, $scope.tripId, $scope.dayId);
    };

  });
})();
