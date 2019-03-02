'use strict'

const server = require('./server/server')
const config = require('./config/')
const repository = require('./repository/repository')

config.db.connect(config.dbSettings)
    .then(poolDB => repository.connect(poolDB))
    .then(repo => server.start({ port: config.serverSettings.port, repo}))
    .then(app => {
        console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
        app.on('close', () => {
          console.log('close disconect');
        })
    });
