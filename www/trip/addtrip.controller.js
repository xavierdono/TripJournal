(function () {
  'use strict';

  angular.module('starter.addtrip', [])

  .controller('AddTripCtrl', function ($scope, $state, TripService) {
    // Ajoute le voyage
    $scope.addTrip = function (trip) {
      var new_trip = {
        title: trip.title,
        img: '',
        date: '',
        dateDebut: trip.dateDebut,
        dateFin: '',
        clos: 0
      };

      TripService.addTrip(new_trip);
      window.location.href = '#/tab/trip';
    };
  });
})();
