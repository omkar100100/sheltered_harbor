const Web3 = require('web3')
var Promise = require('bluebird');
var fs=require('fs');
var CONSTANTS=require('../common/constants')
var errors = require('../errors');

//const web3 = new Web3(require('../middleware/nodeAddress'))
//const web3 = new Web3('http://10.11.11.4:8545');
//const web3 = new Web3('http://10.10.10.5:8545');
//const web3 = new Web3('http://52.170.210.64:8545');
//const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const web3 = new Web3(new Web3.providers.HttpProvider('http://52.170.210.64:8545'));
const util = require('ethereumjs-util');



ecrecTestCode="60606040526000600655341561001457600080fd5b5b61145b806100246000396000f300606060405236156100ce576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806301daf26b146100d35780630ac298dc146102ad5780631b1b9cfe14610302578063342f00c5146103cf57806348b4ed3d14610456578063673402e51461047f5780636a076bf31461050e5780637cb97b2b14610537578063a292fa4614610584578063c4cd0d1914610674578063d14a2e5a146107fa578063db43adc014610857578063e4a4a128146108e6578063f1835db714610975575b600080fd5b34156100de57600080fd5b6100f46004808035906020019091905050610a02565b6040518080602001856000191660001916815260200180602001806020018481038452888181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156101935780601f1061016857610100808354040283529160200191610193565b820191906000526020600020905b81548152906001019060200180831161017657829003601f168201915b50508481038352868181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156102165780601f106101eb57610100808354040283529160200191610216565b820191906000526020600020905b8154815290600101906020018083116101f957829003601f168201915b50508481038252858181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156102995780601f1061026e57610100808354040283529160200191610299565b820191906000526020600020905b81548152906001019060200180831161027c57829003601f168201915b505097505050505050505060405180910390f35b34156102b857600080fd5b6102c0610a2f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561030d57600080fd5b610315610a5a565b60405180806020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183151515158152602001828103825285818151815260200191508051906020019080838360005b838110156103925780820151818401525b602081019050610376565b50505050905090810190601f1680156103bf5780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b34156103da57600080fd5b610454600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610b42565b005b341561046157600080fd5b610469610bc2565b6040518082815260200191505060405180910390f35b341561048a57600080fd5b610492610bcd565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104d35780820151818401525b6020810190506104b7565b50505050905090810190601f1680156105005780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561051957600080fd5b610521610c6b565b6040518082815260200191505060405180910390f35b341561054257600080fd5b61056e600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610c71565b6040518082815260200191505060405180910390f35b341561058f57600080fd5b610672600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919080356000191690602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610cbe565b005b341561067f57600080fd5b6106956004808035906020019091905050610d89565b604051808060200180602001856000191660001916815260200180602001848103845288818151815260200191508051906020019080838360005b838110156106ec5780820151818401525b6020810190506106d0565b50505050905090810190601f1680156107195780820380516001836020036101000a031916815260200191505b50848103835287818151815260200191508051906020019080838360005b838110156107535780820151818401525b602081019050610737565b50505050905090810190601f1680156107805780820380516001836020036101000a031916815260200191505b50848103825285818151815260200191508051906020019080838360005b838110156107ba5780820151818401525b60208101905061079e565b50505050905090810190601f1680156107e75780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b341561080557600080fd5b610855600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610fe0565b005b341561086257600080fd5b61086a610ffb565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156108ab5780820151818401525b60208101905061088f565b50505050905090810190601f1680156108d85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156108f157600080fd5b6108f9611099565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561093a5780820151818401525b60208101905061091e565b50505050905090810190601f1680156109675780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561098057600080fd5b6109c060048080356000191690602001909190803560ff169060200190919080356000191690602001909190803560001916906020019091905050611142565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60056020528060005260406000206000915090508060000190806001015490806002019080600301905084565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b90565b610a62611290565b6000806000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600160149054906101000a900460ff16828054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610b2f5780601f10610b0457610100808354040283529160200191610b2f565b820191906000526020600020905b815481529060010190602001808311610b1257829003601f168201915b505050505092509250925092505b909192565b8260009080519060200190610b589291906112a4565b5081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160146101000a81548160ff02191690831515021790555060006002819055505b505050565b600060025490505b90565b60048054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610c635780601f10610c3857610100808354040283529160200191610c63565b820191906000526020600020905b815481529060010190602001808311610c4657829003601f168201915b505050505081565b60065481565b600081600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600190505b919050565b610cc6611324565b8481600001819052508381606001819052508281602001906000191690816000191681525050818160400181905250806005600060025481526020019081526020016000206000820151816000019080519060200190610d27929190611362565b50602082015181600101906000191690556040820151816002019080519060200190610d54929190611362565b506060820151816003019080519060200190610d71929190611362565b509050506001600254016002819055505b5050505050565b610d91611290565b610d99611290565b6000610da3611290565b6005600086815260200190815260200160002060000160056000878152602001908152602001600020600301600560008881526020019081526020016000206001015460056000898152602001908152602001600020600201838054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610e915780601f10610e6657610100808354040283529160200191610e91565b820191906000526020600020905b815481529060010190602001808311610e7457829003601f168201915b50505050509350828054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610f2d5780601f10610f0257610100808354040283529160200191610f2d565b820191906000526020600020905b815481529060010190602001808311610f1057829003601f168201915b50505050509250808054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610fc95780601f10610f9e57610100808354040283529160200191610fc9565b820191906000526020600020905b815481529060010190602001808311610fac57829003601f168201915b5050505050905093509350935093505b9193509193565b8060049080519060200190610ff69291906112a4565b505b50565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156110915780601f1061106657610100808354040283529160200191611091565b820191906000526020600020905b81548152906001019060200180831161107457829003601f168201915b505050505081565b6110a1611290565b60048054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156111375780601f1061110c57610100808354040283529160200191611137565b820191906000526020600020905b81548152906001019060200180831161111a57829003601f168201915b505050505090505b90565b600061114c6113e2565b60006040805190810160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a333200000000815250915081876040518083805190602001908083835b6020831015156111be57805182525b602082019150602081019050602083039250611198565b6001836020036101000a03801982511681845116808217855250505050505090500182600019166000191681526020019250505060405180910390209050600181878787604051600081526020016040526000604051602001526040518085600019166000191681526020018460ff1660ff16815260200183600019166000191681526020018260001916600019168152602001945050505050602060405160208103908084039060008661646e5a03f1151561127a57600080fd5b50506020604051035192505b5050949350505050565b602060405190810160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106112e557805160ff1916838001178555611313565b82800160010185558215611313579182015b828111156113125782518255916020019190600101906112f7565b5b50905061132091906113f6565b5090565b60806040519081016040528061133861141b565b81526020016000801916815260200161134f61141b565b815260200161135c61141b565b81525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106113a357805160ff19168380011785556113d1565b828001600101855582156113d1579182015b828111156113d05782518255916020019190600101906113b5565b5b5090506113de91906113f6565b5090565b602060405190810160405280600081525090565b61141891905b808211156114145760008160009055506001016113fc565b5090565b90565b6020604051908101604052806000815250905600a165627a7a723058207319ac818bc09ac8f5e08d05e0be42905d1c3cbd7df23a3384e03fc6f16822470029";


  ecrecTestABI =[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"attestations","outputs":[{"name":"filename","type":"string"},{"name":"hash","type":"bytes32"},{"name":"tag","type":"string"},{"name":"additional_data","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_organisation_name","outputs":[{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"orgname","type":"string"},{"name":"orgaddress","type":"address"},{"name":"isagency","type":"bool"}],"name":"register_org","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"get_number_of_attestations","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"temp","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"number_attests","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"input","type":"address"}],"name":"set_owner","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"fname","type":"string"},{"name":"add_data","type":"string"},{"name":"input_hash","type":"bytes32"},{"name":"input_tag","type":"string"}],"name":"add_attest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"get_attest","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"bytes32"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"input","type":"string"}],"name":"simple_add","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"org_name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"simple_get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"hash","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"verify","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]




const from = "0xca843569e3427144cead5e4d5999a3d0ccf92b8e";
web3.eth.defaultAccount=from;

const ecrecTestContract =  web3.eth.contract(ecrecTestABI);

var Web3JSService=function(){};


Web3JSService.prototype.saveAttestation=function(request){
  console.log("Request Payload: Contract Address:" + request.ContractAddress + " ,SH-SIGNAGUTE BEFORE RPCSIG: " + request[PARAMETER_LABELS.SH_SIGNATURE] + " ,FILENAME:" + request[PARAMETER_LABELS.SH_FILENAME] + " ,ADDITIONAL DATA:" + request[PARAMETER_LABELS.SH_ADDITIONAL_DATA] + " ,TAG:" + request[PARAMETER_LABELS.SH_TAG] + " ," )
  return new Promise(function(resolve,reject){
      deployedecrecTest = ecrecTestContract.at(request.ContractAddress);
      var res = util.fromRpcSig(request[PARAMETER_LABELS.SH_SIGNATURE]);
      console.log("FromRPCSIG:" + res);
      // var msg = web3.sha3(request[PARAMETER_LABELS.SH_FILENAME] + request[PARAMETER_LABELS.SH_TAG] + request[PARAMETER_LABELS.SH_ADDITIONAL_DATA]  + request[PARAMETER_LABELS.SH_HASH]) ;

      var msg = web3.sha3(request[PARAMETER_LABELS.SH_FILENAME]);
      console.log('SHA3 OF MSG:'+ msg);
      console.log('Hash, V,R,S -'+msg,res.v,util.bufferToHex(res.r),util.bufferToHex(res.s) )

      deployedecrecTest.simple_add("Hello World",function(error,data){
            console.log('Error  Hello World ,setting the data'+error);
            console.log('Tx of Hello World,setting data -'+data);
        });

      deployedecrecTest.verify.call(msg,res.v,util.bufferToHex(res.r),util.bufferToHex(res.s),function (error, data){
      console.log('Account Address from Quorum attest level- '+data);
      console.log('Error - '+error);
      if(data == request.AccountAddress){
          deployedecrecTest.get_owner.call(function(err,contract_owner){
              console.log('got contract owner from quorum -'+contract_owner);
                  if(contract_owner == data)
                    {
                      deployedecrecTest.add_attest(request[PARAMETER_LABELS.SH_FILENAME],request[PARAMETER_LABELS.SH_ADDITIONAL_DATA],msg,request[PARAMETER_LABELS.SH_TAG],{gas:2000000}, function (err ,data){
                            console.log('Attest File error -'+data);  
                            console.log('Attest File Tx -'+data);
                            result={};
                            result.transactionHash=data;
                            console.log(" TXHASH:" + data);
                            resolve(result);
                          })
                    }
                    if(contract_owner != data){
                      console.log('Level 2 check failed');
                      return reject(errors.normalizeError('UN_AUTHORIZED_ACCESS', null, null));
                    }  
            })
       
      }else{
        console.log('Level 1 check failed');
       return reject(errors.normalizeError('UN_AUTHORIZED_ACCESS', null, null));
      }
    })
 })
    
}




Web3JSService.prototype.saveOrganization=function(org){
  return new Promise(function(resolve,reject){

  var contractAddress=null;
 // Deploying new contract for on-board attestation
  return  ecrecTestContract.new( {from:from, data: ecrecTestCode, gas: 3000000}, function (error, deployedContract){
        console.log("Payload Details: Signature before RPCSIG" + org.signature + " ,Registration Key:" + org.RegKey + " ,Request Eth Address:" + org.ethereumAddress);

        if(deployedContract.address)
        {
          contractAddress=deployedContract.address;
          console.log('Deployed contract addr - '+deployedContract.address);


           console.log(ecrecTestContract);

          var res = util.fromRpcSig(org.signature);
          console.log('V at server'+res.v);
          console.log('R at server'+util.bufferToHex( res.r));
          console.log('S at server'+util.bufferToHex(res.s));
          deployedecrecTest = ecrecTestContract.at(contractAddress);
          
          var msg = web3.sha3(org.RegKey) ;
           console.log('SHA3 - '+msg);

          
            deployedecrecTest.verify.call(msg,res.v,util.bufferToHex(res.r),util.bufferToHex(res.s),function (error, data){
                console.log('Address from Quorum - '+data);
                if(data == org.ethereumAddress){
                  console.log("Address matched");

                   deployedecrecTest.register_org({from:from,gas: 3000000},"123",org.ethereumAddress,org.isAgency,function(error,reg_data){
                      if(error){
                        console.log('Error of Reg_org is -'+error);
                      }else{
                        console.log('Tx of reg_org is '+reg_data);
                        // after registering the client set them as owner of the contract where the attestaions take place
                        deployedecrecTest.set_owner(org.ethereumAddress,function(error,data){
                          if(error){
                            console.log('Error when setting the owner'+err);
                          }else{
                                    deployedecrecTest.get_owner.call(function(err,contract_owner){
                                      console.log("Owner" + contract_owner);
                                    });

                            console.log('Tx of setting owner -'+data);
                            var result={};
                            result.ContractAddress=contractAddress;
                            result.AccountAddress=org.ethereumAddress;
                            //result.TxHash=data;
                            resolve(result);
                          }
                        });
                      }
                    });
                }else{
                  console.log("Address Mismatched");
                }
           
            
          });
        }
      })

    });

}


Web3JSService.prototype.getEcho=function(echo){
   contractAddress=null;
   return new Promise(function(resolve,reject){
        myweb3 = new Web3(new Web3.providers.HttpProvider(echo.nodeURL));
        const contract =  myweb3.eth.contract(echoABI);
        contract.new( {from:from, data: echoByteCode, gas: 3000000}, function (error, deployedContract){
          if(error){
              reject("FAILED");
          }
          if(deployedContract && deployedContract.address){
                contractAddress=deployedContract.address;
                console.log('Deployed contract addr - '+contractAddress);
                deployedeContract = contract.at(contractAddress);
                deployedeContract.echo({from:from,gas: 3000000},echo.message,function(error,data){
                  console.log(data);
                  resolve("OK");
                  //return "OK";
                });
              }
        });
   })        
}



Web3JSService.prototype.Util_SignContent_Registration=function(request){
    var msg = web3.sha3(request.regKey) ;
    var sig = web3.eth.sign(request.account, msg);

    var response={};
    response[PARAMETER_LABELS.SH_REGISTRATION_KEY]=request.message;
    response[PARAMETER_LABELS.SH_SIGNATURE]=sig;
    response[PARAMETER_LABELS.SH_PUBLIC_KEY]=from;
    return response;
}


Web3JSService.prototype.Util_SignContent_Attestation=function(request){
    var msg = web3.sha3(request.fileName) ;
    var sig = web3.eth.sign(request.account, msg);

    var response={};
    response[PARAMETER_LABELS.SH_SIGNATURE]=sig;
    return response;
}



module.exports=Web3JSService;
