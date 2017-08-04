var QuorumNodeService=require('../services/quorumNodeService');


var QuorumNodeController = function() {
};

QuorumNodeController.prototype.getNode = function(req, res) {
        var nodeId=req.params.nodeId;
        var quorumNodeService = new QuorumNodeService();
        quorumNodeService.getNode(nodeId).then(function(result) {
            return  res.json(result);
        })
  
};

QuorumNodeController.prototype.createNode = function(req, res) {
        var node=req.body;
        var quorumNodeService = new QuorumNodeService();
        quorumNodeService.createNode(node).then(function(node){
            return res.json(node);
        })
};

QuorumNodeController.prototype.getAllNodes = function(req, res) {
        var quorumNodeService = new QuorumNodeService();
        quorumNodeService.getAllNodes().then(function(result) {
           return res.json(result);
        }) 
};




module.exports = new QuorumNodeController();