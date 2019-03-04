/* eslint-env mocha */
const request = require('supertest')
const server = require('../server/server')
const should = require('should')

describe('Reports API', () => {
  let app = null
  
  let generateReportResp = {
    "file": "https://s3.amazonaws.com/leal-reports-pt/reports/reports/1551672567977.xlsx"
  }

  let testRepo = {
    generateReport(req) {
      return Promise.resolve(generateReportResp)
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


  it('can generate reports', (done) => {
    request(app)
    .post('/reports/report')
    .expect((res) => {
      res.body.should.eql(generateReportResp)
    })
    .expect(200, done)
  })

})