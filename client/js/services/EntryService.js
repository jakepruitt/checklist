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
        response = response.entries;
        return response;
      }
    },
    new_entry: {
      method: 'POST',
      url: 'http://localhost:4040/entry/add_entry',
      withCredentials: true
    },
    set_complete: {
      method: 'POST',
      url: 'http://localhost:4040/entry/set_complete',
      withCredentials: true
    },
    remove_entry: {
      method: 'POST',
      url: 'http://localhost:4040/entry/remove_entry',
      withCredentials: true
    }
  });
};

angular
  .module('checklist')
  .service('EntryService', EntryService);
