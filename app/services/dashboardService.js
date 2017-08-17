
var DashboardService=function(){};
var Promise=require('bluebird');

DashboardService.prototype.getParticiapants=function(request,app){
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

          p1=   new Promise(function(resolve,reject){
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



       p2=  new Promise(function(resolve,reject){
            models.Institute.findAll({
                attributes: ['LegalName'],
                where: {
                    $and :[
                        {IsActive : true },
                        {Registered : true}
                    ]
                }
            })
            .then(function(results){
                resolve(results.length);
            })          
        })


    return Promise.join(p1,p2,function(newParticipants,allParticiapants){
        return {
            new :   newParticipants,
            all :   allParticiapants
        }
    });

      
}


DashboardService.prototype.getDashboardData=function(request,app){
    dashboardData={};
    return new Promise(function(resolve,reject){
        DashboardService.prototype.getParticiapants(request,app)
        .then(function(particiapants){
            dashboardData.participants=particiapants;
            resolve(dashboardData);
        })
        
    })
}   


module.exports=DashboardService;
