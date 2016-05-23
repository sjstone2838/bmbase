angular.module('app').factory("Utils", function UtilsFactory(){
  var activeDataset = null;

  // created manually
  var fieldInfo = [
    {id: 167, data:
      {
        publication_count: 'chartable',
        publication_count_by_year: 'data',
        source_name: 'description',
        description: 'description',
        drugs_count: 'chartable',
        trials_count: 'chartable',
        fda_tests_count: 'chartable',
        display_name: 'name',
      }
    },
    {id: 168, data:
      {
        company_description: 'description',
        drugs_count: 'chartable',
        company_type: 'description',
        stock_symbol: 'description',
        display_name: 'name',
        trials_count: 'chartable',
        fda_tests_count: 'chartable',
      }
    },
    {id: 170, data:
      {
        labels_count: 'chartable',
        display_name: 'name',
        description: 'description',
        generic_name: 'description',
        brand_name: 'description',
        drug_interventions_count: 'chartable',
        biomarker_count: 'chartable',
      }
    },
    {id: 171, data:
      {
        submission_date: 'description',
        approval_date: 'description',
        display_name: 'name',
        review_period_in_days: 'chartable',
        biomarkers_count: 'chartable',
        product_link: 'description',
      }
    },
    {id: 174, data:
      {
        biomarkers_count: 'chartable',
        publication_count: 'chartable',
        display_name: 'name',
        protein_name: 'description',
        description: 'description',
        publication_count_by_year: 'array',
      }
    },
    {id: 175, data:
      {
        therapeutic_area: 'name',
        diseases_count: 'chartable',
        drugs_count: 'chartable',
        biomarkers_count: 'chartable',
      }
    },
    {id: 176, data:
      {
        title: 'name',
        acronym: 'description',
        phase: 'description',
        recruitment: 'description',
        start_date: 'description',
        updated_date: "description",
        drugs_count: 'chartable',
        biomarkers_count: 'chartable',
        enrollment: 'chartable',
      }
    },
  ];

  return {
    getFieldInfo: function(){
      return fieldInfo;
    },

    proper: function (string){
      var properString = "";
      var words = string.split("_");
      var wordCount = words.length;

      words.forEach(function(word,i){
        properString += word[0].toUpperCase();
        properString += word.slice(1,word.length).toLowerCase();
        if (i != (words.length-1)){
          properString += " ";
        } 
      });
      return properString;
    },

    hyphenate: function (string){
      // regex matches all spaces with "g" global modifer (vs. first space)
      return string.replace(/ /g,"-");
    },
  };

});