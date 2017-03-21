(function () {
  'use strict';

  angular.module('starter.showplan', [])

  .controller('ShowPlanCtrl', function ($scope, $stateParams, PlanService) {
  	$scope.plans = PlanService.getpid($stateParams.planId);
  });
})();
