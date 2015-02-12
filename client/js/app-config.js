'use strict';

function config($stateProvider, $urlRouterProvider, $locationProvider) {
  // Default route to /
  $urlRouterProvider.otherwise('/');

  // Check route beforehand for authentication
  /*$urlRouterProvider.when('/', function(AuthService) {
    var authResult;
    console.log('running auth service check');
    return AuthService.loggedIn().promise
    .then(function(ok) {
      console.log('running promise callback');
      if (!ok) {
        console.log('recieved false information');
        authResult = '/login';
      } else {
        console.log('recieved valid information');
        authResult = true;
      }
      return authResult;
    });
  });*/

  $stateProvider
  .state('auth', {
    'abstract': true
  })
  // Front logged in state of application
  .state('home', {
    parent: 'auth',
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
  })
  .state('checklist', {
    templateUrl: 'partials/checklist-detail.html',
    url: 'checklist/:checklistId',
    controller: 'ChecklistController as checklist'
  });
}

angular
  .module('checklist')
  .config(config);
