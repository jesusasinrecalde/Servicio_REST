"use strict"

var restify = require('restify');  
var fs = require('fs');
const corsMiddleware = require('restify-cors-middleware');
var mongoose = require('mongoose');

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['pwd, Authorization'],
    exposeHeaders: ['API-Token-Expiry']
  });
  

var config = require('./config/config.js');

var server = restify.createServer();

server.use(restify.acceptParser(server.acceptable));  
server.use(restify.queryParser());  
server.use(restify.bodyParser());
server.pre(cors.preflight);
server.use(cors.actual);

var config = require('./config/config.js');

fs.readdirSync('./routes').forEach(function(curFile) {  
    if (curFile.substr(-3) === '.js') {
        let routes = require('./routes/' + curFile);
        routes.register(server);
    }
});

server.listen(config.LISENT_PORT, function() {  
    // establish connection to mongodb atlas
    mongoose.Promise=global.Promise;

    mongoose.connect(config.db.uri, {useMongoClient: true});

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('%s listening at %s', server.name, server.url);
            });
    
});