'use strict';

function HomeController($cookies, AuthService) {
  var home = this;

  home.cookies = $cookies;
  console.log($cookies);

  home.checkInstance = function() {
    home.user = AuthService.current();
  };

  home.logout = function() {
    AuthService.logout();
  };
}

angular
  .module('checklist')
  .controller('HomeController', HomeController);
