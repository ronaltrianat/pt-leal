/* eslint-env mocha */
const request = require('supertest')
const server = require('../server/server')
const should = require('should')

describe('Users API', () => {
  let app = null
  let createUserResp = {
    "code": 1,
    "message": "User created successfully."
  }


  let testRepo = {
    createUser (req) {
      return Promise.resolve(createUserResp)
    }
  }

  beforeEach(() => {
    return server.start({
      port: 8099,
      repo: testRepo
    }).then(serv => {
      app = serv
    })
  })

  afterEach(() => {
    app.close()
    app = null
  })

  it('can create user', (done) => {
    request(app)
      .post('/users/user')
      .expect((res) => {
        res.body.should.eql(createUserResp)
      })
      .expect(201, done)
  })

})