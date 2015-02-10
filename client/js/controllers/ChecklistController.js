'use strict';

function ChecklistController($state, ChecklistService, EntryService) {
  var checklist = this;

  checklist.resource = ChecklistService.load({
    checklist: $state.params.checklistId
  });

  checklist.entries = EntryService.checklist_entries({
    checklist: $state.params.checklistId
  });

};

angular
  .module('checklist')
  .controller('ChecklistController', ChecklistController);
