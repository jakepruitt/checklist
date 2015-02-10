'use strict';

function ChecklistService($resource) {
  return $resource('http://localhost:4040/checklist/', {}, {
    project_checklists: {
      method: 'GET',
      url: 'http://localhost:4040/checklist/project_checklists',
      withCredentials: true,
      isArray: true,
      transformResponse: function(response) {
        response = angular.fromJson(response);
        response = response.checklists;
        return response;
      }
    },
    new_checklist: {
      method: 'POST',
      url: 'http://localhost:4040/checklist/new_checklist',
      withCredentials: true,
    },
    load: {
      method: 'GET',
      url: 'http://localhost:4040/checklist/load_checklist/:checklist',
      withCredentials: true,
      transformResponse: function(response) {
        response = angular.fromJson(response);
        response = response.checklist;
        return response;
      }
    }
  });
}

angular
  .module('checklist')
  .service('ChecklistService', ChecklistService);
