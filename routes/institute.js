var models  = require('../app/models');
var instituteController = require('../app/controllers/instituteController');
var contractHistoryController = require('../app/controllers/contractHistoryController');
var express = require('express');
var response=require('../app/common/response');
authenticate=require('../app/common/authenticate');

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
 *          type: string
 *       ContractTo:
 *          type: string
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
 *   UpdateParticipant:
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
 *   NewContract:
 *       properties:
 *          InstituteId:      
 *            type: integer
 *          RenewalDateFrom:
 *            type: string
 *          RenewalDateTo:
 *            type: string
 *          Note:
 *             type: string
 *             
 *   Register:
 *      properties:
 *         SH-RegistrationKey:
 *           type: string
 *         SH-Signature:
 *           type: string
 *         SH-PublicKey:
 *           type: string     
 * 
 *   SHLogSearch:
 *      properties:
 *        startDate:
 *          type: string
 *        endDate:
 *          type: string
 * 
 *   IdentifierObj:
 *      properties:
 *        IDType:
 *          type: string
 *        Identifier:
 *          type: string
 *        
 * 
 *  
 */



/**
 * @swagger
 * /sh/api/participant:
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
router.post('/', authenticate.isAuthenticated,function(req, res) {
      instituteController.createInstitute(req,res);
});


/**
 * @swagger
 * /sh/api/participant:
 *   get:
 *     tags:
 *       - participants
 *     description: Returns all active and registered participants ( contract expiry not included)
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Participants
 *         schema:
 *           $ref: '#/definitions/Participant'
 */   
router.get('/', authenticate.isAuthenticated,function(req, res) {
      instituteController.getAllParticipants(req,res);
});


/**
 * @swagger
 * /sh/api/participant/{participantId}:
 *   get:
 *     tags:
 *       - participants
 *     description: Returns a single Participant by participant id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: participantId
 *         description: participant's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single participant
 *         schema:
 *           $ref: '#/definitions/Participant'
 */
router.get('/:participantId',authenticate.isAuthenticated, function(req, res) {
      instituteController.getInstitute(req,res);
});



/**
 * @swagger
 * /sh/api/participant/identifier/:
 *   post:
 *     tags:
 *       - participants
 *     description: Returns a single Participant by identifer id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: identifier
 *         description: identifier 
 *         in: body 
 *         required: true
 *         schema:
 *           $ref: '#/definitions/IdentifierObj'
 *     responses:
 *       200:
 *         description: A single participant
 *         schema:
 *           $ref: '#/definitions/Participant'
 */
router.post('/identifier',authenticate.isAuthenticated, function(req, res) {
      instituteController.getByIdentifier(req,res);
});

/**
 * @swagger
 * /sh/api/participant/private:
 *   delete:
 *     tags:
 *       - participants
 *     description: deletes all participants
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: deletes all participants
 */
router.delete('/private', authenticate.isAuthenticated,function(req, res) {
      instituteController.deleteAll(req,res);
});

/**
 * @swagger
 * /sh/api/participant/contract:
 *   put:
 *     tags:
 *       - contract
 *     description: Updates contract details of the Participant
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: NewContract
 *         description: New Contract Details
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NewContract'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         schema:
 *           $ref: '#/definitions/Participant'
 */
router.put('/contract',authenticate.isAuthenticated, function(req, res) {
      contractHistoryController.updateInstituteContract(req,res);
});


/**
 * @swagger
 * /sh/api/participant/toggleStatus/{id}:
 *   put:
 *     tags:
 *       - participants
 *     description: Toggles active status of the Participant
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: institute id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 *         schema:
 *           $ref: '#/definitions/Participant'
 */
router.put('/toggleStatus/:id',authenticate.isAuthenticated, function(req, res) {
      instituteController.updateActiveStatus(req,res);
});



/**
 * @swagger
 * /sh/api/participant:
 *   put:
 *     tags:
 *       - participants
 *     description: Updates a participant details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: participant
 *         description: participant object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UpdateParticipant'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         schema:
 *           $ref: '#/definitions/Participant'
 */
router.put('/',authenticate.isAuthenticated, function(req, res) {
      instituteController.updateInstitute(req,res);
});



/**
 * @swagger
 * /sh/api/participant/register:
 *   post:
 *     tags:
 *       - quorum
 *     description: OnBoard a participant Institute
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: register
 *         description: register object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Register'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         schema:
 *           $ref: '#/definitions/Participant'
 */
router.post('/register',function(req, res) {
      instituteController.register(req,res);
});



/**
 * @swagger
 * /sh/api/institute/shlogs:
 *   post:
 *     tags:
 *       - participants
 *     description: Returns logs of all active institutes for a search criteria .
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: SHLogSearch
 *         description: Log Search Criteria Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/SHLogSearch'
 *     responses:
 *       200:
 *         description: Sucessfully Returned results
 *         schema:
 *           $ref: '#/definitions/Participant'
 */
router.post('/institute/',authenticate.isAuthenticated,function(req,res){
      instituteController.getSHLogs(req,res);
});

module.exports=router;
