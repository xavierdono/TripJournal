(function () {
  'use strict';

  angular.module('starter.trip', [])

  .controller('TripCtrl', function ($rootScope, $scope, TripService) {
    $scope.trips = [];

    TripService.all().then(function (trips) {
      $scope.trips = trips;
    });

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
      if (toState.name === 'tab.trip') {
        TripService.all().then(function (trips) {
          $scope.trips = trips;
        });
      }
    });
  });
})();
