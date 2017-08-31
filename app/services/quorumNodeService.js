var models  = require('../models');
var Promise = require('bluebird');
var Web3JSService=require('./web3jsService');

var NodeService=function(){};


NodeService.prototype.deleteAllNodes=function(){
    return new Promise(function(resolve,reject){
       models.QuorumNode.destroy({where: {}}).then(function () {
            resolve();
        });
    })
}


NodeService.prototype.updateNode=function(node){
    return new Promise(function(resolve,reject){
        models.QuorumNode.findById(node.id).then(function(result){
          return  result.update(node)
            .then(function(updated){
                resolve(updated)
            })
        })
    });
}




NodeService.prototype.getNode=function(nodeId){
    return Promise.resolve(
        models.QuorumNode.findById(nodeId).then(function(node){
            return node;
        })
    );
}
NodeService.prototype.createNode=function(node,app){
   var models1 = app.get('models');
   return models1.sequelize.transaction({isolationLevel: models1.Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED}, t1 => {
            return new Promise(function(resolve, reject){
                models1.QuorumNode.create(node,{transaction:t1})
                .then(function(node){
                    resolve(node);
                })
            })

    })
}

NodeService.prototype.getNodeHealth=function(request){
    var web3JS=new Web3JSService();
    return new Promise(function(resolve,reject){
        // if(!request.nodeNames){
        //     models.QuorumNode.findAll({
        //         attributes: ['name']
        //     }).then(function(nodeNames){
        //             var names=[];
        //             nodeNames.forEach(function(node){
        //                 names.push(node.name);
        //             })
        //             request.nodeNames=names;
        //     })
        // }

                  var whereClause=null;
                  if(!request.nodeNames){
                    whereClause={};
                  }else{
                      whereClause={
                                    where: {
                                            name: {$in: request.nodeNames}
                                    }
                                }
                  }


                  models.QuorumNode.findAll(whereClause).then(function(nodes){
                     return Promise.all(
                            nodes.map(function(node){
                                return new Promise(function(resolve,reject){
                                        var echo={};
                                        echo.nodeURL='http://'+ node.IpAddress;
                                        echo.message="echo";
                                        web3JS.getEcho(echo)
                                        .then(function(status){
                                            var nodeHealth={};
                                            nodeHealth.name=node.name;
                                            nodeHealth.url=echo.nodeURL;
                                            nodeHealth.health=status
                                            resolve(nodeHealth);
                                        })
                                        .catch(function(error){
                                            var nodeHealth={};
                                            nodeHealth.name=node.name;
                                            nodeHealth.url=echo.nodeURL;
                                            nodeHealth.health="FAIL"
                                            resolve(nodeHealth);
                                        })
                                });
                            })
                        ).then(function(results){
                            console.log(results);
                             resolve(results);
                        }).then(function(results){
                             resolve(results);
                        })
                      
                        
                })
                .catch(function(error){
                    console.log(error);
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
