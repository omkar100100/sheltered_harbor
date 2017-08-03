var models  = require('../models');
var Promise = require('bluebird');

var AttestationService=function(){};


AttestationService.prototype.getSHLogs=function(){
    return Promise.resolve(
    
    models.SHLog.findAll(
        { 
            offset: 0, 
            limit: 10
            ,
            include: [ models.Institute ]
         }
    )
    .then(function(attestations){
           var objectArr=[];
            attestations.forEach(function(attestation){
              
                var object={};
                object.instituteName=attestation.Institute.dataValues.LegalName
                //attestation.dataValues.Filename;
                object.submittedBy="Author"
                object.lastSubmittedOn="07/07/2015 8:54:54";
                object.daysSinceLastSubmission=10;
                objectArr.push(object);

            })

            return objectArr;
       
    })
);

};

module.exports=AttestationService;
