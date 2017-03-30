(function () {
  'use strict';

  angular.module('starter.services.trips', [])

  .factory('TripService', function (DB) {

    var mois = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aôut", "Septembre", "Octobre", "Novembre", "Décembre");

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
        return DB.query('SELECT * FROM trip WHERE clos = 0 ORDER BY dateDebut DESC').then(function (result) {
          return DB.fetchAll(result);
        });
      },
      getTrip: function (tripId) {
        return DB.query('SELECT * FROM trip WHERE id_trip = ?', [tripId]).then(function (result) {
          return DB.fetch(result);
        });
      },
      getDays: function (tripId) {
        return DB.query('SELECT * FROM day WHERE id_trip = ? ORDER BY date DESC', [tripId]).then(function (result) {
          return DB.fetchAll(result);
        });
      },
      addTrip: function (trip) {
        trip.date = mois[trip.dateDebut.getMonth() + 1] + ' ' + trip.dateDebut.getFullYear() + ', début du voyage';

        DB.query("INSERT INTO trip (default_image, title, date, dateDebut, dateFin, clos) VALUES (?, ?, ?, ?, ?, ?)", ['img/trip/trip.jpg', trip.title, trip.date, trip.dateDebut, trip.dateFin, trip.clos]);
      },
      removeTrip: function (tripId) {
        DB.query("DELETE FROM trip WHERE id_trip = ?", [tripId]);
      },
      closeTrip: function (tripId) {
        DB.query("UPDATE trip SET clos = 1 WHERE id_trip = ?", [tripId]);
      },
      getDay: function (tripId, dayId) {
        return DB.query('SELECT * FROM day WHERE id_trip = ? AND id_day = ?', [tripId, dayId]).then(function (result) {
          return DB.fetch(result);
        });
      },
      addDay: function (tripId, day, images) {
        //trips[i].date = trips[i].date.split(',')[0] + ', ' + diffdate(trips[i].dateDebut, trips[i].dateFin, 'd') + ' jours';
        DB.query("UPDATE trip SET dateFin = ? WHERE id_trip = ?", [day.date, tripId]);
        DB.query("INSERT INTO day (id_trip, title, date, dateShow, comment) VALUES (?, ?, ?, ?, ?)", [tripId, day.title, day.date, day.dateShow, day.comment]).then(function (result) {
            var id_day = result.insertId;
                        
            for (var i = 0; i < images.length; i++) {
              DB.query("INSERT INTO image (id_trip, id_day, name) VALUES (?, ?, ?)", [tripId, id_day, images[i]]);
            }
          });
      },
      getImages: function (tripId) {
        return DB.query('SELECT * FROM image WHERE id_trip = ?', [tripId]).then(function (result) {
          return DB.fetchAll(result);
        });
      },
      editDay: function (tripId, day) {
        DB.query("UPDATE day SET title = ?, dateShow = ?, date = ?, comment = ? WHERE id_trip = ? AND id_day", [day.title, day.dateShow, day.date, day.comment, tripId, day.id]);
      },
      setDefaultImage: function (tripId, imageURL) {
        DB.query("UPDATE trip SET default_image = ? WHERE id_trip = ?", [imageURL, tripId]);
      }
    };
  });
})();
