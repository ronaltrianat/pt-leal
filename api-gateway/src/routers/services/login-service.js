var express = require('express');
var router = express.Router()
const apiAdapter = require('../api-adapter')
const config = require('../../config/')
var jwt = require('jsonwebtoken')
const status = require('http-status')
const crypto = require('asymmetric-crypto')

const api = apiAdapter(config.endpointsSettings.login)
const LOGIN_OK = 1


router.post('/login', (req, res, next) => {

    const decrypted = crypto.decrypt(req.body.data, req.body.nonce, 
        config.keyPubPriFront.publicKey, config.keyPubPriBack.secretKey)

    api.post(req.path, JSON.parse(decrypted)).then(resp => {
        if(resp && resp.status === status.OK && resp.data.code == LOGIN_OK) {

            // generar token
            let token = jwt.sign(
                { id: req.body.email }, 
                config.jwtSettings.api_secret, 
                { expiresIn: config.jwtSettings.token_expiration }
            )

            let response = { 
                ...resp.data, 
                token: token, 
                keyPubBack: config.keyPubPriBack.publicKey, 
                keyPriFront : config.keyPubPriFront.secretKey 
            }

            res.status(resp.status).json(response)
        } else {
            res.status(resp.status).json(resp.data)
        }
    }).catch(next)
})

module.exports = router