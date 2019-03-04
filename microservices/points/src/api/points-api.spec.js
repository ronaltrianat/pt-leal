/* eslint-env mocha */
const request = require('supertest')
const server = require('../server/server')
const should = require('should')

describe('Points API', () => {
  let app = null
  let getPointsResp = {
    "points": 55
  }

  let testRepo = {
    getPoints (req) {
      return Promise.resolve(getPointsResp)
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

  it('can get points', (done) => {
    request(app)
      .get('/points/user@correo.com')
      .expect((res) => {
        res.body.should.eql(getPointsResp)
      })
      .expect(200, done)
  })

})