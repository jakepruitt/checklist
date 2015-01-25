'use strict';

function AuthService($state, $rootScope, UserService) {
  var AuthService = {};

  AuthService.authorize = function() {
    console.log(UserService.active())
    //  .then(function(data) {
    //  var isAuthenticated = data.ok;
    //  console.log('UserService Promise success');

    //  if (!isAuthenticated) {
    //    $rootScope.returnToState = $rootScope.toState;
    //    $rootScope.returnToStateParams = $rootScope.toStateParams;

    //    $state.go('login');
    //  }
    //}, function(data) {
    //  console.log('Some sort of failure');
//      console.log(data);
 //     $rootScope.returnToState = $rootScope.toState;
  //    $rootScope.returnToStateParams = $rootScope.toStateParams;

   //   $state.go('login');
    //});
  };
  
  return AuthService;
}

angular
  .module('checklist')
  .factory('AuthService', AuthService);

