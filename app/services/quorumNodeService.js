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
   return models1.sequelize.transaction({isolationLevel: models1.Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, t1 => {
            return new Promise(function(resolve, reject){
                models1.QuorumNode.create(node,{transaction:t1})
                .then(function(node){
                    resolve(node);
                })
            })

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
