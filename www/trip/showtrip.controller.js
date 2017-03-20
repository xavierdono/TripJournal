(function () {
  'use strict';

  angular.module('starter.showtrip', [])

  .controller('ShowTripCtrl', function ($scope, $stateParams, TripService) {
    $scope.item = TripService.get($stateParams.tripId);
  });
})();
