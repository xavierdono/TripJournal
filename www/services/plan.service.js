(function () {
  'use strict';

  angular.module('starter.services.plans', [])

  .factory('PlanService', function (DB) {
    return {  
      remove: function (id_plan) {
          DB.query("DELETE FROM plan WHERE id_plan = ?", [id_plan]);
      },
      get: function (id_plan) {
          return DB.query('SELECT * FROM plan WHERE id_plan = ?', [id_plan]).then(function (result) {
          return DB.fetch(result);
        });
      },
      edit: function(id_plan, comment) {
        DB.query("UPDATE plan SET data = ? WHERE id_plan = ?", [comment, id_plan]);
      },
      getpid: function (id_trip) {
        return DB.query('SELECT * FROM plan WHERE id_trip = ? ORDER BY time DESC', [id_trip]).then(function (result) {
          return DB.fetchAll(result);
        });
      },
      add: function (id_trip, data) {
        var date = Math.floor(Date.now() / 1000);
        DB.query("INSERT INTO plan (id_trip, data, time) VALUES (?,?,?)", [id_trip, data, date]);
      }
    };
  });
})();
