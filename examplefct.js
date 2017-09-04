'use strict'

var bbtexpr = require('./index.js')

// Function applied on primitive value
console.log(bbtexpr.parser.parse(`"sometext".startsWith(123)`))

// Function from by Constructor prototype
console.log(bbtexpr.parser.parse(`String.concat("Hello ", "World")`))

// Piece of shit, but still accepted
console.log(bbtexpr.parser.parse(`String.startsWith("muuu")`))

// function applied on the channel/resource value prototype
console.log(bbtexpr.parser.parse(`channel.resource.startsWith("sometext")`))

// same as above
console.log(bbtexpr.parser.parse(`channel.resource.substring(10)`))

// same as above
console.log(bbtexpr.parser.parse(`Math.min(10, 12)`))
