var models  = require('../app/models');
var instituteController = require('../app/controllers/instituteController');
var contractHistoryController = require('../app/controllers/contractHistoryController');
var express = require('express');
var response=require('../app/common/response');

router=express.Router();

/**
 * @swagger
 * definition:
 *   Participant:
 *     properties:
 *       id:
 *         type: integer
 *       LegalName:
 *         type: string
 *       Address:
 *          type: string
 *       PhoneNumber:
 *          type: string
 *       ContractState:
 *          type: string
 *       ContractFrom:
 *          type: date
 *       ContractTo:
 *          type: date
 *       ContactName:
 *          type: string
 *       ContactEmail:
 *          type: string
 *       ContactPhone:
 *          type: string
 *       Type:
 *          type: string
 *       Identifier:
 *          type: string
 *       ServiceProviderId:
 *          type: integer
 *       IdType:
 *          type: string
 *       NodeId:
 *          type: integer
 *           
 *       
 *        
 */



/**
 * @swagger
 * /participant:
 *   post:
 *     tags:
 *       - participants
 *     description: Creates a new participant Introduction
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: participant
 *         description: Participant object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Participant'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', function(req, res) {
      instituteController.createInstitute(req,res);
});


/**
 * @swagger
 * /participant:
 *   get:
 *     tags:
 *       - participants
 *     description: Returns all active participants ( contract expiry not included)
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Participants
 *         schema:
 *           $ref: '#/definitions/Participant'
 */
router.get('/', function(req, res) {
      instituteController.getAllInstitutes(req,res);
});

router.get('/:instituteId', function(req, res) {
      instituteController.getInstitute(req,res);
});

router.put('/contract', function(req, res) {
      contractHistoryController.updateInstituteContract(req,res);
});

router.put('/enable', function(req, res) {
      instituteController.updateActiveStatus(req,res);
});

router.put('/', function(req, res) {
      instituteController.updateInstitute(req,res);
});

router.post('/register', function(req, res) {
      instituteController.register(req,res);
});

module.exports=router;
