 Enum = require('enum');



CONSTANTS={

    IDTYPES: [  {name:"DTCC CN",id:"1"},
                {name:"FS RSSD",id:"2"},    
                {name:"ABA RTN",id:"3"},    
                {name:"FDIC CN",id:"4"},    
                {name:"NCUA CN",id:"5"}    
    ],
    
    LOG_SAVE_QUORUM_STATUS : [
                {"IN_PROGRSSS": "In Progress"},
                {"SUBMITTED": "Submitted"} ,
                {"NOT_SUBMITTED": "Not Submitted"}
    ] 
}




    



module.exports=CONSTANTS;