'use strict';

function HomeController(AuthService, ProjectService) {
  var home = this;
  home.projects = ProjectService.all();

  home.checkInstance = function() {
    home.user = AuthService.current();
  };

  home.logout = function() {
    AuthService.logout();
  };

  home.projectFormClosed = true;

  home.openProjectForm = function() {
    home.projectFormClosed = false;
  };

  home.newProject = function() {
    var project = new ProjectService({
      name: home.newProjectName
    });
    project.$save(function(project) {
      home.projects.push(project.project); 
      home.newProjectName = '';
      home.projectFormClosed = true;
    });
  };

  home.getProjects = function() {
    ProjectService.all(function(data) {
      home.projects = data;
    });
  };
}

angular
  .module('checklist')
  .controller('HomeController', HomeController);
