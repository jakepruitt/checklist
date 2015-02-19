'use strict';

function ChecklistController($scope, $state, ChecklistService, EntryService) {
  var checklist = this;

  checklist.resource = ChecklistService.load({
    checklist: $scope.checklistIter.id
  });

  checklist.entries = EntryService.checklist_entries({
    checklist: $scope.checklistIter.id
  }, function(data, dat) {
    console.log(data);
    console.log(dat);
  });

  checklist.entryFormClosed = true;

  checklist.openEntryForm = function() {
    checklist.entryFormClosed = false;
  };

  checklist.closeEntryForm = function() {
    checklist.entryFormClosed = true;
  };

  checklist.newEntry = function() {
    EntryService.new_entry({
      title: checklist.newEntryTitle,
      checklist: $scope.checklistIter.id,
      completed: false
    }, function(entry) {
      console.log(entry);
      checklist.entries.push(entry.entry);
      checklist.newEntryTitle = '';
      checklist.entryFormClosed = true;
    });
  };

  checklist.saveState = function(entry) {
    EntryService.set_complete({
      entry: entry.id,
      complete: entry.complete
    });
  };

  checklist.removeEntry = function(index) {
    EntryService.remove_entry({
      entry: checklist.entries[index].id
    }, function() {
      checklist.entries.splice(index, 1);
    });
  };
};

angular
  .module('checklist')
  .controller('ChecklistController', ChecklistController);
