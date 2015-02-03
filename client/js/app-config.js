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
  // Front logged in state of application
  .state('home', {
    templateUrl: 'partials/home.html',
    url: '/',
    controller: 'HomeController as home'
  })
  // Login state for logging users in
  .state('login', {
    templateUrl: 'partials/login.html',
    url: '/login',
    controller: 'LoginController as login'
  })
  .state('register', {
    templateUrl: 'partials/register.html',
    url: '/register',
    controller: 'RegisterController as register'
  })
  .state('project', {
    templateUrl: 'partials/project-detail.html',
    url: 'project/:projectId',
    controller: 'ProjectController as project'
  });
}

angular
  .module('checklist')
  .config(config);
