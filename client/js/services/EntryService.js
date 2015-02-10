'use strict';

function EntryService($resource) {
  return $resource('http://localhost:4040/entry/', {}, {
    checklist_entries: {
      method: 'GET',
      url: 'http://localhost:4040/entry/checklist_entries',
      withCredentials: true,
      isArray: true,
      transformResponse: function(response) {
        response = angular.fromJson(response);
        response = response.checklists;
        return response;
      }
    }
  });
};

angular
  .module('checklist')
  .service('EntryService', EntryService);
