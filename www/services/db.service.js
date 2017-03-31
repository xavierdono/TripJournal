(function () {
  'use strict';

  angular.module('starter.services.db', [])

  .factory('DB', function ($q, $ionicPlatform) {
    var self = this;
    self.db = null;

    self.init = function () {
      /*
      self.db = window.sqlitePlugin.openDatabase({
      name: "tripjournal.db",
      location: 'default'
      });
       */
      self.db = window.openDatabase("tripjournal.db", "1.0", "TripJournal", 0);

      // Plan
      self.query("DROP TABLE IF EXISTS plan");
      self.query("CREATE TABLE IF NOT EXISTS plan (id_plan integer primary key, id_trip integer, id_category integer, comment text, time text)");

      // Voyage
      self.query("DROP TABLE IF EXISTS trip");
      self.query("CREATE TABLE IF NOT EXISTS trip (id_trip integer primary key, default_image text, title text, date text, dateDebut text, dateFin text, clos integer)");

      // Journée
      self.query("DROP TABLE IF EXISTS day");
      self.query("CREATE TABLE IF NOT EXISTS day (id_day integer primary key, id_trip integer, title text, date text, dateShow text, comment text)");

      // Images
      self.query("DROP TABLE IF EXISTS image");
      self.query("CREATE TABLE IF NOT EXISTS image (id_image integer primary key, id_trip integer, id_day integer, name text)");

      // Images Plan
      self.query("DROP TABLE IF EXISTS image_plan");
      self.query("CREATE TABLE IF NOT EXISTS image_plan (id_image integer primary key, id_plan integer, name text)");

      // Ajoute un voyage
      self.query("INSERT INTO trip (default_image, title, date, dateDebut, dateFin, clos) VALUES (?, ?, ?, ?, ?, ?)", ['img/trip/titre.jpg', 'Australie', 'Février 2017, 7 jours', new Date('01/10/2017'), '', 0]).then(function (result) {
        var id_trip = result.insertId;

        // Ajoute les jours
        self.query("INSERT INTO day (id_trip, title, date, dateShow, comment) VALUES (?, ?, ?, ?, ?)", [id_trip, 'Balade', new Date('01/10/2017'), '10/01/2017', 'Super soleil']);
        self.query("INSERT INTO day (id_trip, title, date, dateShow, comment) VALUES (?, ?, ?, ?, ?)", [id_trip, 'Découverte', new Date('01/11/2017'), '11/01/2017', 'Super rues']);
        self.query("INSERT INTO day (id_trip, title, date, dateShow, comment) VALUES (?, ?, ?, ?, ?)", [id_trip, 'Musée', new Date('01/12/2017'), '12/01/2017', 'Ouah']);
      });
    };

    self.query = function (query, bindings) {
      bindings = typeof bindings !== 'undefined' ? bindings : [];
      var deferred = $q.defer();

      $ionicPlatform.ready(function () { // BUG sur Android (pb transaction null)
        self.db.transaction(function (transaction) {
          transaction.executeSql(query, bindings, function (transaction, result) {
            deferred.resolve(result);
          }, function (transaction, error) {
            deferred.reject(error);
          });
        });
      });
      return deferred.promise;
    };

    self.fetchAll = function (result) {
      var output = [];

      for (var i = 0; i < result.rows.length; i++) {
        output.push(result.rows.item(i));
      }

      return output;
    };

    self.fetch = function (result) {
      return result.rows.item(0);
    };

    return self;
  });
})();
