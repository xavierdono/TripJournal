(function () {
  'use strict';

  angular.module('starter.services.categories', [])

  .factory('CategoryService', function () {

    var categories = [{
                          id_category: 0,
                          title: 'Hôtel'
                        },
                        {
                          id_category: 1,
                          title: 'Restaurant'
                        },
                        {
                          id_category: 2,
                          title: 'Activités'
                        },
                        {
                          id_category: 3,
                          title: 'Sorties'
                        }
                      ];

    return {
      all: function () {
          return categories;
      },
      get: function (id_category) {
        for (var i = 0; i < categories.length; i++) {
          if (categories[i].id_category === parseInt(id_category)) {
            return categories[i];
          }
        }
        return null;
      }
      
    };
  });
})();
