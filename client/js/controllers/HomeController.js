'use strict';

function HomeController(AuthService, ProjectService) {
  var home = this;
  home.projects = [];

  home.checkInstance = function() {
    home.user = AuthService.current();
  };

  home.logout = function() {
    AuthService.logout();
  };

  home.newProject = function() {
    var project = new ProjectService({name: 'Project1'});
    home.projects.push(project);
    project.$save();
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
