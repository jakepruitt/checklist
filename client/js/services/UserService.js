'use strict';

function UserService() {
  return {};
}

app
  .module('checklist')
  .factory('UserService', UserService);
