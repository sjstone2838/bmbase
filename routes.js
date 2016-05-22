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
    .when('/contact', {
      templateUrl: '/templates/contact.html',
    })
    .otherwise({redirectTo: '/'});
}]);