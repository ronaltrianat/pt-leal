'use strict'

const server = require('./server/server')
const config = require('./config/')
const repository = require('./repository/repository')

const start = async () => {
  try {
    let poolDB = await config.db.connect(config.dbSettings)
   
    let repo = await repository.connect(poolDB)
    
    let app = await server.start({ port: config.serverSettings.port, repo})

    console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)

    app.on('close', () => {
      console.log('close disconect')
    })
  } catch (error) {
    console.log(error)
  }
}

/** Iniciar Microservicio **/
start()
