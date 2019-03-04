'use strict'
const axios = require('axios')
var store = require('store')
const configGW = require('../config')

const generateReport = () => {

    return new Promise((resolve, reject) => {
        if(!store.get('user_key')) reject(-1)

        const config = { headers: { 'Authorization': store.get('user_key').token } }

        let url = `${configGW.endpointsSettings.api_gateway}/reports/report`
        let body = { user_id: store.get('user_id')}

        store.remove('transactions')
        store.remove('message')

        axios.post(url, body, config).then((resp) => {
          if(resp && resp.status === 200) {
            resolve(resp.data.file)
          } else resolve(0)
        })
        .catch((err) => reject(err))
    });    
}

module.exports = Object.assign({}, {generateReport})