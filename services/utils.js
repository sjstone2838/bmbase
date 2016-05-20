angular.module('app').factory("Utils", function UtilsFactory(){
  var activeDataset = null;

  // created manually
  var fieldInfo = [
    {id: 175, data:
      {
        biomarkers_count: 'chartable',
        diseases_count: 'chartable',
        drugs_count: 'chartable',
        therapeutic_area: 'name',
      }
    },
    {id: 174, data:
      {
        biomarkers_count: 'chartable',
        publication_count: 'chartable',
        display_name: 'name',
        protein_name: 'description',
        description: 'description',
        publication_count_by_year: 'array'
      }
    },

  ]

  return {
    getFieldInfo: function(){
      return fieldInfo;
    },

    setDataset: function(dataset){
      activeDataset = dataset;
    },

    getDataset: function(){
      return activeDataset;
    },

    proper: function (string){
      var properString = "";
      var words = string.split("_");
      var wordCount = words.length;

      words.forEach(function(word,i){
        properString += word[0].toUpperCase();
        properString += word.slice(1,word.length).toLowerCase();
        if (i != (words.length-1)){
          properString += " "
        } 
      });
      return properString;
    }
  }

})