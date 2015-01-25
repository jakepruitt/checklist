'use strict';

function LoginController($state, UserService) {
  var login = this;
  login.user = new UserService();

  login.login = function() {
    login.user.$login(function success(data) {
      $state.go('home'); 
    }, function failure(response) {
      console.log('Recieved:', response);
      login.errMsg = response.data.why;
    });
  };
}

angular
  .module('checklist')
  .controller('LoginController', LoginController);
