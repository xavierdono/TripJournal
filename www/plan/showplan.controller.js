(function () {
  'use strict';

  angular.module('starter.showplan', [])

  .controller('ShowPlanCtrl', function ($scope, $stateParams, PlanService, TripService) {
  	$scope.trip = {};
  	$scope.plans = [];

  	$scope.plans = PlanService.getpid($stateParams.tripId);

  	PlanService.getpid($stateParams.tripId).then(function (plans) {
      $scope.plans = plans;
    });

  	TripService.getTrip($stateParams.tripId).then(function (trip) {
      console.log(trip);
      $scope.trip = trip;
    });

  });
})();
