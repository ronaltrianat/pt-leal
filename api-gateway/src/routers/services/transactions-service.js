var express = require('express');
var router = express.Router()
const apiAdapter = require('../api-adapter')
const config = require('../../config/')
const isAuthorized = require('../../controllers/request-authenticator')

const api = apiAdapter(config.endpointsSettings.transactions)

router.post('/transactions/transaction', isAuthorized, (req, res, next) => {
    api.post(req.path, req.body).then(resp => {
        res.send(resp.data)
    }).catch(next)
})

router.get('/transactions/:user_id', isAuthorized, (req, res, next) => {
    api.get(req.path, req.body).then(resp => {
        res.send(resp.data)
    }).catch(next)
})

router.put('/transactions/transaction/state', isAuthorized, (req, res, next) => {
    api.put(req.path, req.body).then(resp => {
        res.send(resp.data)
    }).catch(next)
})

module.exports = router