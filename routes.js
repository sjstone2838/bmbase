/*
  Configure routes used with ngRoute. We chose not to use $locationProvider.html5Mode(true);
  because using HTML5 pushstate requires that server routes are setup to mirror the routes
  in this file. Since this isn't a node course we're going to skip it. For all intensive
  purposes, html5 mode and url hash mode perform the same when within an angular app.
*/
angular.module('app').config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/templates/home.html',
    })
    .when('/dataset/:id',{
      templateUrl: '/templates/dataset.html',
      controller: 'DatasetCtrl',
      controllerAs: 'DatasetCtrl',
    })
    .when('/about', {
      templateUrl: '/templates/about.html',
    })
    .when('/team', {
      templateUrl: '/templates/team.html',
      controller: 'TeamCtrl',
      controllerAs: 'TeamCtrl',
    })
    .when('/team/:id/:f/:l', {
      templateUrl: '/templates/teammate.html',
      controller: 'TeammateCtrl',
      controllerAs: 'TeammateCtrl',
    })
    // .when('/contact', {
    //   templateUrl: '/templates/contact.html',
    // })
    .otherwise({redirectTo: '/'});
}]);