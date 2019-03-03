var express = require('express');
var app = express();
var router = require('./routers/router')
var bodyParser = require('body-parser');
const morgan = require('morgan')
const helmet = require('helmet')
var config = require('./config')

app.use(morgan('dev'))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

app.listen(config.serverSettings.port, () => {
    console.log('API Gateway Listening on port 3000!');
});
