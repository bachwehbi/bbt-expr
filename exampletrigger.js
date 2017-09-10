'use strict'

var bbtexpr = require('./index.js')

var trigger = {
  channel: 'test',
  resource: 'res1',
  data: 123,
  event: 'publish',
  protocol: 'rest'
}

bbtexpr.processExpression(
  `trigger.event == "test"`,
  null,
  trigger,
  function (err, val) {
    if (err) {
      console.log(err)
    } else {
      console.log(val)
    }
  }
)
