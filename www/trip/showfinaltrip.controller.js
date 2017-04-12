(function () {
  'use strict';

  angular.module('starter.showfinaltrip', [])

  .controller('ShowFinalTripCtrl', function ($scope, $stateParams, TripService) {
    $scope.trip = {};
    $scope.trip.days = [];

    TripService.getTrip($stateParams.tripId).then(function (trip) {
      $scope.trip = trip;

      TripService.getDays($stateParams.tripId).then(function (days) {
        $scope.trip.days = days;
      });
    });
  });
})();
