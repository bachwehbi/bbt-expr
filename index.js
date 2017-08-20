'use strict'

var parser = require('./lib/parser.js')
var types = require('./lib/types.js')

module.exports.types = types
module.exports.parser = parser

function processExpression (expression, connector, trigger, callback) {

  try {
    var expr = parser.parse(expression)

    expr.setConnector(connector)

    // If 3 arguments, then trigger is the callback
    if (callback) {
      expr.setTrigger(trigger)
    } else {
      callback = trigger
    }

    expr.evaluate(callback)
  } catch (err) {
    return callback(err)
  }
}

module.exports.processExpression = processExpression
