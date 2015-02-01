'use strict';

function config($stateProvider, $urlRouterProvider) {
  // Default route to /
  $urlRouterProvider.otherwise('/');

  // Check route beforehand for authentication
  $urlRouterProvider.when('/', function(AuthService) {
    if (!AuthService.loggedIn()) {
      return '/login';
    } else {
      return true;
    }
  });

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
    url: '/',
    controller: 'HomeController as home'
  });
}

angular
  .module('checklist')
  .config(config);
