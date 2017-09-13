var models  = require('../app/models');
var shLogController = require('../app/controllers/shLogController');
var express = require('express');
authenticate=require('../app/common/authenticate');
router=express.Router();


/**
 * @swagger
 * definition:
 *   SHLogSubmitRequest:
 *     properties:
 *       SH-filename:
 *         type: string
 *       SH-hash:
 *         type: string
 *       SH-tag:
 *          type: string
 *       SH-additional-data:
 *          type: string
 *       SH-Signature:
 *          type: string
 * 
 *   SHLog:
 *      properties:
 *        TxHash:
 *           type: string
 *        Filename:
 *           type: string
 *        Tag:
 *          type: string
 *        AdditionalData:
 *          type: string
 *        UploadTimestamp:
 *          type: date
 *        AttestationDate:
 *          type: date
 *        Status:
 *          type: string
 *        InstituteId:
 *          type: integer
 *        ServiceProviderId:
 *          type: integer
 *  
 *   SHLogSearch:
 *      properties:
 *        startDate:
 *          type: string
 *        endDate:
 *          type: string
 * 
 * 
 *   SignRequest:
 *      properties:
 *         regKey:
 *           type: string
 *         account:
 *           type: string
 * 
 *   SignAttestationRequest:
 *      properties:
 *         fileName:
 *           type: string
 *         account:
 *           type: string
 * 
 *   SignResponse:
 *      properties:
 *         registrationKey:
 *            type: string
 *         signature:
 *           type: string
 *         publicKey:
 *           type: string
 * 
 *   SHLogNotifyRequest:
 *      properties:
 *         instituteId:
 *           type: integer
 *         startDate:
 *           type: string
 *         endDate:
 *           type: string 
 * 
 */


/**
 * @swagger
 * /sh/api/shlog/private/institute/submitoffline:
 *   post:
 *     tags:
 *       - shlogs
 *     description: Creates a new log offline ( saves to database and later submitted to quorum) .This is helpful when quorum is not reachable such as timeout, maintainance, relocation.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: shlog
 *         description: attestation log 
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/SHLog'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/private/institute/submitoffline', authenticate.isAuthenticated,function(req, res) {
      shLogController.submitSHLogOffline(req,res);
});


/**
 * @swagger
 * /sh/api/shlog/institute/{instituteId}/latest:
 *   get:
 *     tags:
 *       - shlogs
 *     description: Returns latest log submitted for Institute
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: instituteId
 *         description: institute's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Sucessfully Returned results
 *         schema:
 *           $ref: '#/definitions/SHLog'
 */
router.get('/institute/:instituteId/latest',authenticate.isAuthenticated,function(req,res){
      shLogController.getLatestSHLog(req,res);
});


/**
 * @swagger
 * /sh/api/shlog/institute/latest:
 *   post:
 *     tags:
 *       - shlogs
 *     description: Returns last submitted logs of all active institutes . Search between dates if given in the request
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         description: Search Request Object
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/SHLogSearch'
 *     responses:
 *       200:
 *         description: Sucessfully Returned results
 *         schema:
 *           $ref: '#/definitions/SHLog'
 */
router.post('/institute/latest',authenticate.isAuthenticated,function(req,res){
      shLogController.getLatestSHLogsForInstitutes(req,res);
});


/**
 * @swagger
 * /sh/api/shlog/institute/{instituteId}:
 *   post:
 *     tags:
 *       - shlogs
 *     description: returns logs by search criteria for an institute
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: shlogsearch
 *         description: SHLog  search request object for an institute
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/SHLogSearch'
 *       - name: instituteId
 *         description: institute id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/institute/:instituteId',authenticate.isAuthenticated,function(req,res){
      shLogController.getSHLogsByInstituteId(req,res);
});


/**
 * @swagger
 * /sh/api/shlog/private:
 *   delete:
 *     tags:
 *       - shlogs
 *     description: delete all logs for all institutes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Sucessfully Returned results
 */
router.delete('/private/',authenticate.isAuthenticated,function(req,res){
      shLogController.deleteAll(req,res);
});


/**
 * @swagger
 * /sh/api/shlog/submit:
 *   post:
 *     tags:
 *       - quorum
 *     description: Submit logs. Inorder to submit attestation log an institute should be registered ,active and  (TODO:)contract not expired with a grace period .\n Test Log FileName:SH_20190815_021000021_3_10_001_00_OptionalMyStuffSuffix
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: shlogsubmit
 *         description: Submits SHLog ; SH-hash - Account Address ; SH-Signature - Signed message(SH-filename)
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/SHLogSubmitRequest'
 *     responses:
 *       200:
 *         description: Sucessfully Returned results
 *         schema:
 *           $ref: '#/definitions/SHLog'
 */
router.post('/submit',function(req,res){
      shLogController.submitSHLogsForInstitute(req,res);
});




/**
 * @swagger
 * /sh/api/shlog/util/sign/register:
 *   post:
 *     tags:
 *       - quorum
 *     description: An end point to sign the payload
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: SignRequest
 *         description: Sends Payload to Sign,Test account - '0xca843569e3427144cead5e4d5999a3d0ccf92b8e'
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/SignRequest'
 *     responses:
 *       200:
 *         description: Sucessfully Returned results
 *         schema:
 *           $ref: '#/definitions/SignResponse'
 */
router.post('/util/sign/register',authenticate.isAuthenticated,function(req,res){
      shLogController.generateSignature(req,res);
});



/**
 * @swagger
 * /sh/api/shlog/util/sign/attest:
 *   post:
 *     tags:
 *       - quorum
 *     description: An end point to sign the payload for Attestation
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: SignAttestationRequest
 *         description: Sends Payload to Sign
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/SignAttestationRequest'
 *     responses:
 *       200:
 *         description: Sucessfully Returned results
 *         type: object
 */
router.post('/util/sign/attest',authenticate.isAuthenticated,function(req,res){
      shLogController.UtilSignContentAttestation(req,res);
});



/**
 * @swagger
 * /sh/api/shlog/private/{logId}:
 *   get:
 *     tags:
 *       - shlogs
 *     description: Returns log by logId
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: logId
 *         description: Log Id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Sucessfully Returned results
 *         schema:
 *           $ref: '#/definitions/SHLog'
 */
router.get('/private/:logId',authenticate.isAuthenticated,function(req,res){
      shLogController.getLogById(req,res);
});




/**
 * @swagger
 * /sh/api/shlog/private/{tx}:
 *   get:
 *     tags:
 *       - shlogs
 *     description: get shlog by Transaction Hash ( unique through out system)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: tx
 *         description: Transaction Id (Hash) returned by Quorum
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Sucessfully Returned results
 *         schema:
 *           $ref: '#/definitions/SHLog'
 */
router.get('/institute/private/:tx',authenticate.isAuthenticated,function(req,res){
      shLogController.getSHLogByTxHash(req,res);
});


/**
 * @swagger
 * /sh/api/shlog/notify:
 *   post:
 *     tags:
 *       - shlogs
 *     description: Notify institute in case of pending attestations.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: notify
 *         description: Notify request
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/SHLogNotifyRequest'
 *     responses:
 *       200:
 *         description: Response returned Sucessfully
 *
 */
router.post('/notify',authenticate.isAuthenticated,function(req,res){
      shLogController.notifyInstituteForSHLog(req,res);
});



/**
 * @swagger
 * /sh/api/shlog/report/{instituteId}/pdf:
 *   post:
 *     tags:
 *       - shlogs
 *     description: Generates PDF for SHLogs submitted by Participant in a given search  criteria
 *     produces:
 *       - application/pdf
 *     parameters:
 *       - name: shlogsearch
 *         description: SHLog  search request object for an institute
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/SHLogSearch'
 *       - name: instituteId
 *         description: institute id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully PDF downloaded
 */
router.post('/report/:instituteId/pdf',authenticate.isAuthenticated,function(req,res){
      shLogController.downloadSHLogReportByInstituteSearchCriteria(req,res);
});

module.exports=router;
