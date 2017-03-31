(function () {
  'use strict';

  angular.module('starter.showplan', [])

  .controller('ShowPlanCtrl', function ($scope, $stateParams, CategoryService, PlanService, TripService) {
    $scope.category = CategoryService.get($stateParams.CategoryId);
  	$scope.trip = {};
  	$scope.plans = [];

  	PlanService.getpid($stateParams.tripId, $stateParams.CategoryId).then(function (plans) {
      $scope.plans = plans;
    });

  	TripService.getTrip($stateParams.tripId).then(function (trip) {
      $scope.trip = trip;
    });
  });
})();
