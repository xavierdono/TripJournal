(function () {
  'use strict';

  angular.module('starter.services.trips', [])

  .factory('TripService', function () {

    var mois = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aôut", "Septembre", "Octobre", "Novembre", "Décembre");

    var trips = [{
        id: 0,
        img: 'img/trip/titre.jpg',
        title: 'Australie',
        date: 'Février 2017, 7 jours',
        dateDebut: '11/02/2017',
        dateFin: '18/01/2017',
        days: [{
            id: 0,
            title: 'Jour 1',
            date: '',
            comment: '',
            images: []
          }, {
            id: 1,
            title: 'Jour 2',
            date: '',
            comment: '',
            images: []

          }, {
            id: 2,
            title: 'Jour 3',
            date: '',
            comment: '',
            images: []

          }
        ]
      }
    ];

    function diffdate(d1, d2, u) {
      var div = 1;
      switch (u) {
      case 's':
        div = 1000;
        break;
      case 'm':
        div = 1000 * 60;
        break;
      case 'h':
        div = 1000 * 60 * 60;
        break;
      case 'd':
        div = 1000 * 60 * 60 * 24;
        break;
      }

      var Diff = d2.getTime() - d1.getTime();
      return Math.ceil(Diff / div);
    }
    
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
        trip.img = 'img/trip/trip.jpg';
        trip.days = [];
        trips.push(trip);
      },
      addDay: function (tripID, day) {
        for (var i = 0; i < trips.length; i++) {
          if (trips[i].id === parseInt(tripID)) {
            day.id = trips[i].days.length;
            trips[i].dateFin = day.date;
            trips[i].date = trips[i].date.split(',')[0] + ', ' + diffdate(trips[i].dateDebut, trips[i].dateFin, 'd') + ' jours';
            trips[i].days.push(day);
          }
        }
      }
    };
  });
})();
