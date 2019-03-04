/* eslint-env mocha */
const request = require('supertest')
const server = require('../server/server')
const should = require('should')

describe('Tranmsactions API', () => {
  let app = null
  let transactionsResp = [
    {
      "transaction_id": 7,
      "created_date": "2019-03-03T20:17:18.000Z",
      "value": 5000,
      "points": 21,
      "status": 1,
      "fk_user_id": "1f7acba2c03d19ee64bc5d3f2d75ea46"
    },
    {
      "transaction_id": 4,
      "created_date": "2019-03-02T22:14:58.000Z",
      "value": 12000,
      "points": 34,
      "status": 0,
      "fk_user_id": "1f7acba2c03d19ee64bc5d3f2d75ea46"
    },
    {
      "transaction_id": 3,
      "created_date": "2019-03-02T22:14:56.000Z",
      "value": 12000,
      "points": 34,
      "status": 1,
      "fk_user_id": "1f7acba2c03d19ee64bc5d3f2d75ea46"
    }
  ]

  let createTransactionResp = {
    "code": 1,
    "message": "Transaction created successfully."
  }

  let updateTransactionResp = {
    "code": 1,
    "message": "Transaction updated successfully."
  }

  let testRepo = {
    getTransactions (req) {
      return Promise.resolve(transactionsResp)
    },
    createTransaction(req) {
      return Promise.resolve(createTransactionResp)
    },
    updateTransactionStatus(req) {
      return Promise.resolve(updateTransactionResp)
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

  it('can get transactions', (done) => {
    request(app)
      .get('/transactions/user@correo.com')
      .expect((res) => {
        res.body.should.eql(transactionsResp)
      })
      .expect(200, done)
  })

  it('can create transaction', (done) => {
    request(app)
    .post('/transactions/transaction')
    .expect((res) => {
      res.body.should.eql(createTransactionResp)
    })
    .expect(200, done)
  })

  it('can create transaction', (done) => {
    request(app)
    .put('/transactions/transaction/state')
    .expect((res) => {
      res.body.should.eql(updateTransactionResp)
    })
    .expect(200, done)
  })
})