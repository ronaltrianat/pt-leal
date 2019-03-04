const endpointsSettings = {
    api_gateway: process.env.ENDPOINT_API_GATEWAY || 'http://localhost:5000'
}

module.exports = Object.assign({}, { endpointsSettings })