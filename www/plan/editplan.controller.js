(function () {
  'use strict';

  angular.module('starter.editplan', [])

  .controller('EditPlanCtrl', function ($scope, $stateParams, PlanService) {
  		$scope.plan = PlanService.get($stateParams.planId);

  		$scope.editPlan = function (plan) {
        	PlanService.edit($stateParams.planId, $stateParams.tripId, plan.data);
      		window.location.href = '#/tab/plan.show/'+$stateParams.tripId;
    	}
  });
})();
