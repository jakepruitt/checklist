'use strict';

// Factory for authenticating users. Uses the UserService
function AuthService($state, UserService) {
  var _userEnt, _loggedIn, AuthService = {};

  AuthService.login = function(username, password) {
    _userEnt = UserService.login({
      username: username,
      password: password
    });

    _userEnt.$promise.then(function(data) {
      console.log('success!');
      console.log('Data:', data);
      _loggedIn = !!data.ok;
      if (_loggedIn) {
        $state.go('home');
      }
    }, function(data) {
      console.log('failure!');
      console.log('Data:', data);
    });
  };

  AuthService.register = function(username, password) {
    _userEnt = UserService.register({
      username: username,
      password: password
    });

    _userEnt.$promise.then(function(data) {
      console.log('success!');
      console.log('Data:', data);
      _loggedIn = !!data.ok;
      if (_loggedIn) {
        $state.go('home');
      }
    }, function(data) {
      console.log('failure!');
      console.log('Data:',data);
    });
  };

  AuthService.current = function() {
    return _userEnt;
  };

  AuthService.loggedIn = function() {
    return _loggedIn;
  };

  AuthService.logout = function() {
    _loggedIn = false;
    _userEnt = null;
    $state.go('login');
  };

  return AuthService;
}

angular
  .module('checklist')
  .factory('AuthService', AuthService);

