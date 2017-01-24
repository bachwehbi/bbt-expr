# Beebotte Expression Evaluator #

## About
A **Beebotte Expressions** is a mathematical expression with values and operators.

The values can be:

* Resource value: *my_channel.my_resource*
* Nested resource value: *my_channel.my_resource.nested_element.nested_element2*
* Primary value
    * boolean
    * number
    * text

## Expressions Grammar

The following operators are supported:

### Logical Operators

* `AND`
* `OR`
* `NOT` or `!`

### Comparison Operators

* `==`
* `!=`
* `>`
* `>=`
* `<`
* `<=`

### Arithmetic Operators

* `+`
* `-`
* `*`
* `idiv` (integral division: 5 idiv 2 is 2)
* `/`
* `%` (modulo)

Operators can be mixed with parentheses.

Expression Examples

```
    "34" == "34"

    (1+2)*2*2 + 22 == 34

    channel1.resource1 - channel2.resource1

    channel1.resource1 == channel2.resource1 OR channel1.resource1 == 44

    channel1.resource1.param1 + channel2.resource1.param1

    channel1.resource1 <= channel2.resource1 AND channel1.resource1 == channel3.resource1

    channel1.resource1 <= channel2.resource1 AND !channel1.resource1 > channel2.resource1
```

## License
Copyright 2017 Beebotte.

[The MIT License](http://opensource.org/licenses/MIT)
