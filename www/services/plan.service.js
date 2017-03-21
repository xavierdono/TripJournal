(function () {
  'use strict';

  angular.module('starter.services.plans', [])

  .factory('PlanService', function () {

    var plans = [{
        id: 0,
        pid: 0,
        title: 'Australie',
        data: 'Visiter le temple Asakusa'
      },
      {
        id: 1,
        pid: 0,
        title: 'Australie',
        data: 'Manger Avocado Whopper'
      }
    ];

    return {
      all: function () {
        return plans;
      },
      remove: function (plan) {
        plans.splice(plans.indexOf(plan), 1);
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
      add: function (plan, planId) {
        plan.id   = plans.length;
        plan.pid  = planId;
        plan.data = 'test';
        plans.push(plan);
      }
    };
  });
})();
