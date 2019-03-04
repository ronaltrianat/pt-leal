'use strict'
const status = require('http-status')

module.exports = (app, options) => {
    const {repo} = options

    app.post('/login', (req, res, next) => {
        // TODO: Validar campos de entrada
        repo.loginUser(req.body).then(results => {
          res.status(status.OK).json(results)
        }).catch(next)
    })

}