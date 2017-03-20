(function () {
  'use strict';

  angular.module('starter.showtrip', [])

  .controller('ShowTripCtrl', function ($scope, $stateParams, Trips) {
    $scope.item = Trips.get($stateParams.tripId);
  });
})();
