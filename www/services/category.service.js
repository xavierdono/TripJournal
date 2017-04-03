(function () {
  'use strict';

  angular.module('starter.services.categories', [])

  .factory('CategoryService', function () {

    var categories = [{
                          id_category: 0,
                          title: 'Hôtels'
                        },
                        {
                          id_category: 1,
                          title: 'Restaurants'
                        },
                        {
                          id_category: 2,
                          title: 'Activités'
                        },
                        {
                          id_category: 3,
                          title: 'Transports'
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
