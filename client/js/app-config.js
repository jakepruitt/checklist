'use strict';

function config($stateProvider, $urlRouterProvider) {
  // Default route to /
  $urlRouterProvider.otherwise('/');

  $stateProvider
  // Login state for logging users in
  .state('login', {
    templateUrl: 'partials/login.html',
    url: '/login',
    controller: 'LoginController as login'
  })
  // Front logged in state of application
  .state('home', {
    templateUrl: 'partials/home.html',
    url: '/'
  });
}

angular
  .module('checklist')
  .config(config);
