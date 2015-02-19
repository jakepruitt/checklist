'use strict';

function HomeController($state, AuthService, ProjectService) {
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
    if (!$state.is('home.projects'))
      $state.go('home.projects');
    home.projectFormClosed = false;
  };

  home.closeProjectForm = function() {
    home.projectFormClosed = true;
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
