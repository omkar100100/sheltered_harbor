var DashboardService=require('../services/dashboardService');
var response=require('../common/response');

var DashboardController = function() {
};

DashboardController.prototype.getParticiapants = function(req, res) {
        var request=req.body;
        var dashboardService = new DashboardService();
        dashboardService.getDashboardData(request,req.app)
        .then(function(result) {
            response.handleSuccessResponse(200, result, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
  
};





module.exports = new DashboardController();