(function () {
  'use strict';

  angular.module('starter.editplan', [])

  .controller('EditPlanCtrl', function ($scope, $stateParams, PlanService) {
      $scope.plan = {};

      PlanService.get($stateParams.planId).then(function (plan) {
        $scope.plan = plan;
      });

  		$scope.editPlan = function (plan) {
        	PlanService.edit($stateParams.planId, plan.comment);
      		window.location.href = '#/tab/plan.show/'+$stateParams.tripId+'/'+$stateParams.CategoryId;
    	}

    	$scope.remove = function() {
      		PlanService.remove($stateParams.planId);
      		window.location.href = '#/tab/plan.show/'+$stateParams.tripId+'/'+$stateParams.CategoryId;
    	}
  });
})();
