

MAIL_TEMPLATES ={
    ON_BOARD_TEMPLATE : {
            from: 'cavula@innominds.com',
            to: 'cavula@innominds.com',
            subject: "Registraton Key with VPN details to request for Registration",
            body: "Welcome to Sheltered Harbor",
            html: "<pre><b><%PARTICIPANT_NAME%></b>   "+
                              "<br/> Welcome to Sheltered Harbor, we have successfully introduced <b><%PARTICIPANT_NAME%></b> into our Sheltered Harbor monitoring log distributed ledger. Please verify your details below, and use the included registration key to complete the on-borading process as described in the attached 'On-Boarding Procedure' pdf." +
                    "<br/>Details:"+
                    "<br/>Registration key for On-Boarding:  <b><%PARTICIPANT_REG_KEY%></b> "+
                    "<br/><br/><br/>Thank you for choosing to be a part of the Sheltered Harbor community." +
                    "<br/><br/><br/><Attach OnBoard.pdf> <Attache ovpn.config> <Attach vpnHelp.pdf>"+
                    "</pre>",
            
            attachments:[
                        { 
                                filename: 'UX.pdf',
                                path: '/app/common/attachments/UX.pdf' 
                        }
            ]
          
    }
}

module.exports=MAIL_TEMPLATES