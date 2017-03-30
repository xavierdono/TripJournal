(function () {
  'use strict';

  angular.module('starter.trip', [])

  .controller('TripCtrl', function ($rootScope, $scope, TripService) {
    $scope.trips = [];

    TripService.all().then(function (trips) {
      $scope.trips = trips;
    });

  });
})();
