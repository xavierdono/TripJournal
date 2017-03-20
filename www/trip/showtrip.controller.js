(function () {
  'use strict';

  angular.module('starter.showtrip', [])

  .controller('ShowTripCtrl', function ($scope, $stateParams, TripService) {
    $scope.trip = TripService.get($stateParams.tripId);
  });
})();
