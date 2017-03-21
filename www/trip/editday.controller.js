(function () {
  'use strict';

  angular.module('starter.editday', [])

  .controller('EditDayCtrl', function ($scope, $stateParams) {
    console.log("EditDayCtrl", $stateParams.tripId, $stateParams.dayId);
  });
})();
