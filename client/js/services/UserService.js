'use strict';

// Service for accessing users through seneca-auth
function UserService($resource) {
  return $resource('http://localhost:4040/auth/', {}, {
    login: { 
      method:'POST', 
      url: 'http://localhost:4040/auth/login',
      withCredentials: true
    },
    active: {
      method: 'GET',
      url: 'http://localhost:4040/auth/instance',
      withCredentials: true
    },
    register: {
      method: 'POST',
      url: 'http://localhost:4040/auth/register',
      withCredentials: true
    }
  });
};

angular
  .module('checklist')
  .factory('UserService', UserService);
