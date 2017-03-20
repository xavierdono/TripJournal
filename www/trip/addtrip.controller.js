(function () {
  'use strict';

  angular.module('starter.addtrip', [])

  .controller('AddTripCtrl', function ($scope, TripService) {
	$scope.addTrip = function(trip) {
		var trip = {
			  title: trip.title,
			  img: '',
			  date: '',
			  dateDebut: trip.dateDebut,
			  dateFin: ''
		};
		
		TripService.add(trip);
		window.location.href = '#/tab/trip';
	};
  });
})();
