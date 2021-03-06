(function () {
  'use strict';

  angular.module('starter.addplan', [])

  .controller('AddPlanCtrl', function ($scope, $stateParams, PlanService, FileService, ImageService) {
  		$scope.addPlan = function (plan) {
        	PlanService.add($stateParams.tripId, $stateParams.CategoryId, plan.comment);
      		window.location.href = '#/tab/plan.show/'+$stateParams.tripId+'/'+$stateParams.CategoryId;
    	}

    	$scope.images = FileService.getImages();
  });
})();
