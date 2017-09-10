'use strict'

var async = require('async')
var types = require('./types')

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (suffix) {
    return this.indexOf(suffix) === 0
  }
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1
  }
}

var BBTExpr = {

  /**
   * Enumeration of the different comparison operators that are supported in the Filter operation.
   */
  OPERATORS : {
    BBT_PASS      : 0, /**< No operator given, pass anyway */
    BBT_EQ        : 1, /**< Equality */
    BBT_NEQ       : 2, /**< Not Equal */
    BBT_GT        : 3, /**< Greater than */
    BBT_GTE       : 4, /**< Greater than or equal */
    BBT_LT        : 5, /**< Less than */
    BBT_LTE       : 6, /**< Less than or equal */
    BBT_IN        : 7, /**< In a range */
    BBT_NIN       : 8, /**< Not in range */
    BBT_AND       : 9, /**< AND operator */
    BBT_OR        : 10, /**< OR operator */
    BBT_NOT       : 11, /**< Not operator */
    BBT_ADD       : 12,
    BBT_SUB       : 13,
    BBT_MULT      : 14,
    BBT_DIV       : 15,
    BBT_MOD       : 16,
    BBT_IDIV      : 17
  },

  NO_CONDITION      : 0,
  RAW_VALUE         : 1,
  RESOURCE_VALUE    : 2,
  FUNCTION_VALUE    : 3,
  EXPRESSION        : 4,
  SIMPLE_CONDITION  : 5,
  COMPLEX_CONDITION : 6,
  TRIGGER_VALUE     : 7
}

BBTExpr.GenericCondition = function (opts) {
  this.ctype = types.NO_CONDITION
  this.oper  = types.OPERATORS.BBT_PASS
}

BBTExpr.GenericCondition.prototype.setConnector = function (connector) {
  this.connector = connector

  if (this.left) {
    this.left.setConnector(connector)
  }

  if (this.right) {
    this.right.setConnector(connector)
  }

  if (this.params) {
    this.params.forEach(function (param) {
      param.setConnector(connector)
    })
  }
}

BBTExpr.GenericCondition.prototype.setTrigger = function (trigger) {

  // trigger must be a valid resource value
  if (trigger && trigger.channel && trigger.resource && trigger.data != null) {
    this.trigger = trigger

    if (this.left) {
      this.left.setTrigger(trigger)
    }

    if (this.right) {
      this.right.setTrigger(trigger)
    }

    if (this.params) {
      this.params.forEach(function (param) {
        param.setTrigger(trigger)
      })
    }
  }
}

BBTExpr.GenericCondition.prototype.getConnector = function () {
  return this.connector
}

BBTExpr.GenericCondition.prototype.init = function (opts) {}

/**
 * Evaluates the condition and returns true or false according to the comparison result.
 * If the resource is a BAttribute, getAttribute will be called, if the resource is a Function
 * runRegisteredFunction will be called.
 * @return true or false according to the comparison result
 */
BBTExpr.GenericCondition.prototype.evaluate = function (cb) {
  return cb(null, true) //Generic condition returns true
}

BBTExpr.AndCondition = function (opts) {
  BBTExpr.GenericCondition.call(this, opts)
  this.ctype = types.COMPLEX_CONDITION
  this.oper = types.OPERATORS.BBT_AND
  this.left = null /**< pointer to condition structure to use with AND, OR, and NOT operators */
  this.right = null /**< pointer to condition structure to use with AND and OR operators */

  if (opts) this.init(opts)
}

BBTExpr.AndCondition.prototype = Object.create(BBTExpr.GenericCondition.prototype)
BBTExpr.AndCondition.constructor = BBTExpr.AndCondition

BBTExpr.AndCondition.prototype.init = function (opts) {
  BBTExpr.GenericCondition.prototype.init.call(this, opts)
  if (!opts) {
    this.left = new BBTExpr.GenericCondition()
    this.right = new BBTExpr.GenericCondition()
  } else {
    this.left = opts.left || new BBTExpr.GenericCondition()
    this.right = opts.right || new BBTExpr.GenericCondition()
  }
}

BBTExpr.AndCondition.prototype.evaluate = function (cb) {
  var self = this
  async.parallel([
    function (callback) {
      self.left.evaluate(callback)
    },
    function (callback) {
      self.right.evaluate(callback)
    }
  ], function (err, results) {
    if (err) return cb(err)
    var retval = results[0] && results[1]
    return cb(null, retval)
  })
}

BBTExpr.OrCondition = function (opts) {
  BBTExpr.GenericCondition.call(this, opts)
  this.ctype = types.COMPLEX_CONDITION
  this.oper = types.OPERATORS.BBT_OR
  this.left = null /**< pointer to condition structure to use with AND, OR, and NOT operators */
  this.right = null /**< pointer to condition structure to use with AND and OR operators */

  if (opts) this.init(opts)
}

BBTExpr.OrCondition.prototype = Object.create(BBTExpr.GenericCondition.prototype)
BBTExpr.OrCondition.constructor = BBTExpr.OrCondition

BBTExpr.OrCondition.prototype.init = function (opts) {
  BBTExpr.GenericCondition.prototype.init.call(this, opts)
  if (!opts) {
    this.left = new BBTExpr.GenericCondition()
    this.right = new BBTExpr.GenericCondition()
  } else {
    this.left = opts.left || new BBTExpr.GenericCondition()
    this.right = opts.right || new BBTExpr.GenericCondition()
  }
}

BBTExpr.OrCondition.prototype.evaluate = function (cb) {
  var self = this
  async.parallel([
    function (callback) {
      self.left.evaluate(callback)
    },
    function (callback) {
      self.right.evaluate(callback)
    }
  ], function (err, results) {
    if (err) return cb(err)
    var retval = results[0] || results[1]
    return cb(null, retval)
  })
}

BBTExpr.NotCondition = function (opts) {
  BBTExpr.GenericCondition.call(this, opts)
  this.ctype = types.COMPLEX_CONDITION
  this.oper = types.OPERATORS.BBT_NOT
  this.left = null /**< pointer to condition structure to use with AND, OR, and NOT operators */

  if (opts) this.init(opts)
}

BBTExpr.NotCondition.prototype = Object.create(BBTExpr.GenericCondition.prototype)
BBTExpr.NotCondition.constructor = BBTExpr.NotCondition

BBTExpr.NotCondition.prototype.init = function (opts) {
  BBTExpr.GenericCondition.prototype.init.call(this, opts)
  if (!opts) {
    this.left = new BBTExpr.GenericCondition()
  } else {
    this.left = opts.left || new BBTExpr.GenericCondition()
  }
}

BBTExpr.NotCondition.prototype.evaluate = function (cb) {
  var self = this
  self.left.evaluate(function (err, result) {
    if (err) return cb(err)
    return cb(null, !result)
  })
}

///////////////////////////////////
////////// EQUAL //////////////////

BBTExpr.EqCondition = function (opts) {
  BBTExpr.GenericCondition.call(this, opts)
  this.ctype = types.SIMPLE_CONDITION
  this.oper = types.OPERATORS.BBT_EQ
  this.left = null /**< source value to compare to */
  this.right = null /**< destination value to compare with */

  if (opts) this.init(opts)
}

BBTExpr.EqCondition.prototype = Object.create(BBTExpr.GenericCondition.prototype)
BBTExpr.EqCondition.prototype.constructor = BBTExpr.EqCondition

BBTExpr.EqCondition.prototype.init = function (opts) {
  BBTExpr.GenericCondition.prototype.init.call(this, opts)
  if (!opts) {
    return
  } else {
    this.left = opts.left
    this.right = opts.right
  }
}

BBTExpr.EqCondition.prototype.evaluate = function (cb) {
  var self = this
  async.parallel([
    function (callback) {
      self.left.evaluate(callback)
    },
    function (callback) {
      self.right.evaluate(callback)
    }
  ], function (err, results) {
    if (err) return cb(err)

    var retval = results[0] == results[1]
    return cb(null, retval)
  })
}

///////////////////////////////////
////////// NOT EQUAL //////////////

BBTExpr.NeqCondition = function (opts) {
  BBTExpr.GenericCondition.call(this, opts)
  this.ctype = types.SIMPLE_CONDITION
  this.oper = types.OPERATORS.BBT_NEQ
  this.left = null /**< source value to compare to */
  this.right = null /**< destination value to compare with */

  if (opts) this.init(opts)
}

BBTExpr.NeqCondition.prototype = Object.create(BBTExpr.GenericCondition.prototype)
BBTExpr.NeqCondition.constructor = BBTExpr.NeqCondition

BBTExpr.NeqCondition.prototype.init = function (opts) {
  BBTExpr.GenericCondition.prototype.init.call(this, opts)
  if (!opts) {
    return
  } else {
    this.left = opts.left
    this.right = opts.right
  }
}

BBTExpr.NeqCondition.prototype.evaluate = function (cb) {
  var self = this
  async.parallel([
    function (callback) {
      self.left.evaluate(callback)
    },
    function (callback) {
      self.right.evaluate(callback)
    }
  ], function (err, results) {
    if (err) return cb(err)
    var retval = results[0] != results[1]
    return cb(null, retval)
  })
}


///////////////////////////////////
////////// GREATER THAN ///////////

BBTExpr.GtCondition = function (opts) {
  BBTExpr.GenericCondition.call(this, opts)
  this.ctype = types.SIMPLE_CONDITION
  this.oper = types.OPERATORS.BBT_GT
  this.left = null /**< source value to compare to */
  this.right = null /**< destination value to compare with */

  if (opts) this.init(opts)
}

BBTExpr.GtCondition.prototype = Object.create(BBTExpr.GenericCondition.prototype)
BBTExpr.GtCondition.constructor = BBTExpr.GtCondition

BBTExpr.GtCondition.prototype.init = function (opts) {
  BBTExpr.GenericCondition.prototype.init.call(this, opts)
  if (!opts) {
    return
  } else {
    this.left = opts.left
    this.right = opts.right
  }
}

BBTExpr.GtCondition.prototype.evaluate = function (cb) {
  var self = this
  async.parallel([
    function (callback) {
      self.left.evaluate(callback)
    },
    function (callback) {
      self.right.evaluate(callback)
    }
  ], function (err, results) {
    if (err) return cb(err)
    var retval = results[0] > results[1]
    return cb(null, retval)
  })
}


///////////////////////////////////
////////// GREATER THAN or EQUAL //

BBTExpr.GteCondition = function (opts) {
  BBTExpr.GenericCondition.call(this, opts)
  this.ctype = types.SIMPLE_CONDITION
  this.oper = types.OPERATORS.BBT_GTE
  this.left = null /**< source value to compare to */
  this.right = null /**< destination value to compare with */

  if (opts) this.init(opts)
}

BBTExpr.GteCondition.prototype = Object.create(BBTExpr.GenericCondition.prototype)
BBTExpr.GteCondition.constructor = BBTExpr.GteCondition

BBTExpr.GteCondition.prototype.init = function (opts) {
  BBTExpr.GenericCondition.prototype.init.call(this, opts)
  if (!opts) {
    return
  } else {
    this.left = opts.left
    this.right = opts.right
  }
}

BBTExpr.GteCondition.prototype.evaluate = function (cb) {
  var self = this
  async.parallel([
    function (callback) {
      self.left.evaluate(callback)
    },
    function (callback) {
      self.right.evaluate(callback)
    }
  ], function (err, results) {
    if (err) return cb(err)
    var retval = results[0] >= results[1]
    return cb(null, retval)
  })
}


///////////////////////////////////
////////// LESS THAN //////////////

BBTExpr.LtCondition = function (opts) {
  BBTExpr.GenericCondition.call(this, opts)
  this.ctype = types.SIMPLE_CONDITION
  this.oper = types.OPERATORS.BBT_Lt
  this.left = null /**< source value to compare to */
  this.right = null /**< destination value to compare with */

  if (opts) this.init(opts)
}

BBTExpr.LtCondition.prototype = Object.create(BBTExpr.GenericCondition.prototype)
BBTExpr.LtCondition.constructor = BBTExpr.LtCondition

BBTExpr.LtCondition.prototype.init = function (opts) {
  BBTExpr.GenericCondition.prototype.init.call(this, opts)
  if (!opts) {
    return
  } else {
    this.left = opts.left
    this.right = opts.right
  }
}

BBTExpr.LtCondition.prototype.evaluate = function (cb) {
  var self = this
  async.parallel([
    function (callback) {
      self.left.evaluate(callback)
    },
    function (callback) {
      self.right.evaluate(callback)
    }
  ], function (err, results) {
    if (err) return cb(err)
    var retval = results[0] < results[1]
    return cb(null, retval)
  })
}


///////////////////////////////////
////////// LESS THAN or EQUAL /////

BBTExpr.LteCondition = function (opts) {
  BBTExpr.GenericCondition.call(this, opts)
  this.ctype = types.SIMPLE_CONDITION
  this.oper = types.OPERATORS.BBT_Lte
  this.left = null /**< source value to compare to */
  this.right = null /**< destination value to compare with */

  if (opts) this.init(opts)
}

BBTExpr.LteCondition.prototype = Object.create(BBTExpr.GenericCondition.prototype)
BBTExpr.LteCondition.constructor = BBTExpr.LteCondition

BBTExpr.LteCondition.prototype.init = function (opts) {
  BBTExpr.GenericCondition.prototype.init.call(this, opts)
  if (!opts) {
    return
  } else {
    this.left = opts.left
    this.right = opts.right
  }
}

BBTExpr.LteCondition.prototype.evaluate = function (cb) {
  var self = this
  async.parallel([
    function (callback) {
      self.left.evaluate(callback)
    },
    function (callback) {
      self.right.evaluate(callback)
    }
  ], function (err, results) {
    if (err) return cb(err)
    var retval = results[0] <= results[1]
    return cb(null, retval)
  })
}

///////////////////////////////////
////////// IN /////

BBTExpr.InCondition = function (opts) {
  BBTExpr.GenericCondition.call(this, opts)
  this.ctype = types.SIMPLE_CONDITION
  this.oper = types.OPERATORS.BBT_In
  this.left = null /**< source value to compare to */
  this.right = null /**< destination value to compare with */

  if (opts) this.init(opts)
}

BBTExpr.InCondition.prototype = Object.create(BBTExpr.GenericCondition.prototype)
BBTExpr.InCondition.constructor = BBTExpr.InCondition

BBTExpr.InCondition.prototype.init = function (opts) {
  BBTExpr.GenericCondition.prototype.init.call(this, opts)
  if (!opts) {
    return
  } else {
    this.left = opts.left
    this.right = opts.right
  }
}

BBTExpr.InCondition.prototype.evaluate = function (cb) {
  var self = this
  async.parallel([
    function (callback) {
      self.left.evaluate(callback)
    },
    function (callback) {
      self.right.evaluate(callback)
    }
  ], function (err, results) {
    if (err) return cb(err)
    var retval = results[1].indexOf(results[0]) !== -1
    return cb(null, retval)
  })
}

/////////////////////////////////////////////////////////
////////// Arithmetic Expression /////

BBTExpr.ExprValue = function (opts) {
  BBTExpr.GenericCondition.call(this, opts)
  this.ctype = types.EXPRESSION
  this.oper = opts.oper || types.OPERATORS.BBT_PASS
  this.left = null
  this.right = null

  if (opts) this.init(opts)
}

BBTExpr.ExprValue.prototype = Object.create(BBTExpr.GenericCondition.prototype)
BBTExpr.ExprValue.constructor = BBTExpr.ExprValue

BBTExpr.ExprValue.prototype.init = function (opts) {
  BBTExpr.GenericCondition.prototype.init.call(this, opts)
  if (!opts) {
    return
  } else {
    this.left = opts.left
    this.right = opts.right
  }
}

BBTExpr.ExprValue.prototype.evaluate = function (cb) {
  var self = this
  function evalExpression(v1, v2, callback) {
    switch (self.oper) {
      case types.OPERATORS.BBT_ADD  :
        return callback(null, v1 + v2)
      case types.OPERATORS.BBT_SUB :
        return callback(null, v1 - v2)
      case types.OPERATORS.BBT_MULT  :
        return callback(null, v1 * v2)
      case types.OPERATORS.BBT_DIV   :
        return callback(null, v1 / v2)
      case types.OPERATORS.BBT_MOD   :
        return callback(null, v1 % v2)
      case types.OPERATORS.BBT_IDIV  :
        return callback(null, Math.floor(v1 / v2))
      default:
        return callback('Unsupported arythmetic operation')
    }
  }

  if (self.left.ctype === types.RAW_VALUE && self.right.ctype === types.RAW_VALUE) {
    return evalExpression (self.left.getVal(), self.right.getVal(), cb)
  } else {
    async.parallel([
      function (callback) {
        self.left.evaluate(callback)
      },
      function (callback) {
        self.right.evaluate(callback)
      }
    ], function (err, results) {
      if (err) return cb(err)
      return evalExpression(results[0], results[1], cb)
    })
  }
}

/////////////////////////////////////////////

var getNestedValue = function (val, keys) {
  var temp = val
  for (var i in keys) {
    if (typeof temp[keys[i]] === 'undefined') {
      return undefined
    }
    temp = temp[keys[i]]
  }
  return temp
}

/////////////////////////////////////////////////////////
////////// Primary Value /////

BBTExpr.Value = function (opts) {
  BBTExpr.GenericCondition.call(this, opts)

  this.ctype = types.RAW_VALUE
  this.oper = types.OPERATORS.BBT_PASS
  this.val = opts.val
  this.keys = opts.keys

  if (opts) this.init(opts)
}

BBTExpr.Value.prototype = Object.create(BBTExpr.GenericCondition.prototype)
BBTExpr.Value.constructor = BBTExpr.Value

BBTExpr.Value.prototype.init = function (opts) {
  BBTExpr.GenericCondition.prototype.init.call(this, opts)
}

BBTExpr.Value.prototype.getVal = function () {
  if (this.keys) {
    return getNestedValue(this.val, this.keys)
  } else {
    return this.val
  }
}

BBTExpr.Value.prototype.evaluate = function (callback) {
  if (this.keys) {
    return callback (null, getNestedValue(this.val, this.keys))
  } else {
    return callback(null, this.val)
  }
}

/////////////////////////////////////////////////////////

////////// Function Value /////

BBTExpr.FunctionValue = function (opts) {
  BBTExpr.GenericCondition.call(this, opts)

  this.ctype = types.FUNCTION_VALUE
  this.oper = types.OPERATORS.BBT_PASS
  this.that = opts.that
  this.fct = opts.fct
  this.params = opts.params
  this.keys = opts.keys

  if (opts) this.init(opts)
}

BBTExpr.FunctionValue.prototype = Object.create(BBTExpr.GenericCondition.prototype)
BBTExpr.FunctionValue.constructor = BBTExpr.FunctionValue

BBTExpr.FunctionValue.prototype.init = function (opts) {
  BBTExpr.GenericCondition.prototype.init.call(this, opts)
}

BBTExpr.FunctionValue.prototype.evaluate = function (cb) {
  var self = this
  function iterator (item, callback) {
    item.evaluate(callback)
  }

  async.map(self.params, iterator, function (err, results) {
    if (err) return cb(err)
    if (self.that) {
      self.that.evaluate(function (err, result) {
        try {
          var fct_value = self.fct.apply(result, results)
          if (self.keys) fct_value = getNestedValue(fct_value, self.keys)
          return cb(null, fct_value)
        } catch (e) {
          return cb(null)
        }
      })
    } else {
      try {
        var fct_value = self.fct.apply(undefined, results)
        if (self.keys) fct_value = getNestedValue(fct_value, self.keys)
        return cb(null, fct_value)
      } catch (e) {
        return cb(e)
      }
    }
  })
}

/////////////////////////////////////////////////////////

////////// Resource Value /////

BBTExpr.ResourceValue = function (opts) {
  BBTExpr.GenericCondition.call(this, opts)

  this.ctype = types.RESOURCE_VALUE
  this.oper = types.OPERATORS.BBT_PASS
  this.channel = opts.channel
  this.resource = opts.resource
  this.keys = opts.keys

  var self = this

  this.getTopic = function () {
    return {
      channel: self.channel,
      resource: self.resource
    }
  }

  if (opts) this.init(opts)
}

BBTExpr.ResourceValue.prototype = Object.create(BBTExpr.GenericCondition.prototype)
BBTExpr.ResourceValue.constructor = BBTExpr.ResourceValue

BBTExpr.ResourceValue.prototype.init = function (opts) {
  BBTExpr.GenericCondition.prototype.init.call(this, opts)
}

BBTExpr.ResourceValue.prototype.evaluate = function (callback) {
  var self = this
  var client = self.getConnector()

  client(self.getTopic(), function (err, reply) {
    if (err) {
      return callback (err)
    } else if (reply) {
      var val = reply
      if (self.keys) {
        return callback (null, getNestedValue(val, self.keys))
      } else {
        return callback(null, val.data)
      }
    } else {
      return callback (null, undefined)
    }
  })
}

////////// Trigger Value /////

BBTExpr.TriggerValue = function (opts) {
  BBTExpr.GenericCondition.call(this, opts)

  this.ctype = types.TRIGGER_VALUE
  this.oper = types.OPERATORS.BBT_PASS

  var self = this

  if (opts) {
    this.init(opts)
  }
}

BBTExpr.TriggerValue.prototype = Object.create(BBTExpr.GenericCondition.prototype)
BBTExpr.TriggerValue.constructor = BBTExpr.TriggerValue

BBTExpr.TriggerValue.prototype.init = function (opts) {
  BBTExpr.GenericCondition.prototype.init.call(this, opts)
}

BBTExpr.TriggerValue.prototype.evaluate = function (callback) {
  var self = this

  if (self.keys) {
    return callback (null, getNestedValue(self.trigger, self.keys))
  } else {
    return callback(null, self.trigger.data)
  }
}

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

BBTExpr.createExpressionOrValue = function (opts) {
  var left = opts.left
  var right = opts.right || null
  var  oper = opts.oper

  function evalExpression (v1, v2, op) {
    switch (op) {
      case types.OPERATORS.BBT_EQ   :
        return v1 == v2
      case types.OPERATORS.BBT_NEQ  :
        return v1 != v2
      case types.OPERATORS.BBT_GT   :
        return v1 > v2
      case types.OPERATORS.BBT_GTE  :
        return v1 >= v2
      case types.OPERATORS.BBT_LT   :
        return v1 < v2
      case types.OPERATORS.BBT_LTE  :
        return v1 <= v2
      case types.OPERATORS.BBT_IN   :
        return v2.indexOf(v1) !== -1 //TODO this restricts IN to arrays
      case types.OPERATORS.BBT_NIN  :
        return v2.indexOf(v1) === -1 //TODO this restricts IN to arrays
      case types.OPERATORS.BBT_AND  :
        return v1 && v2
      case types.OPERATORS.BBT_OR   :
        return v1 || v2
      case types.OPERATORS.BBT_NOT  :
        return !v1
      case types.OPERATORS.BBT_ADD  :
        return v1 + v2
      case types.OPERATORS.BBT_SUB  :
        return v1 - v2
      case types.OPERATORS.BBT_MULT :
        return v1 * v2
      case types.OPERATORS.BBT_DIV  :
        return v1 / v2
      case types.OPERATORS.BBT_MOD  :
        return v1 % v2
      case types.OPERATORS.BBT_IDIV :
        return Math.floor(v1 / v2)
      default:
        throw new Error('Unsupported arythmetic operation')
    }
  }

  var retval
  /* for operators with one child like NOT */
  if (left.ctype === types.RAW_VALUE && !right) {
    opts.val = evalExpression(left.getVal(), null, oper)
    opts.oper = types.OPERATORS.BBT_PASS //just in case it was not set!!!
    left = null
    retval = new BBTExpr.Value(opts)
    return retval
  } else if (left.ctype === types.RAW_VALUE && right.ctype === types.RAW_VALUE) {
    /* for operators with two children */
    opts.val = evalExpression(left.getVal(), right.getVal(), oper)
    opts.oper = types.OPERATORS.BBT_PASS //just in case it was not set!!!
    left = null
    right = null
    retval = new BBTExpr.Value(opts)
    return retval
  } else {
    switch (oper) {
      case types.OPERATORS.BBT_EQ   :
        return new BBTExpr.EqCondition(opts)
      case types.OPERATORS.BBT_NEQ  :
        return new BBTExpr.NeqCondition(opts)
      case types.OPERATORS.BBT_GT   :
        return new BBTExpr.GtCondition(opts)
      case types.OPERATORS.BBT_GTE  :
        return new BBTExpr.GteCondition(opts)
      case types.OPERATORS.BBT_LT   :
        return new BBTExpr.LtCondition(opts)
      case types.OPERATORS.BBT_LTE  :
        return new BBTExpr.LteCondition(opts)
      case types.OPERATORS.BBT_IN   :
        return new BBTExpr.InCondition(opts)
      case types.OPERATORS.BBT_NIN  :
        return new BBTExpr.NinCondition(opts)
      case types.OPERATORS.BBT_AND  :
        return new BBTExpr.AndCondition(opts)
      case types.OPERATORS.BBT_OR   :
        return new BBTExpr.OrCondition(opts)
      case types.OPERATORS.BBT_NOT  :
        return new BBTExpr.NotCondition(opts)
      case types.OPERATORS.BBT_ADD  :
      case types.OPERATORS.BBT_SUB  :
      case types.OPERATORS.BBT_MULT :
      case types.OPERATORS.BBT_DIV  :
      case types.OPERATORS.BBT_MOD  :
      case types.OPERATORS.BBT_IDIV :
        return new BBTExpr.ExprValue(opts)
      default:
        throw new Error('Unsupported arythmetic operation')
    }
  }
}

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

module.exports = BBTExpr
