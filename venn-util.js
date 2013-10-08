if (typeof define !== 'function') { var define = require('amdefine')(module, require) }

define(function () {

  var arraySubClass = [].__proto__
    ? function(array, prototype) {
    array.__proto__ = prototype
  }
    : function(array, prototype) {
    for (var property in prototype) array[property] = prototype[property]
  }

  var concat = function(vennArray, nonVennArray) {

    nonVennArray.forEach(function(element) {
      vennArray.push(element)
    })

    return vennArray
  }

  var removeDuplicates = function(vennArray, keyFunction) {

     var copy = [].concat(vennArray)
       , visited = {}
       , key
    vennArray.length = 0

    keyFunction = keyFunction || bruteForceKeyFunction

    copy.forEach(function(element) {

      key = keyFunction(element)

      if( !visited[key] ) {
        vennArray.push(element)
        visited[key] = true
      }
    })

    return vennArray
  }

  var bruteForceKeyFunction = function(value) {
    if(typeof value == "string" ) {
      return value
    }
    return JSON.stringify(value)
  }

  return {
      arraySubClass : arraySubClass
    , concat : concat
    , removeDuplicates : removeDuplicates
    , bruteForceKey : bruteForceKeyFunction
  }
})
