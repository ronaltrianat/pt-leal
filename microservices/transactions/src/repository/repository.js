'use strict'
var md5 = require('md5')

const repository = (db) => {

    const TRANSACTION_CREATED_OK = { code: 1, message: 'Transaction created successfully.' }
    const TRANSACTION_UPDATED_OK = { code: 1, message: 'Transaction updated successfully.' }
    const THERE_IS_NO_TRANSACTION_UPDATE = { code: -1, message: 'There is no transaction to update.' }
    const USER_DOES_NOT_EXIST = { code: -2, message: 'The user does not exist.' }

    const ER_NO_REFERENCED_ROW = 'ER_NO_REFERENCED_ROW'
    

    const createTransaction = (transaction) => {

        return new Promise((resolve, reject) => {

            let query = 'INSERT INTO transactions SET ?'
            let obj = { ...transaction, fk_user_id: md5(transaction.user_id) }
            delete obj.user_id

            db.query(query, obj, function (error, results, fields) {
                if (error) {
                    if(error.code == ER_NO_REFERENCED_ROW) {
                        resolve(USER_DOES_NOT_EXIST)
                    } else {
                        reject(error);
                    }
                } else {
                    resolve(TRANSACTION_CREATED_OK)
                }
            });
        })
    }

    const getTransactions = (user) => {

        return new Promise((resolve, reject) => {

            let query = 'SELECT * FROM transactions WHERE fk_user_id = ? order by created_date desc'
            
            db.query(query, [md5(user)], function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
            });
        })
    }

    const updateTransactionStatus = (transaction) => {

        return new Promise((resolve, reject) => {

            let query = 'UPDATE transactions set status = ? where transaction_id = ?'
            
            db.query(query, [transaction.state, transaction.transactionId], function (error, results, fields) {
                if (error) reject(error);

                if(results && results.affectedRows === 0) {
                    resolve(THERE_IS_NO_TRANSACTION_UPDATE)
                } else if(results && results.affectedRows === 1) {
                    resolve(TRANSACTION_UPDATED_OK)
                }
            });
        })
    }
    
    const disconnect = () => {
        db.close()
    }
    
    return Object.create({
        createTransaction,
        getTransactions,
        updateTransactionStatus,
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