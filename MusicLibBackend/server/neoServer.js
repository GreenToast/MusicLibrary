function contains(a,obj){
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
};

function reformatResponse(prefix, responseArray){
    refResponse = [];
    responseArray.forEach(function(el){
        refResponse.push(el[prefix]);
    });
    return refResponse;
};

function reformatRelationsfromNode(mainNodePrefix,otherNodePrefix,relationPrefix,relationName,subArrayName, responseArray){
    var response = responseArray[0][mainNodePrefix];
    response[subArrayName] = [];
    responseArray.forEach(function(rel){
        el = {
            relation: rel[relationPrefix].properties,
            relationType: relationName.toLowerCase()
        };
        el[subArrayName] = rel[otherNodePrefix]
        response[subArrayName].push(el);
    });

    return response;

};

var Server = function(){

    this.neoMusicServer = {};

    
    
    this.initialize = function(initDB){
        var neo4j = require('neo4j');
        this.neoMusicServer = new neo4j.GraphDatabase(initDB);
    };
    
    var allowedTypes=['Artist','Album','Track','Playlist'];
    var allowedRelations={
        Artist : {Album: {relation: 'RECORDED', reverse: false},Track: {relation: 'RECORDED', reverse: false}},
        Album : {Track: {relation: 'BELONGS', reverse: false}, Artist: {relation: 'RECORDED', reverse: true}},
        Track : {Artist: {relation: 'RECORDED', reverse: true},Playlist: {relation: 'BELONGS', reverse: true},Album: {relation: 'BELONGS', reverse: true}},
        Playlist : {Track: {relation: 'BELONGS', reverse: false}}
    };
    
    this.allowedType = function(obj) {
        return contains(allowedTypes,obj);
    }

    this.validateRelation = function(from,to){
        return allowedRelations[from].hasOwnProperty(to);
    }
    this.getAllowedRelation = function(from,to){
        return allowedRelations[from][to];
    };
    
    this.getAllowedTypes = function(from){
        return allowedRelations[from];
    };
    
  
    this.cypher = function(cypherQuery, prefix,single){
        var m = this.neoMusicServer;
        return new Promise(function(succ,err){
            m.cypher(cypherQuery,function(error,results){
                if(error){
                    err(error);
                }
                else{
                    if(single && results instanceof Array && results.length > 0){
                        succ(reformatResponse(prefix,results)[0]);
                    }
                    else if(single && (!results instanceof Array || results.length == 0)){
                        succ({});
                    }
                    else{
                        succ(reformatResponse(prefix,results));
                    }
                }
            });
        });
       
    };
    
    

    
  /*  this.create = function(type, data){
        return this.createOrUpdate(type, data);
    };*/
    
    this.createOrUpdate = function(type, data,id){
        var reltype = this.getAllowedRelation, typedata = {};
        data.hasOwnProperty('properties') ? typedata=data.properties : typedata=data;
        var m = this.neoMusicServer, typeData={};
        var params = {typedata: typedata};
        var matchQuery = '', query = '';
        
        if(id){
            matchQuery += 'MATCH (a:'+type+') WHERE id(a) = {Id} ';
            query +=  'SET a+={typedata} ';
            params.Id = id;
        }
        else
            query = 'CREATE (a: '+type+'{typedata}) ';
        //check all possible nodes
        var i = 0;
        for(var allowedType in this.getAllowedTypes(type)){
            if  (data.hasOwnProperty(allowedType)){
                var relations = data[allowedType];
                if(relations instanceof Array && relations.length > 0){
                    relations.forEach(function(relation){
                        console.log('relation',relation);
                        var relprops = relation.relation;
                        //ignore properties
                        if (relation[allowedType]._id){
                            matchQuery +=  'MATCH (a'+i+': '+allowedType+') WHERE id(a'+i+')= {a'+i+'Id} ' ;
                            params['a'+i+'Id'] =relation[allowedType]._id;
                        }
                        else{
                            query +=  'CREATE (a'+i+': '+allowedType+'{a'+i+'}) '
                            params['a'+i] = relation[allowedType].properties;
                        }
                        if(!id){
                            query += 'CREATE(a)-[: ' + reltype(type,allowedType).relation +'{a'+i+'props}]->(a'+i+') ';
                        }
                        else{
                            console.log('MERGE');
                            query += 'MERGE(a)-[r: ' + reltype(type,allowedType).relation +']->(a'+i+') ON CREATE SET r={a'+i+'props} ON MATCH SET r={a'+i+'props}';
                        }
                        params['a'+i+'props'] =relprops;
                        i++;
                    });
                  }
            }
        };
        console.log('query',matchQuery + query + 'RETURN a');
        console.log('params', params);
        return new Promise(function(succ,err){
            m.cypher({
            query: matchQuery + query + 'RETURN a',
            params: params
        },function(error,result){
                if(error){
                    err(error);
                }
                else{
                    succ(reformatResponse('a',result));
                }
            });
        });
    };
    
 /*   this.updateById = function(Id, type, data){
        var m = this.neoMusicServer;
        return new Promise(function(succ,err){m.cypher({
            query:'MATCH (a:'+type+') WHERE id(a) = {Id} SET a+={data}',
            params: {
                Id: Id,
                data: data
            }
        },function(error,result){
                if(error){
                    err(error);
                }
                else{
                    succ(result);
                }
            });
        });
    };*/
    
    this.deleteById = function(id, type){
        var m = this.neoMusicServer;
        return new Promise(function(succ,err){m.cypher({
                query:'MATCH (a:'+type+') WHERE id(a) = {artistId} DELETE a',
                params: {
                    artistId: id
                }
            },function(error,result){
                if(error){
                    err(error);
                }
                else{
                    succ();
                }
            });
        });
    };
    
    this.getById = function(id, type){
        
        console.log('getbyid',id, type);
        var cypherQuery = {
            query:'MATCH (a:'+type+') WHERE id(a) = {id} RETURN a',
            params: {
                id: id
            }
        };
        return this.cypher(cypherQuery,'a',true);
    };
    
    this.deleteRelations = function(id,type,relations){
        var m = this.neoMusicServer;
        var query = 'MATCH (a:'+type+') WHERE id(a) = {id} ';
        var params = {id : id};
        allowRel = this.getAllowedRelation;
        relations.forEach(function(to){
           query += 'MATCH (a)-[r:'+ allowRel(type,to).relation+']->(c:'+to+') DELETE r';
        });     
        console.log('query',query);
        console.log('params',params);
        return new Promise(function(succ,err){
            m.cypher({
            query: query,
            params: params
        },function(error,result){
                console.log('result',error,result);
                if(error){
                    err(error);
                }
                else{
                    succ();
                }
            });
        });
    };
    
    
    this.getByName = function(name,type){
       var cypherQuery = {
            query: 'MATCH (a:'+type+' {name: {name}}) RETURN a',
            params: {
                name: name
            }
        };
       return this.cypher(cypherQuery,'a',true);
    };
    
    this.get = function(type){
       var cypherQuery = {
            query: 'MATCH (a:'+type+') RETURN a',
        };
        var result = this.cypher(cypherQuery,'a',false);
        return result;
    };
    
    this.getRelation = function(id, from, to){
        var m = this.neoMusicServer;
        var relation = this.getAllowedRelation(from,to); 
        if (relation == undefined){
            callback(null,true);
        }
        var cypherQuery = {};
        var subArray ='';
        if(relation.reverse){
            cypherQuery = {
                query: 'MATCH(m:'+from+')-[r:'+relation.relation+']->(n:'+to+')WHERE id(n) = {id} RETURN n,r,m',
                params:{
                    id:id
                }
            };
            subArrayName= from;
        }
        else{
            cypherQuery = {
                query: 'MATCH(n:'+from+')-[r:'+relation.relation+']->(m:'+to+')WHERE id(n) = {id} RETURN n,r,m',
                params:{
                    id:id
                }
            };
            subArrayName = to;
        }
        return new Promise(function(succ,err){
            m.cypher(cypherQuery,function (error, results) {
                if(error){
                    err(error);
                }
                else{
                    if(results instanceof Array && results.length > 0 ){
                        succ(reformatRelationsfromNode('n','m','r',relation.relation,subArrayName,results));
                    }
                    else{
                        succ(undefined);
                    }
                }
            });
        });
    };
    
};

module.exports = new Server();