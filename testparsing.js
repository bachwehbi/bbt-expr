'use strict'

const bbtexpr = require('./index.js')
const bbt = require('beebotte')

const client = new bbt.Connector({
  apiKey: 'API_KEY',
  secretKey: 'SECRET_KEY',
  protocol: 'https'
})

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


function callback (err, result) {
  console.log(err, result)
}

bbtexpr.parser.parse(`(1 < 2 AND 2 > 6)`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`1 > 2 OR (1 < 2 AND 2 > 6)`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`(1 > 2 OR 1 < 2) AND 2 > 6`).setConnector(connector).evaluate(callback)

bbtexpr.parser.parse(`1`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`1 + 2`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`1 * 2`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`1 / 2`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`1 - 2`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`1 % 2`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`1 + 2 + 4`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`1 + 2 * 4 / 6`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`(1 * 2) + 3`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`-5 + 2 + (4 * 6) - 6`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`(-5 + 2) + (4 * 6) - (6 + 4) + (4)`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`((1 + 2) * 9)`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`(((1 + 2))) / 1`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`1`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`1 > 1`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`!(1 > 1)`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`1 > 2 OR 1 < 2`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`1 > 2 OR 1 < 2 OR 3 > 5`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`1 > 2 AND 1 < 2 AND 3 > 5`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`1 > 2 OR 1 < 2 AND 3 > 5`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`1 > 2 AND 1 < 2 OR 3 > 5`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`1 > 2 OR (1 < 2 AND 2 > 6)`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`(1 > 2 AND 1 < 2) OR 2 > 6`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`(1 == 1 OR 1 > 2) OR (1 < 2 AND 2 > 6)`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`(1 == 1 OR 1 > 2) AND !(1 < 2 AND 2 > 6)`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`(1 == 1 OR 1 > 2) AND !(1 < 2 AND NOT (2 > 6))`).setConnector(connector).evaluate(callback)

// Function applied on primitive value
bbtexpr.parser.parse(`"sometext".startsWith("123")`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`"sometext".startsWith("123" + "mmm")`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`test.test`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`test.test.data`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`test.test.data.param1`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`test.test.operation()`).setConnector(connector).evaluate(callback)

bbtexpr.parser.parse(`test.test.data.param1.param2.operation()`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`test.test.data.param1.param2.operation().param1.param2`).setConnector(connector).evaluate(callback)

// Function from by Constructor prototype
bbtexpr.parser.parse(`String.concat("Hello ", "World")`).setConnector(connector).evaluate(callback)

// Piece of shit, but still accepted
bbtexpr.parser.parse(`String.startsWith("muuu")`).setConnector(connector).evaluate(callback)

// function applied on the channel/resource value prototype
bbtexpr.parser.parse(`test.test.startsWith("sometext")`).setConnector(connector).evaluate(callback)

// same as above
bbtexpr.parser.parse(`test.test.substring(10)`).setConnector(connector).evaluate(callback)

// same as above
bbtexpr.parser.parse(`Math.min(10, 12)`).setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("Geolib.getDistance(Geopoint(123.32, 23.54), Geopoint(122, 20))").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("Polygone(Geopoint(10, 10), Geopoint(20, 10), Geopoint(20, 20), Geopoint(10, 20))").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("Geolib.isPointInside(Geopoint(13, 14), Polygone(Geopoint(10, 10), Geopoint(20, 10), Geopoint(20, 20), Geopoint(10, 20)))").setConnector(connector).evaluate(callback)

//bbtexpr.parser.parse("Polygone(Geopoint(chan1.res2), Geopoint(chan2.res2), Geopoint(20, 20), Geopoint(10, 20))").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("Math.min(10, 44, 43, 0, -3, 0.3)").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("Math.mean(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("Math.ceil(12.3)").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("Math.random()").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("Math.min(10, 44, 43, 0, -3, 0.3)").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("Math.mean(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("Math.ceil(12.3)").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("Math.random()").setConnector(connector).evaluate(callback)
