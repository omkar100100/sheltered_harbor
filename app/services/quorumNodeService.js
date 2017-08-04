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

NodeService.prototype.createNode=function(node){
   return Promise.resolve(
        models.QuorumNode.create(node).then(function(node){
            return node;
        })
    );
};


NodeService.prototype.getAllNodes=function(){
    return Promise.resolve(
        models.QuorumNode.findAll().then(function(nodes){
            return nodes;
        })
    )
};



module.exports=NodeService;
