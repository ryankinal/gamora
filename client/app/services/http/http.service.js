'use strict';

angular.module('gamoraApp')
  .factory('http', function ($http, $q, _) {
    var queryStringify = function(obj) {
      var pairs = [];
      _.forEach(obj, function(value, key) {
        pairs.push(key + '=' + encodeURIComponent(value));
      });
      return pairs.join('&');
    };

    return function(url, method, data) {
      var deferred = $q.defer(),
        options = {
          method: method
        };

      if (method.toUpperCase() === 'GET') {
        options.url = url + ((data) ? '?' + queryStringify(data) : '');
      } else {
        options.url = url;

        if (data) {
          options.data = data;
        }
      }

      $http(options).success(function(response) {
        deferred.resolve(response);
      }).error(function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    };
  });
