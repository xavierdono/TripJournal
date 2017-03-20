angular.module('starter.services.trips', [])

.factory('Trips', function() {

  var trips = [{
      id: 0,
      img: '/img/trip/titre.jpg',
      title: 'Australie',
      date: 'Mai, 2016 - 11 jours'
  }, {
      id: 1,
      img: '/img/trip/sf.jpg',
      title: 'San Francisco',
      date: 'Septembre, 2016 - 7 jours'
  }, {
      id: 2,
      img: '/img/trip/lasvegas.jpg',
      title: 'Las Vegas',
      date: 'Janvier, 2017 - 18 jours'
  }];

  return {
    all: function() {
      return trips;
    },
    remove: function(trip) {
      trips.splice(trips.indexOf(trip), 1);
    },
    get: function(tripId) {
      for (var i = 0; i < trips.length; i++) {
        if (trips[i].id === parseInt(tripId)) {
          return trips[i];
        }
      }
      return null;
    }
  };
});