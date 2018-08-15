'use strict'

const bbtexpr = require('./index.js')
const bbt = require('beebotte')

const client = new bbt.Connector({
  apiKey: '502b09f9113252ba91d0fa24b2e69c1e',
  secretKey: '88303a6fdc866caeea2fe3bf4746611d16dce93196973d77e2037887f8fc6197',
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

bbtexpr.parser.parse(`("1" < "2")`).setConnector(connector).evaluate(callback)
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

bbtexpr.parser.parse(`test.test`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`test.test.data`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`test.test.data.param1`).setConnector(connector).evaluate(callback)

// Function from by Constructor prototype
bbtexpr.parser.parse(`CONCAT("Hello ", "World")`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`SUBSTRING("Hello World", 2, 6)`).setConnector(connector).evaluate(callback)
bbtexpr.parser.parse(`STARTSWITH("Hello World", "Hello")`).setConnector(connector).evaluate(callback)

// same as above
bbtexpr.parser.parse(`min(10, 12)`).setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("getDistance(Geopoint(123.32, 23.54), Geopoint(122, 20))").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("Polygone(Geopoint(10, 10), Geopoint(20, 10), Geopoint(20, 20), Geopoint(10, 20))").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("isPointInside(Geopoint(13, 14), Polygone(Geopoint(10, 10), Geopoint(20, 10), Geopoint(20, 20), Geopoint(10, 20)))").setConnector(connector).evaluate(callback)

//bbtexpr.parser.parse("Polygone(Geopoint(chan1.res2), Geopoint(chan2.res2), Geopoint(20, 20), Geopoint(10, 20))").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("min(10, 44, 43, 0, -3, 0.3)").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("mean(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("ceil(12.3)").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("random()").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("min(10, 44, 43, 0, -3, 0.3)").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse('min("10", "44")').setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("mean(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("ceil(12.3)").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("random()").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("mean(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)").setConnector(connector).evaluate(callback)
bbtexpr.parser.parse("min(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)").setConnector(connector).evaluate(callback)
bbtexpr.parser.parse("max(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)").setConnector(connector).evaluate(callback)
bbtexpr.parser.parse("random()").setConnector(connector).evaluate(callback)
bbtexpr.parser.parse("ceil(1442.45)").setConnector(connector).evaluate(callback)
bbtexpr.parser.parse("floor(1442.45)").setConnector(connector).evaluate(callback)
bbtexpr.parser.parse("abs(-91442.45)").setConnector(connector).evaluate(callback)
bbtexpr.parser.parse("sqrt(64)").setConnector(connector).evaluate(callback)
bbtexpr.parser.parse("pow(14, 3)").setConnector(connector).evaluate(callback)
bbtexpr.parser.parse("median(1, 2, 3, 4, 5, 6, 7, 8, 9, 90, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)").setConnector(connector).evaluate(callback)
bbtexpr.parser.parse("sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)").setConnector(connector).evaluate(callback)
bbtexpr.parser.parse("std(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)").setConnector(connector).evaluate(callback)

bbtexpr.parser.parse("getdistance(Geopoint(123.32, 23.54), Geopoint(122, 20))").setConnector(connector).evaluate(callback)
bbtexpr.parser.parse("isPointInside(Geopoint(74.44335937499999, 42.87596410238256), Polygone(Geopoint(62.57812500000001, 69.65708627301174), Geopoint(60.46875, 68.26938680456564), Geopoint(65.0390625, 66.23145747862573), Geopoint(68.203125, 63.54855223203644), Geopoint(68.90625, 60.930432202923335), Geopoint(71.015625, 57.326521225217064), Geopoint(71.71875, 52.482780222078226), Geopoint(72.421875, 47.27922900257082), Geopoint(72.0703125, 43.58039085560784), Geopoint(73.828125, 36.59788913307022), Geopoint(73.47656249999999, 30.44867367928756), Geopoint(72.421875, 24.84656534821976), Geopoint(71.015625, 19.31114335506464), Geopoint(68.203125, 16.29905101458183), Geopoint(65.7421875, 11.178401873711785), Geopoint(61.87499999999999, 9.795677582829743), Geopoint(58.71093750000001, 8.754794702435618), Geopoint(54.84375, 6.315298538330033), Geopoint(61.17187499999999, 3.8642546157214084), Geopoint(67.1484375, 8.754794702435618), Geopoint(72.0703125, 14.604847155053898), Geopoint(75.5859375, 19.642587534013032), Geopoint(76.640625, 25.48295117535531), Geopoint(76.640625, 37.16031654673677), Geopoint(74.53125, 53.330872983017066), Geopoint(73.828125, 59.88893689676585), Geopoint(72.0703125, 63.860035895395306), Geopoint(68.90625, 65.94647177615738), Geopoint(66.4453125, 67.47492238478702), Geopoint(62.57812500000001, 69.65708627301174)))").setConnector(connector).evaluate(callback)
