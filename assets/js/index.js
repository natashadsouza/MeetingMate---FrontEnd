require.config({
    paths: {
        text : '/bower_components/text/text',
        csvLoader : '/js/csv-loader'
    }
});

// Start the application 
require( ['csvLoader'], function( csvLoader ){
    console.log( csvLoader.getData() );
});