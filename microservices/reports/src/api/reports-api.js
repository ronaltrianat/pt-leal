'use strict'
const status = require('http-status')

module.exports = (app, options) => {
    const {repo} = options

    app.post('/reports/report', (req, res, next) => {
        // TODO: Validar campos de entrada
        repo.generateReport(req.body.user_id).then(file => {
           res.status(status.OK).json(file)
        }).catch(next)
    })

}