'use strict';

angular.module('gamoraApp')
  .factory('game', function (http, $q, _) {
    var endpoint = '/api/games';

    return {
      get: function(filters) {
        return http(endpoint, 'GET', filters);
      },
      getById: function(id) {
        if (!id) {
          return $q.reject({error: 'ID is required'});
        } else {
          var url = endpoint + '/' + id;
          return http(url, 'GET');
        }
      },
      save: function(game) {
        var url = endpoint,
          method = 'POST';

        if (game._id) {
          url += '/' + id;
          method = 'PUT';
        }

        return http(url, method, game);
      },
      destroy: function(id) {
        if (!id) {
          return $q.reject({error: 'ID is required'});
        } else {
          return http(url + '/' + id, 'DELETE');
        }
      }
    };
  });
