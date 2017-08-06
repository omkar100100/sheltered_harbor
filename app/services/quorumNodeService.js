var models  = require('../models');
var Promise = require('bluebird');

var NodeService=function(){};


NodeService.prototype.getNode=function(nodeId){
    return Promise.resolve(
        models.QuorumNode.findById(nodeId).then(function(node){
            return node;
        })
    );
}

NodeService.prototype.createNode=function(node,app){
   var models1 = app.get('models');
   return models1.sequelize.transaction(function (t1) {
        return new Promise(function(resolve, reject){
            models1.QuorumNode.create(node,{transaction:t1})
            .then(function(node){
                resolve(node);
            })
        })
            // .then(function(result) {
            //     console.log('Result 1 ' + result);
            //     return result;
            // }).then(function(result) {
            //     console.log('Result 2 ' + result)
            //     return result;
            // });
    })
 }

NodeService.prototype.getAllNodes=function(){
    return Promise.resolve(
        models.QuorumNode.findAll().then(function(nodes){
            return nodes;
        })
    )
};



module.exports=NodeService;
