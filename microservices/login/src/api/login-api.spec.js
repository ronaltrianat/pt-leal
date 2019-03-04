/* eslint-env mocha */
const request = require('supertest')
const server = require('../server/server')
const should = require('should')

describe('Login API', () => {
  let app = null

  let loginUserResp = {
    "code": 1,
    "message": "Successfully authenticated user."
  }

  let testRepo = {
    loginUser(req) {
      return Promise.resolve(loginUserResp)
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


  it('can login', (done) => {
    request(app)
    .post('/login')
    .expect((res) => {
      res.body.should.eql(loginUserResp)
    })
    .expect(200, done)
  })

})