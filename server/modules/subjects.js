var MongoDB = require('mongodb').Db;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSONPure;

var dbPort 		= 27017;
var dbHost 		= 'localhost';
var dbName 		= 'bookshoppe';

/* establish the database connection */

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});

db.open(function(err, db){
    if (!err) {
        console.log("Connected to bookshoppe database");
        db.collection('subjects', {strict: true}, function(err, collection) {
            if (err) {
                console.log("The subjects collection does not exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
var subjects = db.collection('subjects');

/* methods related to subjects */

exports.findAll = function(callback) {
    subjects.find().toArray(function(err, items) {
        console.log('subjects send from DB');
        callback(items);
    });
};

var populateDB = function() {
    var fs = require('fs');
    var file = './data/subjects.json';

    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        var subjects = JSON.parse(data);
        db.collection('subjects', function(err, collection) {
            if (err) {
                throw err;
            }
            collection.insert(subjects, {safe: true}, function(err, result) {
                if (err) {
                    throw err;
                }
            });
        });
    });
};