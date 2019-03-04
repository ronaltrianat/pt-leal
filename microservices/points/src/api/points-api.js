'use strict'
const status = require('http-status')

module.exports = (app, options) => {
    const {repo} = options

    app.get('/points/:user_id', (req, res, next) => {
        // TODO: Validar campos de entrada
        repo.getPoints(req.params.user_id).then(results => {
          res.status(status.OK).json(results)
        }).catch(next)
    })

}