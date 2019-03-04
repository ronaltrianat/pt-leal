'use strict'
const axios = require('axios')
var store = require('store')
const configGW = require('../config')

const getPoints = () => {

    return new Promise((resolve, reject) => {

        if(!store.get('user_key')) reject(-1)

        const config = { headers: { 'Authorization': store.get('user_key').token } }

        let url = `${configGW.endpointsSettings.api_gateway}/points/${store.get('user_id')}`

        axios.get(url, config).then((resp) => {
            store.remove('message')
            store.remove('transactions')
            if(resp && resp.status === 200) {
                let message = { message : `Total Puntos: ${resp.data.points}` }
                store.set('message', message)
                resolve(1)
            } else resolve(0)
        })
        .catch((err) => reject(err))
    });    
}

module.exports = Object.assign({}, {getPoints})