const Web3 = require('web3')

var fs=require('fs');

//const web3 = new Web3(require('../middleware/nodeAddress'))
//const web3 = new Web3('http://10.11.11.4:8545');
 const web3 = new Web3('http://10.10.10.5:8545');
//const web3 = new Web3('http://52.170.210.64:8545');

abi1 = [{"constant":true,"inputs":[{"name":"org_index","type":"uint256"}],"name":"get_number_attestations","outputs":[{"name":"number_attestations","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"organisations","outputs":[{"name":"org_name","type":"string"},{"name":"org_address","type":"address"},{"name":"is_agency","type":"bool"},{"name":"signature","type":"bytes32"},{"name":"number_attestations","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"org_name","type":"string"},{"name":"org_address","type":"address"},{"name":"is_agency","type":"bool"},{"name":"signature","type":"bytes32"}],"name":"register_org","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"number_organisations","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"org_index","type":"uint256"},{"name":"filename","type":"string"},{"name":"hash","type":"bytes32"},{"name":"tag","type":"string"},{"name":"institution_name","type":"string"},{"name":"additional_data","type":"string"},{"name":"signature","type":"bytes32"}],"name":"attest","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get_number_organisations","outputs":[{"name":"number_orgs","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"org_index","type":"uint256"},{"name":"attestation_index","type":"uint256"}],"name":"get_attestation_details","outputs":[{"name":"filename","type":"string"},{"name":"hash","type":"bytes32"},{"name":"tag","type":"string"},{"name":"institution_name","type":"string"},{"name":"additional_data","type":"string"},{"name":"signature","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"get_organisation_details","outputs":[{"name":"org_name","type":"string"},{"name":"org_address","type":"address"},{"name":"is_agency","type":"bool"},{"name":"signature","type":"bytes32"}],"payable":false,"type":"function"}]



abi=[{"constant":true,"inputs":[{"name":"org_index","type":"uint256"}],"name":"get_number_attestations","outputs":[{"name":"number_attestations","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"organisations","outputs":[{"name":"org_name","type":"bytes32"},{"name":"org_address","type":"address"},{"name":"is_agency","type":"bool"},{"name":"signature","type":"bytes32"},{"name":"number_attestations","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"org_name","type":"bytes32"},{"name":"org_address","type":"address"},{"name":"is_agency","type":"bool"},{"name":"signature","type":"bytes32"}],"name":"register_org","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"org_index","type":"uint256"},{"name":"filename","type":"bytes32"},{"name":"hash","type":"bytes32"},{"name":"tag","type":"bytes32"},{"name":"institution_name","type":"bytes32"},{"name":"additional_data","type":"bytes32"},{"name":"signature","type":"bytes32"}],"name":"attest","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"number_organisations","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get_number_organisations","outputs":[{"name":"number_orgs","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"org_index","type":"uint256"},{"name":"attestation_index","type":"uint256"}],"name":"get_attestation_details","outputs":[{"name":"filename","type":"bytes32"},{"name":"hash","type":"bytes32"},{"name":"tag","type":"bytes32"},{"name":"institution_name","type":"bytes32"},{"name":"additional_data","type":"bytes32"},{"name":"signature","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"get_organisation_details","outputs":[{"name":"org_name","type":"bytes32"},{"name":"org_address","type":"address"},{"name":"is_agency","type":"bool"},{"name":"signature","type":"bytes32"}],"payable":false,"type":"function"}]

abi2=[ { "constant": true, "inputs": [ { "name": "org_index", "type": "uint256" } ], "name": "get_number_attestations", "outputs": [ { "name": "number_attestations", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "organisations", "outputs": [ { "name": "org_name", "type": "string" }, { "name": "org_address", "type": "address" }, { "name": "is_agency", "type": "bool" }, { "name": "signature", "type": "bytes32" }, { "name": "number_attestations", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "temp", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "org_name", "type": "string" }, { "name": "org_address", "type": "address" }, { "name": "is_agency", "type": "bool" }, { "name": "signature", "type": "bytes32" } ], "name": "register_org", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "input", "type": "string" } ], "name": "simple_add", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "number_organisations", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "org_index", "type": "uint256" }, { "name": "filename", "type": "string" }, { "name": "hash", "type": "bytes32" }, { "name": "tag", "type": "string" }, { "name": "institution_name", "type": "string" }, { "name": "additional_data", "type": "string" }, { "name": "signature", "type": "bytes32" } ], "name": "attest", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "get_number_organisations", "outputs": [ { "name": "number_orgs", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "org_index", "type": "uint256" }, { "name": "attestation_index", "type": "uint256" } ], "name": "get_attestation_details", "outputs": [ { "name": "filename", "type": "string" }, { "name": "hash", "type": "bytes32" }, { "name": "tag", "type": "string" }, { "name": "institution_name", "type": "string" }, { "name": "additional_data", "type": "string" }, { "name": "signature", "type": "bytes32" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "simple_get", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "hash", "type": "bytes32" }, { "name": "v", "type": "uint8" }, { "name": "r", "type": "bytes32" }, { "name": "s", "type": "bytes32" } ], "name": "verify", "outputs": [ { "name": "returnAddress", "type": "address" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "get_organisation_details", "outputs": [ { "name": "org_name", "type": "string" }, { "name": "org_address", "type": "address" }, { "name": "is_agency", "type": "bool" }, { "name": "signature", "type": "bytes32" } ], "payable": false, "type": "function" } ]


const contract = new web3.eth.Contract(abi1, '0x2299254913ed64d090ee2f077a5af93d4d8f2b19');
const from = "0xca843569e3427144cead5e4d5999a3d0ccf92b8e";



var Web3JSService=function(){};


Web3JSService.prototype.saveAttestation=function(shLog){
   //(uint org_index, bytes32 filename, bytes32 hash, bytes32 tag, bytes32 institution_name, bytes32 additional_data, bytes32 signature){
   // params= [ 0, 'test', '0x0AcE2fe8b189d06', 'test tag', 'innominds', 'additional data', '0x0AcE2fe8b189d069020' ]
    params= [ 0, shLog.Filename,shLog.Hash, shLog.Tag, shLog.Name, shLog.AdditionalData, shLog.Signature ]
    params[1]=shLog.FileName;

    return  contract.methods["attest"](...params)["send"]({ from : from })

    
}


Web3JSService.prototype.saveOrganization=function(org){
  //    function register_org(bytes32 org_name, address org_address, bool is_agency, bytes32 signature)
  //  params= [ 'cool name', '0x0AcE2fe8b189d069020b06DF341998FAc33e94Bb', false, '0x0AcE2fe8b189d069020b06DF341998FAc33e94Bb' ]
    params= [ org.orgName, '0x0AcE2fe8b189d069020b06DF341998FAc33e94Bb',false,obj.signature ]
    return contract.methods["register_org"](...params)["send"]({ from: from})
}

module.exports=Web3JSService;
