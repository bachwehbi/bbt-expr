'use strict'

const bbtexpr = require('../index.js')
const bbt = require('beebotte')
const chai = require('chai')
const assert = chai.assert
const expect = chai.expect

const client = new bbt.Connector({
  apiKey: 'YOUR_API_KEY',
  secretKey: 'YOUR_SECRET_KEY',
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

describe('bbt-expr - test parsing', function () {

  it('logical expr 1', function (done) {
    bbtexpr.parser.parse(`("1" < "2")`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(true)
      done()
    })
  })

  it('logical expr 2', function (done) {
    bbtexpr.parser.parse(`(1 < 2 AND 2 > 6)`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(false)
      done()
    })
  })

  it('logical expr 3', function (done) {
    bbtexpr.parser.parse(`1 > 2 OR (1 < 2 AND 2 > 6)`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(false)
      done()
    })
  })

  it('logical expr 4', function (done) {
    bbtexpr.parser.parse(`(1 > 2 OR 1 < 2) AND 2 > 6`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(false)
      done()
    })
  })

  it('logical expr 5', function (done) {
    bbtexpr.parser.parse(`1`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(1)
      done()
    })
  })

  it('logical expr 6', function (done) {
    bbtexpr.parser.parse(`1 + 2`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(3)
      done()
    })
  })

  it('logical expr 7', function (done) {
    bbtexpr.parser.parse(`1 * 2`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(2)
      done()
    })
  })

  it('logical expr 8', function (done) {
    bbtexpr.parser.parse(`1 / 2`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(1/2)
      done()
    })
  })

  it('logical expr 9', function (done) {
    bbtexpr.parser.parse(`1 - 2`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(-1)
      done()
    })
  })

  it('logical expr 10', function (done) {
    bbtexpr.parser.parse(`1 % 2`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(1 % 2)
      done()
    })
  })

  it('logical expr 11', function (done) {
    bbtexpr.parser.parse(`1 + 2 + 4`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(7)
      done()
    })
  })

  it('logical expr 12', function (done) {
    bbtexpr.parser.parse(`1 + 2 * 4 / 6`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(1 + 2 * 4 / 6)
      done()
    })
  })

  it('logical expr 13', function (done) {
    bbtexpr.parser.parse(`(1 * 2) + 3`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal((1 * 2) + 3)
      done()
    })
  })

  it('logical expr 14', function (done) {
    bbtexpr.parser.parse(`-5 + 2 + (4 * 6) - 6`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(-5 + 2 + (4 * 6) - 6)
      done()
    })
  })


  it('logical expr 15', function (done) {
    bbtexpr.parser.parse(`-1 -2 -3`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(-1 -2 -3)
      done()
    })
  })

  it('logical expr 16', function (done) {
    bbtexpr.parser.parse(`((1 + 2) * 9)`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(((1 + 2) * 9))
      done()
    })
  })

  it('logical expr 17', function (done) {
    bbtexpr.parser.parse(`(((1 + 2))) / 1`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal((((1 + 2))) / 1)
      done()
    })
  })

  it('logical expr 18', function (done) {
    bbtexpr.parser.parse(`!(1 > 1)`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(!(1 > 1))
      done()
    })
  })

  it('logical expr 19', function (done) {
    bbtexpr.parser.parse(`1 > 2 OR 1 < 2`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(1 > 2 || 1 < 2)
      done()
    })
  })

  it('logical expr 20', function (done) {
    bbtexpr.parser.parse(`1 > 2 OR 1 < 2 OR 3 > 5`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(1 > 2 || 1 < 2 || 3 > 5)
      done()
    })
  })

  it('logical expr 21', function (done) {
    bbtexpr.parser.parse(`1 > 2 AND 1 < 2 AND 3 > 5`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(1 > 2 && 1 < 2 && 3 > 5)
      done()
    })
  })

  it('logical expr 22', function (done) {
    bbtexpr.parser.parse(`1 > 2 OR 1 < 2 AND 3 > 5`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(1 > 2 || 1 < 2 && 3 > 5)
      done()
    })
  })

  it('logical expr 23', function (done) {
    bbtexpr.parser.parse(`1 > 2 AND 1 < 2 OR 3 > 5`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(1 > 2 && 1 < 2 || 3 > 5)
      done()
    })
  })

  it('logical expr 24', function (done) {
    bbtexpr.parser.parse(`1 > 2 OR (1 < 2 AND 2 > 6)`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(1 > 2 || (1 < 2 && 2 > 6))
      done()
    })
  })

  it('logical expr 25', function (done) {
    bbtexpr.parser.parse(`(1 > 2 AND 1 < 2) OR 2 > 6`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal((1 > 2 && 1 < 2) || 2 > 6)
      done()
    })
  })

  it('logical expr 26', function (done) {
    bbtexpr.parser.parse(`(1 == 1 OR 1 > 2) OR (1 < 2 AND 2 > 6)`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal((1 == 1 || 1 > 2) || (1 < 2 && 2 > 6))
      done()
    })
  })

  it('logical expr 27', function (done) {
    bbtexpr.parser.parse(`(1 == 1 OR 1 > 2) AND !(1 < 2 AND 2 > 6)`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal((1 == 1 || 1 > 2) && !(1 < 2 && 2 > 6))
      done()
    })
  })

  it('logical expr 28', function (done) {
    bbtexpr.parser.parse(`(1 == 1 OR 1 > 2) AND !(1 < 2 AND NOT (2 > 6))`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal((1 == 1 || 1 > 2) && !(1 < 2 && ! (2 > 6)))
      done()
    })
  })

  it('logical expr 29', function (done) {
    bbtexpr.parser.parse(`CONCAT("Hello ", "World")`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal("Hello World")
      done()
    })
  })

  it('logical expr 30', function (done) {
    bbtexpr.parser.parse(`SUBSTRING("Hello World", 2, 6)`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal("Hello World".substring(2, 6))
      done()
    })
  })

  it('logical expr 31', function (done) {
    bbtexpr.parser.parse(`STARTSWITH("Hello World", "Hello")`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal("Hello World".startsWith("Hello"))
      done()
    })
  })

  it('logical expr 32', function (done) {
    bbtexpr.parser.parse(`min(10, 12)`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(10)
      done()
    })
  })

  it('logical expr 33', function (done) {
    bbtexpr.parser.parse("getDistance(Geopoint(123.32, 23.54), Geopoint(122, 20))")
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      done()
    })
  })

  it('logical expr 34', function (done) {
    bbtexpr.parser.parse("Polygone(Geopoint(10, 10), Geopoint(20, 10), Geopoint(20, 20), Geopoint(10, 20))")
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      done()
    })
  })

  it('logical expr 35', function (done) {
    bbtexpr.parser.parse("isPointInside(Geopoint(13, 14), Polygone(Geopoint(10, 10), Geopoint(20, 10), Geopoint(20, 20), Geopoint(10, 20)))")
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      done()
    })
  })

  it('logical expr 36', function (done) {
    bbtexpr.parser.parse("min(10, 44, 43, 0, -3, 0.3)")
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(-3)
      done()
    })
  })

  it('logical expr 37', function (done) {
    bbtexpr.parser.parse("mean(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)")
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(55/10)
      done()
    })
  })

  it('logical expr 38', function (done) {
    bbtexpr.parser.parse("ceil(12.3)")
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(13)
      done()
    })
  })

  it('logical expr 39', function (done) {
    bbtexpr.parser.parse("random()")
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(typeof res).to.be.equal('number')
      done()
    })
  })

  it('logical expr 40', function (done) {
    bbtexpr.parser.parse('min("10", "44")')
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal('10')
      done()
    })
  })

  it('logical expr 41', function (done) {
    bbtexpr.parser.parse("max(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)")
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(10)
      done()
    })
  })

  it('logical expr 42', function (done) {
    bbtexpr.parser.parse("ceil(1442.45)")
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(1443)
      done()
    })
  })

  it('logical expr 43', function (done) {
    bbtexpr.parser.parse("floor(1442.45)")
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(1442)
      done()
    })
  })

  it('logical expr 44', function (done) {
    bbtexpr.parser.parse("abs(-91442.45)")
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(91442.45)
      done()
    })
  })

  it('logical expr 45', function (done) {
    bbtexpr.parser.parse("abs(91442.45)")
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(91442.45)
      done()
    })
  })

  it('logical expr 46', function (done) {
    bbtexpr.parser.parse("sqrt(64)")
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(8)
      done()
    })
  })

  it('logical expr 47', function (done) {
    bbtexpr.parser.parse("pow(14, 3)")
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(14*14*14)
      done()
    })
  })

  it('logical expr 48', function (done) {
    bbtexpr.parser.parse("median(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)")
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(5)
      done()
    })
  })

  it('logical expr 49', function (done) {
    bbtexpr.parser.parse("sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)")
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(res).to.be.equal(110)
      done()
    })
  })

  it('logical expr 50', function (done) {
    bbtexpr.parser.parse("std(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)")
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      expect(typeof res).to.be.equal('number')
      done()
    })
  })

  it('logical expr 51', function (done) {
    bbtexpr.parser.parse("isPointInside(Geopoint(74.44335937499999, 42.87596410238256), Polygone(Geopoint(62.57812500000001, 69.65708627301174), Geopoint(60.46875, 68.26938680456564), Geopoint(65.0390625, 66.23145747862573), Geopoint(68.203125, 63.54855223203644), Geopoint(68.90625, 60.930432202923335), Geopoint(71.015625, 57.326521225217064), Geopoint(71.71875, 52.482780222078226), Geopoint(72.421875, 47.27922900257082), Geopoint(72.0703125, 43.58039085560784), Geopoint(73.828125, 36.59788913307022), Geopoint(73.47656249999999, 30.44867367928756), Geopoint(72.421875, 24.84656534821976), Geopoint(71.015625, 19.31114335506464), Geopoint(68.203125, 16.29905101458183), Geopoint(65.7421875, 11.178401873711785), Geopoint(61.87499999999999, 9.795677582829743), Geopoint(58.71093750000001, 8.754794702435618), Geopoint(54.84375, 6.315298538330033), Geopoint(61.17187499999999, 3.8642546157214084), Geopoint(67.1484375, 8.754794702435618), Geopoint(72.0703125, 14.604847155053898), Geopoint(75.5859375, 19.642587534013032), Geopoint(76.640625, 25.48295117535531), Geopoint(76.640625, 37.16031654673677), Geopoint(74.53125, 53.330872983017066), Geopoint(73.828125, 59.88893689676585), Geopoint(72.0703125, 63.860035895395306), Geopoint(68.90625, 65.94647177615738), Geopoint(66.4453125, 67.47492238478702), Geopoint(62.57812500000001, 69.65708627301174)))")
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      done()
    })
  })
})

describe('bbt-expr - test resource parsing', function () {

  const trigger = {
    channel: 'test',
    resource: 'test',
    data: 'test',
    event: 'publish',
    protocol: 'rest'
  }

  it('resource expr 1', function (done) {
    bbtexpr.parser.parse(`test.test`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      done()
    })
  })

  it('resource expr 2', function (done) {
    bbtexpr.parser.parse(`test.test.data`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      done()
    })
  })

  it('resource expr 3', function (done) {
    bbtexpr.parser.parse(`test.test.data.param1`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      done()
    })
  })

  it('resource expr 4', function (done) {
    bbtexpr.parser.parse(`resource("test", "test").ts`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      done()
    })
  })

  it('resource expr 5', function (done) {
    bbtexpr.parser.parse(`resource("test", "test").data`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      done()
    })
  })

  it('resource expr 6', function (done) {
    bbtexpr.parser.parse(`resource("test", "test").data.param1`)
    .setConnector(connector)
    .evaluate(function (err, res) {
      if (err) return done(err)
      done()
    })
  })

  it('resource expr 7', function (done) {
    bbtexpr.processExpression(
      `resource(trigger.channel, trigger.resource)`,
      connector,
      trigger, function (err, res) {
      if (err) return done(err)
      done()
    })
  })

  it('resource expr 8', function (done) {
    bbtexpr.processExpression(
      `resource(trigger.channel, trigger.resource).data`,
      connector,
      trigger, function (err, res) {
      if (err) return done(err)
      done()
    })
  })

  it('resource expr 9', function (done) {
    bbtexpr.processExpression(
      `resource(trigger.channel, trigger.data).data`,
      connector,
      trigger, function (err, res) {
      if (err) return done(err)
      done()
    })
  })
})
