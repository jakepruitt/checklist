'use strict';

function ProjectController(ProjectService, $state) {
  var project = this;
  
  project.resource = ProjectService.load({
    id: $state.params.projectId
  });
};

angular
  .module('checklist')
  .controller('ProjectController', ProjectController);
