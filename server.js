
/**
 * Book Shoppe
 * More Info : alam.syed@gmail.com
 * Copyright (c) 2014 Syed Masudul Alam
 **/

var express = require('express');
var path = require('path');
var http = require('http');
var app = express();

app.configure(function(){
    app.set('port', 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 's6a7aa6s6s6a7q7q6ff6' }));
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

require('./server/router')(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
})