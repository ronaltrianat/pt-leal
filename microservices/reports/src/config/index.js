const {serverSettings, dbSettings, S3Settings } = require('./config')
const db = require('./mysql')

module.exports = Object.assign({}, { serverSettings, dbSettings, S3Settings, db })

