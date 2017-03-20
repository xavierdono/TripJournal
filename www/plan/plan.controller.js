(function() {
    'use strict';

	angular.module('starter.plan', [])

	.controller('PlanCtrl', function($scope) {

		$scope.items = [
		    { id: 0, title: 'Tokyo', date: 'Septembre 2015'},
		    { id: 1, title: 'New-York', date: 'Juillet 2016'}
		    ];
		console.log("PlanCtrl");
	});

})();