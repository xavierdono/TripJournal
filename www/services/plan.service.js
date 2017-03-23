(function () {
  'use strict';

  angular.module('starter.services.plans', [])

  .factory('PlanService', function ($cordovaSQLite) {

    var plans = [];

    return {
      all: function () {

          var query = "SELECT * FROM plan ORDER BY time DESC";
          $cordovaSQLite.execute(db, query, []).then(function(res) {
              if (res.rows.length > 0) {
                  for (var i = 0; i < res.rows.length; i++) {
                      var obj = {id_plan: res.rows.item(i).id_plan, 
                                 id_trip: res.rows.item(i).id_trip, 
                                 data: res.rows.item(i).data, 
                                 time: res.rows.item(i).time
                               };

                      plans.push(obj);
                  }
              } else {
                  console.log("No results found");
              }
          }, function(err) {
              console.error(err);
          });
        return plans;
      },
      remove: function (index, id) {
          var query = "DELETE FROM plan WHERE id = ?";
          $cordovaSQLite.execute(db, query, [id]).then(function() {
              console.log("DELETED -> " + id);
              plans.splice(index, 1);
          }, function(err) {
              console.error(err);
          });
      },
      get: function (planId) {
        for (var i = 0; i < plans.length; i++) {
          if (plans[i].id === parseInt(planId)) {
            return plans[i];
          }
        }
        return null;
      },
      getpid: function (planId) {
        var tmp = [];
        var query = "SELECT * FROM plan WHERE id_trip = ? ORDER BY time DESC";
          $cordovaSQLite.execute(db, query, [planId]).then(function(res) {
              if (res.rows.length > 0) {
                  for (var i = 0; i < res.rows.length; i++) {
                      var obj = {id_plan: res.rows.item(i).id_plan, 
                                 id_trip: res.rows.item(i).id_trip, 
                                 data: res.rows.item(i).data, 
                                 time: res.rows.item(i).time
                               };

                      plans.push(obj);
                  }
              } else {
                  console.log("No results found");
              }
          }, function(err) {
              console.error(err);
          });
        return plans;
      },
      add: function (id_trip, data) {
        var query = "INSERT INTO plan (id_trip, data, time) VALUES (?,?,?)";
        var date = Math.floor(Date.now() / 1000);
        $cordovaSQLite.execute(db, query, [id_trip, data, date]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId+ ' '+ id_trip + ' '+ data+ ' '+date);
            var obj = {id: res.insertId, id_trip: id_trip, data: data, time: date};
            plans.push(obj);
        }, function(err) {
            console.error(err);
        });
      }
    };
  });
})();
