'use strict'

var bbtexpr = require('./index.js')

var expr = bbtexpr.parser.parse("getDistance(Geopoint(123.32, 23.54), Geopoint(122, 20))")

expr.evaluate(function (err, val) {
  if (err) {
    console.log(err)
  } else {
    console.log(val)
  }
})

var expr1 = bbtexpr.parser.parse("Polygone(Geopoint(10, 10), Geopoint(20, 10), Geopoint(20, 20), Geopoint(10, 20))")

expr1.evaluate(function (err, val) {
  if (err) {
    console.log(err)
  } else {
    console.log(val)
  }
})

var expr2 = bbtexpr.parser.parse("isPointInside(Geopoint(74.44335937499999, 42.87596410238256), Polygone(Geopoint(62.57812500000001, 69.65708627301174), Geopoint(60.46875, 68.26938680456564), Geopoint(65.0390625, 66.23145747862573), Geopoint(68.203125, 63.54855223203644)))")

expr2.evaluate(function (err, val) {
  if (err) {
    console.log(err)
  } else {
    console.log(val)
  }
})

var expr3 = bbtexpr.parser.parse("isPointInside(Geopoint(74.44335937499999, 42.87596410238256), Polygone(Geopoint(62.57812500000001, 69.65708627301174), Geopoint(60.46875, 68.26938680456564), Geopoint(65.0390625, 66.23145747862573), Geopoint(68.203125, 63.54855223203644), Geopoint(68.90625, 60.930432202923335), Geopoint(71.015625, 57.326521225217064), Geopoint(71.71875, 52.482780222078226), Geopoint(72.421875, 47.27922900257082), Geopoint(72.0703125, 43.58039085560784), Geopoint(73.828125, 36.59788913307022), Geopoint(73.47656249999999, 30.44867367928756), Geopoint(72.421875, 24.84656534821976), Geopoint(71.015625, 19.31114335506464), Geopoint(68.203125, 16.29905101458183), Geopoint(65.7421875, 11.178401873711785), Geopoint(61.87499999999999, 9.795677582829743), Geopoint(58.71093750000001, 8.754794702435618), Geopoint(54.84375, 6.315298538330033), Geopoint(61.17187499999999, 3.8642546157214084), Geopoint(67.1484375, 8.754794702435618), Geopoint(72.0703125, 14.604847155053898), Geopoint(75.5859375, 19.642587534013032), Geopoint(76.640625, 25.48295117535531), Geopoint(76.640625, 37.16031654673677), Geopoint(74.53125, 53.330872983017066), Geopoint(73.828125, 59.88893689676585), Geopoint(72.0703125, 63.860035895395306), Geopoint(68.90625, 65.94647177615738), Geopoint(66.4453125, 67.47492238478702), Geopoint(62.57812500000001, 69.65708627301174)))")

expr3.evaluate(function (err, val) {
  if (err) {
    console.log(err)
  } else {
    console.log(val)
  }
})

var expr4 = bbtexpr.parser.parse("isPointInCircle(Geopoint(123.32, 23.54), Geopoint(123, 23), 5000)")

expr4.evaluate(function (err, val) {
  if (err) {
    console.log(err)
  } else {
    console.log(val)
  }
})
