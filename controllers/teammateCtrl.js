(function() {  
  function TeammateCtrl ($route, $routeParams, $location) {
    var vm = this;
    
    vm.id = $routeParams.id;
    vm.first = $routeParams.f;
    vm.last = $routeParams.l;
    vm. test = "Hello world";

  }

  angular.module('app').controller('TeammateCtrl', ["$route", "$routeParams", "$location", TeammateCtrl]);
})();


