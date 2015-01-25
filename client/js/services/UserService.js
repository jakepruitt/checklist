'use strict';

function UserService($resource) {
  var _userEnt,
      _loggedIn,
      UserService = {};

  return $resource('http://localhost:4040/auth/', {}, {
    login: { 
      method:'POST', 
      url: 'http://localhost:4040/auth/login',
      withCredentials: false
    },
    active: {
      method: 'GET',
      url: 'http://localhost:4040/auth/instance',
      withCredentials: false
    }
  });

  UserService.login = function() {
    _userEnt = UserResource.login({
      username: UserService.username,
      password: UserService.password
    });

    _userEnt.$promise.then(function(data) {
      console.log('success!');
      _loggedIn = data.ok;
      console.log('Data:', data);
    }, function(data) {
      console.log('failure!');
      _loggedIn = data.ok;
      console.log('Data:', data);
    });
  };

  UserService.isLoggedIn = function() {
    console.log('isLoggedIn called:', _loggedIn);
    return _loggedIn;
  };

  UserService.active = function() {
    userEnt = UserResource.active();
    return userEnt;
  };

  return UserService;
}

angular
  .module('checklist')
  .factory('UserService', UserService);
