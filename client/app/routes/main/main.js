'use strict';

angular.module('gamoraApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/routes/main/main.html',
        controller: 'MainCtrl'
      });
  });
