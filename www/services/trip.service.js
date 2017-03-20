(function () {
  'use strict';

  angular.module('starter.services.trips', [])

  .factory('TripService', function () {

    var mois = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aôut", "Septembre", "Octobre", "Novembre", "Décembre");

    var trips = [{
        id: 0,
        img: '/img/trip/titre.jpg',
        title: 'Australie',
        date: 'Février 2017, 7 jours',
        dateDebut: '11/02/2017',
        dateFin: '18/01/2017',
        days: [{
            id: 0,
            title: 'Jour 1'
          }, {
            id: 1,
            title: 'Jour 2'
          }, {
            id: 2,
            title: 'Jour 3'
          }
        ]
      }
    ];

    return {
      all: function () {
        return trips;
      },
      remove: function (trip) {
        trips.splice(trips.indexOf(trip), 1);
      },
      get: function (tripId) {
        for (var i = 0; i < trips.length; i++) {
          if (trips[i].id === parseInt(tripId)) {
            return trips[i];
          }
        }
        return null;
      },
      add: function (trip) {
        trip.id = trips.length;
        trip.date = mois[trip.dateDebut.getMonth()] + ' ' + trip.dateDebut.getFullYear() + ', début du voyage';
        trip.img = '/img/trip/trip.jpg';
        trips.push(trip);
      }
    };
  });
})();
