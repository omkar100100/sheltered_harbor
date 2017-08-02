var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pug = require('pug');
var routes = require('./routes/index');
var config=require('./config');
var helmet=require('helmet');
var Web3 = require('web3');
var solc = require('solc');
var fs=require('fs');
var Wallet = require("ethers-wallet");
var Tx = require('ethereumjs-tx');
var Sequelize = require('sequelize');

var routes = require('./routes/index');
var users  = require('./routes/users');

//import {API} from 'ethereum/etherscan';

var currentConfig=config.getCurrentConfig();
console.log(currentConfig.app.port);

currentConfig.dialect="postgres";


var sequelize = new Sequelize(currentConfig.postgres.database, currentConfig.postgres.username, currentConfig.postgres.password, {
  host: currentConfig.postgres.host,
  dialect: currentConfig.dialect, 
  //dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql', 
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  //storage: 'path/to/database.sqlite'
});

var app = express();

http.createServer(app).listen("8001",function(){
    console.log("Express Server Started");
});


app.use(logger('dev'));
app.use('/', routes);
app.use('/users', users);


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status( err.code || 500 )
    .json({
      status: 'error',
      message: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
  .json({
    status: 'error',
    message: err.message
  });
});

// app.use(helmet.csp({
//   defaultSrc: ["'self'"],
//   scriptSrc: ['*.google-analytics.com'],
//   styleSrc: ["'unsafe-inline'"],
//   imgSrc: ['*.google-analytics.com'],
//   connectSrc: ["'none'"],
//   fontSrc: [],
//   objectSrc: [],
//   mediaSrc: [],
//   frameSrc: []
// }));


//app.use(helmet.xssFilter());

// app.use(helmet.hsts({
//   maxAge: 7776000000,
//   includeSubdomains: true
// }));




/////////////////////////////////////////////////////////////////////////////////////////////




//const web3 = new Web3(new Web3.providers.HttpProvider("http://tcoexownf.westeurope.cloudapp.azure.com:8545"));
//web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3 = new Web3(new Web3.providers.HttpProvider('http://52.170.210.64:8545'));
web3.eth.defaultAccount="0xca843569e3427144cead5e4d5999a3d0ccf92b8e";
const gasPrice = web3.eth.gasPrice;
const gasPriceHex = web3.toHex(0);
const gasLimitHex = web3.toHex(0);
const nonce = web3.eth.getTransactionCount(web3.eth.coinbase);
const nonceHex = web3.toHex(nonce);

//privateKeyRaw = web3.sha3("Toholampi is the best town on the world");
//wallet = new Wallet(privateKeyRaw);

//code = fs.readFileSync("SampleContract1.sol").toString();

//let contractsFile = path.join(contracts/contracts.sol'); 
var fileContract = fs.readFileSync("Greeter.sol", { encoding: 'utf-8' }); 
var compiledCode = solc.compile(fileContract.toString(), 1);
var code=compiledCode.contracts[':Greeter'].bytecode;
var abiDefinition = JSON.parse(compiledCode.contracts[':Greeter'].interface);





//web3.personal.unlockAccount(web3.eth.coinbase, "8ca49552b3e92f79c51f2cd3d38dfc723412c212e702bd337a3724e8937aff0f");

//  web3.eth.contract(abiDefinition).new({data: code}, function (err, contract) {
//             if(err) {
//                 console.error(err);
//                 return;
//             } else if(contract.address){
//                 myContract = contract;
               
//             }
// });

//let abi = JSON.parse(compiledCode.contracts.Greeter.abi);
let SampleContract = web3.eth.contract(abiDefinition);
//let contract = SampleContract.new({from: web3.eth.coinbase, data: code});

web3.eth.sendTransaction({
    data: code
   // privateFor: ["AAAAB3NzaC1yc2EAAAABJQAAAQEAjR5fiIDmoWXWLuiSgK8xPy1KmB6psHuxua0BqJkZSPCW+MwF3FS+mbdwW7nPEHn5r3Dbs9iS4tbQjrTqO2IYMqRf7CEEJ8oRDZZO0NxMxz/qWwTqBoRi9w2dnCXr5Tf0JADWGtN9X6029gR61NE4s8B0RF0uDiH3g7Dhwt0xel017ArtudDG4gF8eCS+sYUGhWKGOe0Ao+Vy9pZJ82f1cPoqyyLtWijJZHctOrYqEtLlAjWMNoZaMIUBV2b7KDo2QOGiUHwdUImnL9FYJZjyzOFtusE+KrtzaweSsvJdWDjWhwy+of5a3RQM6oppkDR+nXNwrT9ep/nYKVe9lhYCzw==="]
  },
  function(err, address) {
    if (!err) {
      console.log(address); 
      greeterInstance=web3.eth.contract(abiDefinition);

    }else{
      console.log(err);
    }
  }
);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// async function waitBlock() {
//   while (true) {
//     let receipt = web3.eth.getTransactionReceipt(contract.transactionHash);
//     if (receipt && receipt.contractAddress) {
//       console.log("Your contract has been deployed at http://testnet.etherscan.io/address/" + receipt.contractAddress);
//       console.log("Note that it might take 30 - 90 sceonds for the block to propagate befor it's visible in etherscan.io");
//       contractInstance = VotingContract.at(receipt.contractAddress);

//       contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]});
//       contractInstance.totalVotesFor.call('Rama');

//       contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]});
//       var count=contractInstance.totalVotesFor.call('Rama').toLocaleString();
//       console.log(count);

//       break;
//     }
//     console.log("Waiting a mined block to include your contract... currently in block " + web3.eth.blockNumber);
//     await sleep(4000);
//   }
// }

//waitBlock();

//var greeter = web3.eth.contract(abiDefinition).at(contractAddress);
//console.log(greeter.greet("chandu"));



// byteCode = compiledCode.contracts[':Voting'].bytecode;
// console.log(byteCode);
// const contractData = contract.new.getData({
//     data: '0x' + byteCode
// });
// web3.eth.defaultAccount="0x2f90a66b52df93146e0d494976c2344550db3bf1";
// const gasPrice = web3.eth.gasPrice;
// const gasPriceHex = web3.toHex(0);
// const gasLimitHex = web3.toHex(0);
// const nonce = web3.eth.getTransactionCount(web3.eth.coinbase);
// const nonceHex = web3.toHex(nonce);


// const rawTx = {
//     nonce: nonceHex,
//     gasPrice: gasPriceHex, 
//     gasLimit: gasLimitHex,
//     data: contractData,
//     to: '0x2f90a66b52df93146e0d494976c2344550db3bf1', 
// };

// const tx = new Tx(rawTx);
// var privateKey = new Buffer('balu1234$');
// tx.sign(privateKey);
// const serializedTx = tx.serialize();





// var password = "";
// try {
//      // Perform a transaction using ETH from the geth coinbase account
//  // web3.personal.unlockAccount(web3.eth.coinbase, "");

//   // Set the account from where we perform out contract transactions
//   //web3.eth.defaultAccount = web3.eth.coinbase;
// } catch(e) {
//   console.log(e);
//   return;
// };



// web3.eth.sendTransaction({
//     data: contractData
//   },
//   function(err, address) {
//     if (!err) {
//       console.log(address);
//     }else{
//       console.log(err);
//     }
//   }
// );

       


// web3.eth.sendRawTransaction(serializedTx.toString('hex'), function(err, hash) {
//   if (!err){
//     console.log(hash); 
//   }else{
//     console.log(err);
//   }
// });

// web3.eth.sendTransaction({
//   from:web3.eth.defaultAccount,
//   to:web3.eth.accounts[1],
//   data:contractData
// })
// .on('transactionHash', function(transactionHash){ 
//   console.log(transactionHash) 
// })
// .on('receipt', function(receipt){
//   console.log(receipt.contractAddress) 
// })
// .on('confirmation', function(confirmationNumber, receipt){ 
//   console.log(confirmationNumber)
// })
// .then(function(newContractInstance){
//   console.log(newContractInstance.options.address)
// });








// async function waitBlock() {
//   while (true) {
//     let receipt = web3.eth.getTransactionReceipt(deployedContract.transactionHash);
//     if (receipt && receipt.contractAddress) {
//       console.log("Your contract has been deployed at http://testnet.etherscan.io/address/" + receipt.contractAddress);
//       console.log("Note that it might take 30 - 90 sceonds for the block to propagate befor it's visible in etherscan.io");


//       contractInstance = VotingContract.at(receipt.contractAddress);

//       contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]});
//       contractInstance.totalVotesFor.call('Rama');

//       contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]});
//       var count=contractInstance.totalVotesFor.call('Rama').toLocaleString();
//       console.log(count);

//       break;
//     }
//     console.log("Waiting a mined block to include your contract... currently in block " + web3.eth.blockNumber);
//     await sleep(4000);
//   }
// }

// waitBlock();

//web3.personal.unlockAccount(web3.eth.coinbase);
//web3.eth.sendTransaction({from: web3.eth.coinbase, to: '0x062Abe5fbaEf147d765C40F73aB31a6B05aEb8Ca', value: web3.toWei("0.1", "ether")});


// const api = new API("https://api.etherscan.io/api", apiKey);

//   // If nonce is not given get it usig Etherscan
//   if(!nonce) {
//     // Build ethescan.io wrapper API
//     let fromAddress = getAddressFromPrivateKey(privateKey);

//     nonce = await api.getTransactionCount(fromAddress);
//   }

//   let gasPrice = await api.getGasPrice();

module.exports = app;
