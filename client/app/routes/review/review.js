'use strict';

angular.module('gamoraApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('review', {
        url: '/review',
        template: '<ui-view/>',
        controller: 'ReviewCtrl',
        params: {
          id: ''
        }
      });

    $stateProvider
      .state('review.add', {
        url: '/add',
        templateUrl: 'app/routes/review/edit.html',
        controller: 'ReviewCtrl',
        authenticate: true
      });

    $stateProvider
      .state('review.view', {
        url: '/{id}',
        templateUrl: 'app/routes/review/review.html',
        controller: 'ReviewCtrl',
        params: {
          id: ''
        }
      });

    $stateProvider
      .state('review.edit', {
        url: '/{id}/edit',
        templateUrl: 'app/routes/review/edit.html',
        controller: 'ReviewCtrl',
        params: {
          id: ''
        }
      });
  });
