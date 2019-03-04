var express = require('express');
var router = express.Router()
const apiAdapter = require('../api-adapter')
const config = require('../../config/')
const isAuthorized = require('../../controllers/request-authenticator')

const api = apiAdapter(config.endpointsSettings.reports)

router.post('/reports/report', isAuthorized, (req, res, next) => {
    api.post(req.path, req.body).then(resp => {
        res.status(resp.status).json(resp.data)
    }).catch(next)
})

module.exports = router