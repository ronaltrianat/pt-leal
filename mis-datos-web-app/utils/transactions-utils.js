'use strict'
const axios = require('axios')
var store = require('store')
const configGW = require('../config')

const createTransaction = (data) => {

    return new Promise((resolve, reject) => {

        if(!store.get('user_key')) reject(-1)

        const config = { headers: { 'Authorization': store.get('user_key').token } }

        let body = { ...data, user_id: store.get('user_id')}
  
        let url = `${configGW.endpointsSettings.api_gateway}/transactions/transaction`
        axios.post(url, body, config).then((resp) => {
            store.remove('message')
            if(resp && resp.status === 200 && resp.data.code == 1) {
                store.set('message', resp.data)
                resolve(1)
            } else resolve(0)
        })
        .catch((err) => reject(err))
    });    
}


const getTransactions = () => {

    return new Promise((resolve, reject) => {

        if(!store.get('user_key')) reject(-1)

        const config = { headers: { 'Authorization': store.get('user_key').token } }

        let url = `${configGW.endpointsSettings.api_gateway}/transactions/${store.get('user_id')}`

        axios.get(url, config).then((resp) => {
            store.remove('message')
            store.remove('transactions')
            if(resp && resp.status === 200) {
                store.set('transactions', resp.data)
                resolve(1)
            } else resolve(0)
        })
        .catch((err) => reject(err))
    });    
}


const updateTransaction = (data) => {

    return new Promise((resolve, reject) => {

        if(!store.get('user_key')) reject(-1)

        const config = { headers: { 'Authorization': store.get('user_key').token } }

        let url = `${configGW.endpointsSettings.api_gateway}/transactions/transaction/state`

        axios.put(url, data, config).then((resp) => {
            store.remove('transactions')
            store.remove('message')
            if(resp && resp.status === 200 && resp.data.code == 1) {
                store.set('message', resp.data)
                resolve(1)
            } else resolve(0)
        })
        .catch((err) => reject(err))

    })
}

module.exports = Object.assign({}, {createTransaction, getTransactions, updateTransaction})