var InstituteService=require('./instituteService');
var Promise=require('bluebird');



var DashboardService=function(){};






DashboardService.prototype.getParticiapantsCount=function(request,app){
    var models=app.get("models");
    const whereBetwenDates={
                    RegisteredDate:{
                        $between: [request.startDate, request.endDate]
                    }
                };

    const whereWithAfterDate={
                    RegisteredDate:{
                        $gte: request.startDate
                    }
                };

    const whereWithBeforeDate={
                    RegisteredDate:{
                        $lte: request.endDate
                    }
                };

     var dateClause=null;

     if(request.startDate && request.endDate){
        dateClause=whereBetwenDates;
     }else if(request.startDate){
        dateClause=whereWithAfterDate;
     }else{
         dateClause=whereWithBeforeDate; 
     }                


    var models = app.get('models');

          newParticipants=   new Promise(function(resolve,reject){
                models.Institute.findAll({
                    attributes: ['LegalName'],
                // attributes: { include: [[models.sequelize.fn('COUNT', models.sequelize.col('LegalName')), 'LegalName']] },
                // group: ['id'],
                    where: {
                        $and :[
                            {IsActive : true },
                            {Registered : true}
                            ,dateClause
                        ]
                    }
                })
                .then(function(results){
                    resolve( results.length);
                })          
            })



       allParticiapants=  new Promise(function(resolve,reject){
            models.Institute.findAll({
                attributes: ['LegalName'],
                where: {
                    $and :[
                        {IsActive : true },
                        {Registered : true}
                        ,
                        {
                            RegisteredDate:{ $lt: request.endDate }
                        }
                    ]
                }
            })
            .then(function(results){
                resolve(results.length);
            })          
        })


    return Promise.join(newParticipants,allParticiapants,function(newParticipants,allParticiapants){
        return {
            new :   newParticipants,
            all :   allParticiapants
        }
    });

      
}


DashboardService.prototype.getDashboardData=function(request,app){
        dashboardData={};
        particiapants= DashboardService.prototype.getParticiapantsCount(request,app);
        logs=new InstituteService().getSHLogs(request);

        return Promise.join(particiapants,logs,function(particiapants,logs){
            return {
                particiapants   :   particiapants,
                logs            :   logs
            }
        })

}   


module.exports=DashboardService;
