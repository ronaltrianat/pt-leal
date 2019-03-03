var jwt = require('jsonwebtoken');
var config = require('../config')
const status = require('http-status')


const RESPONSE_UNAUTHORIZED = { message: 'It is necessary to authenticate to obtain the requested response.' }
const RESPONSE_FORBIDDEN = { message: 'The client does not have the necessary permits.' }
const HEADER_AUTHORIZATION = 'authorization'

module.exports = (req, res, next) => {

  if (!req.headers.hasOwnProperty(HEADER_AUTHORIZATION)) {
    res.status(status.UNAUTHORIZED).send(RESPONSE_UNAUTHORIZED)
  } else {
    jwt.verify(req.headers[HEADER_AUTHORIZATION], config.jwtSettings.api_secret, (err, decoded) => {
      if (err) {
        res.status(status.FORBIDDEN).send(RESPONSE_FORBIDDEN)
      } else {
        next()
      }
    })
  }
}