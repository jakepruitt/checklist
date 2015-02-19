'use strict';

function ProjectController($state, ProjectService, ChecklistService) {
  var project = this;
  
  project.resource = ProjectService.load({
    id: $state.params.projectId
  });

  project.checklistFormClosed = true;

  project.openChecklistForm = function() {
    project.checklistFormClosed = false;
  };

  project.closeChecklistForm = function() {
    project.checklistFormClosed = true;
  };

  project.openCloneForm = function(title) {
    project.checklistFormClosed = false;
    project.cloning = true;
    project.cloneTitle = title;
  };
  
  project.checklists = ChecklistService.project_checklists({
    project: $state.params.projectId
  });

  project.newChecklist = function() {
    ChecklistService.new_checklist({
      title: project.newChecklistTitle,
      project: $state.params.projectId
    }, function(checklist) {
      project.checklists.push(checklist.checklist);
      project.newChecklistTitle = '';
      project.checklistFormClosed = true;
    });
  };
};

angular
  .module('checklist')
  .controller('ProjectController', ProjectController);
