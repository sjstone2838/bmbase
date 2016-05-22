(function() {  
  function MainCtrl (ENV, $http, Utils) {
    var vm = this;
    var datasetIds = Utils.getFieldInfo().map(function(d){
      return d.id;
    });

    $http({
      method: 'GET',
      url: 'https://api.solvebio.com/v1/datasets?access_token=' + ENV.accessToken + '&limit=100',
    })
    .then(function(response){
      vm.datasets = response.data.data.filter(function (dataset){
        return datasetIds.indexOf(dataset.id) != -1;
      });
    });
  }

  angular.module('app').controller('MainCtrl', ['ENV', '$http', 'Utils', MainCtrl]);
})();
