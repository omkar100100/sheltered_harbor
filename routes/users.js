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
 *   PasswordResetRequest:
 *     properties:
 *       token:
 *          type: string
 *       password:
 *          type: string
 * 
 *   PasswordUpdateRequest:
 *     properties:
 *       oldPassword:
 *          type: string
 *       newPassword:
 *          type: string
 *          
 */


/**
 * @swagger
 * /sh/api/user/:
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
      console.log('inside user creation');
      userController.createUser(req,res);
});


router.get('/',authenticate.isAuthenticated, function(req, res) {
      userController.getAllUsers(req,res);
});


/**
 * @swagger
 * /sh/api/user/profile:
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
 * /sh/api/user/toggleStatus/{userId}:
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
 * /sh/api/user/:
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
 * /sh/api/user/authenticate:
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




/**
 * @swagger
 * /sh/api/user/password/reset:
 *   post:
 *     tags:
 *       - user
 *     description: Reset Users Password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: PasswordResetRequest
 *         description: Password Reset Details
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/PasswordResetRequest'
 *     responses:
 *       200:
 *         description: Password Reset Successfully
 *
 */
router.post('/password/reset', function(req, res) {
      userController.resetPassword(req,res);
});




/**
 * @swagger
 * /sh/api/user/password/update:
 *   post:
 *     tags:
 *       - user
 *     description: A logged in User can updated his/her password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: PasswordUpdateRequest
 *         description: Password Update Details
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/PasswordUpdateRequest'
 *     responses:
 *       200:
 *         description: Password Updated Successfully
 *
 */
router.post('/password/update',authenticate.isAuthenticated, function(req, res) {
      userController.updatePassword(req,res);
});


module.exports=router;
