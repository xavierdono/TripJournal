(function () {
  'use strict';

  angular.module('starter.editplan', [])

  .controller('EditPlanCtrl', function ($scope, $stateParams, PlanService) {
  		$scope.plan = PlanService.get($stateParams.planId);

  		$scope.editPlan = function (plan) {
        	PlanService.edit($stateParams.planId, plan[0].data);
      		window.location.href = '#/tab/plan.show/'+$stateParams.tripId;
    	}

    	$scope.remove = function() {
      		PlanService.remove($stateParams.planId);
      		window.location.href = '#/tab/plan.show/'+$stateParams.tripId;
    	}
  });
})();
