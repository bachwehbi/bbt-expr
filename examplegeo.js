'use strict'

var bbtexpr = require('./index.js')

var expr = bbtexpr.parser.parse("Geolib.getDistance(Geopoint(123.32, 23.54), Geopoint(122, 20))")

console.log(expr)

expr.evaluate(function (err, val) {
  if (err) {
    console.log(err)
  } else {
    console.log(val)
  }
})

var expr1 = bbtexpr.parser.parse("Polygone(Geopoint(10, 10), Geopoint(20, 10), Geopoint(20, 20), Geopoint(10, 20))")

console.log(expr1)

expr1.evaluate(function (err, val) {
  if (err) {
    console.log(err)
  } else {
    console.log(val)
  }
})


var expr2 = bbtexpr.parser.parse("Geolib.isPointInside(Geopoint(13, 14), Polygone(Geopoint(10, 10), Geopoint(20, 10), Geopoint(20, 20), Geopoint(10, 20)))")

console.log(expr2)

expr2.evaluate(function (err, val) {
  if (err) {
    console.log(err)
  } else {
    console.log(val)
  }
})

var expr3 = bbtexpr.parser.parse("Polygone(Geopoint(chan1.res2), Geopoint(chan2.res2), Geopoint(20, 20), Geopoint(10, 20))")

console.log(expr3)
