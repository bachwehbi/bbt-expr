'use strict'

module.exports = {

  /**
   * Enumeration of the different comparison operators that are supported in the Filter operation.
   */
  OPERATORS: {
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

  /**
   * Expressions Types
   */
  NO_CONDITION      : 0,
  RAW_VALUE         : 1,
  RESOURCE_VALUE    : 2,
  FUNCTION_VALUE    : 3,
  EXPRESSION        : 4,
  SIMPLE_CONDITION  : 5,
  COMPLEX_CONDITION : 6
}
