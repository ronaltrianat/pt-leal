var express = require('express');
var router = express.Router()
const apiAdapter = require('../api-adapter')
const config = require('../../config/')

const api = apiAdapter(config.endpointsSettings.login)

router.post('/login', (req, res, next) => {
    api.post(req.path, req.body).then(resp => {
        res.send(resp.data)
    }).catch(next)
})

module.exports = router