(function () {
  'use strict';

  angular.module('starter.trip', [])

  .controller('TripCtrl', function ($scope, Trips) {
    $scope.items = Trips.all();
  });
})();
