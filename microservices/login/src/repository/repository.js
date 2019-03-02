'use strict'
const bcrypt = require('bcrypt');

const repository = (db) => {

    const LOGIN_OK = { code: 1, message: 'Successfully authenticated user.' }
    const LOGIN_KO = { code: -1, message: 'Incorrect password.' }
    const USER_DOES_NOT_EXIST = { code: -2, message: 'The user does not exist.' }
    

    const loginUser = (user) => {

        return new Promise((resolve, reject) => {

            let query = 'SELECT password FROM users WHERE email = ?'
            
            db.query(query, [user.email], function (error, results, fields) {
                if (error) reject(error);

                if(results && results.length > 0) {
                    let passwordCheck = bcrypt.compareSync(user.password, results[0].password)
                
                    if(passwordCheck) {
                        resolve(LOGIN_OK)
                    } else {
                        resolve(LOGIN_KO)
                    }
                } else {
                    resolve(USER_DOES_NOT_EXIST)
                }
            });
        })
    }
    
    const disconnect = () => {
        db.close()
    }
    
    return Object.create({
        loginUser,
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