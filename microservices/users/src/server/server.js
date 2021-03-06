const express = require('express')
var bodyParser = require('body-parser')
const api = require('../api/users-api')
const status = require('http-status')
const morgan = require('morgan')
const helmet = require('helmet')

const start = (options) => {
    return new Promise((resolve, reject) => {

        if (!options.hasOwnProperty('repo')) {
            reject(new Error('The server must be started with a connected repository'))
        }
        
        if (!options.hasOwnProperty('port')) {
            reject(new Error('The server must be started with an available port'))
        }

        const app = express()
        app.use(morgan('dev'))
        app.use(helmet())
        
        // parse application/x-www-form-urlencoded
        app.use(bodyParser.urlencoded({ extended: true }))

        // parse application/json
        app.use(bodyParser.json())
        
        app.use((err, req, res, next) => {
            reject(new Error('Something went wrong!, err:' + err))
            res.status(status.INTERNAL_SERVER_ERROR).send('Something went wrong!')
        })

        api(app, options)
        const server = app.listen(options.port, () => resolve(server))
    })
}

module.exports = Object.assign({}, {start})