(function() {  
  function TeamCtrl () {
    var vm = this;

    vm.teammates = [
      {id: 1, first: 'Sam', last: 'Stone', city: 'Boston'},
      {id: 2, first: 'Midori', last: 'Uehara', city: 'Boston'},
      {id: 3, first: 'Dan', last: 'Settel', city: 'LA'},
    ];

  }

  angular.module('app').controller('TeamCtrl', [TeamCtrl]);
})();
