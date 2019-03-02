var mysql = require('mysql')
var util = require('util')

const connect = (options) => {
    
    return new Promise((resolve, reject) => {

        var pool = mysql.createPool(options)
    
        pool.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    reject(new Error('Database connection was closed.'))
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    reject(new Error('Database has too many connections.'))
                }
                if (err.code === 'ECONNREFUSED') {
                    reject(new Error('Database connection was refused.'))
                }
                if (connection) connection.release()
                return
            }

            pool.query = util.promisify(pool.query)
            resolve(pool)
        });
    })
}
  
module.exports = Object.assign({}, {connect})