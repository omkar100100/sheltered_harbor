var dashboardController = require('../app/controllers/dashboardController');
var express = require('express');
authenticate=require('../app/common/authenticate');

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
 * /sh/api/dashboard/:
 *   post:
 *     tags:
 *       - dashboard
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
router.post('/', authenticate.isAuthenticated,function(req, res) {
      dashboardController.getParticiapants(req,res);
});

module.exports=router;
