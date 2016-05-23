(function() {  
  function DatasetCtrl ($routeParams, $http, ENV, Utils) {
    var vm = this;
    vm.id = Number($routeParams.id);
    var selectedFieldInfo = _.filter(Utils.getFieldInfo(), {id: vm.id})[0].data;
    
    var dur = 300;
    var totalWidth = 800;
    var leftOffset = 200;
    var maxLabelChars = 30;
    var rightOffset = 20;
    var topOffset = 40;
    var bottomOffset = 20;
    var gutter = 5;
    var barHeight = 20;
    var width = totalWidth - leftOffset - rightOffset;
    var height, totalHeight, bar, fieldname, yScale;

    vm.loading = true;
    vm.totalWidth = totalWidth;
    vm.hyphenate = function(string){
      return Utils.hyphenate(string);
    };

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
      height = vm.data.length * (barHeight + gutter) + gutter;
      totalHeight =  height + topOffset + bottomOffset;
      vm.totalHeight = totalHeight;

      d3.selectAll('.chartHolder')
        .append('rect')
        .attr('x', leftOffset)
        .attr('y', topOffset)
        .attr('width', width)
        .attr('height', height)
        .classed('chartOutline', true);

      barHeight = (height - ((vm.data.length + 1) * gutter)) / vm.data.length;
      
      yScale = d3.scale.ordinal()
        .domain(d3.range(vm.data.length))
        .rangeRoundBands([0, height]); 

      bar = d3.selectAll('.chartHolder')
        .selectAll('.g')
        .data(vm.data)
        .enter()
        .append('g')
        .attr('transform', function(d,i){
          return "translate(" + leftOffset + "," + (yScale(i) + topOffset + gutter) + ")";
        });

      var datasetName = _.findKey(selectedFieldInfo, function (value){
        return value == 'name';
      });
      var descriptionVars = [];
       _.filter(selectedFieldInfo,function(v,k){
        if (v == 'description'){
          descriptionVars.push(k);
        }
      });

      bar.append('rect')
        .classed('bar',true)
        .attr('height', barHeight)
        .attr('width',0)
        .attr('id', function(d){
          return d[datasetName] +"-value";
        })
        // add click-label
        .on('click',function(d,i){
          var text = "";
          text += '<strong>'+Utils.proper(datasetName)+':</strong> ' + d[datasetName] + '<br>';
          descriptionVars.forEach(function(descriptor,i){
            text += ('<strong>'+Utils.proper(descriptor) + ":</strong> " + d[descriptor] + "<br>");
          });
          // TODO: refactor jQuery to Angular?
          $('#dataDetail')
            .css("opacity", 0.90)
            .css('z-index', 1)
            .css('top',event.pageY)
            .css('left',event.pageX)
            .find('.detailLabel')
            .html(text);
        });

      // append axis-labels
      bar.append('text')
        .text(function(d,i){
          if  (d[datasetName].length > maxLabelChars){
            return d[datasetName].slice(0,maxLabelChars) + "...";
          }
          return d[datasetName];
        })
        .classed('label',true)
        .attr('x', -leftOffset)
        .attr('y', (barHeight + gutter) / 2 )
      ;

      // TODO: use of  * .725 is a hack, replace
      bar.append('path')
        .attr('d',"M "+ (-leftOffset) +"," + (barHeight + gutter / 2) + " L"+ (totalWidth * 0.725)+"," + (barHeight + gutter / 2) + " Z");

      bar.append('text')
       .classed('value',true)
       .attr('id', function(d){
          return d[datasetName] +"-value";
       });

      d3.selectAll('.chartHolder')
        .append("g")
        .attr('transform', function(){
          return "translate(" + leftOffset + "," + topOffset + ")";
        })
        .attr("class", "x-axis axis");

      vm.loading = false; 
    });

    vm.summaryStatistics = false;

    vm.selectField = function (field){
      vm.summaryStatistics = true;
      fieldname = field; 
      vm.fieldName = Utils.proper(fieldname);
      var fieldArray = vm.data.map(function(d){
        return Number(d[fieldname]);
      });

      vm.fieldCount = fieldArray.length;
      vm.fieldAverage = _.reduce(fieldArray, function(sum,n){
        return sum + n;
      }, 0) / vm.data.length;
      vm.fieldMax = d3.max(fieldArray);
      vm.fieldMin = d3.min(fieldArray);

      var xScale = d3.scale.linear()
        .domain([0, d3.max(vm.data.map(function(d){
          return Number(d[fieldname]);
        }))])
        .range([0,width - 40]);

       var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("top");

      var colorScale = d3.scale.linear()
        .domain([0, d3.max(vm.data.map(function(d){
          return Number(d[fieldname]);
        }))])
        .range(['lightgreen','darkblue','blue','purple']);

      bar.selectAll('.bar')
        .transition()
        .duration(dur *3)
        .attr('width', function (d){
          return xScale(Number(d[fieldname]));
        })
        .attr('fill',function(d,i){
          return colorScale(Number(d[fieldname]));
        });

      d3.selectAll('.value')
        // http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
        .text(function (d){
          return Number(d[fieldname]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        })
        .attr('x', function (d){
          return xScale(Number(d[fieldname])) + 10 ;
        })
        .attr('y', (barHeight + gutter) / 2 )
        .classed('label',true);

      d3.selectAll('.x-axis')
        .call(xAxis);
    };

    vm.closeDetailLabel = function(){
      $('#dataDetail').css("opacity", 0.0).css('z-index',-1);
    };

    // Bar Sorting
    var sortOrder = true;
    var sortItems = function (a, b) {
      if (sortOrder) {
          return a[fieldname] - b[fieldname];
      }
      return b[fieldname] - a[fieldname];
    };

    vm.sortBars = function (){
      sortOrder = !sortOrder;
      bar
        .sort(sortItems)
        .transition()
        .duration(dur)
        .attr('transform', function (d, i) {
            return "translate(" + leftOffset + "," + (yScale(i) + topOffset + gutter) + ")";
        });
    };
  }

  angular.module('app').controller('DatasetCtrl', ["$routeParams", "$http", "ENV", "Utils", DatasetCtrl]);
})();


