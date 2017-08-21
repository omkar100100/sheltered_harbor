const Web3 = require('web3')

var fs=require('fs');

//const web3 = new Web3(require('../middleware/nodeAddress'))
const web3 = new Web3('http://10.10.10.5:8545');

abi1 = [{"constant":true,"inputs":[{"name":"org_index","type":"uint256"}],"name":"get_number_attestations","outputs":[{"name":"number_attestations","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"organisations","outputs":[{"name":"org_name","type":"string"},{"name":"org_address","type":"address"},{"name":"is_agency","type":"bool"},{"name":"signature","type":"bytes32"},{"name":"number_attestations","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"org_name","type":"string"},{"name":"org_address","type":"address"},{"name":"is_agency","type":"bool"},{"name":"signature","type":"bytes32"}],"name":"register_org","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"number_organisations","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"org_index","type":"uint256"},{"name":"filename","type":"string"},{"name":"hash","type":"bytes32"},{"name":"tag","type":"string"},{"name":"institution_name","type":"string"},{"name":"additional_data","type":"string"},{"name":"signature","type":"bytes32"}],"name":"attest","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get_number_organisations","outputs":[{"name":"number_orgs","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"org_index","type":"uint256"},{"name":"attestation_index","type":"uint256"}],"name":"get_attestation_details","outputs":[{"name":"filename","type":"string"},{"name":"hash","type":"bytes32"},{"name":"tag","type":"string"},{"name":"institution_name","type":"string"},{"name":"additional_data","type":"string"},{"name":"signature","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"get_organisation_details","outputs":[{"name":"org_name","type":"string"},{"name":"org_address","type":"address"},{"name":"is_agency","type":"bool"},{"name":"signature","type":"bytes32"}],"payable":false,"type":"function"}]



abi=[{"constant":true,"inputs":[{"name":"org_index","type":"uint256"}],"name":"get_number_attestations","outputs":[{"name":"number_attestations","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"organisations","outputs":[{"name":"org_name","type":"bytes32"},{"name":"org_address","type":"address"},{"name":"is_agency","type":"bool"},{"name":"signature","type":"bytes32"},{"name":"number_attestations","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"org_name","type":"bytes32"},{"name":"org_address","type":"address"},{"name":"is_agency","type":"bool"},{"name":"signature","type":"bytes32"}],"name":"register_org","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"org_index","type":"uint256"},{"name":"filename","type":"bytes32"},{"name":"hash","type":"bytes32"},{"name":"tag","type":"bytes32"},{"name":"institution_name","type":"bytes32"},{"name":"additional_data","type":"bytes32"},{"name":"signature","type":"bytes32"}],"name":"attest","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"number_organisations","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get_number_organisations","outputs":[{"name":"number_orgs","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"org_index","type":"uint256"},{"name":"attestation_index","type":"uint256"}],"name":"get_attestation_details","outputs":[{"name":"filename","type":"bytes32"},{"name":"hash","type":"bytes32"},{"name":"tag","type":"bytes32"},{"name":"institution_name","type":"bytes32"},{"name":"additional_data","type":"bytes32"},{"name":"signature","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"get_organisation_details","outputs":[{"name":"org_name","type":"bytes32"},{"name":"org_address","type":"address"},{"name":"is_agency","type":"bool"},{"name":"signature","type":"bytes32"}],"payable":false,"type":"function"}]

const contract = new web3.eth.Contract(abi1, '0x2299254913ed64d090ee2f077a5af93d4d8f2b19');

const from = "0xca843569e3427144cead5e4d5999a3d0ccf92b8e";


var Web3JSService=function(){};

Web3JSService.prototype.saveAttestation=function(shLog){
    
   //(uint org_index, bytes32 filename, bytes32 hash, bytes32 tag, bytes32 institution_name, bytes32 additional_data, bytes32 signature){
   
//  params= [ 0, 'test', 'test hash', 'test tag', 'innominds', 'additional data', 'my sig' ]
    params= [ 0, shLog.Filename,shLog.Hash, shLog.Tag, shLog.Name, shLog.AdditionalData, shLog.Signature ]
    params[1]=shLog.FileName;

    return  contract.methods["attest"](...params)["send"]({ from })
    // .then(function(result){
    //     console.log(result);
    // })
    
}

Web3JSService.prototype.saveOrganization=function(org){
  //    function register_org(bytes32 org_name, address org_address, bool is_agency, bytes32 signature)
   //  params= [ 'cool name', '0x0AcE2fe8b189d069020b06DF341998FAc33e94Bb', false, '0x0AcE2fe8b189d069020b06DF341998FAc33e94Bb' ]
    params= [ org.orgName, '0x0AcE2fe8b189d069020b06DF341998FAc33e94Bb', org.isAgency,obj.signature ]
    return contract.methods["register_org"](...params)["send"]({ from })
    // .then(function(result){
    //     console.log(result);
    //     return result;
    // })
    
}

module.exports=Web3JSService;
