

MAIL_TEMPLATES ={
    ON_BOARD_TEMPLATE : {
            from: 'avula.chandrdasekhar@gmail.com',
            to: 'cavula@innominds.com',
            subject: "Registraton Key with VPN details to request for Registration",
            body: "Welcome to Sheltered Harbor",
            html: '<p><b>Welcome to Sheltered Harbor</b>.You have been Introduced to the System.Use the attached VPN details to open a secure connection. Register yourself with this Registration Key : ${REG_KEY} to Shelterd Harbor. </p>'
            
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