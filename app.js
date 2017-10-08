"use strict"

var restify = require('restify');  
var fs = require('fs');

var server = restify.createServer();

server.use(restify.acceptParser(server.acceptable));  
server.use(restify.queryParser());  
server.use(restify.bodyParser());
server.use(restify.CORS());

var config = require('./config/config.js');

fs.readdirSync('./routes').forEach(function(curFile) {  
    if (curFile.substr(-3) === '.js') {
        let routes = require('./routes/' + curFile);
        routes.register(server);
    }
});

server.listen(config.LISENT_PORT, function() {  
    console.log('%s listening at %s', server.name, server.url);
});