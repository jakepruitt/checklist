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
      withCredentials: true,
      isArray: true,
      transformResponse: function(response) {
        response = angular.fromJson(response);
        response = response.projects;
        return response;
      }
    },
    load: {
      method: 'GET',
      url: 'http://localhost:4040/project/load/:id',
      withCredentials: true,
      transformResponse: function(response) {
        response = angular.fromJson(response);
        response = response.project;
        return response
      }
    }
  });
};

angular
  .module('checklist')
  .service('ProjectService', ProjectService);
