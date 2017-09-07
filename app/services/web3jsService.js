const Web3 = require('web3')
var Promise = require('bluebird');
var fs=require('fs');
var CONSTANTS=require('../common/constants')
var errors = require('../errors');

const web3 = new Web3(new Web3.providers.HttpProvider('http://52.170.210.64:8545'));
const util = require('ethereumjs-util');

echoByteCode="6060604052341561000f57600080fd5b5b6101668061001f6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063f15da7291461003e575b600080fd5b341561004957600080fd5b610099600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610115565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100da5780820151818401525b6020810190506100be565b50505050905090810190601f1680156101075780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61011d610126565b8190505b919050565b6020604051908101604052806000815250905600a165627a7a7230582006cbe9c43be23e2db80d063a0d41ee12cfd84e65ce77c11f3b618191e4b0ee990029";

echoABI=[{"constant":true,"inputs":[{"name":"message","type":"string"}],"name":"echo","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}];

ecrecTestCode = "606060405233600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550426005556000600755341561005957600080fd5b5b61139f806100696000396000f30060606040523615610097576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630ac298dc1461009c5780631b1b9cfe146100f1578063342f00c5146101be57806348b4ed3d146102455780637cb97b2b1461026e578063a292fa46146102a7578063c4cd0d1914610397578063d8270dce1461051d578063f1835db714610546575b600080fd5b34156100a757600080fd5b6100af6105d3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100fc57600080fd5b6101046106b3565b60405180806020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183151515158152602001828103825285818151815260200191508051906020019080838360005b838110156101815780820151818401525b602081019050610165565b50505050905090810190601f1680156101ae5780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b34156101c957600080fd5b610243600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610850565b005b341561025057600080fd5b610258610985565b6040518082815260200191505060405180910390f35b341561027957600080fd5b6102a5600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610a45565b005b34156102b257600080fd5b610395600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919080356000191690602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610b3f565b005b34156103a257600080fd5b6103b86004808035906020019091905050610cbf565b604051808060200180602001856000191660001916815260200180602001848103845288818151815260200191508051906020019080838360005b8381101561040f5780820151818401525b6020810190506103f3565b50505050905090810190601f16801561043c5780820380516001836020036101000a031916815260200191505b50848103835287818151815260200191508051906020019080838360005b838110156104765780820151818401525b60208101905061045a565b50505050905090810190601f1680156104a35780820380516001836020036101000a031916815260200191505b50848103825285818151815260200191508051906020019080838360005b838110156104dd5780820151818401525b6020810190506104c1565b50505050905090810190601f16801561050a5780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b341561052857600080fd5b610530610fcb565b6040518082815260200191505060405180910390f35b341561055157600080fd5b61059160048080356000191690602001909190803560ff169060200190919080356000191690602001909190803560001916906020019091905050610fd1565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148061067e5750600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561068957600080fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b5b90565b6106bb6111d4565b600080600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806107675750600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561077257600080fd5b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600160149054906101000a900460ff16828054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561083c5780601f106108115761010080835404028352916020019161083c565b820191906000526020600020905b81548152906001019060200180831161081f57829003601f168201915b505050505092509250925092505b5b909192565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806108f95750600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561090457600080fd5b826000908051906020019061091a9291906111e8565b5081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160146101000a81548160ff02191690831515021790555060006002819055505b5b505050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480610a305750600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b1515610a3b57600080fd5b60025490505b5b90565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480610aee5750600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b1515610af957600080fd5b80600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b610b47611268565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480610bf05750600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b1515610bfb57600080fd5b8481600001819052508381606001819052508281602001906000191690816000191681525050818160400181905250806006600060025481526020019081526020016000206000820151816000019080519060200190610c5c9291906112a6565b50602082015181600101906000191690556040820151816002019080519060200190610c899291906112a6565b506060820151816003019080519060200190610ca69291906112a6565b509050506001600254016002819055505b5b5050505050565b610cc76111d4565b610ccf6111d4565b6000610cd96111d4565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480610d825750600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b1515610d8d57600080fd5b6006600086815260200190815260200160002060000160066000878152602001908152602001600020600301600660008881526020019081526020016000206001015460066000898152602001908152602001600020600201838054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610e7b5780601f10610e5057610100808354040283529160200191610e7b565b820191906000526020600020905b815481529060010190602001808311610e5e57829003601f168201915b50505050509350828054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610f175780601f10610eec57610100808354040283529160200191610f17565b820191906000526020600020905b815481529060010190602001808311610efa57829003601f168201915b50505050509250808054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610fb35780601f10610f8857610100808354040283529160200191610fb3565b820191906000526020600020905b815481529060010190602001808311610f9657829003601f168201915b5050505050905093509350935093505b5b9193509193565b60055481565b6000610fdb611326565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806110865750600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561109157600080fd5b6040805190810160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a333200000000815250915081876040518083805190602001908083835b60208310151561110157805182525b6020820191506020810190506020830392506110db565b6001836020036101000a03801982511681845116808217855250505050505090500182600019166000191681526020019250505060405180910390209050600181878787604051600081526020016040526000604051602001526040518085600019166000191681526020018460ff1660ff16815260200183600019166000191681526020018260001916600019168152602001945050505050602060405160208103908084039060008661646e5a03f115156111bd57600080fd5b50506020604051035192505b5b5050949350505050565b602060405190810160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061122957805160ff1916838001178555611257565b82800160010185558215611257579182015b8281111561125657825182559160200191906001019061123b565b5b509050611264919061133a565b5090565b60806040519081016040528061127c61135f565b81526020016000801916815260200161129361135f565b81526020016112a061135f565b81525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106112e757805160ff1916838001178555611315565b82800160010185558215611315579182015b828111156113145782518255916020019190600101906112f9565b5b509050611322919061133a565b5090565b602060405190810160405280600081525090565b61135c91905b80821115611358576000816000905550600101611340565b5090565b90565b6020604051908101604052806000815250905600a165627a7a72305820855dec3da1bb9d8cfeb04dc4dc7c43bb8db992b3448b9c60c90ba3674cb20ceb0029";
      
 ecrecTestABI = JSON.parse('[{"constant":true,"inputs":[],"name":"get_owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_organisation_name","outputs":[{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"orgname","type":"string"},{"name":"orgaddress","type":"address"},{"name":"isagency","type":"bool"}],"name":"register_org","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_number_of_attestations","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"input","type":"address"}],"name":"set_owner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"fname","type":"string"},{"name":"add_data","type":"string"},{"name":"input_hash","type":"bytes32"},{"name":"input_tag","type":"string"}],"name":"add_attest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"get_attest","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"bytes32"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"creationTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"hash","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"verify","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]')
      




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
      var msg = web3.sha3(request[PARAMETER_LABELS.SH_FILENAME] + request[PARAMETER_LABELS.SH_TAG] + request[PARAMETER_LABELS.SH_ADDITIONAL_DATA]  + request[PARAMETER_LABELS.SH_HASH]) ;

      //var msg = web3.sha3(request[PARAMETER_LABELS.SH_FILENAME]);
      console.log('SHA3 OF MSG:'+ msg);
      console.log('Hash, V,R,S -'+msg,res.v,util.bufferToHex(res.r),util.bufferToHex(res.s) )

      deployedecrecTest.verify.call(msg,res.v,util.bufferToHex(res.r),util.bufferToHex(res.s),function (error, data){
      console.log('Account Address from Quorum attest level- '+data);
      console.log('Error - '+error);
      if(data == request.AccountAddress){
          deployedecrecTest.get_owner.call(function(err,contract_owner){
              console.log(" Error get owner call:" + err);
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
                                      console.log(" Error: getOwner call:" + err);
                                      console.log(" Get Owner address:" + contract_owner);
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
   contractAddress='0x025edab85cf77e2dcdb6565dacf5e7be82fe2673';
   return new Promise(function(resolve,reject){
        myweb3 = new Web3(new Web3.providers.HttpProvider(echo.nodeURL));
        const contract =  myweb3.eth.contract(echoABI);
       // contract.new( {from:from, data: echoByteCode, gas: 3000000}, function (error, deployedContract){
          // if(error){
          //     reject("FAILED");
          // }
         // if(deployedContract && deployedContract.address){
                //contractAddress=deployedContract.address;
                //console.log('Deployed contract addr - '+contractAddress);
                deployedeContract = contract.at(contractAddress);
                deployedeContract.echo({from:from,gas: 3000000},echo.message,function(error,data){
                  console.log("Error:" + error);
                  console.log("Data:" + data);

                  if(error.message.startsWith("Invalid JSON RPC")){
                    reject("FAIL");
                  }else{
                    resolve("OK");
                  }
                  
                });
           //}
      //});
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
