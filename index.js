'use strict'

var parser = require('./lib/parser.js')
var types = require('./lib/types.js')

module.exports.types = types
module.exports.parser = parser

function processExpression (e, connector, callback) {

  var expr = parser.parse(e)

  expr.setConnector(connector)

  expr.evaluate(callback)
}

module.exports.processExpression = processExpression
