(function () {
  'use strict';

  angular.module('starter.showtrip', [])

    .controller('ShowTripCtrl', function ($scope, $stateParams, $ionicPopover, $ionicPopup, TripService) {
      $scope.trip = {};
      $scope.trip.days = [];

      $ionicPopover.fromTemplateUrl('templates/trip-menu.html', {
        scope: $scope
      }).then(function (popover) {
        $scope.popover = popover;
      });

      $scope.openPopover = function ($event) {
        $scope.popover.show($event);
      };

      $scope.closePopover = function () {
        $scope.popover.hide();
      };

      // Cleanup the popover when we're done with it!
      $scope.$on('$destroy', function () {
        $scope.popover.remove();
      });

      // Cloture le voyage
      $scope.closeTrip = function () {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Attention',
          template: 'Etes-vous sur de cloturer ce voyage ?',
          cancelText: 'Non',
          okText: 'Oui'
        });

        confirmPopup.then(function (res) {
          if (res) {
            TripService.closeTrip($stateParams.tripId);
            window.location.href = '#/tab/trip';
          }
        });
      };

      // Supprime le voyage
      $scope.deleteTrip = function () {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Attention',
          template: 'Etes-vous sur de supprimer ce voyage ?',
          cancelText: 'Non',
          okText: 'Oui'
        });

        confirmPopup.then(function (res) {
          if (res) {
            TripService.removeTrip($stateParams.tripId);
            window.location.href = '#/tab/trip';
          }
        });
      };

      TripService.getTrip($stateParams.tripId).then(function (trip) {
        $scope.trip = trip;

        TripService.getDays($stateParams.tripId).then(function (days) {
          $scope.trip.days = days;
        });
      });
    });
})();
