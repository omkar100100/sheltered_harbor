var models  = require('../app/models');
var quorumNodeController = require('../app/controllers/quorumNodeController');
var express = require('express');
authenticate=require('../app/common/authenticate');
router=express.Router();

/**
 * @swagger
 * definition:
 *   Node:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       EthereumHash:
 *         type: string
 *       IpAddress:
 *         type: string
 * 
 *   HealthRequest:
 *     properties:
 *       nodeNames:
 *           type: object
 *       
 *        
 */



/**
 * @swagger
 * /sh/api/node/private:
 *   post:
 *     tags:
 *       - nodes
 *     description: Creates a new Node
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: node
 *         description: Node object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Node'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/private', authenticate.isAuthenticated,function(req, res) {
      quorumNodeController.createNode(req,res);
});



/**
 * @swagger
 * /sh/api/node/:
 *   get:
 *     tags:
 *       - nodes
 *     description: Returns all nodes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of nodes
 *         schema:
 *           $ref: '#/definitions/Node'
 */
router.get('/', authenticate.isAuthenticated,function(req, res) {
      quorumNodeController.getAllNodes(req,res);
});



/**
 * @swagger
 * /sh/api/node/private:
 *   delete:
 *     tags:
 *       - nodes
 *     description: deletes all nodes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Deletes all nodes
 */
router.delete('/private',authenticate.isAuthenticated, function(req, res) {
      quorumNodeController.deleteAllNodes(req,res);
});


/**
 * @swagger
 * /sh/api/node/private:
 *   put:
 *     tags:
 *       - nodes
 *     description: Updates a node informmation
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: node
 *         description: Node object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Node'
 *     responses:
 *       200:
 *         description: Node information updated
 */
router.put('/private',authenticate.isAuthenticated, function(req, res) {
      quorumNodeController.updateNode(req,res);
});



/**
 * @swagger
 * /sh/api/node/{nodeId}:
 *   get:
 *     tags:
 *       - nodes
 *     description: Returns a single node by node id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: nodeId
 *         description: node's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single bode
 *         schema:
 *           $ref: '#/definitions/Node'
 */
router.get('/:nodeId', authenticate.isAuthenticated,function(req, res) {
      quorumNodeController.getNode(req,res);
});



/**
 * @swagger
 * /sh/api/node/health:
 *   post:
 *     tags:
 *       - nodes
 *     description: Test Node Connectivity/Communication by sending/receiving echo
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: HealthRequest
 *         description: Request for nodes health
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/HealthRequest'
 *     responses:
 *       200:
 *         description: 
 *         
 */
router.post('/health', authenticate.isAuthenticated,function(req, res) {
      quorumNodeController.nodeHealth(req,res);
});


module.exports=router;
