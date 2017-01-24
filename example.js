'use strict'

var bbt = require('beebotte')
var bbtexpr = require('./index.js')

var client = new bbt.Connector({
  apiKey: 'API_KEY',
  secretKey: 'SECRET_KEY',
  protocol: 'https'
})

// Method 1
function connector (opts, callback) {

  opts.limit = 1
  client.read(opts, function(err, res) {

    if (err) {
      return callback(err)
    } else {
      return callback(null, res[0])
    }
  })
}

var expr = bbtexpr.parser.parse("testchannel.resource")

expr.setConnector(connector)

expr.evaluate(function (err, val) {
  if (err) {
    console.log(err)
  } else {
    console.log(val)
  }
})

// Method 2
bbtexpr.processExpression(
  'testchannel.resource',
  connector,
  function (err, val) {
    if (err) {
      console.log(err)
    } else {
      console.log(val)
    }
  }
)
