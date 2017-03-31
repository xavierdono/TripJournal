(function () {
  'use strict';

  angular.module('starter.showcategory', [])

  .controller('ShowCategoryCtrl', function ($scope, $stateParams, CategoryService, PlanService, TripService) {
  	$scope.trip = {};
  	
    $scope.categories = CategoryService.all();

  	TripService.getTrip($stateParams.tripId).then(function (trip) {
      $scope.trip = trip;
    });

  });
})();
