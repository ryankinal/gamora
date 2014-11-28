'use strict';

angular.module('gamoraApp')
  .factory('rest', function (http, $q) {
    return function(endpoint) {
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
        save: function(obj) {
          var url = endpoint,
            method = 'POST';

          if (obj._id) {
            url += '/' + obj._id;
            method = 'PUT';
          }

          return http(url, method, obj);
        },
        destroy: function(id) {
          if (!id) {
            return $q.reject({error: 'ID is required'});
          } else {
            return http(url + '/' + id, 'DELETE');
          }
        }
      };
    }
  });
