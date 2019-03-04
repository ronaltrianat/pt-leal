const endpointsSettings = {
    transactions: process.env.ENDPOINT_TRANSACTIONS || 'http://localhost:4202',
    reports: process.env.ENDPOINT_REPORTS || 'http://localhost:4204',
    points: process.env.ENDPOINT_POINTS || 'http://localhost:4203',
    login: process.env.ENDPOINT_LOGIN || 'http://localhost:4201',
    users: process.env.ENDPOINT_USERS || 'http://localhost:4200'
}

const jwtSettings = {
    api_secret: process.env.API_SECRET || '439fcd06-9dff-478b-855b-d878ee999724',
    token_expiration: process.env.TOKEN_EXPIRATION || 30 * 30
}

const serverSettings = {
    port: process.env.PORT || 5000
}

module.exports = Object.assign({}, { endpointsSettings, jwtSettings, serverSettings })