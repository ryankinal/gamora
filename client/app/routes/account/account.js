'use strict';

angular.module('gamoraApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/routes/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/routes/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/routes/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });
