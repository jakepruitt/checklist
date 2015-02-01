'use strict';

function RegisterController(AuthService) {
  var register = this;

  register.register = function() {
    AuthService.register(register.username, register.password);
  };

  register.errMsg = '';
};

angular
  .module('checklist')
  .controller('RegisterController', RegisterController);
