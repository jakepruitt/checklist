'use strict';

function ChecklistController($state, ChecklistService, EntryService) {
  var checklist = this;

  checklist.resource = ChecklistService.load({
    checklist: $state.params.checklistId
  });

  checklist.entries = EntryService.checklist_entries({
    checklist: $state.params.checklistId
  }, function(data, dat) {
    console.log(data);
    console.log(dat);
  });

  checklist.entryFormClosed = true;

  checklist.openEntryForm = function() {
    checklist.entryFormClosed = false;
  };

  checklist.newEntry = function() {
    EntryService.new_entry({
      title: checklist.newEntryTitle,
      checklist: $state.params.checklistId,
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
};

angular
  .module('checklist')
  .controller('ChecklistController', ChecklistController);
