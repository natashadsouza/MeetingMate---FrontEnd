/**
 * Created by Parag_2 on 5/14/2017.
 */
var MongoClient = require('mongodb').MongoClient;
var HashMap = require('hashmap');
var uri = "mongodb://admin:admin@cluster0-shard-00-00-axcdx.mongodb.net:27017,cluster0-shard-00-01-axcdx.mongodb.net:27017,cluster0-shard-00-02-axcdx.mongodb.net:27017/MeetingMate?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
var fs = require('fs');

module.exports = {

createCSV: function (){


//For the first graph for Employee vs Tone per meeting
MongoClient.connect(uri, function(err, db) {
    var cursor = db.collection('Meetings').find();
    var mapQuery1 = new HashMap();

    cursor.each(function(err, doc) {
        if (doc !=null){

            if(mapQuery1.get(doc.speaker)==undefined ){
                mapQuery1.set(doc.speaker,doc.tone);
            }else {
                var oldTone = parseFloat(mapQuery1.get(doc.speaker));
                var newTone = parseFloat(doc.tone);
                doc.tone=(oldTone+newTone).toString();
                mapQuery1.set(doc.speaker,((oldTone+newTone)/2).toString());
            }
        }else{
            //Create a file with headers
            fs.writeFile('file.csv', ('firstname,Tone'), function(err) {
                if (err) throw err;
            });
            //Append values
            mapQuery1.forEach(function(value, key) {
                fs.appendFile('file.csv', ('\n'+key+','+value), function (err) {
                    if (err) throw err;
                });
            });
        }
    });
    db.close();
});
}
}