var masterDataController = require('../app/controllers/masterDataController');
var express = require('express');

router=express.Router();


/**
 * @swagger
 * /master/institute/idtypes:
 *   get:
 *     tags:
 *       - master
 *     description: Instittue ID Types
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.get('/institute/idtypes',function(req,res){
    masterDataController.getIdentifierTypes(req,res)
})


/**
 * @swagger
 * /master/serviceprovider:
 *   get:
 *     tags:
 *       - master
 *     description: Gives all ( active/inactive) service providers
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.get('/serviceprovider',function(req,res){
    masterDataController.getDistinctServiceProviders(req,res)
})


/**
 * @swagger
 * /master/private/onboard:
 *   get:
 *     tags:
 *       - master
 *     description: Gives all active on-boarded Institutes.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.get('/private/onboard',function(req,res){
    masterDataController.getOnBoardedInstitutes(req,res)
})

module.exports=router;