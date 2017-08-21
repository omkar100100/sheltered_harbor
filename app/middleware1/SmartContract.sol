pragma solidity ^0.4.2;

contract SHContract{
    
    struct Attestation{
        
        bytes32 filename;
        bytes32 hash;
        bytes32 tag;
        bytes32 institution_name;
        bytes32 additional_data;
        bytes32 signature;
    }
    
    struct Organisation{
        
        bytes32 org_name;
        address org_address;
        bool is_agency;
        bytes32 signature;
        mapping(uint=>Attestation) attestations;
        uint number_attestations;
    }
    
    mapping(uint=>Organisation) public organisations;
    uint public number_organisations = 0;
    
    function register_org(bytes32 org_name, address org_address, bool is_agency, bytes32 signature)
    {
        organisations[number_organisations] = Organisation({
            org_name: org_name,
            org_address: org_address,
            is_agency: is_agency,
            signature: signature,
            number_attestations: 0
        });
        
        number_organisations = number_organisations + 1;
    }
    
    function get_organisation_details(uint index) constant returns (bytes32 org_name, address org_address, bool is_agency, bytes32 signature)
    {
        if(index >= number_organisations)
        {
            throw;
        }
        
        Organisation organisation = organisations[index];
        
        org_name = organisation.org_name;
        org_address = organisation.org_address;
        is_agency = organisation.is_agency;
        signature = organisation.signature;
    }
    
    function get_number_organisations() constant returns (uint number_orgs)
    {
        number_orgs = number_organisations;
    }
    
    function attest(uint org_index, bytes32 filename, bytes32 hash, bytes32 tag, bytes32 institution_name, bytes32 additional_data, bytes32 signature){
        
        if(org_index >= number_organisations){
            
            throw;
        }
        
        Organisation organisation = organisations[org_index];
        
        uint number_attestations = organisation.number_attestations;
        
        organisation.attestations[number_attestations] = Attestation({
           filename: filename,
           hash: hash,
           tag: tag,
           institution_name: institution_name,
           additional_data: additional_data,
           signature: signature
        });
        
        organisation.number_attestations = organisation.number_attestations + 1;
        
    }
    
    function get_number_attestations(uint org_index) constant returns (uint number_attestations)
    {
        if(org_index >= number_organisations)
        {
            throw;
        }
        
        Organisation organisation = organisations[org_index];
        number_attestations = organisation.number_attestations;
        
    }
    
    function get_attestation_details(uint org_index, uint attestation_index) constant returns (bytes32 filename, bytes32 hash, bytes32 tag, bytes32 institution_name, bytes32 additional_data, bytes32 signature)
    {
        if(org_index >= number_organisations)
        {
            throw;
        }
        
        Organisation organisation = organisations[org_index];
        uint number_attestations = organisation.number_attestations;
        
        if(attestation_index >= number_attestations)
        {
            throw;
        }
        
        Attestation attestation = organisation.attestations[attestation_index];
        filename = attestation.filename;
        hash = attestation.hash;
        tag = attestation.tag;
        institution_name = attestation.institution_name;
        additional_data = attestation.additional_data;
        signature = attestation.signature;

        
    }
    
    
}