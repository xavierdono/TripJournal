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
        dateDebut: '10/01/2017',
        dateFin: '18/01/2017',
        clos: 0,
        days: [{
            id: 0,
            title: 'Jour 1',
            dateShow: '10/01/2017',
            date: '2017-01-10',
            comment: 'Bla bla',
            images: []
          }, {
            id: 1,
            title: 'Jour 2',
            dateShow: '11/01/2017',
            date: '2017-01-11',
            comment: 'blo blo',
            images: []
          }, {
            id: 2,
            title: 'Jour 3',
            dateShow: '12/01/2017',
            date: '2017-01-12',
            comment: 'Blu blu',
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
      closeTrip: function (tripId) {
        for (var i = 0; i < trips.length; i++) {
          if (trips[i].id === parseInt(tripId)) {
            trips[i].clos = 1;
          }
        }
        return null;
      },
      getDay: function (tripId, dayId) {
        for (var i = 0; i < trips.length; i++) {
          if (trips[i].id === parseInt(tripId)) {
            for (var j = 0; j < trips[i].days.length; j++) {
              if (trips[i].days[j].id === parseInt(dayId)) {
                return trips[i].days[j];
              }
            }
          }
        }
        return null;
      },
      add: function (trip) {
        trip.id = trips.length;
        trip.date = mois[trip.dateDebut.getMonth() + 1] + ' ' + trip.dateDebut.getFullYear() + ', début du voyage';
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
      },
      editDay: function (tripID, day) {
        for (var i = 0; i < trips.length; i++) {
          if (trips[i].id === parseInt(tripID)) {
            for (var j = 0; j < trips[i].days.length; j++) {
              if (trips[i].days[j].id === parseInt(day.id)) {
                trips[i].days[j].title = day.title;
                trips[i].days[j].dateShow = day.dateShow;
                trips[i].days[j].date = day.date;
                trips[i].days[j].comment = day.comment;
              }
            }
          }
        }
        return null;
      },
      setDefaultImage: function (tripID, imageURL) {
        for (var i = 0; i < trips.length; i++) {
          if (trips[i].id === parseInt(tripID)) {
            trips[i].img = imageURL;
          }
        }
      }
    };
  });
})();
