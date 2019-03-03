var express = require('express');
var router = express.Router()
const apiAdapter = require('../api-adapter')
const config = require('../../config/')
var jwt = require('jsonwebtoken')
const status = require('http-status')


const api = apiAdapter(config.endpointsSettings.login)
const LOGIN_OK = 1


router.post('/login', (req, res, next) => {
    api.post(req.path, req.body).then(resp => {
        if(resp && resp.status === status.OK && resp.data.code == LOGIN_OK) {

            // generar token
            let token = jwt.sign(
                { id: req.body.email }, 
                config.jwtSettings.api_secret, 
                { expiresIn: config.jwtSettings.token_expiration }
            )

            let response = { ...resp.data, token: token }
            res.send(response)
        } else {
            res.send(resp.data)
        }
    }).catch(next)
})

module.exports = router