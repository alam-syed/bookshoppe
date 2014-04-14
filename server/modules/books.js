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
        db.collection('books', {strict: true}, function(err, collection) {
            if (err) {
                console.log("The books collection does not exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
var books = db.collection('books');

/* methods related to subjects */

exports.findAll = function(callback) {
    books.find().toArray(function(err, items) {
        console.log('books send from DB');
        callback(items);
    });
};

exports.getAuthors = function(callback) {
    books.aggregate([{$group:{_id:'$author', 'count':{$sum: 1}}},{ $sort : { '_id.name':1 }}], function(err, items) {
        console.log('authors send from DB');
        callback(items);
    });
    /*books.distinct('author', function(err, items) {
        console.log('authors send from DB');
        callback(items);
    });*/
};

exports.authorBooks = function(id, callback) {
    console.log('Retrieving books for author: ' + id);
    books.find({'author.authorId':id}).toArray(function(err, item) {
        callback(item);
    });
};

exports.subjectBooks = function(id, callback) {
    console.log('Retrieving books for subject: ' + id);
    books.find({'subject.subjectId':id}).toArray(function(err, item) {
        callback(item);
    });
};

exports.findById = function(id, callback) {
    console.log('Retrieving book: ' + id);
    books.findOne({'_id': new BSON.ObjectID(id)}, function(err, item) {
        callback(item);
    });
};

var populateDB = function() {
    var fs = require('fs');
    var file = './data/books.json';

    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        var books = JSON.parse(data);
        db.collection('books', function(err, collection) {
            if (err) {
                throw err;
            }
            collection.insert(books, {safe: true}, function(err, result) {
                if (err) {
                    throw err;
                }
            });
        });
    });
};