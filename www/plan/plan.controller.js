(function() {
    'use strict';

	angular.module('starter.plan', [])

	.controller('PlanCtrl', function($scope, TripService) {
		$scope.trips = TripService.all();
	});

})();