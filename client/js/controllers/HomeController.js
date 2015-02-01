'use strict';

function HomeController(AuthService) {
  var home = this;

  home.logout = function() {
    AuthService.logout();
  };
}

angular
  .module('checklist')
  .controller('HomeController', HomeController);
