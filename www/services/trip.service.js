(function () {
  'use strict';

  angular.module('starter.services.trips', [])

    .factory('TripService', function (DB) {

      var mois = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aôut", "Septembre", "Octobre", "Novembre", "Décembre");

      var service = {
        all: all,
        getTrip: getTrip,
        getDays: getDays,
        addTrip: addTrip,
        removeTrip: removeTrip,
        closeTrip: closeTrip,
        getDay: getDay,
        addDay: addDay,
        addImage: addImage,
        removeImage: removeImage,
        getImages: getImages,
        editDay: editDay,
        setDefaultImage: setDefaultImage,
      };

      return service;

      function all() {
        return DB.query('SELECT * FROM trip ORDER BY dateDebut DESC').then(function (result) {
          return DB.fetchAll(result);
        });
      }

      function getTrip(tripId) {
        return DB.query('SELECT * FROM trip WHERE id_trip = ?', [tripId]).then(function (result) {
          return DB.fetch(result);
        });
      }

      function getDays(tripId) {
        return DB.query('SELECT * FROM day WHERE id_trip = ? ORDER BY date DESC', [tripId]).then(function (result) {
          return DB.fetchAll(result);
        });
      }

      function addTrip(trip) {
        trip.date = mois[trip.dateDebut.getMonth() + 1] + ' ' + trip.dateDebut.getFullYear() + ', début du voyage';

        DB.query("INSERT INTO trip (default_image, title, date, dateDebut, dateFin, clos) VALUES (?, ?, ?, ?, ?, ?)", ['img/trip/trip.jpg', trip.title, trip.date, trip.dateDebut.toISOString(), trip.dateFin, trip.clos]);
      }

      function removeTrip(tripId) {
        DB.query("DELETE FROM image WHERE id_trip = ?", [tripId]);
        DB.query("DELETE FROM day WHERE id_trip = ?", [tripId]);
        DB.query("DELETE FROM trip WHERE id_trip = ?", [tripId]);
      }

      function closeTrip(tripId) {
        DB.query("UPDATE trip SET clos = 1 WHERE id_trip = ?", [tripId]);
      }

      function getDay(tripId, dayId) {
        return DB.query('SELECT * FROM day WHERE id_trip = ? AND id_day = ?', [tripId, dayId]).then(function (result) {
          return DB.fetch(result);
        });
      }

      function addDay(tripId, day, images) {

        DB.query("SELECT date FROM trip WHERE id_trip = ?", [tripId]).then(function (result) {
          var date = result.rows.item(0).date;
          DB.query("UPDATE trip SET dateFin = ? WHERE id_trip = ?", [day.date.toISOString(), tripId]);
          DB.query("UPDATE trip SET date = ? || ', ' || cast((julianday(dateFin) - julianday(dateDebut)) + 1 As Integer) || ' jours' WHERE id_trip = ?", [date.split(',')[0], tripId]);
          DB.query("INSERT INTO day (id_trip, title, date, dateShow, comment) VALUES (?, ?, ?, ?, ?)", [tripId, day.title, day.date.toISOString(), day.dateShow, day.comment]).then(function (result) {
            var id_day = result.insertId;

            for (var i = 0; i < images.length; i++) {
              DB.query("INSERT INTO image (id_trip, id_day, name) VALUES (?, ?, ?)", [tripId, id_day, images[i]]);
            }
          });
        });
      }

      function addImage(tripId, dayId, name_image) {
        DB.query("INSERT INTO image (id_trip, id_day, name) VALUES (?, ?, ?)", [tripId, dayId, name_image]);
      }

      function removeImage(tripId, dayId, img) {
        var removed_image = img.substr(img.lastIndexOf('/') + 1);
        DB.query("DELETE FROM image WHERE id_trip = ? AND id_day = ? AND name = ?", [tripId, dayId, removed_image]);
      }

      function getImages(tripId, dayId) {
        return DB.query('SELECT * FROM image WHERE id_trip = ? AND id_day = ?', [tripId, dayId]).then(function (result) {
          return DB.fetchAll(result);
        });
      }

      function editDay(tripId, day) {
        DB.query("UPDATE day SET title = ?, dateShow = ?, date = ?, comment = ? WHERE id_trip = ? AND id_day", [day.title, day.dateShow, day.date, day.comment, tripId, day.id]);
      }

      function setDefaultImage(tripId, imageURL) {
        DB.query("UPDATE trip SET default_image = ? WHERE id_trip = ?", [imageURL, tripId]);
      }
    });
})();
