(function () {
  'use strict';

  angular.module('starter.showplan', [])

  .controller('ShowPlanCtrl', function ($scope, $stateParams, PlanService, TripService) {

  	$scope.remove = function(index, id) {
  		$scope.plans.splice(index, 1);
      PlanService.remove(index, id);
    }


    $scope.edit = function (planId) {
      window.location.href = '#/tab/plan.edit/' + $stateParams.tripId + '/' + planId;
    }


  	$scope.plans = PlanService.getpid($stateParams.tripId);
  	$scope.trip = TripService.get($stateParams.tripId);

  });
})();
