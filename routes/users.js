var models  = require('../app/models');
var userController = require('../app/controllers/userController');
var express = require('express');
authenticate=require('../app/common/authenticate');
const router=express.Router();


/**
 * @swagger
 * definition:
 *   NewUser:
 *     properties:
 *       FirstName:
 *         type: string
 *       LastName:
 *         type: string
 *       Email:
 *         type: string
 *       Mobile:
 *         type: string
 *       RoleId:
 *         type: integer
 *  
 *  
 *      
 *  
 *   User:
 *    allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - id
 *       - properties:
 *          id:
 *           type: integer
 *           format: int64
 * 
 *   AuthenticateRequest:
 *     properties:
 *       username:
 *          type: string
 *       password:
 *          type: string 
 *       
 */


/**
 * @swagger
 * /user/:
 *   post:
 *     tags:
 *       - user
 *     description: Creates a user under a given role
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User details
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NewUser'
 *     responses:
 *       200:
 *         description: A Single created User
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.post('/',function(req, res) {
      userController.createUser(req,res);
});


router.get('/',authenticate.isAuthenticated, function(req, res) {
      userController.getAllUsers(req,res);
});


/**
 * @swagger
 * /user/profile:
 *   get:
 *     tags:
 *       - user
 *     description: Gets User details of the authenticated user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A Single User
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/profile', authenticate.isAuthenticated,function(req, res) {
      userController.getUserProfile(req,res);
});



/**
 * @swagger
 * /user/toggleStatus/{userId}:
 *   get:
 *     tags:
 *       - user
 *     description: Toggles to  active/inactive  state of the user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: User Id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A Single User
 *         type: string
 */
router.get('/toggleStatus/:userId', authenticate.isAuthenticated,function(req, res) {
      userController.toggleUser(req,res);
});



/**
 * @swagger
 * /user/:
 *   get:
 *     tags:
 *       - user
 *     description: Gets all user details
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of Users
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/', authenticate.isAuthenticated,function(req, res) {
      userController.getUsers(req,res);
});



/**
 * @swagger
 * /user/authenticate:
 *   post:
 *     tags:
 *       - user
 *     description: Authenticating user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authenticate
 *         description: Authentication details
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/AuthenticateRequest'
 *     responses:
 *       200:
 *         description: User details
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.post('/authenticate', function(req, res) {
      userController.authenticateUser(req,res);
});

module.exports=router;