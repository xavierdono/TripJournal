angular.module('starter', ['ionic', 
						   'starter.plan', 
						   'starter.trip', 
						   'starter.addtrip', 
						   'starter.showtrip', 
						   'starter.services.trips', 
						   'starter.services.file',
						   'starter.services.image',
						   'ngCordova'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.plan', {
    url: '/plan',
    views: {
      'tab-plan': {
        templateUrl: 'plan/plan.html',
        controller: 'PlanCtrl'
      }
    }
  })

  .state('tab.trip', {
    url: '/trip',
    views: {
      'tab-trip': {
        templateUrl: 'trip/trip.html',
        controller: 'TripCtrl'
      }
    }
  })
  .state('tab.trip-add', {
    url: '/trip.add',
    views: {
      'tab-trip': {
        templateUrl: 'trip/add-trip.html',
        controller: 'AddTripCtrl'
      }
    }
  })
  .state('tab.trip-show', {
    url: '/trip.show/:tripId',
    views: {
      'tab-trip': {
        templateUrl: 'trip/show-trip.html',
        controller: 'ShowTripCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/trip');

});