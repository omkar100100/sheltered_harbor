var masterDataController = require('../app/controllers/masterDataController');
var express = require('express');
authenticate=require('../app/common/authenticate');
router=express.Router();


/**
 * @swagger
 * /sh/api/master/institute/idtypes:
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
router.get('/institute/idtypes',authenticate.isAuthenticated,function(req,res){
    masterDataController.getIdentifierTypes(req,res)
})


/**
 * @swagger
 * /sh/api/master/serviceprovider:
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
router.get('/serviceprovider',authenticate.isAuthenticated,function(req,res){
    masterDataController.getDistinctServiceProviders(req,res)
})


/**
 * @swagger
 * /sh/api/master/private/onboard:
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
router.get('/private/onboard',authenticate.isAuthenticated,function(req,res){
    masterDataController.getOnBoardedInstitutes(req,res)
})

module.exports=router;
