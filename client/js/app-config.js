'use strict';

function config($stateProvider) {
  $stateProvider
  .state('login', {
    templateUrl: 'partials/login.html',
    url: '/login'
  })
  .state('home', {
    templateUrl: 'partials/home.html',
    url: '/'
  });
}

angular
  .module('checklist')
  .config(config);
