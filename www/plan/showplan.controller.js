(function () {
  'use strict';

  angular.module('starter.showplan', [])

  .controller('ShowPlanCtrl', function ($scope, $stateParams, PlanService, TripService) {
  	$scope.plans = PlanService.getpid($stateParams.planId);
  	$scope.trip = TripService.get($stateParams.planId);
  });
})();
