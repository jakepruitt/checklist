'use strict';

function config($stateProvider, $urlRouterProvider, $locationProvider) {
  // Default route to /
  $urlRouterProvider.otherwise('/');

  // Check route beforehand for authentication
  /*$urlRouterProvider.when('/', function(AuthService) {
    var authResult;
    console.log('running auth service check');
    AuthService.loggedIn().promise
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
    //return true;
  });*/

  // Prevent $urlRouter from automatically intercepting URL changes;  
  // this allows you to configure custom behavior in between  
  // location changes and route synchronization:  
  $urlRouterProvider.deferIntercept();

  $stateProvider
  // Front logged in state of application
  .state('home', {
    templateUrl: 'partials/home.html',
    /*url: '/',*/
    'abstract': true,
    controller: 'HomeController as home'
  })
  .state('home.projects', {
    templateUrl: 'partials/projects.html',
    url:'/',
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
  .state('home.project', {
    templateUrl: 'partials/project-detail.html',
    url: 'project/:projectId',
    controller: 'ProjectController as project'
  });
  /*.state('home.checklist', {
    templateUrl: 'partials/checklist-detail.html',
    url: 'checklist/:checklistId',
    controller: 'ChecklistController as checklist'
  });*/
}

function run($rootScope, $urlRouter, $state, AuthService) {
  $rootScope.$on('$locationChangeSuccess', function(e) {
    if (AuthService.isLoggedIn()) return;
    if ($state.is('register')) return;

    e.preventDefault();

    AuthService.handleLogin().then(function(data) {
      if (!data.ok || !data.user) {
        return $state.go('login');
      } else {
        $urlRouter.sync();
      }
    }, function() {
      $state.go('login');
    });
  });

  $urlRouter.listen();
}

angular
  .module('checklist')
  .config(config)
  .run(run);
