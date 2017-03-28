/*(function () {
  'use strict';

  angular.module('starter.services.plans', [])

  .factory('PlanService', function () {

    var plans = [{
        id: 0,
        pid: 0,
        title: 'Australie',
        data: 'Visiter le temple Asakusa',
        images: [
          'img/trip/sf.jpg',
          'img/trip/lasvegas.jpg'
        ]
      },
      {
        id: 1,
        pid: 0,
        title: 'Australie',
        data: 'Manger Avocado Whopper',
        images: []
      }
    ];

    return {
      all: function () {
        return plans;
      },
      remove: function (index) {
        plans.splice(index, 1);
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
        for (var i = 0; i < plans.length; i++) {
          if (plans[i].pid === parseInt(planId)) {
            tmp.push(plans[i]);
          }
        }
        return tmp;
      },

      edit: function (id_plan, id_trip, comment) {
        for (var i = 0; i < plans.length; i++) {
          if (plans[i].id === parseInt(id_plan)) {
              plans[i].comment = comment;
          }
        }

      },
      
      add: function (id_trip, comment) {

        var lastItem = plans.length;
        var plan = {
          id: lastItem,
          pid: parseInt(id_trip),
          title: 'Australie',
          data: comment,
          images: []
        };
        plans.push(plan);
      }
    };
  });
})();
*/
(function () {
  'use strict';

  angular.module('starter.services.plans', [])

  .factory('PlanService', function ($cordovaSQLite) {

    var plans = [];

    return {
      all: function () {
        return null;
      },
      remove: function (id_plan) {
          var query = "DELETE FROM plan WHERE id_plan = ?";
          $cordovaSQLite.execute(db, query, [id_plan]).then(function() {
              console.log("DELETED -> " + id_plan);
              //plans.splice(index, 1);
          }, function(err) {
              console.error(err);
          });
      },
      get: function (id_plan) {

          var obj = [];
          var query = "SELECT * FROM plan WHERE id_plan = ?";
          $cordovaSQLite.execute(db, query, [id_plan]).then(function(res) {
              if (res.rows.length > 0) {
                  obj.push({id_plan: res.rows.item(0).id_plan, 
                             id_trip: res.rows.item(0).id_trip, 
                             data: res.rows.item(0).data, 
                             time: res.rows.item(0).time
                           });
                  
                  //console.log(obj);
                  
              } else {
                  console.log("Problem get");
              }
          }, function(err) {
              console.error(err);
          });
          return obj;
      },
      edit: function(id_plan, comment) {
        var query = "UPDATE plan SET data = ? WHERE id_plan = ?";
          $cordovaSQLite.execute(db, query, [comment, id_plan]).then(function() {
              console.log("UPDATED -> " + id_plan);
          }, function(err) {
              console.error(err);
          });
      },
      getpid: function (id_trip) {
        plans = [];
        var query = "SELECT * FROM plan WHERE id_trip = ? ORDER BY time DESC";
          $cordovaSQLite.execute(db, query, [id_trip]).then(function(res) {
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
        }, function(err) {
            console.error(err);
        });
      }
    };
  });
})();
