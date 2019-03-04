'use strict'

const axios = require('axios')
var store = require('store')

const login = (data) => {

    return new Promise((resolve, reject) => {

        axios.post('http://localhost:5000/login', data)
        .then((resp) => {
          
          if(resp && resp.status === 200 && resp.data.code == 1) {
            store.set('user_key', resp.data)
            store.set('user_id', data.email)
            resolve(1)
          } else {
            resolve(0)
          }
        })
        .catch((err) => reject(err))
    });    
}

module.exports = Object.assign({}, {login})