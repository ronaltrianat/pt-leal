const endpointsSettings = {
    api_gateway: process.env.ENDPOINT_API_GATEWAY || 'http://localhost:5000'
}

// TODO: Solo para Desarrollo
const keyPubPriFront = {
    secretKey: process.env.PRIVATE_KEY_FRONT || 'CfHldUbi2LpoFdUxW961rLPNZyYeaDxO3QZoRLNw1bWKDHGmAkXqlc1Nnvd4lNGDYLAPUrWAR0c2otS3qhY6Ag==',
    publicKey: process.env.PUBLIC_KEY_FRONT || 'igxxpgJF6pXNTZ73eJTRg2CwD1K1gEdHNqLUt6oWOgI='
}

// TODO: Solo para Desarrollo
const keyPubPriBack = {
    publicKey: process.env.PUBLIC_KEY_BACK ||'rCCPPOZoGmqcYEyNedxyj9zhJ7nyUv///rwtLvVmfFQ='
}

module.exports = Object.assign({}, { endpointsSettings, keyPubPriFront, keyPubPriBack })