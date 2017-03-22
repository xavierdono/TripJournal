(function () {
  'use strict';

  angular.module('starter.addplan', [])

  .controller('AddPlanCtrl', function ($scope, PlanService) {

      $scope.addPlan = function (plan, planId) {
      var plan = [{
        id: 3,
        pid: 0,
        title: 'Australie',
        data: plan.comment
      }];    

      PlanService.add(plan);
      window.location.href = '#/tab/plan.show/0';
    }

  
  });
})();
