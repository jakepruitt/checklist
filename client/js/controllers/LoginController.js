'use strict';

function LoginController(AuthService) {
  var login = this;

  login.login = function() {
    AuthService.login(login.username, login.password);
  };
};

angular
  .module('checklist')
  .controller('LoginController', LoginController);
