var models  = require('../app/models');
var roleController = require('../app/controllers/roleController');
var express = require('express');
authenticate=require('../app/common/authenticate');
router=express.Router();

/**
 * @swagger
 * definition:
 *   Role:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       
 *        
 */




/**
 * @swagger
 * /sh/api/role/private:
 *   post:
 *     tags:
 *       - roles
 *     description: Creates a new role
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: role
 *         description: Role object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Role'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/private', authenticate.isAuthenticated,function(req, res) {
      roleController.createRole(req,res);
});



/**
 * @swagger
 * /sh/api/role:
 *   get:
 *     tags:
 *       - roles
 *     description: Returns all roles
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of roles
 *         schema:
 *           $ref: '#/definitions/Role'
 */
router.get('/',authenticate.isAuthenticated,function(req, res) {
      roleController.getAllRoles(req,res);
});




/**
 * @swagger
 * /sh/api/role/{roleId}:
 *   get:
 *     tags:
 *       - roles
 *     description: Returns a single role by role id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: roleId
 *         description: role's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single role
 *         schema:
 *           $ref: '#/definitions/Role'
 */
router.get('/:roleId',authenticate.isAuthenticated, function(req, res) {
      roleController.getRole(req,res);
});


/**
 * @swagger
 * /sh/api/role/private/{roleId}:
 *   delete:
 *     tags:
 *       - roles
 *     description: Deletes a single role
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: roleId
 *         description: Role's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/private/:roleId', authenticate.isAuthenticated,function(req, res) {
      roleController.removeRole(req,res);
});

/**
 * @swagger
 * /sh/api/role/private/{roleId}:
 *   put:
 *     tags:
 *       - roles
 *     description: Updates a single role
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: roleId
 *         description: Role's id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: role
 *         description: Role object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Role'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         schema:
 *           $ref: '#/definitions/Role'
 */
router.put('/private/:roleId',authenticate.isAuthenticated, function(req, res) {
      roleController.updateRole(req,res);
});


module.exports=router;
