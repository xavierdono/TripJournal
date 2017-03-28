(function () {
  'use strict';

  angular.module('starter.editplan', [])

  .controller('EditPlanCtrl', function ($scope, $stateParams, PlanService) {
  		$scope.plan = PlanService.get($stateParams.planId);
  		console.log($scope.plan + $stateParams.planId);


  		$scope.editPlan = function (plan) {
        	PlanService.edit($stateParams.planId, plan.data);
      		window.location.href = '#/tab/plan.show/'+$stateParams.tripId;
    	}

    	$scope.remove = function(index, id) {
      		PlanService.remove(index, id);
      		window.location.href = '#/tab/plan.show/'+$stateParams.tripId;
    	}
  });
})();
