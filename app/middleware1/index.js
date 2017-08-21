const Web3 = require('web3')

const web3 = new Web3(require('./nodeAddress'))
const contract = new web3.eth.Contract(require('./abi'), require('./contractAddress'))
const from = require('./ethAddress')

const types = {
  send: {
    register_org: [ 'cool name', '0x0AcE2fe8b189d069020b06DF341998FAc33e94Bb', false, '0x0AcE2fe8b189d069020b06DF341998FAc33e94Bb' ],
    attest: [ 0, 'test', 'test hash', 'test tag', 'innominds', 'additional data', 'my sig' ]
  },
  call: {
    get_organisation_details: [ 0 ],
    get_number_organisations: [],
    get_number_attestations: [ 0 ],
    get_attestation_details: [ 0, 0 ]
  }
}

const run = () => {
  Object.keys(types).map(async type => {
    Object.keys(types[type]).map(async method => {
      const args = types[type][method]
      const result = await contract.methods[method](...args)[type]({ from })
      console.log(`${method}: ${JSON.stringify(result, null, 2)}`)
    })
  })
}

run()
