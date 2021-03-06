(function () {
  'use strict';

  angular.module('starter.addday', [])

  .controller('AddDayCtrl', function ($scope, $stateParams, $ionicActionSheet, ImageService, FileService, TripService, $ionicModal) {
    $scope.images = FileService.getImages();
    $scope.tripId = $stateParams.tripId;

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

    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

    // Fonction modal
    $scope.setDefaultImage = function (response) {
      if (response === true) {
        TripService.setDefaultImage($scope.tripId, $scope.img);
      }

      $scope.img = null;
      $scope.modal.hide();
    };

    // Permet de sélectionner la source de la photo
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

    // Ajoute la journée dans le voyage
    $scope.addDay = function (day) {
      var new_day = {
        title: day.title,
        date: day.date,
        dateShow: day.date.getDate() + '/' + (((day.date.getMonth() + 1) < 10 ? '0' : '') + (day.date.getMonth() + 1)) + '/' + day.date.getFullYear(),
        comment: day.comment
      };

      TripService.addDay($scope.tripId, new_day, FileService.getImages());
      FileService.clearImages();
      window.location.href = '#/tab/trip.show/0/' + $scope.tripId;
    };

    // Récupère le dossier des images
    $scope.urlForImage = function (imageName) {
      // Charger les images par voyage ($scope.tripId)
      var trueOrigin = cordova.file.dataDirectory + '/' + $scope.tripId + '/' + imageName;
      return trueOrigin;
    };

    // Ajoute l'image
    $scope.addImage = function (type) {
      $scope.hideSheet();
      // Sauvegarder les images par voyage ($scope.tripId)
      ImageService.handleMediaDialog(type, $scope.tripId);
    };
  });
})();
