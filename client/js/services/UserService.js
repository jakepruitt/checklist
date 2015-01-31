'use strict';

// Service for accessing users through seneca-auth
function UserService($resource) {
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
}

angular
  .module('checklist')
  .factory('UserService', UserService);
