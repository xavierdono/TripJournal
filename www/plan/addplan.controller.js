(function () {
  'use strict';

  angular.module('starter.addplan', [])

  .controller('AddPlanCtrl', function ($scope, $stateParams, PlanService) {
  		$scope.addPlan = function (plan) {
        	PlanService.add($stateParams.planId, plan.comment);
      		window.location.href = '#/tab/plan.show/'+$stateParams.planId;
    	}
  });
})();
