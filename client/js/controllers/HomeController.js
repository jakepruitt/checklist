'use strict';

function HomeController($cookies) {
  var home = this;

  home.cookies = $cookies;

  home.testCookies = function() {
  };
}

angular
  .module('checklist')
  .controller('HomeController', HomeController);
