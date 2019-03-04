var express = require('express');
var router = express.Router()
const apiAdapter = require('../api-adapter')
const config = require('../../config/')

const api = apiAdapter(config.endpointsSettings.users)

router.post('/users/user', (req, res, next) => {
    api.post(req.path, req.body).then(resp => {
        res.status(res.status).json(resp.data)
    }).catch(next)
})

module.exports = router