const dbSettings = {
    database: process.env.DB      || 'pt_leal_db',
    user: process.env.DB_USER     || 'user_leal',
    password: process.env.DB_PASS || 'password',
    host: process.env.DB_HOST     || 'localhost',
    connectionLimit: process.env.DB_CONNETION_LIMIT || 10
}
  
const serverSettings = {
    port: process.env.PORT || 4203
}
  
module.exports = Object.assign({}, { serverSettings, dbSettings })