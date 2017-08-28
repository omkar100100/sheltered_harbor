
 ID_TYPES =[   {name:"DTCC CN",id:"1"},
                {name:"FS RSSD",id:"2"},    
                {name:"ABA RTN",id:"3"},    
                {name:"FDIC CN",id:"4"},    
                {name:"NCUA CN",id:"5"}    
    ]

 LOG_SUBMISSION_STATUS ={
      IN_PROGRESS: { label: "In Progress"},
      SUBMITTED:   {label : "Submitted"} ,
      FAILED:      { label:"Failed"}
 }

 SUCCESS_MESSAGES={
     ATTESTATION_SUCCESS_MESSAGE:"Message passed to Blockchain.Creation of blockchain successful",
 }

PARAMETER_LABELS={
    SH_FILENAME: "SH-filename",
    SH_ADDITIONAL_DATA:"SH-additional-data",
    SH_TAG:"SH-tag",
    SH_HASH:"SH-hash",
    SH_SIGNATURE:"SH-Signature",
    SH_REGISTRATION_KEY:"SH-RegistrationKey",
    SH_PUBLIC_KEY:"SH-PublicKey"

}

DATA_LABELS={
    INSTITUTION:"FI",
    SERVICE_PROVIDER:"SP" 
}
    



module.exports=ID_TYPES;
module.exports=LOG_SUBMISSION_STATUS;
module.exports=SUCCESS_MESSAGES;
module.exports=PARAMETER_LABELS;
module.exports=DATA_LABELS;
module.exports.getIDTypeById=  function(id){
    idtype=null;
    ID_TYPES.forEach(function(type){
        if(type.id==id){
            idtype= type.name;
            return;
        }
    })

    return idtype;
}