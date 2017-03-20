(function () {
  'use strict';

  angular.module('starter.trip', [])

  .controller('TripCtrl', function ($scope, TripService) {
    $scope.items = TripService.all();
  });
})();
