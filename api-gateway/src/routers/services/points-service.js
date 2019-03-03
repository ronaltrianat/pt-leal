var express = require('express');
var router = express.Router()
const apiAdapter = require('../api-adapter')
const config = require('../../config/')
const isAuthorized = require('../../controllers/request-authenticator')

const api = apiAdapter(config.endpointsSettings.points)

router.get('/points/:user_id', isAuthorized, (req, res, next) => {
    api.get(req.path, req.body).then(resp => {
        res.send(resp.data)
    }).catch(next)
})

module.exports = router