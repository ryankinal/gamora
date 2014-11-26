'use strict';

angular.module('gamoraApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/routes/admin/admin.html',
        controller: 'AdminCtrl'
      });
  });
