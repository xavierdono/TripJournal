(function () {
  'use strict';

  angular.module('starter.addplan', [])

  .controller('AddPlanCtrl', function ($scope, PlanService) {

      $scope.addPlan = function (plan, planId) {    
        PlanService.add(0, plan.comment);

      console.log(PlanService.all());
      window.location.href = '#/tab/plan.show/0';
    }

  
  });
})();
