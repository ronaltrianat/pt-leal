'use strict'
const status = require('http-status')

module.exports = (app, options) => {
    const {repo} = options

    app.post('/users/user', (req, res, next) => {
        repo.createUser(req.body).then(results => {
          res.status(status.CREATED).json(results)
        }).catch(next)
    })

}