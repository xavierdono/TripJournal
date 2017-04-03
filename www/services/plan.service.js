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
        DB.query("UPDATE plan SET comment = ? WHERE id_plan = ?", [comment, id_plan]);
      },
      getpid: function (id_trip, id_category) {
        return DB.query('SELECT * FROM plan WHERE id_trip = ? AND id_category = ? ORDER BY time DESC', [id_trip, id_category]).then(function (result) {
          return DB.fetchAll(result);
        });
      },
      add: function (id_trip, id_category, comment) {
        var date = Math.floor(Date.now() / 1000);
        DB.query("INSERT INTO plan (id_trip, id_category, comment, time) VALUES (?,?,?,?)", [id_trip, id_category, comment, date]).then(function (result) {
            var id_plan = result.insertId;
            /*for (var i = 0; i < images.length; i++) {
              DB.query("INSERT INTO image_plan (id_plan, name) VALUES (?, ?, ?)", [id_plan, images[i]]);
            }*/
          });
      },
      addImage: function(id_plan, name_image) {
        DB.query("INSERT INTO image_plan (id_plan, name) VALUES (?, ?)", [id_plan, name_image]);
      },
      removeImage: function(id_plan, img) {
        var removed_image = img.substr(img.lastIndexOf('/') + 1);
        DB.query("DELETE FROM image_plan WHERE id_plan = ? AND name = ?", [id_plan, removed_image]);
      },
      getImages: function (id_plan) {
        return DB.query('SELECT * FROM image_plan WHERE id_plan = ?', [id_plan]).then(function (result) {
          return DB.fetchAll(result);
        });
      }
    };
  });
})();
