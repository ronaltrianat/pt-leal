'use strict'
const status = require('http-status')

module.exports = (app, options) => {
    const {repo} = options

    app.post('/transactions/transaction', (req, res, next) => {
        // TODO: Validar campos de entrada
        repo.createTransaction(req.body).then(results => {
          res.status(status.OK).json(results)
        }).catch(next)
    })

    app.get('/transactions/:user_id', (req, res, next) => {
        // TODO: Validar campos de entrada
        repo.getTransactions(req.params.user_id).then(results => {
          res.status(status.OK).json(results)
        }).catch(next)
    })

    app.put('/transactions/transaction/state', (req, res, next) => {
        // TODO: Validar campos de entrada
        repo.updateTransactionStatus(req.body).then(results => {
          res.status(status.OK).json(results)
        }).catch(next)
    })
}