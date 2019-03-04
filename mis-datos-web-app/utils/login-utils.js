'use strict'
const axios = require('axios')
var store = require('store')
const configGW = require('../config')
const crypto = require('asymmetric-crypto')


const login = (data) => {

    return new Promise((resolve, reject) => {

        let url = `${configGW.endpointsSettings.api_gateway}/login`
        const encrypted = crypto.encrypt(JSON.stringify(data), configGW.keyPubPriBack.publicKey, configGW.keyPubPriFront.secretKey)
  
        axios.post(url, encrypted).then((resp) => {
          if(resp && resp.status === 200 && resp.data.code == 1) {
            store.set('user_key', resp.data)
            store.set('user_id', data.email)
            resolve(1)
          } else resolve(0)
        })
        .catch((err) => reject(err))
    });    
}

module.exports = Object.assign({}, {login})