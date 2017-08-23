var models  = require('../app/models');
var shLogController = require('../app/controllers/shLogController');
var express = require('express');

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
 */


/**
 * @swagger
 * /shlog/private/institute/submitoffline:
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
 *           $ref: '#/definitions/SHLogRequest'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/private/institute/submitoffline', function(req, res) {
      shLogController.submitSHLogOffline(req,res);
});


/**
 * @swagger
 * /shlog/institute/{instituteId}/latest:
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
router.get('/institute/:instituteId/latest',function(req,res){
      shLogController.getLatestSHLog(req,res);
});


/**
 * @swagger
 * /shlog/institute/latest:
 *   get:
 *     tags:
 *       - shlogs
 *     description: Returns last submitted logs of all active institutes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Sucessfully Returned results
 *         schema:
 *           $ref: '#/definitions/SHLog'
 */
router.get('/institute/latest',function(req,res){
      shLogController.getLatestSHLogsForInstitutes(req,res);
});


/**
 * @swagger
 * /shlog/institute/{instituteId}:
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
router.post('/institute/:instituteId',function(req,res){
      shLogController.getSHLogsByInstituteId(req,res);
});


/**
 * @swagger
 * /shlog/private:
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
router.delete('/private/',function(req,res){
      shLogController.deleteAll(req,res);
});


/**
 * @swagger
 * /shlog/submit:
 *   post:
 *     tags:
 *       - quorum
 *     description: Submit logs. Inorder to submit attestation log an institute should be registered ,active and  (TODO:)contract not expired with a grace period .\n Test Log FileName:SH_20190815_021000021_3_10_001_00_OptionalMyStuffSuffix
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: shlogsubmit
 *         description: Submits SHLog 
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
 * /shlog/private/{logId}:
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
router.get('/private/:logId',function(req,res){
      shLogController.getLogById(req,res);
});




/**
 * @swagger
 * /shlog/private/{tx}:
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
router.get('/institute/private/:tx',function(req,res){
      shLogController.getSHLogByTxHash(req,res);
});


module.exports=router;