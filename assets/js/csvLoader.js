define([
  'text!/assets/data.csv'   
], function( csv ){
    return {
        getData : function () {
            return csv; 
        }
    }
});