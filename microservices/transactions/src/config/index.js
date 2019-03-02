const {serverSettings, dbSettings } = require('./config')
const db = require('./mysql')

module.exports = Object.assign({}, { serverSettings, dbSettings, db })

