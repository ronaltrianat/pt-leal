var express = require('express');
var router = express.Router()

var usersService = require('./services/users-service')
var loginService = require('./services/login-service')
var pointsService = require('./services/points-service')
var transactionsService = require('./services/transactions-service')
var reportsService = require('./services/reports-service')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(usersService)
router.use(loginService)
router.use(pointsService)
router.use(transactionsService)
router.use(reportsService)

module.exports = router