
var Sequelize = require('sequelize');
var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var env=require('./environment')
var webSocket = require('websocket');
var swaggerJSDoc = require('swagger-jsdoc');
var unless = require('express-unless');

var helmet=require('helmet');
var fs=require('fs');
const jwt = require('express-jwt');
var routes = require('./routes/index');
var users  = require('./routes/users');
var master=require('./routes/masterData');
var roles=require('./routes/roles');
var nodes=require('./routes/quorumNode');
var institute=require('./routes/institute');
var shLog=require('./routes/shLog');
var dashboard=require('./routes/dashboard');
var config = require('./config');
var currentConfig = config.getCurrentConfig();

const swaggerUi = require('swagger-ui-express');

const replace = require('replace-in-file');

//unable to parse private key
// var rexec = require('remote-exec');
//  // see documentation for the ssh2 npm package for a list of all options  
// var connection_options = {
//     port: 22,
//     username: 'shuser',
//     privateKey: fs.readFileSync(path.join(__dirname, 'app/common/sheltered_harbor.ppk'))
// };
 
// var hosts = [
//     '52.170.84.132'
// ];
 
// var cmds = [
//     'ls -l',
//     'cat /etc/hosts'
// ];
 
// rexec(hosts, cmds, connection_options, function(err){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Great Success!!');
//     }
// });




//const remoteExecSync = require('@xch/node-remote-exec');




// var SSH = require('simple-ssh');
// var ssh = new SSH({
//     host: '52.170.84.132',
//     user: 'shuser',
//     port: 22,
//     key: fs.readFileSync(path.join(__dirname, 'app/common/sheltered_harbor.ppk'))
// });
 
// ssh
// .exec('export KEY_OU=Test_ORG', {
//     out: function(stdout) {
//         console.log(stdout);
//     },
    
// })
// .exec('echo $KEY_OU',{
//   out: function(stdout){
//     console.log(stdout);
//   }
// })
// .start();


// var exec = require('ssh-exec')
// exec('ls -lh', {
//   user: 'shuser',
//   host: '52.170.84.132',
//   port: 22,
//   key: myKeyFileOrBuffer,
//   password: '/app/common/sheltered_harbor.ppk'
// }).pipe(process.stdout)


 //connect = require('ssh2-connect');
// connect({
//    host: '52.170.84.132',
//    port:22,
//    username: 'shuser',
//    privateKey: '/app/common/sheltered_harbor.ppk'
//  }, function(err, ssh){
//   exec('ls -la', {ssh: ssh}, (err, stdout, stderr){
//     console.log(stdout);
//   });
//   console.log('hello');
// });

//  node_ssh = require('node-ssh')
//  ssh = new node_ssh()
// exec = require('ssh2-exec');
// ssh.connect({
//    host: '52.170.84.132',
//    port:22,
//    username: 'shuser',
//    privateKey: '/app/common/sheltered_harbor.ppk'
//  }, function(err, ssh){
//   child = exec({cmd: 'ls -la', ssh: ssh}, function(err, stdout, stderr){
//     console.log(stdout);
//   });
//   child.stdout.on('data', function(data){
//     console.log(data);
//   });
//   child.on('exit', function(code){
//     console.log('Exit', code);
//   });
// })


//   var ovpnFileName='chandra.ovpn'
//   var localFileName='app/common/keys/' + ovpnFileName;

// //WORKING
//  node_ssh = require('node-ssh')
//  ssh = new node_ssh()
//  ssh.connect({
//    host: '52.170.84.132',
//    port:  22,
//    username: 'shuser',
//    privateKey: 'app/common/sheltered_harbor.ppk'
//  })
// .then(function() {
//   // Local, Remote 
//   // ssh.putFile('/home/steel/Lab/localPath', '/home/steel/Lab/remotePath').then(function() {
//   //   console.log("The File thing is done")
//   // }, function(error) {
//   //   console.log("Something's wrong")
//   //   console.log(error)
//   // })
//   // // Array<Shape('local' => string, 'remote' => string)> 
//   // ssh.putFiles([{ local: '/home/steel/Lab/localPath', remote: '/home/steel/Lab/remotePath' }]).then(function() {
//   //   console.log("The File thing is done")
//   // }, function(error) {
//   //   console.log("Something's wrong")
//   //   console.log(error)
//   // })
//   // Local, Remote 
//   console.log('connected');

//   var remoteFileName='/home/shuser/client-configs/files/' + ovpnFileName;
//   ssh.getFile(localFileName, remoteFileName).then(function(Contents) {
//     console.log("The File's contents were successfully downloaded");
//     var regExp=new RegExp('^' + 'Subject:', 'i');
//     const options = {
//                   //Single file or glob
//                   files: localFileName,
//                   //Multiple replacements with different strings (replaced sequentially)
//                   from: [/foo/g, /baz/g],
//                   to: (match) =>'test replace',
//                   encoding: 'utf8',
//                 };

//     replace(options)
//     .then(changedFiles => {
//       console.log('Modified files:', changedFiles.join(', '));
//     })
//     .catch(error => {
//       console.error('Error occurred:', error);
//     });
//   }, function(error) {
//     console.log("Something's wrong")
//     console.log(error)
//   })
//   // Putting entire directories 
//   // const failed = []
//   // const successful = []
//   // ssh.putDirectory('/home/steel/Lab', '/home/steel/Lab', {
//   //   recursive: true,
//   //   validate: function(itemPath) {
//   //     const baseName = path.basename(itemPath)
//   //     return baseName.substr(0, 1) !== '.' && // do not allow dot files 
//   //            baseName !== 'node_modules' // do not allow node_modules 
//   //   },
//   //   tick: function(localPath, remotePath, error) {
//   //     if (error) {
//   //       failed.push(localPath)
//   //     } else {
//   //       successful.push(localPath)
//   //     }
//   //   }
//   // }).then(function(status) {
//   //   console.log('the directory transfer was', status ? 'successful' : 'unsuccessful')
//   //   console.log('failed transfers', failed.join(', '))
//   //   console.log('successful transfers', successful.join(', '))
//   // })
//   // // Command 
//   // ssh.execCommand('export OU_ORG=TEST_ORG', { cwd:'/home/shuser' }).then(function(result) {
//   //   console.log('STDOUT: ' + result.stdout)
//   //   console.log('STDERR: ' + result.stderr)
//   //   ssh.execCommand('echo  $OU_ORG', { cwd:'/home/shuser' }).then(function(result) {
//   //     console.log('STDOUT: ' + result.stdout)
//   //     console.log('STDERR: ' + result.stderr)
//   //   })
//   // })
   
// //   // // Command with escaped params 
// //   // ssh.exec('hh_client', ['--json'], { cwd: '/var/www', stream: 'stdout', options: { pty: true } }).then(function(result) {
// //   //   console.log('STDOUT: ' + result)
// //   // })
//  })


    //var regExp=new RegExp('^' + 'Subject:', 'i');
    // const options1 = {
    //               //Single file or glob
    //               files: localFileName,
    //               //Multiple replacements with different strings (replaced sequentially)
    //               from: [/Subject:([\s\S]*?)(?=Subject Public Key Info:)/g],
    //               to: (match) =>'Subject: C=IN, ST=HYD, L=HYD, O=SMALL ORG, OU=UNIT NAME, CN=Test200/name=server/emailAddress=chandra100100@yahoo.com\n',
    //               encoding: 'utf8'
    //             };

    // replace(options1)
    // .then(changedFiles => {
    //   console.log('Modified files:', changedFiles.join(', '));
    // })


//WORKING
// var Client = require('ssh2').Client;
// var conn = new Client();
// conn.on('ready', function() {
//   console.log('Client :: ready');
//   conn.exec('cd ~/openvpn-ca | source vars | ./build-key client1 | cd ~/client-configs | ./make_config.sh client1 | ls', function(err, stream) {
//     if (err) throw err;
//     stream.on('close', function(code, signal) {
//       console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
//       conn.end();
//     }).on('data', function(data) {
//       console.log('STDOUT: ' + data);
//     }).stderr.on('data', function(data) {
//       console.log('STDERR: ' + data);
//     });
//   });

//     // conn.sftp(function(err, sftp) {
//     //   if (err) throw err;
//     //   sftp.readdir('foo', function(err, list) {
//     //     if (err) throw err;
//     //     console.dir(list);
//     //     conn.end();
//     //   });
//     // });
// }).connect({
//   host: '52.170.84.132',
//   port: 22,
//   username: 'shuser',
//   privateKey: fs.readFileSync(path.join(__dirname, 'app/common/sheltered_harbor.ppk'))
// });



var app = express();

env.initialize(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});


 
 var swaggerHost=null;

if(process.env.NODE_ENV=='test'){
  swaggerHost='shapp1.eastus.cloudapp.azure.com';
}else if(process.env.NODE_ENV=='dev' || process.env.NODE_ENV=='swagger_dev' ){
  swaggerHost= currentConfig.swagger.host + ':' + currentConfig.swagger.port;
}else{
  swaggerHost='shapp1.eastus.cloudapp.azure.com';
}
var swaggerDefinition = {
  info: {
    title: 'Sheltered Harbor API',
    version: '1.0.0',
    description: "Sheltered Harbor LOG MONITORING API for Admins"
  },
  host: swaggerHost,
  basePath: '/',
  securityDefinitions: {
      jwt: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
  security: [
      { jwt: [] }
    ]
  
};

var showExplorer = true;
var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/*.js'],
  validatorUrl : null
};

const swaggerSpec = swaggerJSDoc(options);
const docsJsonPath = '/swagger.json';
const swaggerUiHandler = swaggerUi.setup(swaggerSpec);


app.get(docsJsonPath, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/docs', swaggerUi.serve, (req, res, next) => {
   swaggerUiHandler(req, res, next);

  // if (!req.query.url) {
  //   res.redirect("/docs?url=http://"+ swaggerHost + "/swagger.json");
  // } else {
  //   swaggerUiHandler(req, res, next);
  // }
});
  
app.set('models', require('./app/models'));
var models = app.get('models');


app.use('/', express.static(path.join(__dirname, 'frontend')));


app.use(jwt({ secret: process.env.AUTHENTICATION_SECRET }).unless({
  path: [
    { url: '/user/authenticate', methods: [ 'POST','OPTIONS']  },
    { url: '/user', methods: ['POST']  },
    { url : '/participant/register', methods: [ 'POST','OPTIONS'] },
    { url : '/shlog/submit', methods: [ 'POST','OPTIONS'] },
    { url : '/^\/shlog\/.*/', methods: [ 'GET','OPTIONS'] }
  ]
}));



app.use('/role',roles);
app.use('/user',users);
app.use('/node',nodes);
app.use('/participant',institute);
app.use('/shlog',shLog);
app.use('/master',master);
app.use('/dashboard',dashboard);



//models.sequelize.sync({force:true}).then(function () {
    console.log("Models Synchronized");
    http.createServer(app).listen(currentConfig.app.server.port,function(){
        console.log("Express Server Started");
    });
//});



//  ws=webSocket.server({
//     httpServer: http,
//     autoAcceptConnections: true,
//     maxReceivedFrameSize: 64*1024*1024,   // 64MiB
//     maxReceivedMessageSize: 64*1024*1024, // 64MiB
//     fragmentOutgoingMessages: false,
//     keepalive: false,
//     disableNagleAlgorithm: false
// });

//  wsrouter=webSocket.router;

 //wsrouter.attachServer(ws);

// ws.on('connect',function(connection){
//   console.log("Web socket server started")
//   function sendCallback(err) {
//         if (err) {
//           console.error('send() error: ' + err);
//           connection.drop();
//           setTimeout(function() {
//             process.exit(100);
//           }, 100);
//         }
//     }

//     connection.sendUTF("Hello World", sendCallback);
// })



models.Role.sync().then(function(){
    models.User.sync().then(function(){
        models.AccessLog.sync().then(function(){
          models.IdType.sync().then(function(){
            models.QuorumNode.sync().then(function(){
                models.Institute.sync().then(function(){
                  models.PasswordRecovery.sync().then(function(){
                    models.SHLog.sync().then(function(){
                        models.ServiceProviderMapping.sync().then(function(){
                            models.UserInstitute.sync().then(function(){
                                models.InstituteHistory.sync().then(function(){
                                  models.RegisterContract.sync().then(function(){
                                  })

                                })
                            })
                        })
                    })
                  })
                })
            })
          })     
        })  
    })
})

app.use(function(err, req, res, next) {
   console.log(err);
    res.status(err.status || 500)
  .json({
    status: 'error',
    message: err
  });
});


module.exports = app;


