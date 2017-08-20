/**
 * @Copyright(c), Beebotte Corporation, 2012-2017. All Rights Reserved.
 *
 * @License: This is confidential and proprietary source code of
 * Beebotte Corporation (Beebotte). The abovementioned copyright
 * notice does not evidence any actual or intended publication of
 * such source code. Any use or copying or backup of this source
 * code without the express written consent of Beebotte is strictly
 * prohibited and punishable by law. Beebotte reserves all rights
 * including trade secret right to this source code.
 *
 * @Author: Bachar Wehbi
 * @E-mail:  legal@beebotte.com
 * @Creation Date:   2017-01-23T23:40:33+01:00
 * @Last Modified Date: 2017-07-22T01:27:29+02:00
 * @Last Modified By:   Bachar Wehbi
 * @Filename: index.js
 */


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
