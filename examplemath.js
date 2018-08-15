'use strict'

var bbtexpr = require('./index.js')

var expr = bbtexpr.parser.parse("min(10, 44, 43, 0, -3, 0.3)")

console.log(expr)

expr.evaluate(function (err, val) {
  if (err) {
    console.log(err)
  } else {
    console.log(val)
  }
})

var expr1 = bbtexpr.parser.parse("mean(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)")

console.log(expr1)

expr1.evaluate(function (err, val) {
  if (err) {
    console.log(err)
  } else {
    console.log(val)
  }
})


var expr2 = bbtexpr.parser.parse("ceil(12.3)")

console.log(expr2)

expr2.evaluate(function (err, val) {
  if (err) {
    console.log(err)
  } else {
    console.log(val)
  }
})

var expr3 = bbtexpr.parser.parse("random()")

console.log(expr3)

expr3.evaluate(function (err, val) {
  if (err) {
    console.log(err)
  } else {
    console.log(val)
  }
})
