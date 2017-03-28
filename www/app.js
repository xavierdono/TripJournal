  var db = null;
(function () {
  'use strict';

  angular.module('starter', ['ionic',
      'starter.plan',
      'starter.addplan',
      'starter.editplan',
      'starter.showplan',
      'starter.trip',
      'starter.addtrip',
      'starter.showtrip',
      'starter.addday',
      'starter.editday',
      'starter.services.plans',
      'starter.services.trips',
      'starter.services.file',
      'starter.services.image',
      'ngCordova'])

  .run(function ($ionicPlatform, $cordovaSQLite) {
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

      // Création de la base
      //db = window.sqlitePlugin.openDatabase({name: 'tripjournal.db', location: 'default'}); //android
      db = window.openDatabase("tripjournal.db", "1.0", "TripJournal", 0); //browser

      // Plan
      //$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS plan");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS plan (id_plan integer primary key, id_trip integer, data text, time text)");

      // Voyage
      $cordovaSQLite.execute(db, "DROP TABLE IF EXISTS trip");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS trip (id_trip integer primary key, default_image text, title text, date text, dateDebut text, dateFin text, clos integer)");

      // Journée
      $cordovaSQLite.execute(db, "DROP TABLE IF EXISTS day");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS day (id_day integer primary key, id_trip integer, title text, date text, dateShow text, comment text)");
      
      // Images
      $cordovaSQLite.execute(db, "DROP TABLE IF EXISTS image");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS image (id_image integer primary key, id_day integer, url text)");

      $cordovaSQLite.execute(db, "DROP TABLE IF EXISTS image_plan");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS image_plan (id_image integer primary key, id_plan integer, url text)");
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

    .state('tab.plan-add', {
      url: '/plan.add/:tripId',
      views: {
        'tab-plan': {
          templateUrl: 'plan/add-plan.html',
          controller: 'AddPlanCtrl'
        }
      }
    })

    .state('tab.plan-edit', {
      url: '/plan.edit/:tripId/:planId',
      views: {
        'tab-plan': {
          templateUrl: 'plan/edit-plan.html',
          controller: 'EditPlanCtrl'
        }
      }
    })

    .state('tab.plan-show', {
      url: '/plan.show/:tripId',
      views: {
        'tab-plan': {
          templateUrl: 'plan/show-plan.html',
          controller: 'ShowPlanCtrl'
        }
      }
    })

    // Afficher les voyages (Mes carnets de voyage)
    .state('tab.trip', {
      url: '/trip',
      views: {
        'tab-trip': {
          templateUrl: 'trip/trip.html',
          controller: 'TripCtrl'
        }
      }
    })

    // Ajouter un voyage
    .state('tab.trip-add', {
      url: '/trip.add',
      views: {
        'tab-trip': {
          templateUrl: 'trip/add-trip.html',
          controller: 'AddTripCtrl'
        }
      }
    })

    // Afficher un voyage (Affiche les jours)
    .state('tab.trip-show', {
      url: '/trip.show/:tripId',
      views: {
        'tab-trip': {
          templateUrl: 'trip/show-trip.html',
          controller: 'ShowTripCtrl'
        }
      }
    })

    // Ajout une journée
    .state('tab.day-add', {
      url: '/day.add/:tripId',
      views: {
        'tab-trip': {
          templateUrl: 'trip/add-day.html',
          controller: 'AddDayCtrl'
        }
      }
    })

    // Editer une journée
    .state('tab.day-edit', {
      url: '/day.edit/:tripId/:dayId',
      views: {
        'tab-trip': {
          templateUrl: 'trip/edit-day.html',
          controller: 'EditDayCtrl'
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/trip');

  });
})();
