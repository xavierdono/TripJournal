(function () {
  'use strict';

  angular.module('starter.showtrip', [])

  .controller('ShowTripCtrl', function ($rootScope, $scope, $stateParams, TripService) {
    $scope.trip = {};
    $scope.trip.days = [];

    TripService.getTrip($stateParams.tripId).then(function (trip) {
      $scope.trip = trip;

      TripService.getDays($stateParams.tripId).then(function (days) {
        $scope.trip.days = days;
      });
    });

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
      if (toState.name === 'tab.trip-show') {
        TripService.getDays($stateParams.tripId).then(function (days) {
          $scope.trip.days = days;
        });
      }
    });
  });
})();
