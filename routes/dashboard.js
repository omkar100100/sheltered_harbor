var dashboardController = require('../app/controllers/DashboardController');
var express = require('express');


router=express.Router();

router.post('/participants', function(req, res) {
      dashboardController.getParticiapants(req,res);
});

module.exports=router;
