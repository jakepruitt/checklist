'use strict';

// Factory for authenticating users. Uses the UserService
function AuthService($state, $q, UserService) {
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
        $state.go('home.projects');
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
        $state.go('home.projects');
      }
    }, function(data) {
      console.log('failure!');
      console.log('Data:',data);
    });
  };

  AuthService.current = function() {
    return _userEnt || UserService.active(); 
  };

  AuthService.isLoggedIn = function() {

    if (_loggedIn) {
      return true;
    } else {
      return false;
    }
  };

  AuthService.handleLogin = function() {
    return UserService.active().$promise;
  };

  AuthService.logout = function() {
    _loggedIn = false;
    _userEnt = null;

    UserService.logout();
    $state.go('login');
  };

  return AuthService;
}

angular
  .module('checklist')
  .factory('AuthService', AuthService);

