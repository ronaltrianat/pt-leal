'use strict'
var md5 = require('md5')

const repository = (db) => {

    const getPoints = (user) => {

        return new Promise((resolve, reject) => {

            let query = 'SELECT SUM(points) AS points FROM transactions WHERE status = 1 and fk_user_id = ?'

            db.query(query, [md5(user)], function (error, results, fields) {
                if (error) reject(error)
                let points = { points : results[0].points || 0 }
                resolve(points);
            });
        })
    }

    const disconnect = () => {
        db.close()
    }
    
    return Object.create({
        getPoints,
        disconnect
    })
}

const connect = (connection) => {
    return new Promise((resolve, reject) => {
      if (!connection) {
        reject(new Error('connection db not supplied!'))
      }
      resolve(repository(connection))
    })
}

module.exports = Object.assign({}, {connect})