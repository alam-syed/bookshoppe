
var BOOKS = require('./modules/books');
var SUBJECTS = require('./modules/subjects');

module.exports = function(app) {

    app.get('/api/subjects', function(req, res) {
        SUBJECTS.findAll(function (items){
            res.send(items);
        });
    });

    app.get('/api/authors', function(req, res) {
        BOOKS.getAuthors(function (items){
            res.send(items);
        });
    });

    app.get('/api/books/:id', function(req, res) {
        BOOKS.findById(id, function (items){
            res.send(items);
        });
    });

    app.get('/api/authorBooks/:id', function(req, res) {
        var id = parseInt(req.params.id);
        BOOKS.authorBooks(id, function (items){
            res.send(items);
        });
    });

    app.get('/api/subjectBooks/:id', function(req, res) {
        var id = parseInt(req.params.id);
        BOOKS.subjectBooks(id, function (items){
            res.send(items);
        });
    });

    app.get('*', function(req, res) { res.send('404', 404); });
}