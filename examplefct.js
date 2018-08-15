'use strict'

var bbtexpr = require('./index.js')

// Function applied on primitive value
console.log(bbtexpr.parser.parse(`startsWith("123YOOOO", 123)`))

// Function from by Constructor prototype
console.log(bbtexpr.parser.parse(`concat("Hello ", "World")`))

// Piece of shit, but still accepted
console.log(bbtexpr.parser.parse(`startsWith("hello world", "muuu")`))

// function applied on the channel/resource value prototype
console.log(bbtexpr.parser.parse(`startsWith(channel.resource, "sometext")`))

// same as above
console.log(bbtexpr.parser.parse(`substring(channel.resource, 10)`))

// Min math function
console.log(bbtexpr.parser.parse(`min(10, 12)`))
