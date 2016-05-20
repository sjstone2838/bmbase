(function() {  
  function DatasetCtrl ($route, $routeParams, $location, $http, ENV, Utils) {
    var vm = this;
    vm.id = $routeParams.id * 1;
    var selectedFieldInfo = _.filter(Utils.getFieldInfo(), {id: vm.id})[0].data;

    // for offline use
    // vm.fields = JSON.parse('[{"id": 6777,"class_name": "DatasetField","name": "biomarkers_count","description": "","data_type": "long","url": "https://api.solvebio.com/v1/dataset_fields/6777","created_at": "2015-06-11T22:40:31.229Z","updated_at": "2015-06-11T22:40:31.229Z","dataset": "BiomarkerBase/1.0.0-2015-06-03/TherapeuticAreas","dataset_id": 175,"facets_url": "https://api.solvebio.com/v1/dataset_fields/6777/facets","is_hidden": false,"is_valid": false,"ordering": 0,"is_list": null,"entity_type": null},{"id": 6775,"class_name": "DatasetField","name": "diseases_count","description": "","data_type": "long","url": "https://api.solvebio.com/v1/dataset_fields/6775","created_at": "2015-06-11T22:40:31.220Z","updated_at": "2015-06-11T22:40:31.220Z","dataset": "BiomarkerBase/1.0.0-2015-06-03/TherapeuticAreas","dataset_id": 175,"facets_url": "https://api.solvebio.com/v1/dataset_fields/6775/facets","is_hidden": false,"is_valid": false,"ordering": 0,"is_list": null,"entity_type": null},{"id": 6776,"class_name": "DatasetField","name": "drugs_count","description": "","data_type": "long","url": "https://api.solvebio.com/v1/dataset_fields/6776","created_at": "2015-06-11T22:40:31.225Z","updated_at": "2015-06-11T22:40:31.225Z","dataset": "BiomarkerBase/1.0.0-2015-06-03/TherapeuticAreas","dataset_id": 175,"facets_url": "https://api.solvebio.com/v1/dataset_fields/6776/facets","is_hidden": false,"is_valid": false,"ordering": 0,"is_list": null,"entity_type": null},{"id": 6773,"class_name": "DatasetField","name": "therapeutic_area","description": "","data_type": "string","url": "https://api.solvebio.com/v1/dataset_fields/6773","created_at": "2015-06-11T22:40:31.212Z","updated_at": "2015-06-11T22:40:31.212Z","dataset": "BiomarkerBase/1.0.0-2015-06-03/TherapeuticAreas","dataset_id": 175,"facets_url": "https://api.solvebio.com/v1/dataset_fields/6773/facets","is_hidden": false,"is_valid": false,"ordering": 0,"is_list": null,"entity_type": null},{"id": 6774,"class_name": "DatasetField","name": "therapeutic_areas_id","description": "","data_type": "long","url": "https://api.solvebio.com/v1/dataset_fields/6774","created_at": "2015-06-11T22:40:31.216Z","updated_at": "2015-06-11T22:40:31.216Z","dataset": "BiomarkerBase/1.0.0-2015-06-03/TherapeuticAreas","dataset_id": 175,"facets_url": "https://api.solvebio.com/v1/dataset_fields/6774/facets","is_hidden": false,"is_valid": false,"ordering": 0,"is_list": null,"entity_type": null}]');

    var dur = 300;
    var totalWidth = 800;
    var totalHeight = 400;
    var leftOffset = 50;
    var rightOffset = 50;
    var topOffset = 50;
    var bottomOffset = 100;
    var width = totalWidth - leftOffset - rightOffset;
    var height = totalHeight - topOffset - bottomOffset;
    var gutterMax = 10;
    var gutter; 
    var bar, barWidth; 

    d3.selectAll('.chartHolder')
      .append('rect')
      .attr('x', leftOffset)
      .attr('y', topOffset)
      .attr('width', width)
      .attr('height', height)
      .classed('chartOutline', true);
    
    // Dataset description and depository
    $http({
      method: 'GET',
      url: 'https://api.solvebio.com/v1/datasets/' + vm.id +'?access_token=' + ENV.accessToken,
    })
    .then(function(response){
      vm.description = response.data.description;
      vm.depository = response.data.depository;
    });

    // Dataset fields
    $http({
      method: 'GET',
      url: 'https://api.solvebio.com/v1/datasets/' + vm.id +'/fields?access_token=' + ENV.accessToken + '&limit=10000',
    })
    .then(function(response){
      vm.fields = response.data.data;
      vm.fields.forEach(function(field){
        field.properName = Utils.proper(field.name);
        field.graphicType = selectedFieldInfo[field.name];
      });
    });

    // Dataset data
    $http({
      method: 'GET',
      url: 'https://api.solvebio.com/v1/datasets/' + vm.id +'/data?access_token=' + ENV.accessToken + '&limit=10000',
    })
    .then(function(response){
      vm.data = response.data.results;
      gutter = width - ((vm.data.length + 1) * gutterMax) < 0 ? 0 : gutterMax;

      barWidth = (width - ((vm.data.length + 1) * gutter)) / vm.data.length;
      
      bar = d3.selectAll('.chartHolder')
        .selectAll('.g')
        .data(vm.data)
        .enter()
        .append('g')
        .attr('transform', function(d,i){return "translate(" + (i * (barWidth + gutter) + leftOffset + gutter) + ", 0)"})
      ;

      bar.append('rect')
        .classed('bar',true)
        .attr('width', barWidth);

      var datasetName = _.findKey(selectedFieldInfo, function (value){return value == 'name'});

      // append label
      bar.append('text')
        .text(function(d,i){return d[datasetName]})
        .classed('label',true)
        .attr('y', topOffset + height)
        .attr('transform', function(d,i){ 
          var x = i * (barWidth + gutter) + leftOffset;
          return 'rotate(45 -20,' + (topOffset + height )+')';
        })
      ;

      bar.append('text')
       .classed('value',true)
      ;

      d3.selectAll('.chartHolder')
        .append("g")
        .attr('transform', function(){return "translate(" + leftOffset + "," + topOffset + ")"})
        .attr("class", "y-axis axis")

    });

    // for offline use
    // vm.data = JSON.parse('[{"therapeutic_area": "Antiinfectives","diseases_count": 10,"drugs_count": 30,"therapeutic_areas_id": 4,"_sbid": 4,"biomarkers_count": 48},{"therapeutic_area": "Hematology","diseases_count": 64,"drugs_count": 80,"therapeutic_areas_id": 9,"_sbid": 9,"biomarkers_count": 563},{"therapeutic_area": "Musculoskeletal","diseases_count": 40,"drugs_count": 28,"therapeutic_areas_id": 11,"_sbid": 11,"biomarkers_count": 359},{"therapeutic_area": "Reproductive and Urologic","diseases_count": 45,"drugs_count": 43,"therapeutic_areas_id": 16,"_sbid": 16,"biomarkers_count": 509},{"therapeutic_area": "Antivirals","diseases_count": 8,"drugs_count": 34,"therapeutic_areas_id": 5,"_sbid": 5,"biomarkers_count": 57},{"therapeutic_area": "Neurology","diseases_count": 90,"drugs_count": 36,"therapeutic_areas_id": 12,"_sbid": 12,"biomarkers_count": 451},{"therapeutic_area": "Rheumatology","diseases_count": 49,"drugs_count": 53,"therapeutic_areas_id": 17,"_sbid": 17,"biomarkers_count": 477},{"therapeutic_area": "Analgesics","diseases_count": 3,"drugs_count": 35,"therapeutic_areas_id": 1,"_sbid": 1,"biomarkers_count": 8},{"therapeutic_area": "Cardiovascular","diseases_count": 44,"drugs_count": 95,"therapeutic_areas_id": 6,"_sbid": 6,"biomarkers_count": 754},{"therapeutic_area": "Oncology","diseases_count": 106,"drugs_count": 289,"therapeutic_areas_id": 13,"_sbid": 13,"biomarkers_count": 1655},{"therapeutic_area": "Transplantation","diseases_count": 4,"drugs_count": 11,"therapeutic_areas_id": 18,"_sbid": 18,"biomarkers_count": 74},{"therapeutic_area": "Antiarrhythmics","diseases_count": 1,"drugs_count": 7,"therapeutic_areas_id": 2,"_sbid": 2,"biomarkers_count": 13},{"therapeutic_area": "Dermatology and Dental","diseases_count": 47,"drugs_count": 23,"therapeutic_areas_id": 7,"_sbid": 7,"biomarkers_count": 230},{"therapeutic_area": "Psychiatry","diseases_count": 18,"drugs_count": 38,"therapeutic_areas_id": 14,"_sbid": 14,"biomarkers_count": 90},{"therapeutic_area": "Ophthalmology","diseases_count": 7,"drugs_count": 4,"therapeutic_areas_id": 19,"_sbid": 19,"biomarkers_count": 25},{"therapeutic_area": "Antifungals","diseases_count": 3,"drugs_count": 4,"therapeutic_areas_id": 3,"_sbid": 3,"biomarkers_count": 24},{"therapeutic_area": "Gastroenterology","diseases_count": 38,"drugs_count": 26,"therapeutic_areas_id": 8,"_sbid": 8,"biomarkers_count": 391},{"therapeutic_area": "Metabolic and Endocrinology","diseases_count": 165,"drugs_count": 109,"therapeutic_areas_id": 10,"_sbid": 10,"biomarkers_count": 866},{"therapeutic_area": "Pulmonary","diseases_count": 17,"drugs_count": 35,"therapeutic_areas_id": 15,"_sbid": 15,"biomarkers_count": 239}]');
    
    vm.selectField = function (fieldname){
      var yScale = d3.scale.linear()
        .domain([0, d3.max(vm.data.map(function(d){return d[fieldname]}))])
        .range([height,0]);

       var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

      bar.selectAll('.bar')
        .transition()
        .duration(dur)
        .attr('y', function (d){return topOffset + yScale(d[fieldname])})
        .attr('height', function (d){return height - yScale(d[fieldname])})

      d3.selectAll('.value')
        .transition()
        .duration(dur)
        .text(function (d){return d[fieldname]})
        .attr('fill','white')
        .attr('y', function (d){return topOffset + yScale(d[fieldname]) + 10 })

      
      d3.selectAll('.y-axis')
        .call(yAxis);

    };

  }

  angular.module('app').controller('DatasetCtrl', ["$route", "$routeParams", "$location", "$http", "ENV", "Utils", DatasetCtrl]);
})();


