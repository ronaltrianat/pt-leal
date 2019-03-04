'use strict'

const axios = require('axios')
var store = require('store')

const registerUser = (data) => {

    return new Promise((resolve, reject) => {

        axios.post('http://localhost:5000/users/user', data)
        .then((resp) => {
            store.set('message', resp.data)
            if(resp && resp.status === 201 && resp.data.code == 1) resolve(1)
            else resolve(0)
        })
        .catch((err) => reject(err))
    });    
}

module.exports = Object.assign({}, {registerUser})