(function () {
  'use strict';

  angular.module('starter.showplan', [])

  .controller('ShowPlanCtrl', function ($scope, $stateParams, PlanService, TripService) {

  	$scope.remove = function(index, id) {
  		$scope.plans.splice(index, 1);
        PlanService.remove(index, id);
    }

  	$scope.plans = PlanService.getpid($stateParams.planId);
  	$scope.trip = TripService.get($stateParams.planId);

  });
})();
