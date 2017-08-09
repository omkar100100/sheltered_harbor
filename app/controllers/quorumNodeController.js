var QuorumNodeService=require('../services/quorumNodeService');
var response=require('../common/response');

var QuorumNodeController = function() {
};

QuorumNodeController.prototype.getNode = function(req, res) {
        var nodeId=req.params.nodeId;
        var quorumNodeService = new QuorumNodeService();
        quorumNodeService.getNode(nodeId).then(function(result) {
            response.handleSuccessResponse(200, result, res);
        })
  
};

QuorumNodeController.prototype.createNode = function(req, res) {
        var node=req.body;
        var quorumNodeService = new QuorumNodeService();
        quorumNodeService.createNode(node,req.app)
        .then(function(node){
                response.handleSuccessResponse(200, node, res);
        })
        .error(function(e){
                console.log("Error handler " + e)
        })

      
};

QuorumNodeController.prototype.getAllNodes = function(req, res) {
        var quorumNodeService = new QuorumNodeService();
        quorumNodeService.getAllNodes().then(function(result) {
           response.handleSuccessResponse(200, result, res);
        }) 
};




module.exports = new QuorumNodeController();