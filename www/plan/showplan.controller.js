(function () {
  'use strict';

  angular.module('starter.showplan', [])

  .controller('ShowPlanCtrl', function ($scope, $stateParams, PlanService, TripService) {

  	$scope.plans = PlanService.getpid($stateParams.tripId);
  	$scope.trip = TripService.get($stateParams.tripId);

  });
})();
