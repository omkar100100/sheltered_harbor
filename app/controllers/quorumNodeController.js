var QuorumNodeService=require('../services/quorumNodeService');
var response=require('../common/response');

var QuorumNodeController = function() {
};

QuorumNodeController.prototype.getNode = function(req, res) {
        var nodeId=req.params.nodeId;
        var quorumNodeService = new QuorumNodeService();
        quorumNodeService.getNode(nodeId).then(function(result) {
            response.handleSuccessResponse(200, result, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
  
};

QuorumNodeController.prototype.createNode = function(req, res) {
        var node=req.body;
        var quorumNodeService = new QuorumNodeService();
        quorumNodeService.createNode(node,req.app)
        .then(function(node){
                response.handleSuccessResponse(200, node, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })

      
};


QuorumNodeController.prototype.deleteAllNodes = function(req, res) {
        var quorumNodeService = new QuorumNodeService();
        quorumNodeService.deleteAllNodes()
        .then(function(node){
                response.handleSuccessResponse(200, node, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })

      
};


QuorumNodeController.prototype.getAllNodes = function(req, res) {
        var quorumNodeService = new QuorumNodeService();
        quorumNodeService.getAllNodes().then(function(result) {
           response.handleSuccessResponse(200, result, res);
        }).catch(function(error){
           response.handleError(error, res); 
        }) 
};



QuorumNodeController.prototype.updateNode = function(req, res) {
        node=req.body;
        var quorumNodeService = new QuorumNodeService();
        quorumNodeService.updateNode(node).then(function(result) {
           response.handleSuccessResponse(200, result, res);
        }).catch(function(error){
           response.handleError(error, res); 
        }) 
};


module.exports = new QuorumNodeController();