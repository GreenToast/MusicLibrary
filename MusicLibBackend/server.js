// import express
var express = require('express');

// init express app
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :true}));

//load Config
var config = require('./config.js');
var neoMusicServer = require('./neoServer');

neoMusicServer.initialize(
    {
        url: config.musicNeo4jServerUrl,
        auth: config.musicNeo4jUsername+':'+config.musicNeo4jPassword
    });

// set cors headers for all requests
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



app.post('/api/:type', function (req, res) {
    var type = capitalizeFirstLetter(req.params.type);
    if(neoMusicServer.allowedType(type)){
        var type = capitalizeFirstLetter(req.params.type);
        neoMusicServer.createOrUpdate(type,req.body).then(
            function(result){res.json(result);},
            function(error){res.json(err)}
        );
    }
    else{
      res.send(400);
    }
});



app.delete('/api/:type/:id', function (req, res) {
    var type = capitalizeFirstLetter(req.params.type);
    if(neoMusicServer.allowedType(type)){
        var type = capitalizeFirstLetter(req.params.type);
        var id = req.params.id;
        neoMusicServer.deleteById(parseInt(req.params.id),type).then(
            function(result){res.send(200);},
            function(error){res.json(err);});
    }
    else{
      res.send(400);
    }
});

app.put('/api/:type/:id', function (req, res) {
    
    var type = capitalizeFirstLetter(req.params.type);
    if(neoMusicServer.allowedType(type)){
        var type = capitalizeFirstLetter(req.params.type);
        var id = req.params.id;
        neoMusicServer.createOrUpdate(type,req.body,parseInt(req.params.id)).then(
            function(result){res.send(200);},
            function(error){res.json(err)}
        );
    }
    else{
      res.send(400);
    }
});

app.get('/api/:type', function (req, res) {
    var type = capitalizeFirstLetter(req.params.type);
    if(neoMusicServer.allowedType(type)){
        var type = capitalizeFirstLetter(req.params.type);
        neoMusicServer.get(type).then(
            function(result){res.json(result);},
            function(error){res.json(err)}
        );
    }
    else{
      res.send(400);
    }
});

app.get('/api/:type/:id', function (req, res) {
    var type = capitalizeFirstLetter(req.params.type);
    var relations = [];
    var validRel = true;
    var toType = req.query.relation;
    var succ  = function(result){res.json(result)};
    var err = function(error){res.send(400)};
    if(validRel && neoMusicServer.allowedType(type)&&(toType == undefined || neoMusicServer.allowedType(capitalizeFirstLetter(toType)))){
        var id = parseInt(req.params.id);
        if(toType == undefined){
            if(isNaN(id)){
               neoMusicServer.getByName(id,type).then(succ,err);
            }
            else{
                neoMusicServer.getById(parseInt(id),type).then(succ,err);
            }
        }
        else{
            neoMusicServer.getRelation(parseInt(id), type,capitalizeFirstLetter(toType)).then(
                function(result){if(result == undefined)                   
                                    {neoMusicServer.getById(parseInt(id),type).then(succ,err);
                                }else{res.json(result)}},
                function(err){res.json(err)}
                );
        }
    }
    else{
      res.send(400);
    }
});

app.delete('/api/relations/:type/:id', function (req, res) {
    var type = capitalizeFirstLetter(req.params.type);
    var deleteRelations = [];
    if( req.query.delrel != undefined){
        req.query.delrel.split(',').forEach(function(rel){
            deleteRelations.push(capitalizeFirstLetter(rel));
        });
    }
    console.log('delrel',deleteRelations,type,parseInt(req.params.id));
    neoMusicServer.deleteRelations(parseInt(req.params.id),type,deleteRelations).then(
        function(result){res.send(200);},
        function(error){res.json(err)}
    );
});

console.log('server started');
// start listening
app.listen(config.listenPort);
