'use strict'
const status = require('http-status')

module.exports = (app, options) => {
    const {repo} = options

    app.post('/reports/report', (req, res, next) => {
        repo.generateReport().then(file => {
           res.status(status.OK).json(file)
        }).catch(next)
    })

}