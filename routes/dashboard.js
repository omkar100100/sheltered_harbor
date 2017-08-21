var dashboardController = require('../app/controllers/dashboardController');
var express = require('express');


router=express.Router();


/**
 * @swagger
 * definition:
 *   DashboardRequest:
 *     properties:
 *       startDate:
 *         type: string
 *       endDate:
 *         type: string
 *       
 *     
 */


/**
 * @swagger
 * /dashboard/:
 *   post:
 *     tags:
 *       - Dashboard
 *     description: Returns dashboard data for the given request
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: dashboardRequest
 *         description: Dashboard data request object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/DashboardRequest'
 *     responses:
 *       200:
 *         description: Dashboard Data successfully returned
 */
router.post('/', function(req, res) {
      dashboardController.getParticiapants(req,res);
});

module.exports=router;
