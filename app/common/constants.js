 Enum = require('enum');

const IDType=new Enum(['DTCC CN','FS RSSD','ABA RTN', 'FDIC CN','NCUA CN']);


CONSTANTS={

    IDTYPES :   IDType

}

module.exports=CONSTANTS;