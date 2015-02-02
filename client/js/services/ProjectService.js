'use strict';

function ProjectService($resource) {
  return $resource('http://localhost:4040/project/', {}, {
    save: {
      method: 'POST',
      url: 'http://localhost:4040/project/save',
      withCredentials: true
    },
    all: {
      method: 'GET',
      url: 'http://localhost:4040/project/user_projects',
      withCredentials: true
    }
  });
};

angular
  .module('checklist')
  .service('ProjectService', ProjectService);
