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


/**
 * @swagger
 * /participant/{participantId}:
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
router.get('/:participantId', function(req, res) {
      instituteController.getInstitute(req,res);
});



/**
 * @swagger
 * /participant/identifier/{id}:
 *   get:
 *     tags:
 *       - participants
 *     description: Returns a single Participant by identifer id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: identifier 
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single participant
 *         schema:
 *           $ref: '#/definitions/Participant'
 */
router.get('/identifier/:id', function(req, res) {
      instituteController.getByIdentifier(req,res);
});

/**
 * @swagger
 * /participant/private:
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
router.delete('/private', function(req, res) {
      instituteController.deleteAll(req,res);
});

/**
 * @swagger
 * /participant/contract:
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
router.put('/contract', function(req, res) {
      contractHistoryController.updateInstituteContract(req,res);
});


/**
 * @swagger
 * /participant/private/toggleStatus/{identifier}:
 *   put:
 *     tags:
 *       - participants
 *     description: Toggles active status of the Participant
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: identifier
 *         description: identifier object
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 *         schema:
 *           $ref: '#/definitions/Participant'
 */
router.put('/private/toggleStatus/:identifier', function(req, res) {
      instituteController.updateActiveStatus(req,res);
});



/**
 * @swagger
 * /participant:
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
router.put('/', function(req, res) {
      instituteController.updateInstitute(req,res);
});



/**
 * @swagger
 * /participant/register:
 *   put:
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
router.put('/register', function(req, res) {
      instituteController.register(req,res);
});

module.exports=router;
