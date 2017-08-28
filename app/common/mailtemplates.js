

MAIL_TEMPLATES ={
    ON_BOARD_TEMPLATE : {
            from: 'cavula@innominds.com',
            to: 'cavula@innominds.com',
            subject: "Registraton Key with VPN details to request for Registration",
            body: "Welcome to Sheltered Harbor",
            html: "<pre><b><%PARTICIPANT_NAME%></b>"+
                              "Welcome to Sheltered Harbor, we have successfully introduced <b><%PARTICIPANT_NAME%></b> into our Sheltered Harbor monitoring log distributed ledger. Please verify your details below, and use the included registration key to complete the on-borading process as described in the attached 'On-Boarding Procedure' pdf." +
                    "Details:"+
                    "Registration key for On-Boarding:  <b><%PARTICIPANT_REG_KEY%></b>"+
                    "Thank you for choosing to be a part of the Sheltered Harbor community." +
                    "<Attach OnBoard.pdf> <Attache ovpn.config> <Attach vpnHelp.pdf>"+
                    "</pre>"
            
            
            // plaintext body
    // text: 'Hello to myself!',

    // // HTML body
            
    //     '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',

    // // Apple Watch specific HTML body
    // watchHtml: '<b>Hello</b> to myself',

    // // An array of attachments
    // attachments: [

    //     // String attachment
    //     {
    //         filename: 'notes.txt',
    //         content: 'Some notes about this e-mail',
    //         contentType: 'text/plain' // optional, would be detected from the filename
    //     },

    //     // Binary Buffer attachment
    //     {
    //         filename: 'image.png',
    //         content: new Buffer('iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
    //             '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
    //             'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC', 'base64'),

    //         cid: 'note@example.com' // should be as unique as possible
    //     },

    //     // File Stream attachment
    //     {
    //         filename: 'nyan cat ✔.gif',
    //         path: __dirname + '/assets/nyan.gif',
    //         cid: 'nyan@example.com' // should be as unique as possible
    //     }
    }
}

module.exports=MAIL_TEMPLATES