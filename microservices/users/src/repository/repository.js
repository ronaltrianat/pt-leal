'use strict'
var md5 = require('md5');

const repository = (db) => {

    const CREATE_OK = { code: 1, message: 'User created successfully.' }
    const DUPLICATE_USER = 'ER_DUP_ENTRY';

    const createUser = (user) => {

        return new Promise((resolve, reject) => {

            let obj = { ...user, user_id: md5(user.email) }

            db.query('INSERT INTO users SET ?', obj, function (error, results, fields) {
                if (error) {
                    if(error.code === DUPLICATE_USER) {
                        reject(new Error(`The user with email ${obj.email}, already exists.`));
                    } else {
                        reject(error);
                    } 
                }
                resolve(CREATE_OK)
            });
        })
    }
    
    const disconnect = () => {
        db.close()
    }
    
    return Object.create({
        createUser,
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